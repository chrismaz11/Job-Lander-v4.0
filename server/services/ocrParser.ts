import { createWorker } from "tesseract.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function extractTextWithOCR(imageBuffer: Buffer): Promise<string> {
  try {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(imageBuffer);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error("OCR extraction error:", error);
    throw new Error("Failed to extract text from image");
  }
}

export async function cleanTextWithAI(rawText: string): Promise<string> {
  const prompt = `You are an expert text processing AI. The following text was extracted from a document using OCR and may contain errors, formatting issues, or noise.

Please clean up and improve this text by:
1. Fixing OCR errors (common character misrecognitions like 0/O, 1/l, etc.)
2. Correcting spelling and grammar mistakes
3. Improving formatting and structure
4. Removing noise and artifacts
5. Preserving all meaningful information

Raw OCR Text:
${rawText}

Return only the cleaned, corrected text. Maintain the original structure and meaning.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text || rawText;
}

export async function hybridTextExtraction(
  buffer: Buffer,
  extractedText: string,
  mimeType: string
): Promise<string> {
  // Heuristic: If extracted text is too short, it's likely a scanned image
  // Use higher threshold to avoid false positives with short but valid resumes
  const isLikelyScanned = extractedText.trim().length < 200;
  
  if (!isLikelyScanned) {
    // Text-based PDF - use extracted text directly
    return extractedText;
  }

  console.log("Detected scanned document (text < 200 chars), attempting OCR...");

  // For scanned PDFs, we need to convert to images first
  if (mimeType === "application/pdf") {
    let tempDir: string | null = null;
    
    try {
      // Use pdf-poppler to convert PDF to images
      const poppler = await import("pdf-poppler") as any;
      const fs = await import("fs");
      const path = await import("path");
      const os = await import("os");
      
      // Create temp directory for PDF conversion
      tempDir = path.join(os.tmpdir(), `pdf-ocr-${Date.now()}`);
      await fs.promises.mkdir(tempDir, { recursive: true });
      
      // Save PDF to temp file
      const pdfPath = path.join(tempDir, "input.pdf");
      await fs.promises.writeFile(pdfPath, buffer);
      
      // Convert ALL pages of PDF to images (not just first page)
      const opts = {
        format: "png",
        out_dir: tempDir,
        out_prefix: "page",
        // Don't specify page parameter to convert all pages
      };
      
      await poppler.convert(pdfPath, opts);
      
      // Get all generated page images
      const files = await fs.promises.readdir(tempDir);
      const pageImages = files
        .filter((f: string) => f.startsWith('page-') && f.endsWith('.png'))
        .sort((a, b) => {
          // Extract page numbers and sort numerically
          const pageA = parseInt(a.match(/page-(\d+)\.png/)?.[1] || '0', 10);
          const pageB = parseInt(b.match(/page-(\d+)\.png/)?.[1] || '0', 10);
          return pageA - pageB;
        });
      
      if (pageImages.length === 0) {
        throw new Error("No images generated from PDF");
      }
      
      console.log(`Processing ${pageImages.length} pages with OCR...`);
      
      // Extract text from all pages
      const allPageTexts: string[] = [];
      for (const pageImage of pageImages) {
        const imagePath = path.join(tempDir, pageImage);
        const imageBuffer = await fs.promises.readFile(imagePath);
        const ocrText = await extractTextWithOCR(imageBuffer);
        allPageTexts.push(ocrText);
      }
      
      // Concatenate all page texts
      const fullOcrText = allPageTexts.join('\n\n--- Page Break ---\n\n');
      
      // Clean up OCR text with AI
      const cleanedText = await cleanTextWithAI(fullOcrText);
      
      return cleanedText;
    } catch (error) {
      console.error("PDF OCR error:", error);
      // Fall back to original text if OCR fails
      return extractedText;
    } finally {
      // Always clean up temp files, even on error
      if (tempDir) {
        try {
          const fs = await import("fs");
          await fs.promises.rm(tempDir, { recursive: true, force: true });
        } catch (cleanupError) {
          console.error("Temp cleanup error:", cleanupError);
        }
      }
    }
  }
  
  // For other formats, use original text
  return extractedText;
}

export async function parseResumeWithHybridAI(text: string): Promise<any> {
  const prompt = `You are an expert resume parser with advanced text correction capabilities. The following text may have been extracted via OCR and could contain errors.

Your task:
1. Intelligently parse the resume information
2. Correct any OCR errors or formatting issues
3. Extract structured information accurately
4. Assess confidence level for each field based on clarity and completeness
5. Fill in missing fields with appropriate defaults

CONFIDENCE SCORING GUIDELINES:
- "high": Field is clearly present, well-formatted, and unambiguous
- "medium": Field is present but may have minor OCR errors or formatting issues
- "low": Field is unclear, has significant errors, or is inferred/guessed

Resume text:
${text}

Return a JSON object with this exact structure:
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "website": "string",
    "summary": "string"
  },
  "experience": [
    {
      "id": "unique-id",
      "company": "string",
      "position": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty if current",
      "current": boolean,
      "description": "string"
    }
  ],
  "education": [
    {
      "id": "unique-id",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty if current",
      "current": boolean
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "confidence": {
    "overall": "high" | "medium" | "low",
    "fields": {
      "fullName": "high" | "medium" | "low",
      "email": "high" | "medium" | "low",
      "phone": "high" | "medium" | "low",
      "location": "high" | "medium" | "low",
      "linkedin": "high" | "medium" | "low",
      "website": "high" | "medium" | "low",
      "summary": "high" | "medium" | "low",
      "experience": "high" | "medium" | "low",
      "education": "high" | "medium" | "low",
      "skills": "high" | "medium" | "low"
    }
  },
  "rawText": "${text.substring(0, 500)}..." 
}

If any field is not found, use empty string or empty array as appropriate. Always include confidence scoring for each field. Set overall confidence based on the majority of field confidences.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);
    
    // Ensure rawText is always included for fallback
    if (!result.rawText) {
      result.rawText = text;
    }
    
    return result;
  } catch (error) {
    console.error("AI parsing error:", error);
    // Return a fallback response with low confidence
    return {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: ""
      },
      experience: [],
      education: [],
      skills: [],
      confidence: {
        overall: "low",
        fields: {
          fullName: "low",
          email: "low",
          phone: "low",
          location: "low",
          linkedin: "low",
          website: "low",
          summary: "low",
          experience: "low",
          education: "low",
          skills: "low"
        }
      },
      rawText: text
    };
  }
}

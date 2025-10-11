import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { storage } from "./storage";
import { parseResumeWithAI, generateResumeContent, generateCoverLetter, calculateJobMatch } from "./services/gemini";
import { generateResumeHash, verifyOnChain, checkVerification } from "./services/blockchain";
import { searchJobs } from "./services/jobs";
import { getCanvaTemplates, createCanvaDesign, exportCanvaDesignAsPDF } from "./services/canva";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Parse resume from PDF/DOCX
  app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      let text = "";

      if (req.file.mimetype === "application/pdf") {
        const pdfData = await (pdfParse as any).default(req.file.buffer);
        text = pdfData.text;
      } else if (
        req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        text = result.value;
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }

      // Use AI to parse the resume text
      const parsedData = await parseResumeWithAI(text);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Parse resume error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Generate resume
  app.post("/api/generate-resume", async (req, res) => {
    try {
      const { personalInfo, experience, education, skills, templateId } = req.body;

      // Enhance content with AI
      const enhancedContent = await generateResumeContent({
        personalInfo,
        experience,
        education,
        skills,
      });

      const enhanced = JSON.parse(enhancedContent);

      // Create Canva design if template selected
      let canvaDesignId = null;
      let pdfUrl = null;

      if (templateId) {
        const design = await createCanvaDesign(templateId, enhanced);
        canvaDesignId = design.designId;
        pdfUrl = await exportCanvaDesignAsPDF(design.designId);
      }

      // Save to storage
      const resume = await storage.createResume({
        personalInfo: enhanced.personalInfo || personalInfo,
        experience: enhanced.experience || experience,
        education: enhanced.education || education,
        skills: enhanced.skills || skills,
        templateId,
        canvaDesignId,
        pdfUrl,
      });

      res.json(resume);
    } catch (error: any) {
      console.error("Generate resume error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Generate cover letter
  app.post("/api/generate-coverletter", async (req, res) => {
    try {
      const { resumeId, companyName, position, jobDescription } = req.body;

      if (!resumeId || !companyName || !position) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const resume = await storage.getResume(resumeId);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }

      const content = await generateCoverLetter({
        personalInfo: resume.personalInfo,
        companyName,
        position,
        jobDescription,
        experience: resume.experience,
        skills: resume.skills,
      });

      const coverLetter = await storage.createCoverLetter({
        resumeId,
        companyName,
        position,
        content,
      });

      res.json(coverLetter);
    } catch (error: any) {
      console.error("Generate cover letter error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Verify resume on blockchain
  app.post("/api/verify-on-chain", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Generate hash from file
      const resumeHash = generateResumeHash(req.file.buffer);

      // Create metadata
      const metadata = {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        timestamp: new Date().toISOString(),
      };

      // Verify on blockchain
      const result = await verifyOnChain(resumeHash, metadata);

      if (result.success) {
        res.json({
          verified: true,
          hash: resumeHash,
          transactionHash: result.transactionHash,
          blockNumber: result.blockNumber,
          timestamp: result.timestamp,
          network: "Polygon Mumbai Testnet",
          explorerUrl: `https://mumbai.polygonscan.com/tx/${result.transactionHash}`,
        });
      } else {
        res.status(500).json({ error: result.error || "Verification failed" });
      }
    } catch (error: any) {
      console.error("Blockchain verification error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Check if resume is verified
  app.post("/api/verify-resume", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const resumeHash = generateResumeHash(req.file.buffer);
      const result = await checkVerification(resumeHash);

      res.json(result);
    } catch (error: any) {
      console.error("Resume verification check error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Find jobs
  app.get("/api/find-jobs", async (req, res) => {
    try {
      const { query, location } = req.query;

      if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
      }

      const result = await searchJobs(query as string, location as string);
      res.json(result);
    } catch (error: any) {
      console.error("Job search error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get Canva templates
  app.get("/api/canva/templates", async (req, res) => {
    try {
      const templates = await getCanvaTemplates();
      res.json(templates);
    } catch (error: any) {
      console.error("Get templates error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create Canva design
  app.post("/api/canva/create-template", async (req, res) => {
    try {
      const { templateId, data } = req.body;

      if (!templateId || !data) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const design = await createCanvaDesign(templateId, data);
      res.json(design);
    } catch (error: any) {
      console.error("Create template error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Export Canva design as PDF
  app.post("/api/canva/export-pdf", async (req, res) => {
    try {
      const { designId } = req.body;

      if (!designId) {
        return res.status(400).json({ error: "Design ID required" });
      }

      const pdfUrl = await exportCanvaDesignAsPDF(designId);
      res.json({ pdfUrl });
    } catch (error: any) {
      console.error("Export PDF error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get all resumes
  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      res.json(resumes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single resume
  app.get("/api/resumes/:id", async (req, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.json(resume);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

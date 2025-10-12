import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import mammoth from "mammoth";
import { storage } from "./storage";
import { parseResumeWithAI, generateResumeContent, generateCoverLetter, generateAllCoverLetterTones, calculateJobMatch, rankJobsByRelevance, suggestCities } from "./services/gemini";
import { hybridTextExtraction, parseResumeWithHybridAI } from "./services/ocrParser";
import { generateResumeHash, verifyOnChain, checkVerification, estimateVerificationGas, batchVerifyOnChain } from "./services/blockchain";
import { searchJobs, getAvailableCities, getJobStatistics, type JobSearchFilters } from "./services/jobs";
import { getCanvaTemplates, createCanvaDesign, exportCanvaDesignAsPDF } from "./services/canva";
import { setupAuth, isAuthenticated } from "./replitAuth";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth endpoint to get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // Parse resume from PDF/DOCX with hybrid OCR + AI approach
  app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      let rawText = "";
      const mimeType = req.file.mimetype;

      // Step 1: Library-based text extraction
      if (mimeType === "application/pdf") {
        const pdfParse = (await import("pdf-parse")).default;
        const pdfData = await pdfParse(req.file.buffer);
        rawText = pdfData.text;
      } else if (
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        rawText = result.value;
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }

      // Step 2: Hybrid extraction (OCR for scanned documents)
      const enhancedText = await hybridTextExtraction(
        req.file.buffer,
        rawText,
        mimeType
      );

      // Step 3: AI parsing with error correction
      const parsedData = await parseResumeWithHybridAI(enhancedText);
      
      res.json(parsedData);
    } catch (error: any) {
      console.error("Parse resume error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Generate resume (protected route)
  app.post("/api/generate-resume", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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

      // Save to storage with userId
      const resume = await storage.createResume({
        userId,
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

  // Generate cover letter - returns all 3 tone variants
  app.post("/api/generate-coverletter", async (req, res) => {
    try {
      const { resumeId, companyName, position, jobDescription, tone } = req.body;

      if (!resumeId || !companyName || !position) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const resume = await storage.getResume(resumeId);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }

      // Generate all 3 tone variants in one request for efficiency
      const variants = await generateAllCoverLetterTones({
        personalInfo: resume.personalInfo,
        companyName,
        position,
        jobDescription,
        experience: resume.experience || [],
        skills: resume.skills || [],
      });

      // Save cover letter with all variants
      const coverLetter = await storage.createCoverLetter({
        resumeId,
        companyName,
        position,
        content: variants.professional, // Default to professional
        tone: tone || "professional",
        variants,
        jobDescription,
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

  // Estimate gas for verification
  app.post("/api/estimate-gas", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const resumeHash = generateResumeHash(req.file.buffer);
      const estimate = await estimateVerificationGas(resumeHash);

      res.json(estimate);
    } catch (error: any) {
      console.error("Gas estimation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Batch verify multiple resumes
  app.post("/api/batch-verify", async (req, res) => {
    try {
      const { hashes, metadata } = req.body;

      if (!hashes || !Array.isArray(hashes) || hashes.length === 0) {
        return res.status(400).json({ error: "No hashes provided for batch verification" });
      }

      if (hashes.length > 50) {
        return res.status(400).json({ error: "Too many hashes (max 50 per batch)" });
      }

      const result = await batchVerifyOnChain(hashes, metadata);

      if (result.success) {
        res.json({
          success: true,
          transactionHash: result.transactionHash,
          blockNumber: result.blockNumber,
          verifiedCount: result.verifiedCount,
          gasUsed: result.gasUsed,
          explorerUrl: result.explorerUrl,
          network: "Polygon Mumbai Testnet"
        });
      } else {
        res.status(500).json({ error: result.error || "Batch verification failed" });
      }
    } catch (error: any) {
      console.error("Batch verification error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Check verification by hash (without file upload)
  app.get("/api/check-verification/:hash", async (req, res) => {
    try {
      const { hash } = req.params;
      
      if (!hash) {
        return res.status(400).json({ error: "Hash parameter required" });
      }

      const result = await checkVerification(hash);
      res.json(result);
    } catch (error: any) {
      console.error("Verification check error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Find jobs with enhanced filters
  app.get("/api/find-jobs", async (req, res) => {
    try {
      const { 
        query, 
        location, 
        city, 
        remote, 
        employmentType, 
        salaryRange, 
        page, 
        limit,
        useSemanticRanking 
      } = req.query;

      // Build filters object
      const filters: JobSearchFilters = {
        query: query as string,
        location: location as string,
        city: city as string,
        remote: remote as "yes" | "no" | "any",
        employmentType: employmentType ? (employmentType as string).split(',') : undefined,
        salaryRange: salaryRange as string,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 10
      };

      // Search jobs with filters
      const result = await searchJobs(filters);

      // Apply semantic ranking if requested and we have results
      if (useSemanticRanking === 'true' && result.data.length > 0 && (query || city)) {
        const rankedJobs = await rankJobsByRelevance(
          result.data, 
          (query || city) as string,
          {
            // You could add user preferences here if available
          }
        );
        result.data = rankedJobs;
      }

      res.json(result);
    } catch (error: any) {
      console.error("Job search error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get available cities for autocomplete
  app.get("/api/cities", async (req, res) => {
    try {
      const { search } = req.query;
      const cities = getAvailableCities();
      
      if (search) {
        const suggestions = await suggestCities(search as string, cities);
        res.json({ cities: suggestions });
      } else {
        res.json({ cities: cities.slice(0, 20) });
      }
    } catch (error: any) {
      console.error("Get cities error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get job search statistics
  app.get("/api/job-stats", async (req, res) => {
    try {
      const stats = getJobStatistics();
      res.json(stats);
    } catch (error: any) {
      console.error("Get job stats error:", error);
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

  // Get user's resumes (protected)
  app.get("/api/resumes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resumes = await storage.getResumesByUserId(userId);
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

  // Update resume (protected)
  app.patch("/api/resumes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resume = await storage.getResume(req.params.id);
      
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      
      if (resume.userId !== userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updated = await storage.updateResume(req.params.id, req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete resume (protected)
  app.delete("/api/resumes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const resume = await storage.getResume(req.params.id);
      
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      
      if (resume.userId !== userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      await storage.deleteResume(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

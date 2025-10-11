import { type Resume, type InsertResume, type CoverLetter, type InsertCoverLetter, type Job } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Resume operations
  createResume(resume: InsertResume): Promise<Resume>;
  getResume(id: string): Promise<Resume | undefined>;
  getAllResumes(): Promise<Resume[]>;
  updateResume(id: string, resume: Partial<Resume>): Promise<Resume | undefined>;
  
  // Cover letter operations
  createCoverLetter(coverLetter: InsertCoverLetter): Promise<CoverLetter>;
  getCoverLetter(id: string): Promise<CoverLetter | undefined>;
  getCoverLettersByResumeId(resumeId: string): Promise<CoverLetter[]>;
  
  // Job operations
  createJob(job: Omit<Job, "id">): Promise<Job>;
  getJob(id: string): Promise<Job | undefined>;
  getAllJobs(): Promise<Job[]>;
  searchJobs(query: string, location?: string): Promise<Job[]>;
}

export class MemStorage implements IStorage {
  private resumes: Map<string, Resume>;
  private coverLetters: Map<string, CoverLetter>;
  private jobs: Map<string, Job>;

  constructor() {
    this.resumes = new Map();
    this.coverLetters = new Map();
    this.jobs = new Map();
  }

  // Resume operations
  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = randomUUID();
    const resume: Resume = {
      ...insertResume,
      id,
      createdAt: new Date(),
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async getResume(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }

  async updateResume(id: string, updates: Partial<Resume>): Promise<Resume | undefined> {
    const existing = this.resumes.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.resumes.set(id, updated);
    return updated;
  }

  // Cover letter operations
  async createCoverLetter(insertCoverLetter: InsertCoverLetter): Promise<CoverLetter> {
    const id = randomUUID();
    const coverLetter: CoverLetter = {
      ...insertCoverLetter,
      id,
      createdAt: new Date(),
    };
    this.coverLetters.set(id, coverLetter);
    return coverLetter;
  }

  async getCoverLetter(id: string): Promise<CoverLetter | undefined> {
    return this.coverLetters.get(id);
  }

  async getCoverLettersByResumeId(resumeId: string): Promise<CoverLetter[]> {
    return Array.from(this.coverLetters.values()).filter(
      (cl) => cl.resumeId === resumeId
    );
  }

  // Job operations
  async createJob(jobData: Omit<Job, "id">): Promise<Job> {
    const id = jobData.id || randomUUID();
    const job: Job = { ...jobData, id };
    this.jobs.set(id, job);
    return job;
  }

  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async searchJobs(query: string, location?: string): Promise<Job[]> {
    const jobs = Array.from(this.jobs.values());
    return jobs.filter(job => {
      const matchesQuery = query
        ? job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesLocation = location
        ? job.location?.toLowerCase().includes(location.toLowerCase())
        : true;
      return matchesQuery && matchesLocation;
    });
  }
}

export const storage = new MemStorage();

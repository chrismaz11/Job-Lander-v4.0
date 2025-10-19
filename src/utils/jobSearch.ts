import { cache } from './cache';
import { errorHandler } from './errorHandler';

export interface JobSearchFilters {
  query: string;
  location?: string;
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  jobType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  datePosted?: '24h' | '3d' | '7d' | '30d';
  company?: string;
}

export interface JobResult {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits?: string[];
  remote: boolean;
  datePosted: string;
  applyUrl: string;
  matchScore?: number;
}

export class JobSearchService {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  async searchJobs(filters: JobSearchFilters): Promise<JobResult[]> {
    const cacheKey = `jobs:${JSON.stringify(filters)}`;
    
    try {
      return await cache.getOrFetch(cacheKey, async () => {
        const response = await fetch(`${this.apiUrl}/jobs/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters)
        });

        if (!response.ok) {
          throw new Error(`Job search failed: ${response.statusText}`);
        }

        const data = await response.json();
        return this.enhanceJobResults(data.jobs, filters);
      }, 10 * 60 * 1000); // 10 minutes cache
    } catch (error) {
      errorHandler.logError(
        errorHandler.createError('JOB_SEARCH_ERROR', 'Failed to search jobs', { filters, error })
      );
      throw error;
    }
  }

  private enhanceJobResults(jobs: JobResult[], filters: JobSearchFilters): JobResult[] {
    return jobs.map(job => ({
      ...job,
      matchScore: this.calculateMatchScore(job, filters)
    })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  private calculateMatchScore(job: JobResult, filters: JobSearchFilters): number {
    let score = 0;
    
    // Title match
    if (job.title.toLowerCase().includes(filters.query.toLowerCase())) {
      score += 30;
    }
    
    // Location preference
    if (filters.remote && job.remote) {
      score += 20;
    }
    
    // Company match
    if (filters.company && job.company.toLowerCase().includes(filters.company.toLowerCase())) {
      score += 25;
    }
    
    // Recent posting bonus
    const daysOld = Math.floor((Date.now() - new Date(job.datePosted).getTime()) / (1000 * 60 * 60 * 24));
    if (daysOld <= 7) score += 15;
    else if (daysOld <= 30) score += 10;
    
    return Math.min(score, 100);
  }

  async getSavedJobs(): Promise<JobResult[]> {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  }

  async saveJob(job: JobResult): Promise<void> {
    const saved = await this.getSavedJobs();
    const updated = [...saved.filter(j => j.id !== job.id), job];
    localStorage.setItem('savedJobs', JSON.stringify(updated));
  }

  async removeJob(jobId: string): Promise<void> {
    const saved = await this.getSavedJobs();
    const updated = saved.filter(j => j.id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
  }
}

export const jobSearchService = new JobSearchService();

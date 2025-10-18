// API service for connecting to backend
import { config } from './config';

const API_BASE_URL = config.apiUrl;

export interface ParsedResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  educations: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
}

export interface JobSearchResult {
  id: string;
  title: string;
  company: string;
  location: string;
  posted_date: string;
  description: string;
  apply_url: string;
  salary_min?: number;
  salary_max?: number;
  job_type: string;
}

export async function parseResumeFile(file: File): Promise<ParsedResumeData> {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/parse-resume`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to parse resume');
    }

    // Transform the backend response to match our frontend interface
    const data = result.data;
    
    return {
      personalInfo: {
        firstName: data.personalInfo?.firstName || data.personalInfo?.name?.split(' ')[0] || '',
        lastName: data.personalInfo?.lastName || data.personalInfo?.name?.split(' ').slice(1).join(' ') || '',
        email: data.personalInfo?.email || '',
        phone: data.personalInfo?.phone || '',
        location: data.personalInfo?.location || '',
        linkedin: data.personalInfo?.linkedin || '',
        website: data.personalInfo?.website || '',
      },
      experiences: (data.experience || []).map((exp: any, index: number) => ({
        id: exp.id || `exp-${index}`,
        company: exp.company || '',
        position: exp.position || exp.title || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        current: exp.current || false,
        description: exp.description || exp.responsibilities?.join('\n') || '',
      })),
      educations: (data.education || []).map((edu: any, index: number) => ({
        id: edu.id || `edu-${index}`,
        institution: edu.institution || edu.school || '',
        degree: edu.degree || '',
        field: edu.field || edu.major || '',
        graduationDate: edu.graduationDate || edu.year || '',
        gpa: edu.gpa || '',
      })),
      skills: data.skills || [],
    };
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw error;
  }
}

export async function searchJobs(query: string, location?: string, page = 1): Promise<{
  jobs: JobSearchResult[];
  total: number;
  page: number;
  has_more: boolean;
}> {
  try {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
    });
    
    if (location) {
      params.append('location', location);
    }

    const response = await fetch(`${API_BASE_URL}/api/jobs/search?${params}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to search jobs');
    }

    return result.data;
  } catch (error) {
    console.error('Job search error:', error);
    throw error;
  }
}

export async function enhanceResumeText(text: string, type: 'bullets' | 'summary' = 'bullets'): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/enhance-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, type }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to enhance text');
    }

    return result.data.enhanced;
  } catch (error) {
    console.error('Text enhancement error:', error);
    throw error;
  }
}

export async function generateCoverLetter(jobTitle: string, company: string, resumeData: any): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-cover-letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle, company, resumeData }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to generate cover letter');
    }

    return result.data.coverLetter;
  } catch (error) {
    console.error('Cover letter generation error:', error);
    throw error;
  }
}

export async function exportResumePDF(resumeData: any, templateId = 'modern'): Promise<{
  pdf_url: string;
  hash: string;
  size: number;
  template: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/export-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeData, templateId }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to export PDF');
    }

    return result.data;
  } catch (error) {
    console.error('PDF export error:', error);
    throw error;
  }
}

export async function generateResumeWithAI(resumeData: any): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to generate resume');
    }

    return result.html || result.data;
  } catch (error) {
    console.error('Resume generation error:', error);
    throw error;
  }
}

// Health check endpoint
export async function checkHealth(): Promise<{ status: string; environment: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
}

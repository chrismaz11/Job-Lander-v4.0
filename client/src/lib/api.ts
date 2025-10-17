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

export async function parseResumeFile(file: File): Promise<ParsedResumeData> {
  const formData = new FormData();
  formData.append('file', file);

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
        firstName: data.personalInfo?.firstName || data.personalInfo?.fullName?.split(' ')[0] || '',
        lastName: data.personalInfo?.lastName || data.personalInfo?.fullName?.split(' ').slice(1).join(' ') || '',
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
        graduationDate: edu.graduationDate || edu.endDate || '',
        gpa: edu.gpa || '',
      })),
      skills: data.skills || [],
    };
  } catch (error) {
    console.error('Resume parsing error:', error);
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

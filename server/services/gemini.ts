import { GoogleGenAI } from "@google/genai";

// Integration reference: javascript_gemini blueprint
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function parseResumeWithAI(text: string): Promise<any> {
  const prompt = `You are an expert resume parser. Extract structured information from the following resume text and return it as JSON.

Assess confidence level for each field based on clarity and completeness:
- "high": Field is clearly present, well-formatted, and unambiguous
- "medium": Field is present but may have minor formatting issues
- "low": Field is unclear, missing, or requires guessing

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
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);
    
    // Ensure rawText is always included
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

export async function generateResumeContent(data: any): Promise<string> {
  const prompt = `You are a professional resume writer. Based on the following information, generate polished, professional content that highlights achievements and uses action verbs.

Personal Info:
${JSON.stringify(data.personalInfo, null, 2)}

Experience:
${JSON.stringify(data.experience, null, 2)}

Education:
${JSON.stringify(data.education, null, 2)}

Skills:
${JSON.stringify(data.skills, null, 2)}

Enhance the descriptions to be more impactful and achievement-oriented. Return the enhanced data in the same JSON structure.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      responseMimeType: "application/json",
    },
    contents: prompt,
  });

  return response.text || "{}";
}

export async function generateCoverLetter(data: {
  personalInfo: any;
  companyName: string;
  position: string;
  jobDescription?: string;
  experience?: any[];
  skills?: string[];
}): Promise<string> {
  const prompt = `You are a professional cover letter writer. Create a compelling cover letter for:

Applicant: ${data.personalInfo.fullName}
Position: ${data.position}
Company: ${data.companyName}
${data.jobDescription ? `Job Description: ${data.jobDescription}` : ''}

Applicant's Experience:
${JSON.stringify(data.experience || [], null, 2)}

Applicant's Skills:
${data.skills?.join(', ') || 'Not provided'}

Write a professional, engaging cover letter that:
1. Shows genuine interest in the company and position
2. Highlights relevant experience and skills
3. Demonstrates value the applicant can bring
4. Is concise (3-4 paragraphs)
5. Has a strong opening and closing

Return only the cover letter text, no JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text || "";
}

export async function calculateJobMatch(resume: any, jobDescription: string): Promise<number> {
  const prompt = `You are a job matching expert. Calculate how well this resume matches the job description.

Resume Summary:
- Skills: ${resume.skills?.join(', ')}
- Experience: ${resume.experience?.map((e: any) => e.position).join(', ')}
- Education: ${resume.education?.map((e: any) => `${e.degree} in ${e.field}`).join(', ')}

Job Description:
${jobDescription}

Return a JSON object with a match score from 0-100:
{"matchScore": number}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          matchScore: { type: "number" },
        },
        required: ["matchScore"],
      },
    },
    contents: prompt,
  });

  const result = JSON.parse(response.text || '{"matchScore": 0}');
  return result.matchScore;
}

// Rank jobs by semantic relevance to search query and user preferences
export async function rankJobsByRelevance(jobs: any[], query: string, preferences?: {
  skills?: string[];
  preferredLocation?: string;
  experienceLevel?: string;
}): Promise<any[]> {
  if (!jobs || jobs.length === 0) return [];
  
  // Don't rank if no query provided
  if (!query) return jobs;

  const prompt = `You are a job search expert. Rank these jobs by relevance to the search query and preferences.

Search Query: "${query}"
${preferences?.skills ? `User Skills: ${preferences.skills.join(', ')}` : ''}
${preferences?.preferredLocation ? `Preferred Location: ${preferences.preferredLocation}` : ''}
${preferences?.experienceLevel ? `Experience Level: ${preferences.experienceLevel}` : ''}

Jobs to rank:
${jobs.map((job, index) => `
Job ${index + 1}:
- Title: ${job.title}
- Company: ${job.company}
- Location: ${job.location || job.city}
- Remote: ${job.remote ? 'Yes' : 'No'}
- Description: ${(job.description || '').substring(0, 200)}...
`).join('\n')}

Return a JSON array with job indices sorted by relevance and a match score (0-100):
[{"index": number, "score": number, "reason": "brief explanation"}]

Consider:
1. Title match to query
2. Skills alignment
3. Location preferences
4. Experience level fit
5. Remote availability if mentioned`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
      },
      contents: prompt,
    });

    const rankings = JSON.parse(response.text || '[]');
    
    // Apply rankings to jobs
    const rankedJobs = rankings.map((rank: any) => {
      const job = jobs[rank.index];
      return {
        ...job,
        aiMatchScore: rank.score,
        matchReason: rank.reason
      };
    });

    // Add any jobs that weren't ranked
    const rankedIndices = new Set(rankings.map((r: any) => r.index));
    jobs.forEach((job, index) => {
      if (!rankedIndices.has(index)) {
        rankedJobs.push({
          ...job,
          aiMatchScore: 50,
          matchReason: "Standard match"
        });
      }
    });

    return rankedJobs.sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));
  } catch (error) {
    console.error("Error ranking jobs:", error);
    // Return jobs with default scores
    return jobs.map(job => ({
      ...job,
      aiMatchScore: 50,
      matchReason: "Standard match"
    }));
  }
}

// Get city suggestions based on partial input
export async function suggestCities(partialCity: string, availableCities: string[]): Promise<string[]> {
  if (!partialCity || partialCity.length < 2) return [];
  
  const partial = partialCity.toLowerCase();
  const suggestions = availableCities.filter(city => 
    city.toLowerCase().includes(partial)
  );
  
  // Sort by how early the partial appears in the city name
  suggestions.sort((a, b) => {
    const aIndex = a.toLowerCase().indexOf(partial);
    const bIndex = b.toLowerCase().indexOf(partial);
    return aIndex - bIndex;
  });
  
  return suggestions.slice(0, 5);
}

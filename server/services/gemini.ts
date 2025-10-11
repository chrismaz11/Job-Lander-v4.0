import { GoogleGenAI } from "@google/genai";

// Integration reference: javascript_gemini blueprint
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function parseResumeWithAI(text: string): Promise<any> {
  const prompt = `You are an expert resume parser. Extract structured information from the following resume text and return it as JSON.

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
  "skills": ["skill1", "skill2", "skill3"]
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      responseMimeType: "application/json",
    },
    contents: prompt,
  });

  const jsonText = response.text;
  return JSON.parse(jsonText);
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

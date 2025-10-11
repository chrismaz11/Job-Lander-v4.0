import type { Job } from "@shared/schema";

export async function searchJobs(query: string, location?: string): Promise<{ data: Job[] }> {
  try {
    if (!process.env.JSEARCH_API_KEY) {
      console.warn("JSEARCH_API_KEY not configured, using mock data");
      return { data: [] };
    }

    const params = new URLSearchParams({
      query: query,
      ...(location && { location }),
      num_pages: "1",
    });

    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?${params}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.JSEARCH_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`JSearch API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform JSearch data to our Job schema
    const jobs: Job[] = (data.data || []).map((job: any) => ({
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_state || job.job_country || "Remote",
      description: job.job_description || "",
      salary: job.job_salary || "",
      postedDate: job.job_posted_at_datetime_utc || "",
      jobUrl: job.job_apply_link || job.job_google_link || "",
      aiMatchScore: null,
    }));

    return { data: jobs };
  } catch (error) {
    console.error("Job search error:", error);
    return { data: [] };
  }
}

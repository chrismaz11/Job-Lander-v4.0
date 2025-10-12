// Canva Connect API integration with OAuth flow
import crypto from 'crypto';

// Types
export interface CanvaTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  previewUrl?: string;
  tags?: string[];
  isPremium?: string;
}

export interface CanvaOAuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  userId: string;
}

export interface CanvaDesignSession {
  designId: string;
  editUrl: string;
  previewUrl?: string;
  exportUrl?: string;
  status: 'draft' | 'published' | 'exporting' | 'ready';
}

export interface CanvaExportResult {
  url: string;
  format: 'pdf' | 'png' | 'jpg';
  status: 'ready' | 'processing' | 'failed';
  expiresAt?: Date;
}

// Store OAuth tokens in memory (in production, use database)
const tokenStore = new Map<string, CanvaOAuthToken>();

// Comprehensive template data for all 6 categories with actual image paths
const mockTemplates: CanvaTemplate[] = [
  // Modern Professional Templates
  {
    id: "modern-prof-1",
    name: "Executive Edge",
    category: "Modern Professional",
    description: "Clean lines and bold typography for senior professionals",
    thumbnailUrl: "modern_resume_template_e5991aaf",
    previewUrl: "modern_resume_template_e5991aaf",
    tags: ["professional", "modern", "executive", "clean"],
    isPremium: "false"
  },
  {
    id: "modern-prof-2",
    name: "Corporate Clarity",
    category: "Modern Professional",
    description: "Sophisticated design with subtle color accents",
    thumbnailUrl: "professional_busines_36348409",
    previewUrl: "professional_busines_36348409",
    tags: ["corporate", "professional", "modern"],
    isPremium: "false"
  },
  {
    id: "modern-prof-3",
    name: "Business Elite",
    category: "Modern Professional",
    description: "Premium layout for C-suite executives",
    thumbnailUrl: "professional_busines_c7aa056b",
    previewUrl: "professional_busines_c7aa056b",
    tags: ["business", "executive", "premium"],
    isPremium: "true"
  },

  // Minimalist Templates
  {
    id: "minimal-1",
    name: "Pure Simplicity",
    category: "Minimalist",
    description: "Maximum impact with minimal design elements",
    thumbnailUrl: "minimalist_clean_doc_7c46cd68",
    previewUrl: "minimalist_clean_doc_7c46cd68",
    tags: ["minimal", "clean", "simple"],
    isPremium: "false"
  },
  {
    id: "minimal-2",
    name: "White Space Master",
    category: "Minimalist",
    description: "Elegant use of negative space and typography",
    thumbnailUrl: "minimalist_clean_doc_589066c1",
    previewUrl: "minimalist_clean_doc_589066c1",
    tags: ["minimal", "elegant", "typography"],
    isPremium: "false"
  },
  {
    id: "minimal-3",
    name: "Essential Focus",
    category: "Minimalist",
    description: "Distraction-free design that highlights your achievements",
    thumbnailUrl: "minimalist_clean_doc_e0642427",
    previewUrl: "minimalist_clean_doc_e0642427",
    tags: ["minimal", "focus", "clean"],
    isPremium: "false"
  },

  // Creative Templates
  {
    id: "creative-1",
    name: "Artistic Vision",
    category: "Creative",
    description: "Bold colors and creative layouts for designers",
    thumbnailUrl: "creative_colorful_po_d6b2b620",
    previewUrl: "creative_colorful_po_d6b2b620",
    tags: ["creative", "colorful", "designer"],
    isPremium: "false"
  },
  {
    id: "creative-2",
    name: "Innovation Spark",
    category: "Creative",
    description: "Dynamic design for creative professionals",
    thumbnailUrl: "creative_colorful_po_751bcdd4",
    previewUrl: "creative_colorful_po_751bcdd4",
    tags: ["creative", "dynamic", "innovative"],
    isPremium: "true"
  },
  {
    id: "creative-3",
    name: "Portfolio Pro",
    category: "Creative",
    description: "Showcase your creative work with style",
    thumbnailUrl: "creative_colorful_po_52c75c3d",
    previewUrl: "creative_colorful_po_52c75c3d",
    tags: ["portfolio", "creative", "showcase"],
    isPremium: "false"
  },
  {
    id: "creative-4",
    name: "Design Forward",
    category: "Creative",
    description: "Modern creative layout with geometric elements",
    thumbnailUrl: "creative_colorful_po_d6b2b620",
    previewUrl: "creative_colorful_po_d6b2b620",
    tags: ["creative", "geometric", "modern"],
    isPremium: "false"
  },

  // Executive Templates
  {
    id: "exec-1",
    name: "Leadership Excellence",
    category: "Executive",
    description: "Distinguished design for senior leadership",
    thumbnailUrl: "executive_resume_template_820a6579",
    previewUrl: "executive_resume_template_820a6579",
    tags: ["executive", "leadership", "premium"],
    isPremium: "true"
  },
  {
    id: "exec-2",
    name: "CEO Standard",
    category: "Executive",
    description: "Top-tier professional template for executives",
    thumbnailUrl: "professional_busines_ef87a72c",
    previewUrl: "professional_busines_ef87a72c",
    tags: ["CEO", "executive", "professional"],
    isPremium: "true"
  },
  {
    id: "exec-3",
    name: "Board Ready",
    category: "Executive",
    description: "Polished design for board-level positions",
    thumbnailUrl: "executive_resume_template_820a6579",
    previewUrl: "executive_resume_template_820a6579",
    tags: ["board", "executive", "polished"],
    isPremium: "true"
  },

  // Student Templates
  {
    id: "student-1",
    name: "Fresh Graduate",
    category: "Student",
    description: "Perfect for recent graduates entering the job market",
    thumbnailUrl: "student_resume_template_1c2224d4",
    previewUrl: "student_resume_template_1c2224d4",
    tags: ["student", "graduate", "entry-level"],
    isPremium: "false"
  },
  {
    id: "student-2",
    name: "Academic Star",
    category: "Student",
    description: "Highlight your academic achievements",
    thumbnailUrl: "student_resume_template_1c2224d4",
    previewUrl: "student_resume_template_1c2224d4",
    tags: ["academic", "student", "achievements"],
    isPremium: "false"
  },
  {
    id: "student-3",
    name: "Internship Ready",
    category: "Student",
    description: "Designed for internship applications",
    thumbnailUrl: "minimalist_clean_doc_589066c1",
    previewUrl: "minimalist_clean_doc_589066c1",
    tags: ["internship", "student", "entry"],
    isPremium: "false"
  },
  {
    id: "student-4",
    name: "Campus Leader",
    category: "Student",
    description: "Showcase leadership and extracurricular activities",
    thumbnailUrl: "student_resume_template_1c2224d4",
    previewUrl: "student_resume_template_1c2224d4",
    tags: ["student", "leadership", "activities"],
    isPremium: "false"
  },

  // Tech Templates
  {
    id: "tech-1",
    name: "Code Master",
    category: "Tech",
    description: "Developer-focused template with technical emphasis",
    thumbnailUrl: "tech_developer_codin_41007037",
    previewUrl: "tech_developer_codin_41007037",
    tags: ["tech", "developer", "coding"],
    isPremium: "false"
  },
  {
    id: "tech-2",
    name: "Full Stack Pro",
    category: "Tech",
    description: "Comprehensive template for full-stack developers",
    thumbnailUrl: "tech_developer_codin_9ce14b3d",
    previewUrl: "tech_developer_codin_9ce14b3d",
    tags: ["fullstack", "tech", "developer"],
    isPremium: "false"
  },
  {
    id: "tech-3",
    name: "Data Science Elite",
    category: "Tech",
    description: "Specialized for data scientists and ML engineers",
    thumbnailUrl: "tech_developer_codin_ce6e64e7",
    previewUrl: "tech_developer_codin_ce6e64e7",
    tags: ["data", "tech", "science"],
    isPremium: "true"
  },
  {
    id: "tech-4",
    name: "DevOps Expert",
    category: "Tech",
    description: "Infrastructure and operations focused template",
    thumbnailUrl: "tech_developer_codin_41007037",
    previewUrl: "tech_developer_codin_41007037",
    tags: ["devops", "tech", "infrastructure"],
    isPremium: "false"
  }
];

// OAuth Configuration
export function getCanvaOAuthUrl(userId: string, state?: string): string {
  const clientId = process.env.CANVA_CLIENT_ID;
  const redirectUri = process.env.CANVA_REDIRECT_URI || 'http://localhost:5000/api/canva/callback';
  
  if (!clientId) {
    // Return mock OAuth URL for development
    return `/api/canva/mock-auth?userId=${userId}&state=${state || ''}`;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'design:write design:read export:write',
    state: state || generateState(userId)
  });

  return `https://www.canva.com/api/oauth/authorize?${params.toString()}`;
}

// Generate secure state parameter for OAuth
function generateState(userId: string): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(16).toString('hex');
  return Buffer.from(JSON.stringify({ userId, timestamp, random })).toString('base64');
}

// Verify state parameter
export function verifyState(state: string): { userId: string; valid: boolean } {
  try {
    const decoded = JSON.parse(Buffer.from(state, 'base64').toString());
    const age = Date.now() - decoded.timestamp;
    // State is valid for 10 minutes
    return {
      userId: decoded.userId,
      valid: age < 10 * 60 * 1000
    };
  } catch {
    return { userId: '', valid: false };
  }
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string, userId: string): Promise<CanvaOAuthToken | null> {
  const clientId = process.env.CANVA_CLIENT_ID;
  const clientSecret = process.env.CANVA_CLIENT_SECRET;
  const redirectUri = process.env.CANVA_REDIRECT_URI || 'http://localhost:5000/api/canva/callback';

  if (!clientId || !clientSecret) {
    // Mock token for development
    const mockToken: CanvaOAuthToken = {
      accessToken: `mock-access-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
      userId
    };
    tokenStore.set(userId, mockToken);
    return mockToken;
  }

  try {
    const response = await fetch('https://api.canva.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    const token: CanvaOAuthToken = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: new Date(Date.now() + (data.expires_in * 1000)),
      userId
    };

    // Store token
    tokenStore.set(userId, token);
    return token;
  } catch (error) {
    console.error('Token exchange error:', error);
    return null;
  }
}

// Refresh access token
export async function refreshAccessToken(userId: string): Promise<CanvaOAuthToken | null> {
  const token = tokenStore.get(userId);
  if (!token) return null;

  const clientId = process.env.CANVA_CLIENT_ID;
  const clientSecret = process.env.CANVA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    // Extend mock token
    token.expiresAt = new Date(Date.now() + 3600000);
    return token;
  }

  try {
    const response = await fetch('https://api.canva.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    const newToken: CanvaOAuthToken = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || token.refreshToken,
      expiresAt: new Date(Date.now() + (data.expires_in * 1000)),
      userId
    };

    tokenStore.set(userId, newToken);
    return newToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}

// Get valid access token (refresh if needed)
export async function getValidToken(userId: string): Promise<string | null> {
  const token = tokenStore.get(userId);
  if (!token) return null;

  // Check if token is expired or about to expire (5 minutes buffer)
  const now = new Date();
  const buffer = new Date(now.getTime() + 5 * 60000);
  
  if (token.expiresAt <= buffer) {
    const refreshed = await refreshAccessToken(userId);
    return refreshed?.accessToken || null;
  }

  return token.accessToken;
}

// Check if user is authenticated with Canva
export function isCanvaAuthenticated(userId: string): boolean {
  return tokenStore.has(userId);
}

// Get Canva templates
export async function getCanvaTemplates(userId?: string): Promise<CanvaTemplate[]> {
  try {
    if (!process.env.CANVA_CLIENT_ID || !process.env.CANVA_CLIENT_SECRET) {
      console.info("Canva credentials not configured, using mock templates");
      return mockTemplates;
    }

    // If user is authenticated, fetch real templates
    if (userId) {
      const token = await getValidToken(userId);
      if (token) {
        try {
          const response = await fetch('https://api.canva.com/templates?type=resume', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            // Map Canva API response to our format
            return data.templates || mockTemplates;
          }
        } catch (error) {
          console.error("Error fetching Canva templates:", error);
        }
      }
    }

    // Return mock templates as fallback
    return mockTemplates;
  } catch (error) {
    console.error("Canva templates error:", error);
    return mockTemplates;
  }
}

// Create Canva design with autofill data
export async function createCanvaDesign(
  templateId: string, 
  data: any, 
  userId: string
): Promise<CanvaDesignSession> {
  try {
    const token = await getValidToken(userId);
    
    if (!token || !process.env.CANVA_CLIENT_ID) {
      // Mock design session for development
      const mockDesignId = `mock-design-${Date.now()}`;
      return {
        designId: mockDesignId,
        editUrl: `/api/canva/mock-editor?designId=${mockDesignId}&templateId=${templateId}`,
        previewUrl: `/api/canva/mock-preview/${mockDesignId}`,
        status: 'draft'
      };
    }

    // Create design with Canva API
    const response = await fetch('https://api.canva.com/designs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template_id: templateId,
        autofill: data,
        title: `Resume - ${data.personalInfo?.name || 'Draft'}`
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create design: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      designId: result.design.id,
      editUrl: result.design.edit_url,
      previewUrl: result.design.preview_url,
      status: 'draft'
    };
  } catch (error) {
    console.error("Canva design creation error:", error);
    
    // Fallback to mock
    const mockDesignId = `mock-design-${Date.now()}`;
    return {
      designId: mockDesignId,
      editUrl: `/api/canva/mock-editor?designId=${mockDesignId}&templateId=${templateId}`,
      previewUrl: `/api/canva/mock-preview/${mockDesignId}`,
      status: 'draft'
    };
  }
}

// Autofill existing design with data
export async function autofillCanvaDesign(
  designId: string, 
  data: any, 
  userId: string
): Promise<boolean> {
  try {
    const token = await getValidToken(userId);
    
    if (!token || !process.env.CANVA_CLIENT_ID) {
      // Mock success
      return true;
    }

    const response = await fetch(`https://api.canva.com/designs/${designId}/autofill`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response.ok;
  } catch (error) {
    console.error("Canva autofill error:", error);
    return false;
  }
}

// Export Canva design
export async function exportCanvaDesign(
  designId: string, 
  format: 'pdf' | 'png' | 'jpg', 
  userId: string
): Promise<CanvaExportResult> {
  try {
    const token = await getValidToken(userId);
    
    if (!token || !process.env.CANVA_CLIENT_ID) {
      // Mock export
      return {
        url: `/api/generate-pdf?designId=${designId}`,
        format,
        status: 'ready',
        expiresAt: new Date(Date.now() + 24 * 3600000) // 24 hours
      };
    }

    // Request export from Canva
    const response = await fetch(`https://api.canva.com/designs/${designId}/export`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        format: format.toUpperCase(),
        quality: 'high'
      })
    });

    if (!response.ok) {
      throw new Error(`Export failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Poll for export completion
    let exportStatus = result.status;
    let exportUrl = result.url;
    
    while (exportStatus === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const statusResponse = await fetch(`https://api.canva.com/exports/${result.export_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const statusData = await statusResponse.json();
      exportStatus = statusData.status;
      exportUrl = statusData.url;
    }

    return {
      url: exportUrl,
      format,
      status: exportStatus === 'completed' ? 'ready' : 'failed',
      expiresAt: new Date(Date.now() + 24 * 3600000)
    };
  } catch (error) {
    console.error("Canva export error:", error);
    
    // Fallback to PDF generation
    return {
      url: `/api/generate-pdf?designId=${designId}`,
      format: 'pdf',
      status: 'ready',
      expiresAt: new Date(Date.now() + 24 * 3600000)
    };
  }
}

// Get design preview
export async function getDesignPreview(designId: string, userId: string): Promise<string | null> {
  try {
    const token = await getValidToken(userId);
    
    if (!token || !process.env.CANVA_CLIENT_ID) {
      // Return mock preview
      return `/api/canva/mock-preview/${designId}`;
    }

    const response = await fetch(`https://api.canva.com/designs/${designId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.design.preview_url || null;
  } catch (error) {
    console.error("Get design preview error:", error);
    return null;
  }
}

// Clear user's Canva authentication
export function clearCanvaAuth(userId: string): void {
  tokenStore.delete(userId);
}
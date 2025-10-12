// Canva Connect API integration
// Note: Full Canva SDK integration requires OAuth flow setup

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

export async function getCanvaTemplates(): Promise<CanvaTemplate[]> {
  try {
    if (!process.env.CANVA_CLIENT_ID || !process.env.CANVA_CLIENT_SECRET) {
      console.warn("Canva credentials not configured, using mock templates");
      return mockTemplates;
    }

    // In production, this would use the actual Canva Connect API
    // For now, return comprehensive mock data
    return mockTemplates;
  } catch (error) {
    console.error("Canva templates error:", error);
    return mockTemplates;
  }
}

export async function createCanvaDesign(templateId: string, data: any): Promise<{ designId: string; editUrl: string }> {
  try {
    // Find the template to get its category
    const template = mockTemplates.find(t => t.id === templateId);
    
    // This would use the Canva Connect API to create a design
    // For MVP, we return mock data with Canva-like URL
    return {
      designId: `design-${Date.now()}`,
      editUrl: `https://www.canva.com/design/${templateId}/edit`,
    };
  } catch (error) {
    console.error("Canva design creation error:", error);
    throw error;
  }
}

export async function exportCanvaDesignAsPDF(designId: string): Promise<string> {
  try {
    // This would use the Canva Connect API to export as PDF
    // For MVP, we return a mock PDF URL
    return `https://www.canva.com/export/${designId}.pdf`;
  } catch (error) {
    console.error("Canva export error:", error);
    throw error;
  }
}
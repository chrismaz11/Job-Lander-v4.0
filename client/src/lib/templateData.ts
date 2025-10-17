export interface Template {
  id: string;
  name: string;
  category: 'Modern' | 'Classic' | 'Creative' | 'Professional' | 'Minimalist';
  description: string;
  imageId: string;
  component: string;
  features: string[];
  tier: 'free' | 'premium';
}

export const templateData: Template[] = [
  // Modern Category
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    category: 'Modern',
    description: 'Clean, contemporary design perfect for tech and business professionals',
    imageId: 'modern_resume_template_e5991aaf',
    component: 'ModernResumeTemplate',
    features: ['Clean typography', 'Color accents', 'Skills visualization'],
    tier: 'free'
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'Modern',
    description: 'Eye-catching gradient design for creative professionals',
    imageId: 'professional_busines_36348409',
    component: 'ModernResumeTemplate',
    features: ['Gradient header', 'Modern layout', 'Icon integration'],
    tier: 'premium'
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    category: 'Modern',
    description: 'Tech-focused design with clean lines and modern aesthetics',
    imageId: 'tech_developer_codin_41007037',
    component: 'TechResumeTemplate',
    features: ['Code-friendly layout', 'Tech icons', 'Project showcase'],
    tier: 'free'
  },

  // Classic Category
  {
    id: 'classic-traditional',
    name: 'Classic Traditional',
    category: 'Classic',
    description: 'Timeless design suitable for conservative industries',
    imageId: 'professional_busines_c7aa056b',
    component: 'ExecutiveResumeTemplate',
    features: ['Traditional layout', 'Professional fonts', 'Conservative styling'],
    tier: 'free'
  },
  {
    id: 'classic-executive',
    name: 'Classic Executive',
    category: 'Classic',
    description: 'Executive-level design for senior management positions',
    imageId: 'executive_resume_template_820a6579',
    component: 'ExecutiveResumeTemplate',
    features: ['Executive styling', 'Leadership focus', 'Achievement highlights'],
    tier: 'premium'
  },
  {
    id: 'classic-academic',
    name: 'Classic Academic',
    category: 'Classic',
    description: 'Academic-focused design for researchers and educators',
    imageId: 'student_resume_template_1c2224d4',
    component: 'AcademicResumeTemplate',
    features: ['Publication sections', 'Research focus', 'Academic formatting'],
    tier: 'free'
  },

  // Creative Category
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Creative',
    description: 'Bold, creative design for designers and artists',
    imageId: 'creative_colorful_po_d6b2b620',
    component: 'CreativeResumeTemplate',
    features: ['Creative layout', 'Portfolio integration', 'Visual elements'],
    tier: 'premium'
  },
  {
    id: 'creative-colorful',
    name: 'Creative Colorful',
    category: 'Creative',
    description: 'Vibrant design perfect for creative industries',
    imageId: 'creative_colorful_po_751bcdd4',
    component: 'CreativeResumeTemplate',
    features: ['Color blocks', 'Creative sections', 'Visual hierarchy'],
    tier: 'premium'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    category: 'Creative',
    description: 'Portfolio-focused design for showcasing creative work',
    imageId: 'creative_colorful_po_52c75c3d',
    component: 'CreativeResumeTemplate',
    features: ['Portfolio showcase', 'Image integration', 'Creative flow'],
    tier: 'premium'
  },

  // Professional Category
  {
    id: 'professional-business',
    name: 'Professional Business',
    category: 'Professional',
    description: 'Business-focused design for corporate professionals',
    imageId: 'professional_busines_ef87a72c',
    component: 'ModernResumeTemplate',
    features: ['Corporate styling', 'Business focus', 'Professional layout'],
    tier: 'free'
  },
  {
    id: 'professional-sales',
    name: 'Professional Sales',
    category: 'Professional',
    description: 'Sales-optimized design highlighting achievements',
    imageId: 'tech_developer_codin_9ce14b3d',
    component: 'SalesResumeTemplate',
    features: ['Achievement focus', 'Metrics highlighting', 'Sales-specific sections'],
    tier: 'premium'
  },
  {
    id: 'professional-consulting',
    name: 'Professional Consulting',
    category: 'Professional',
    description: 'Consulting-focused design for strategic professionals',
    imageId: 'tech_developer_codin_ce6e64e7',
    component: 'ExecutiveResumeTemplate',
    features: ['Strategic focus', 'Client highlights', 'Consulting layout'],
    tier: 'premium'
  },

  // Minimalist Category
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    category: 'Minimalist',
    description: 'Ultra-clean design focusing on content over decoration',
    imageId: 'minimalist_clean_doc_7c46cd68',
    component: 'MinimalistResumeTemplate',
    features: ['Clean lines', 'Minimal styling', 'Content focus'],
    tier: 'free'
  },
  {
    id: 'minimalist-elegant',
    name: 'Minimalist Elegant',
    category: 'Minimalist',
    description: 'Elegant minimalist design with subtle sophistication',
    imageId: 'minimalist_clean_doc_589066c1',
    component: 'MinimalistResumeTemplate',
    features: ['Elegant typography', 'Subtle accents', 'Refined layout'],
    tier: 'premium'
  },
  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    category: 'Minimalist',
    description: 'Modern minimalist approach with contemporary elements',
    imageId: 'minimalist_clean_doc_e0642427',
    component: 'MinimalistResumeTemplate',
    features: ['Modern minimalism', 'Contemporary fonts', 'Streamlined design'],
    tier: 'free'
  }
];

export const templateCategories = [
  'Modern',
  'Classic', 
  'Creative',
  'Professional',
  'Minimalist'
] as const;

export function getTemplatesByCategory(category: string): Template[] {
  return templateData.filter(template => template.category === category);
}

export function getFreeTemplates(): Template[] {
  return templateData.filter(template => template.tier === 'free');
}

export function getPremiumTemplates(): Template[] {
  return templateData.filter(template => template.tier === 'premium');
}

export function getTemplateById(id: string): Template | undefined {
  return templateData.find(template => template.id === id);
}

export interface Template {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'creative' | 'professional' | 'minimalist';
  description: string;
  thumbnailUrl: string;
  isPremium: boolean;
  atsOptimized: boolean;
  tags: string[];
}

export const templates: Template[] = [
  // Modern Templates
  {
    id: 'modern-1',
    name: 'Modern Professional',
    category: 'modern',
    description: 'Clean, contemporary design with subtle color accents',
    thumbnailUrl: '/templates/modern-1-thumb.jpg',
    isPremium: false,
    atsOptimized: true,
    tags: ['clean', 'professional', 'tech']
  },
  {
    id: 'modern-2',
    name: 'Modern Executive',
    category: 'modern',
    description: 'Executive-level template with sophisticated layout',
    thumbnailUrl: '/templates/modern-2-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['executive', 'leadership', 'corporate']
  },
  {
    id: 'modern-3',
    name: 'Modern Creative',
    category: 'modern',
    description: 'Modern design with creative elements for designers',
    thumbnailUrl: '/templates/modern-3-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['creative', 'design', 'portfolio']
  },

  // Classic Templates
  {
    id: 'classic-1',
    name: 'Classic Professional',
    category: 'classic',
    description: 'Traditional format preferred by conservative industries',
    thumbnailUrl: '/templates/classic-1-thumb.jpg',
    isPremium: false,
    atsOptimized: true,
    tags: ['traditional', 'conservative', 'finance']
  },
  {
    id: 'classic-2',
    name: 'Classic Academic',
    category: 'classic',
    description: 'Academic-focused template for education sector',
    thumbnailUrl: '/templates/classic-2-thumb.jpg',
    isPremium: false,
    atsOptimized: true,
    tags: ['academic', 'education', 'research']
  },
  {
    id: 'classic-3',
    name: 'Classic Corporate',
    category: 'classic',
    description: 'Corporate standard with professional formatting',
    thumbnailUrl: '/templates/classic-3-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['corporate', 'business', 'formal']
  },

  // Creative Templates
  {
    id: 'creative-1',
    name: 'Creative Portfolio',
    category: 'creative',
    description: 'Showcase your creative work with visual elements',
    thumbnailUrl: '/templates/creative-1-thumb.jpg',
    isPremium: true,
    atsOptimized: false,
    tags: ['portfolio', 'visual', 'artistic']
  },
  {
    id: 'creative-2',
    name: 'Creative Designer',
    category: 'creative',
    description: 'Perfect for graphic designers and artists',
    thumbnailUrl: '/templates/creative-2-thumb.jpg',
    isPremium: true,
    atsOptimized: false,
    tags: ['design', 'graphic', 'artistic']
  },
  {
    id: 'creative-3',
    name: 'Creative Marketing',
    category: 'creative',
    description: 'Eye-catching design for marketing professionals',
    thumbnailUrl: '/templates/creative-3-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['marketing', 'creative', 'colorful']
  },

  // Professional Templates
  {
    id: 'professional-1',
    name: 'Professional Standard',
    category: 'professional',
    description: 'Standard professional format for all industries',
    thumbnailUrl: '/templates/professional-1-thumb.jpg',
    isPremium: false,
    atsOptimized: true,
    tags: ['standard', 'versatile', 'clean']
  },
  {
    id: 'professional-2',
    name: 'Professional Tech',
    category: 'professional',
    description: 'Optimized for technology and engineering roles',
    thumbnailUrl: '/templates/professional-2-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['tech', 'engineering', 'software']
  },
  {
    id: 'professional-3',
    name: 'Professional Healthcare',
    category: 'professional',
    description: 'Tailored for healthcare and medical professionals',
    thumbnailUrl: '/templates/professional-3-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['healthcare', 'medical', 'clinical']
  },

  // Minimalist Templates
  {
    id: 'minimalist-1',
    name: 'Minimalist Clean',
    category: 'minimalist',
    description: 'Ultra-clean design focusing on content',
    thumbnailUrl: '/templates/minimalist-1-thumb.jpg',
    isPremium: false,
    atsOptimized: true,
    tags: ['clean', 'simple', 'minimal']
  },
  {
    id: 'minimalist-2',
    name: 'Minimalist Modern',
    category: 'minimalist',
    description: 'Modern minimalist approach with subtle styling',
    thumbnailUrl: '/templates/minimalist-2-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['modern', 'minimal', 'elegant']
  },
  {
    id: 'minimalist-3',
    name: 'Minimalist Executive',
    category: 'minimalist',
    description: 'Executive-level minimalist design',
    thumbnailUrl: '/templates/minimalist-3-thumb.jpg',
    isPremium: true,
    atsOptimized: true,
    tags: ['executive', 'minimal', 'sophisticated']
  }
];

export const getTemplatesByCategory = (category: string) => {
  return templates.filter(template => template.category === category);
};

export const getFreeTemplates = () => {
  return templates.filter(template => !template.isPremium);
};

export const getPremiumTemplates = () => {
  return templates.filter(template => template.isPremium);
};

export const getATSOptimizedTemplates = () => {
  return templates.filter(template => template.atsOptimized);
};

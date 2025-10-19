import { z } from 'zod';

// Enhanced validation schemas
export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number').optional(),
  location: z.string().max(100, 'Location too long').optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  website: z.string().url('Invalid website URL').optional(),
  summary: z.string().max(1000, 'Summary too long').optional()
});

export const experienceSchema = z.object({
  position: z.string().min(2, 'Position required').max(100, 'Position too long'),
  company: z.string().min(2, 'Company required').max(100, 'Company too long'),
  location: z.string().max(100, 'Location too long').optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)'),
  endDate: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)').optional(),
  current: z.boolean().default(false),
  description: z.string().max(2000, 'Description too long').optional(),
  achievements: z.array(z.string().max(200, 'Achievement too long')).optional()
});

export const educationSchema = z.object({
  institution: z.string().min(2, 'Institution required').max(100, 'Institution too long'),
  degree: z.string().min(2, 'Degree required').max(100, 'Degree too long'),
  field: z.string().max(100, 'Field too long').optional(),
  graduationDate: z.string().regex(/^\d{4}$/, 'Invalid year format').optional(),
  gpa: z.number().min(0).max(4.0).optional(),
  honors: z.string().max(200, 'Honors too long').optional()
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name required').max(50, 'Skill name too long'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  category: z.string().max(50, 'Category too long').optional()
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema).max(20, 'Too many experience entries'),
  education: z.array(educationSchema).max(10, 'Too many education entries'),
  skills: z.array(skillSchema).max(50, 'Too many skills'),
  certifications: z.array(z.string().max(100, 'Certification too long')).optional(),
  languages: z.array(z.string().max(50, 'Language too long')).optional(),
  projects: z.array(z.object({
    name: z.string().max(100, 'Project name too long'),
    description: z.string().max(500, 'Project description too long'),
    technologies: z.array(z.string().max(30, 'Technology name too long')),
    url: z.string().url('Invalid project URL').optional()
  })).optional()
});

// Sanitization functions
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const sanitizeFileName = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 100);
};

// File validation
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PDF, DOC, DOCX, and TXT files are allowed' };
  }
  
  return { valid: true };
};

export type ResumeData = z.infer<typeof resumeSchema>;

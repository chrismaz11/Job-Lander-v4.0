// Canva Data Mapper - Maps resume data to Canva template fields
// Handles different template layouts and field variations

export interface CanvaAutofillData {
  // Personal Information
  name?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  headline?: string;
  email?: string;
  phone?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  
  // Professional Summary
  summary?: string;
  objective?: string;
  about?: string;
  bio?: string;
  
  // Experience sections (supports multiple)
  experience1_title?: string;
  experience1_company?: string;
  experience1_dates?: string;
  experience1_location?: string;
  experience1_description?: string;
  
  experience2_title?: string;
  experience2_company?: string;
  experience2_dates?: string;
  experience2_location?: string;
  experience2_description?: string;
  
  experience3_title?: string;
  experience3_company?: string;
  experience3_dates?: string;
  experience3_location?: string;
  experience3_description?: string;
  
  // Education sections
  education1_degree?: string;
  education1_school?: string;
  education1_dates?: string;
  education1_location?: string;
  education1_gpa?: string;
  education1_honors?: string;
  
  education2_degree?: string;
  education2_school?: string;
  education2_dates?: string;
  education2_location?: string;
  
  // Skills
  skills?: string;
  technicalSkills?: string;
  softSkills?: string;
  languages?: string;
  tools?: string;
  technologies?: string;
  
  // Certifications & Awards
  certifications?: string;
  awards?: string;
  achievements?: string;
  
  // Projects
  project1_name?: string;
  project1_description?: string;
  project1_technologies?: string;
  project1_link?: string;
  
  project2_name?: string;
  project2_description?: string;
  project2_technologies?: string;
  
  // Additional sections
  interests?: string;
  hobbies?: string;
  volunteer?: string;
  publications?: string;
  references?: string;
}

// Format date range for display
function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate) return '';
  
  const formatDate = (date: string) => {
    if (date === 'Present' || date === 'Current') return date;
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return date;
    }
  };
  
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  
  return `${start} - ${end}`;
}

// Format location string
function formatLocation(city?: string, state?: string, country?: string): string {
  const parts = [];
  if (city) parts.push(city);
  if (state) parts.push(state);
  if (country && country !== 'United States') parts.push(country);
  
  return parts.join(', ');
}

// Format bullet points into a paragraph
function formatBulletPoints(points: string[] | string | undefined): string {
  if (!points) return '';
  
  if (typeof points === 'string') {
    return points;
  }
  
  // Join bullet points with line breaks
  return points
    .filter(p => p && p.trim())
    .map(p => `• ${p.trim()}`)
    .join('\n');
}

// Format skills array into a comma-separated string
function formatSkillsList(skills: string[] | string | undefined): string {
  if (!skills) return '';
  
  if (typeof skills === 'string') {
    return skills;
  }
  
  return skills.filter(s => s && s.trim()).join(', ');
}

// Map resume data to Canva autofill format
export function mapResumeToCanvaData(resumeData: any): CanvaAutofillData {
  const { personalInfo = {}, experience = [], education = [], skills = [] } = resumeData;
  
  const canvaData: CanvaAutofillData = {};
  
  // Map personal information
  canvaData.name = personalInfo.name || `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim();
  canvaData.firstName = personalInfo.firstName || personalInfo.name?.split(' ')[0] || '';
  canvaData.lastName = personalInfo.lastName || personalInfo.name?.split(' ').slice(1).join(' ') || '';
  canvaData.title = personalInfo.title || personalInfo.jobTitle || personalInfo.position || '';
  canvaData.headline = personalInfo.headline || personalInfo.title || '';
  canvaData.email = personalInfo.email || personalInfo.emailAddress || '';
  canvaData.phone = personalInfo.phone || personalInfo.phoneNumber || personalInfo.mobile || '';
  
  // Handle location variations
  canvaData.location = personalInfo.location || 
    formatLocation(personalInfo.city, personalInfo.state, personalInfo.country);
  canvaData.city = personalInfo.city || '';
  canvaData.state = personalInfo.state || personalInfo.province || '';
  canvaData.country = personalInfo.country || '';
  
  // Social links
  canvaData.website = personalInfo.website || personalInfo.url || '';
  canvaData.linkedin = personalInfo.linkedin || personalInfo.linkedinUrl || '';
  canvaData.github = personalInfo.github || personalInfo.githubUrl || '';
  canvaData.portfolio = personalInfo.portfolio || personalInfo.portfolioUrl || '';
  
  // Professional summary
  canvaData.summary = personalInfo.summary || personalInfo.objective || personalInfo.about || '';
  canvaData.objective = personalInfo.objective || '';
  canvaData.about = personalInfo.about || personalInfo.summary || '';
  canvaData.bio = personalInfo.bio || personalInfo.summary || '';
  
  // Map experience (up to 3 positions)
  experience.slice(0, 3).forEach((exp: any, index: number) => {
    const num = index + 1;
    const prefix = `experience${num}_`;
    
    canvaData[`${prefix}title`] = exp.title || exp.position || exp.jobTitle || '';
    canvaData[`${prefix}company`] = exp.company || exp.organization || exp.employer || '';
    canvaData[`${prefix}dates`] = formatDateRange(exp.startDate, exp.endDate);
    canvaData[`${prefix}location`] = exp.location || formatLocation(exp.city, exp.state, exp.country);
    canvaData[`${prefix}description`] = formatBulletPoints(exp.description || exp.responsibilities || exp.achievements);
  });
  
  // Map education (up to 2 entries)
  education.slice(0, 2).forEach((edu: any, index: number) => {
    const num = index + 1;
    const prefix = `education${num}_`;
    
    canvaData[`${prefix}degree`] = edu.degree || edu.qualification || '';
    canvaData[`${prefix}school`] = edu.school || edu.institution || edu.university || '';
    canvaData[`${prefix}dates`] = formatDateRange(edu.startDate, edu.endDate) || 
      edu.graduationDate || edu.year || '';
    canvaData[`${prefix}location`] = edu.location || formatLocation(edu.city, edu.state, edu.country);
    
    if (num === 1) {
      canvaData[`${prefix}gpa`] = edu.gpa ? `GPA: ${edu.gpa}` : '';
      canvaData[`${prefix}honors`] = formatSkillsList(edu.honors || edu.awards);
    }
  });
  
  // Map skills in various formats
  if (skills) {
    if (Array.isArray(skills)) {
      canvaData.skills = formatSkillsList(skills);
      
      // Categorize skills if possible
      const technical = skills.filter((s: any) => 
        typeof s === 'object' && s.category === 'technical'
      ).map((s: any) => s.name || s);
      
      const soft = skills.filter((s: any) => 
        typeof s === 'object' && s.category === 'soft'
      ).map((s: any) => s.name || s);
      
      if (technical.length) {
        canvaData.technicalSkills = formatSkillsList(technical);
      }
      if (soft.length) {
        canvaData.softSkills = formatSkillsList(soft);
      }
    } else if (typeof skills === 'object') {
      canvaData.technicalSkills = formatSkillsList(skills.technical);
      canvaData.softSkills = formatSkillsList(skills.soft);
      canvaData.languages = formatSkillsList(skills.languages);
      canvaData.tools = formatSkillsList(skills.tools);
      canvaData.technologies = formatSkillsList(skills.technologies);
      canvaData.skills = formatSkillsList([
        ...Array.from(skills.technical || []),
        ...Array.from(skills.soft || [])
      ]);
    } else {
      canvaData.skills = skills;
    }
  }
  
  // Map additional sections if they exist
  if (resumeData.certifications) {
    canvaData.certifications = Array.isArray(resumeData.certifications) 
      ? resumeData.certifications.map((c: any) => c.name || c).join('\n')
      : resumeData.certifications;
  }
  
  if (resumeData.awards) {
    canvaData.awards = Array.isArray(resumeData.awards)
      ? resumeData.awards.map((a: any) => a.name || a).join('\n')
      : resumeData.awards;
  }
  
  if (resumeData.projects) {
    resumeData.projects.slice(0, 2).forEach((project: any, index: number) => {
      const num = index + 1;
      canvaData[`project${num}_name`] = project.name || project.title || '';
      canvaData[`project${num}_description`] = project.description || '';
      canvaData[`project${num}_technologies`] = formatSkillsList(project.technologies || project.tech);
      if (num === 1) {
        canvaData[`project${num}_link`] = project.link || project.url || project.github || '';
      }
    });
  }
  
  // Additional fields
  canvaData.interests = formatSkillsList(resumeData.interests || resumeData.hobbies);
  canvaData.volunteer = resumeData.volunteer || resumeData.volunteering || '';
  canvaData.publications = resumeData.publications || '';
  canvaData.references = resumeData.references === true 
    ? 'Available upon request' 
    : resumeData.references || '';
  
  // Clean up undefined values and empty strings
  Object.keys(canvaData).forEach(key => {
    if (canvaData[key] === undefined || canvaData[key] === '') {
      delete canvaData[key];
    }
  });
  
  return canvaData;
}

// Map template category to expected fields
export function getTemplateFields(templateCategory: string): string[] {
  const baseFields = [
    'name', 'email', 'phone', 'location', 'summary'
  ];
  
  const categoryFields: Record<string, string[]> = {
    'Modern Professional': [
      ...baseFields,
      'title', 'linkedin', 'experience1_title', 'experience1_company', 
      'experience1_dates', 'experience1_description', 'education1_degree',
      'education1_school', 'skills', 'certifications'
    ],
    'Minimalist': [
      ...baseFields,
      'experience1_title', 'experience1_company', 'experience1_description',
      'education1_degree', 'education1_school', 'skills'
    ],
    'Creative': [
      ...baseFields,
      'title', 'website', 'portfolio', 'experience1_title', 
      'experience1_description', 'project1_name', 'project1_description',
      'skills', 'tools', 'interests'
    ],
    'Executive': [
      ...baseFields,
      'title', 'linkedin', 'experience1_title', 'experience1_company',
      'experience1_dates', 'experience1_description', 'experience2_title',
      'experience2_company', 'experience2_description', 'education1_degree',
      'achievements', 'awards'
    ],
    'Student': [
      ...baseFields,
      'objective', 'education1_degree', 'education1_school', 'education1_gpa',
      'education1_honors', 'experience1_title', 'project1_name', 
      'skills', 'volunteer', 'interests'
    ],
    'Tech': [
      ...baseFields,
      'title', 'github', 'linkedin', 'experience1_title', 'experience1_company',
      'experience1_description', 'technicalSkills', 'technologies', 'tools',
      'project1_name', 'project1_technologies', 'certifications'
    ]
  };
  
  return categoryFields[templateCategory] || baseFields;
}

// Validate and ensure required fields are present
export function validateCanvaData(
  data: CanvaAutofillData, 
  templateCategory: string
): { valid: boolean; missing: string[] } {
  const requiredFields = getTemplateFields(templateCategory);
  const missing: string[] = [];
  
  // Check for critical fields that should always be present
  const criticalFields = ['name', 'email'];
  
  criticalFields.forEach(field => {
    if (!data[field]) {
      missing.push(field);
    }
  });
  
  return {
    valid: missing.length === 0,
    missing
  };
}

// Generate placeholder data for missing fields
export function fillMissingFields(
  data: CanvaAutofillData,
  templateCategory: string
): CanvaAutofillData {
  const fields = getTemplateFields(templateCategory);
  const filled = { ...data };
  
  // Add placeholders for critical missing fields
  if (!filled.name) {
    filled.name = '[Your Name]';
  }
  
  if (!filled.email) {
    filled.email = 'your.email@example.com';
  }
  
  if (!filled.phone) {
    filled.phone = '(555) 123-4567';
  }
  
  if (!filled.location && !filled.city) {
    filled.location = 'City, State';
  }
  
  return filled;
}

// Export main mapping function that handles everything
export function prepareCanvaAutofillData(
  resumeData: any,
  templateId: string,
  templateCategory?: string
): CanvaAutofillData {
  // Map the resume data
  let canvaData = mapResumeToCanvaData(resumeData);
  
  // Fill missing critical fields if needed
  if (templateCategory) {
    canvaData = fillMissingFields(canvaData, templateCategory);
  }
  
  return canvaData;
}
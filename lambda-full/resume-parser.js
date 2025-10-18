const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Simple text-based resume parser
function parseResumeText(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const result = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    experience: [],
    education: [],
    skills: []
  };

  // Extract email
  const emailMatch = text.match(/[\w\.-]+@[\w\.-]+\.\w+/);
  if (emailMatch) {
    result.personalInfo.email = emailMatch[0];
  }

  // Extract phone
  const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    result.personalInfo.phone = phoneMatch[0];
  }

  // Extract name (first non-empty line that's not email/phone)
  for (const line of lines) {
    if (line.length > 2 && 
        !line.includes('@') && 
        !line.match(/\d{3}/) && 
        !line.toLowerCase().includes('resume') &&
        line.split(' ').length >= 2 &&
        line.split(' ').length <= 4) {
      result.personalInfo.name = line;
      break;
    }
  }

  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) {
    result.personalInfo.linkedin = `https://${linkedinMatch[0]}`;
  }

  // Extract location (look for city, state patterns)
  const locationMatch = text.match(/([A-Z][a-z]+,?\s+[A-Z]{2})|([A-Z][a-z]+\s+[A-Z][a-z]+,?\s+[A-Z]{2})/);
  if (locationMatch) {
    result.personalInfo.location = locationMatch[0];
  }

  // Parse experience section
  const experienceSection = extractSection(text, ['EXPERIENCE', 'WORK EXPERIENCE', 'EMPLOYMENT']);
  if (experienceSection) {
    result.experience = parseExperience(experienceSection);
  }

  // Parse education section
  const educationSection = extractSection(text, ['EDUCATION', 'ACADEMIC BACKGROUND']);
  if (educationSection) {
    result.education = parseEducation(educationSection);
  }

  // Parse skills section
  const skillsSection = extractSection(text, ['SKILLS', 'TECHNICAL SKILLS', 'TECHNOLOGIES']);
  if (skillsSection) {
    result.skills = parseSkills(skillsSection);
  }

  return result;
}

function extractSection(text, sectionHeaders) {
  const lines = text.split('\n');
  let startIndex = -1;
  let endIndex = lines.length;

  // Find section start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().toUpperCase();
    if (sectionHeaders.some(header => line.includes(header))) {
      startIndex = i + 1;
      break;
    }
  }

  if (startIndex === -1) return null;

  // Find section end (next major section)
  const majorSections = ['EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'];
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim().toUpperCase();
    if (majorSections.some(section => line === section)) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex, endIndex).join('\n');
}

function parseExperience(text) {
  const experiences = [];
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let currentExp = null;
  
  for (const line of lines) {
    // Check if this looks like a job title/company line
    if (line.includes('|') && (line.match(/\d{4}/) || line.includes('-'))) {
      if (currentExp) {
        experiences.push(currentExp);
      }
      
      const parts = line.split('|').map(p => p.trim());
      currentExp = {
        title: parts[0] || '',
        company: parts[1] || '',
        duration: parts[2] || '',
        description: ''
      };
    } else if (currentExp && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))) {
      // This is a bullet point
      const bullet = line.replace(/^[•\-*]\s*/, '');
      currentExp.description += (currentExp.description ? '\n' : '') + bullet;
    }
  }
  
  if (currentExp) {
    experiences.push(currentExp);
  }
  
  return experiences;
}

function parseEducation(text) {
  const education = [];
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  for (const line of lines) {
    if (line.includes('|') || line.match(/\d{4}/)) {
      const parts = line.split('|').map(p => p.trim());
      education.push({
        degree: parts[0] || line,
        school: parts[1] || '',
        year: parts[2] || line.match(/\d{4}/)?.[0] || ''
      });
    }
  }
  
  return education;
}

function parseSkills(text) {
  // Split by common delimiters and clean up
  const skills = text
    .replace(/\n/g, ',')
    .split(/[,;|]/)
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0 && skill.length < 30)
    .slice(0, 20); // Limit to 20 skills
  
  return skills;
}

async function parseResumeFile(buffer, filename) {
  try {
    let text = '';
    
    if (filename.toLowerCase().endsWith('.pdf')) {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } else if (filename.toLowerCase().endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (filename.toLowerCase().endsWith('.txt')) {
      text = buffer.toString('utf-8');
    } else {
      throw new Error('Unsupported file format. Please upload PDF, DOCX, or TXT files.');
    }

    if (!text || text.trim().length < 50) {
      throw new Error('Could not extract text from file or file is too short');
    }

    return parseResumeText(text);
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
}

module.exports = { parseResumeFile, parseResumeText };

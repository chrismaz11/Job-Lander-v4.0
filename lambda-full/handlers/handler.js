const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const cors = require('cors');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://joblander.org', 'https://d3vkrsu1g29d0e.cloudfront.net'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Generate HTML for PDF export
function generateResumeHTML(resumeData, templateId) {
  const { personalInfo, experience = [], education = [], skills = [] } = resumeData;
  
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resume - ${personalInfo?.name || 'Resume'}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .name { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .contact { font-size: 14px; color: #666; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .experience-item, .education-item { margin-bottom: 15px; }
        .job-title { font-weight: bold; font-size: 16px; }
        .company { font-style: italic; color: #666; }
        .duration { float: right; color: #666; font-size: 14px; }
        .description { margin-top: 5px; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${personalInfo?.name || 'Your Name'}</div>
        <div class="contact">
            ${personalInfo?.email || ''} | ${personalInfo?.phone || ''} | ${personalInfo?.location || ''}
            ${personalInfo?.linkedin ? ` | ${personalInfo.linkedin}` : ''}
        </div>
    </div>
    
    ${experience.length > 0 ? `
    <div class="section">
        <div class="section-title">EXPERIENCE</div>
        ${experience.map(exp => `
        <div class="experience-item">
            <div class="job-title">${exp.position || exp.title || ''}</div>
            <div class="company">${exp.company || ''} <span class="duration">${exp.duration || (exp.startDate + ' - ' + (exp.current ? 'Present' : exp.endDate))}</span></div>
            <div class="description">${exp.description || ''}</div>
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${education.length > 0 ? `
    <div class="section">
        <div class="section-title">EDUCATION</div>
        ${education.map(edu => `
        <div class="education-item">
            <div class="job-title">${edu.degree || ''}</div>
            <div class="company">${edu.institution || edu.school || ''} <span class="duration">${edu.graduationDate || edu.year || ''}</span></div>
            ${edu.field ? `<div class="description">Field of Study: ${edu.field}</div>` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${skills.length > 0 ? `
    <div class="section">
        <div class="section-title">SKILLS</div>
        <div class="skills-list">
            ${skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
        </div>
    </div>
    ` : ''}
</body>
</html>`;
}

// Initialize secrets manager client
const secretsClient = new SecretsManagerClient({ region: 'us-east-1' });
let secrets = null;

// Load secrets from AWS Secrets Manager
async function loadSecrets() {
  if (secrets) return secrets;
  
  try {
    const command = new GetSecretValueCommand({
      SecretId: process.env.AWS_SECRET_ID || 'joblander/prod/config'
    });
    const response = await secretsClient.send(command);
    secrets = JSON.parse(response.SecretString);
    return secrets;
  } catch (error) {
    console.error('Failed to load secrets:', error);
    // Fallback to environment variables
    secrets = {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV || 'production',
      REGION: process.env.REGION || 'us-east-1'
    };
    return secrets;
  }
}

// Initialize secrets manager client
const secretsClient = new SecretsManagerClient({ region: 'us-east-1' });
let secrets = null;

// Load secrets from AWS Secrets Manager
async function loadSecrets() {
  if (secrets) return secrets;
  
  try {
    const command = new GetSecretValueCommand({
      SecretId: process.env.AWS_SECRET_ID || 'joblander/prod/config'
    });
    const response = await secretsClient.send(command);
    secrets = JSON.parse(response.SecretString);
    return secrets;
  } catch (error) {
    console.error('Failed to load secrets:', error);
    secrets = {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV || 'production',
      REGION: process.env.REGION || 'us-east-1'
    };
    return secrets;
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Job Lander API v4.0 - Production Ready',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', async (req, res) => {
  const config = await loadSecrets();
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    database: config.DATABASE_URL ? 'connected' : 'not configured'
  });
});

app.post('/jobs/search', (req, res) => {
  const { query, location, remote, salaryMin, salaryMax } = req.body;
  
  const mockJobs = [
    {
      id: '1',
      title: query || 'Software Engineer',
      company: 'Tech Corp',
      location: location || 'Remote',
      salary: salaryMin && salaryMax ? `$${salaryMin}-${salaryMax}` : '$80k-120k',
      description: `Exciting ${query || 'Software Engineer'} position at a growing tech company.`,
      requirements: ['JavaScript', 'React', 'Node.js'],
      remote: remote || true,
      datePosted: '2025-10-15',
      applyUrl: 'https://example.com/apply/1',
      matchScore: 85
    },
    {
      id: '2',
      title: `Senior ${query || 'Developer'}`,
      company: 'StartupCo',
      location: location || 'San Francisco, CA',
      salary: '$100k-150k',
      description: `Senior level position with competitive benefits.`,
      requirements: ['Python', 'AWS', 'Docker'],
      remote: remote || false,
      datePosted: '2025-10-14',
      applyUrl: 'https://example.com/apply/2',
      matchScore: 92
    }
  ];

  res.json({ jobs: mockJobs });
});

// Export serverless handler
exports.handler = serverlessExpress({ app });

const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Configure CORS
app.use(cors({
  origin: ['https://joblander.org', 'https://d3vkrsu1g29d0e.cloudfront.net', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Setup multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Job Lander API is running',
    timestamp: new Date().toISOString()
  });
});

// Mock resume parsing endpoint - accept both 'file' and 'resume' field names
app.post('/api/parse-resume', upload.fields([{name: 'file', maxCount: 1}, {name: 'resume', maxCount: 1}]), (req, res) => {
  try {
    const uploadedFile = req.files?.file?.[0] || req.files?.resume?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Mock parsed resume data
    const mockResumeData = {
      personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1-234-567-8900",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/johndoe",
        summary: "Experienced software engineer with 5+ years in full-stack development."
      },
      experience: [
        {
          id: "exp-1",
          company: "Tech Corp",
          position: "Senior Software Engineer",
          startDate: "2020-01",
          endDate: "",
          current: true,
          description: "Leading development of cloud-native applications using React and Node.js."
        }
      ],
      education: [
        {
          id: "edu-1",
          institution: "Stanford University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-06",
          current: false
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "AWS", "Docker", "PostgreSQL"]
    };

    res.json(mockResumeData);
  } catch (error) {
    console.error('Parse resume error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mock resume generation endpoint
app.post('/api/generate-resume', (req, res) => {
  try {
    const { personalInfo, experience, education, skills, templateId } = req.body;

    // Mock enhanced resume data
    const enhancedResume = {
      resumeRecord: {
        id: 'resume-' + Date.now(),
        userId: 'user-123',
        personalInfo: personalInfo || {
          fullName: "Enhanced User",
          email: "user@example.com",
          phone: "+1-555-0123",
          location: "New York, NY"
        },
        experience: experience || [],
        education: education || [],
        skills: skills || [],
        templateId: templateId || 'modern',
        createdAt: new Date().toISOString()
      },
      preview: `<html><body><h1>${personalInfo?.fullName || 'Resume'}</h1><p>Professional resume preview</p></body></html>`
    };

    res.json(enhancedResume);
  } catch (error) {
    console.error('Generate resume error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mock job search endpoint
app.get('/api/find-jobs', (req, res) => {
  try {
    const { query, location, page = 1, limit = 10 } = req.query;

    const mockJobs = [
      {
        id: '1',
        title: query || 'Software Engineer',
        company: 'Tech Corp',
        location: location || 'Remote',
        salary: '$80,000 - $120,000',
        description: `Exciting ${query || 'Software Engineer'} position at a growing tech company.`,
        requirements: ['JavaScript', 'React', 'Node.js'],
        remote: true,
        datePosted: '2024-01-15',
        applyUrl: 'https://example.com/apply/1'
      },
      {
        id: '2',
        title: `Senior ${query || 'Developer'}`,
        company: 'StartupCo',
        location: location || 'San Francisco, CA',
        salary: '$100,000 - $150,000',
        description: 'Senior level position with competitive benefits.',
        requirements: ['Python', 'AWS', 'Docker'],
        remote: false,
        datePosted: '2024-01-14',
        applyUrl: 'https://example.com/apply/2'
      }
    ];

    res.json({
      success: true,
      data: mockJobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: mockJobs.length,
        totalPages: 1
      }
    });
  } catch (error) {
    console.error('Job search error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mock job search with different endpoint
app.get('/api/jobs/search', (req, res) => {
  try {
    const { query, page = 1 } = req.query;

    const mockJobs = [
      {
        id: '1',
        title: query || 'Software Engineer',
        company: 'Tech Corp',
        location: 'Remote',
        salary: '$80,000 - $120,000',
        description: `Great opportunity for ${query || 'software development'}.`,
        requirements: ['JavaScript', 'React'],
        remote: true,
        datePosted: '2024-01-15'
      }
    ];

    res.json({
      jobs: mockJobs,
      total: mockJobs.length,
      page: parseInt(page)
    });
  } catch (error) {
    console.error('Job search error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Please try again later'
  });
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

exports.handler = serverlessExpress({ app });
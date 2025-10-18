const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

// CORS configuration for credentials
const corsOptions = {
  origin: ['https://joblander.org', 'https://www.joblander.org', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Parse resume endpoint
app.post('/api/parse-resume', upload.single('resume'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Mock response for now
    res.json({
      success: true,
      data: {
        personalInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '(555) 123-4567'
        },
        experience: [
          {
            title: 'Software Engineer',
            company: 'Tech Corp',
            duration: '2020-2023',
            description: 'Developed web applications'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science',
            school: 'University',
            year: '2020'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js']
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse resume' });
  }
});

// Generate resume endpoint
app.post('/api/generate-resume', (req, res) => {
  res.json({
    success: true,
    message: 'Resume generated successfully',
    resumeId: 'resume_' + Date.now()
  });
});

// Get resumes endpoint
app.get('/api/resumes', (req, res) => {
  res.json({
    success: true,
    resumes: []
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Job Lander API v4.0' });
});

// Lambda handler
exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  const { httpMethod, path, headers, body, queryStringParameters } = event;
  
  // Handle preflight OPTIONS requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://joblander.org',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: ''
    };
  }

  // Route handling
  try {
    let response;
    
    if (path === '/api/health' && httpMethod === 'GET') {
      response = { status: 'ok', timestamp: new Date().toISOString() };
    } else if (path === '/api/parse-resume' && httpMethod === 'POST') {
      response = {
        success: true,
        data: {
          personalInfo: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '(555) 123-4567'
          },
          experience: [
            {
              title: 'Software Engineer',
              company: 'Tech Corp',
              duration: '2020-2023',
              description: 'Developed web applications'
            }
          ],
          education: [
            {
              degree: 'Bachelor of Science',
              school: 'University',
              year: '2020'
            }
          ],
          skills: ['JavaScript', 'React', 'Node.js']
        }
      };
    } else if (path === '/api/generate-resume' && httpMethod === 'POST') {
      response = {
        success: true,
        message: 'Resume generated successfully',
        resumeId: 'resume_' + Date.now()
      };
    } else if (path === '/api/resumes' && httpMethod === 'GET') {
      response = {
        success: true,
        resumes: []
      };
    } else if (path === '/') {
      response = { message: 'Job Lander API v4.0 is working!' };
    } else {
      response = { error: 'Not found' };
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://joblander.org',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(response)
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://joblander.org',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://joblander.org',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

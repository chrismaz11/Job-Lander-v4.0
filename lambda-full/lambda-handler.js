const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

// Import your routes
const { setupRoutes } = require('./routes');

// Create Express app
const app = express();

// Configure CORS
app.use(cors({
  origin: ['https://joblander.org', 'https://d2eqoatnb0fcvs.amplifyapp.com'],
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Setup multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Job Lander API is running' });
});

// Setup all routes
try {
  setupRoutes(app, upload);
} catch (error) {
  console.error('Error setting up routes:', error);
  
  // Fallback routes if main routes fail
  app.post('/api/parse-resume', upload.single('file'), (req, res) => {
    res.json({ 
      success: false, 
      error: 'Resume parsing service is initializing. Please try again in a moment.',
      message: 'Service starting up...'
    });
  });
}

// Error handling
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Please try again later'
  });
});

// Export serverless handler
exports.handler = serverlessExpress({ app });

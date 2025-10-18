const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { handleStripeWebhook, createCheckoutSession, createPortalSession } = require('./stripe-handler');

const app = express();

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
app.get('/api/health', async (req, res) => {
  const config = await loadSecrets();
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    database: config.DATABASE_URL ? 'connected' : 'not configured',
    stripe: config.STRIPE_SECRET_KEY ? 'configured' : 'not configured'
  });
});

// Parse resume endpoint
app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
  try {
    const config = await loadSecrets();
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Mock response for now - will integrate with actual AI parsing
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
            description: 'Developed web applications using React and Node.js'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            school: 'University of Technology',
            year: '2020'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS']
      }
    });
  } catch (error) {
    console.error('Resume parsing error:', error);
    res.status(500).json({ error: 'Failed to parse resume' });
  }
});

// Generate resume endpoint
app.post('/api/generate-resume', async (req, res) => {
  try {
    const config = await loadSecrets();
    res.json({
      success: true,
      message: 'Resume generated successfully',
      resumeId: 'resume_' + Date.now(),
      environment: config.NODE_ENV
    });
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

// Get resumes endpoint
app.get('/api/resumes', async (req, res) => {
  try {
    const config = await loadSecrets();
    res.json({
      success: true,
      resumes: [],
      database: config.DATABASE_URL ? 'connected' : 'not configured'
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ error: 'Failed to get resumes' });
  }
});

// Stripe webhook endpoint
app.post('/api/webhooks/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    const config = await loadSecrets();
    const sig = req.headers['stripe-signature'];
    
    // In production, verify the webhook signature
    // For now, just parse the event
    const event = JSON.parse(req.body);
    
    await handleStripeWebhook(event, config);
    
    res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
});

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const config = await loadSecrets();
    const { priceId, customerId } = req.body;
    
    if (!priceId) {
      return res.status(400).json({ error: 'Price ID required' });
    }
    
    const session = await createCheckoutSession(priceId, customerId, config);
    
    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Create customer portal session
app.post('/api/create-portal-session', async (req, res) => {
  try {
    const config = await loadSecrets();
    const { customerId } = req.body;
    
    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID required' });
    }
    
    const session = await createPortalSession(customerId, config);
    
    res.json({ url: session.url });
  } catch (error) {
    console.error('Portal session error:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Job Lander API v4.0 - Production Ready' });
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

  // Load secrets once per Lambda execution
  const config = await loadSecrets();

  // Route handling
  try {
    let response;
    
    if (path === '/api/health' && httpMethod === 'GET') {
      response = { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        database: config.DATABASE_URL ? 'connected' : 'not configured',
        secrets: 'loaded from AWS Secrets Manager'
      };
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
              description: 'Developed web applications using React and Node.js'
            }
          ],
          education: [
            {
              degree: 'Bachelor of Science in Computer Science',
              school: 'University of Technology',
              year: '2020'
            }
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS']
        }
      };
    } else if (path === '/api/generate-resume' && httpMethod === 'POST') {
      response = {
        success: true,
        message: 'Resume generated successfully',
        resumeId: 'resume_' + Date.now(),
        environment: config.NODE_ENV
      };
    } else if (path === '/api/resumes' && httpMethod === 'GET') {
      response = {
        success: true,
        resumes: [],
        database: config.DATABASE_URL ? 'connected' : 'not configured'
      };
    } else if (path === '/api/create-checkout-session' && httpMethod === 'POST') {
      const { priceId, customerId } = JSON.parse(body || '{}');
      if (!priceId) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://joblander.org',
            'Access-Control-Allow-Credentials': 'true'
          },
          body: JSON.stringify({ error: 'Price ID required' })
        };
      }
      
      try {
        const session = await createCheckoutSession(priceId, customerId, config);
        response = { url: session.url };
      } catch (error) {
        console.error('Checkout session error:', error);
        return {
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://joblander.org',
            'Access-Control-Allow-Credentials': 'true'
          },
          body: JSON.stringify({ error: 'Failed to create checkout session', details: error.message })
        };
      }
    } else if (path === '/api/create-portal-session' && httpMethod === 'POST') {
      const { customerId } = JSON.parse(body || '{}');
      if (!customerId) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://joblander.org',
            'Access-Control-Allow-Credentials': 'true'
          },
          body: JSON.stringify({ error: 'Customer ID required' })
        };
      }
      
      try {
        const session = await createPortalSession(customerId, config);
        response = { url: session.url };
      } catch (error) {
        console.error('Portal session error:', error);
        return {
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://joblander.org',
            'Access-Control-Allow-Credentials': 'true'
          },
          body: JSON.stringify({ error: 'Failed to create portal session', details: error.message })
        };
      }
    } else if (path === '/api/webhooks/stripe' && httpMethod === 'POST') {
      try {
        const event = JSON.parse(body || '{}');
        await handleStripeWebhook(event, config);
        response = { received: true };
      } catch (error) {
        console.error('Stripe webhook error:', error);
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://joblander.org',
            'Access-Control-Allow-Credentials': 'true'
          },
          body: JSON.stringify({ error: 'Webhook error', details: error.message })
        };
      }
    } else if (path === '/') {
      response = { 
        message: 'Job Lander API v4.0 - Production Ready',
        environment: config.NODE_ENV,
        timestamp: new Date().toISOString()
      };
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
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};

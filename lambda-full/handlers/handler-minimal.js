// Minimal Lambda handler without external dependencies
exports.handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  const { httpMethod, path, headers, body, queryStringParameters } = event;
  
  // CORS headers
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://joblander.org',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Handle preflight OPTIONS requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    let response;
    
    if (path === '/api/health' && httpMethod === 'GET') {
      response = { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: 'production',
        message: 'Lambda function is working!'
      };
    } else if (path === '/jobs/search' && httpMethod === 'POST') {
      const requestBody = body ? JSON.parse(body) : {};
      const { query, location, remote } = requestBody;
      
      const mockJobs = [
        {
          id: '1',
          title: query || 'Software Engineer',
          company: 'Tech Corp',
          location: location || 'Remote',
          salary: '$80k-120k',
          description: `Exciting ${query || 'Software Engineer'} position at a growing tech company.`,
          requirements: ['JavaScript', 'React', 'Node.js'],
          remote: remote !== false,
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
          remote: remote === true,
          datePosted: '2025-10-14',
          applyUrl: 'https://example.com/apply/2',
          matchScore: 92
        }
      ];

      response = { jobs: mockJobs };
    } else if (path === '/' && httpMethod === 'GET') {
      response = { 
        message: 'Job Lander API v4.0 - Serverless Express Working!',
        timestamp: new Date().toISOString(),
        endpoints: [
          'GET /api/health',
          'POST /jobs/search'
        ]
      };
    } else {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Not found', path: path, method: httpMethod })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message,
        path: path,
        method: httpMethod
      })
    };
  }
};

# Job-Lander v4.0 - AI Resume Builder

A modern, AI-powered resume builder with job search integration and blockchain verification.

## Features

- **AI-Powered Resume Enhancement**: Intelligent text optimization and formatting
- **Real-time Job Search**: Integration with job APIs for live opportunities
- **PDF Export**: Professional resume generation with blockchain verification
- **Accessibility Compliant**: WCAG 2.1 AA compliant forms and navigation
- **Secure Authentication**: AWS Cognito integration
- **Cloud Infrastructure**: Serverless architecture on AWS

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: AWS Lambda + API Gateway
- **Database**: PostgreSQL on AWS RDS
- **Storage**: AWS S3 + CloudFront CDN
- **Authentication**: AWS Cognito
- **AI Services**: AWS Bedrock

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure your AWS credentials and API keys
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

The application is deployed using AWS services:

- **Frontend**: S3 + CloudFront
- **API**: Lambda functions via API Gateway
- **Database**: RDS PostgreSQL with Multi-AZ

## Project Structure

```
├── src/                 # Frontend React application
├── lambda-full/         # Backend Lambda functions
├── templates/           # Resume templates
├── shared/              # Shared utilities and types
├── tests/               # Test suites
├── docs/                # Documentation
└── infrastructure/      # AWS CDK infrastructure code
```

## Production URLs

- **Frontend**: https://joblander.org
- **API**: https://7pgfihe60m.execute-api.us-east-1.amazonaws.com/Prod
- **CloudFront**: https://d3vkrsu1g29d0e.cloudfront.net

## License

MIT License - see LICENSE file for details.

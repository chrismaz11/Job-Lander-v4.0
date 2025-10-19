# Deployment Guide

## Production Deployment

### Prerequisites
- AWS CLI configured with appropriate permissions
- Node.js 18+ installed
- npm or yarn package manager

### Frontend Deployment (S3 + CloudFront)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to S3**
   ```bash
   aws s3 sync dist/public s3://joblander-v4-production --delete
   ```

3. **Invalidate CloudFront cache**
   ```bash
   aws cloudfront create-invalidation --distribution-id E2JTNKZQEEGBZ5 --paths "/*"
   ```

### Backend Deployment (Lambda)

1. **Package Lambda function**
   ```bash
   cd lambda-full
   npm install --production
   zip -r ../lambda-full.zip .
   ```

2. **Update Lambda function**
   ```bash
   aws lambda update-function-code \
     --function-name joblander-api \
     --zip-file fileb://lambda-full.zip
   ```

### Database Setup

1. **RDS PostgreSQL instance**: `database-1.cufu8ooom2yl.us-east-1.rds.amazonaws.com`
2. **Credentials stored in AWS Secrets Manager**: `joblander/prod/config`

### Environment Variables

Required environment variables in AWS Secrets Manager:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing secret
- `STRIPE_SECRET_KEY`: Stripe API key
- `OPENAI_API_KEY`: OpenAI API key
- `JSEARCH_API_KEY`: JSearch API key

## Development Setup

1. **Clone repository**
2. **Install dependencies**: `npm install`
3. **Copy environment file**: `cp .env.example .env`
4. **Configure environment variables**
5. **Start development server**: `npm run dev`

## Testing

- **Unit tests**: `npm run test`
- **E2E tests**: `npm run test:e2e`
- **Build verification**: `npm run build`

## Monitoring

- **CloudWatch logs** for Lambda functions
- **CloudFront metrics** for CDN performance
- **RDS monitoring** for database performance

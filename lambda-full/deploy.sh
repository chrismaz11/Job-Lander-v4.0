#!/bin/bash

echo "🚀 Deploying Lambda function..."

# Install dependencies
npm install

# Create deployment package
zip -r lambda-deployment.zip . -x "*.git*" "node_modules/.cache/*" "*.DS_Store*"

# Deploy to AWS Lambda
aws lambda update-function-code \
  --function-name joblander-api-handler \
  --zip-file fileb://lambda-deployment.zip \
  --region us-east-1

echo "✅ Lambda function deployed successfully!"
echo "🔄 Waiting for function to update..."
sleep 5

# Test the deployment
echo "🧪 Testing deployment..."
curl -s https://7pgfihe60m.execute-api.us-east-1.amazonaws.com/Prod/api/health | jq .

echo "🎉 Deployment complete!"

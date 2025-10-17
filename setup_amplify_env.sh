#!/bin/bash

# Setup Amplify Environment Variables
# Run this script to configure your Amplify app with the necessary environment variables

APP_ID="your-amplify-app-id"  # Replace with your actual Amplify App ID

echo "Setting up Amplify environment variables..."

# Database Configuration
aws amplify put-app --app-id $APP_ID --environment-variables \
  DATABASE_URL="postgresql://postgres:your_password@your-db-host.region.rds.amazonaws.com:5432/your_db"

# Stripe Configuration  
aws amplify put-app --app-id $APP_ID --environment-variables \
  STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key" \
  STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_publishable_key" \
  STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# AI Service Configuration
aws amplify put-app --app-id $APP_ID --environment-variables \
  GEMINI_API_KEY="your_gemini_api_key" \
  BEDROCK_REGION="us-east-1"

# Blockchain Configuration
aws amplify put-app --app-id $APP_ID --environment-variables \
  WEB3_RPC_URL="your_polygon_rpc_url" \
  PRIVATE_KEY="your_wallet_private_key"

# External APIs
aws amplify put-app --app-id $APP_ID --environment-variables \
  JSEARCH_API_KEY="your_jsearch_api_key"

# Security
aws amplify put-app --app-id $APP_ID --environment-variables \
  SESSION_SECRET="your_64_char_session_secret" \
  JWT_SECRET="your_64_char_jwt_secret"

echo "Environment variables configured. Redeploy your Amplify app to apply changes."

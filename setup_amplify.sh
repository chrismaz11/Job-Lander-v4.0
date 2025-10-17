#!/bin/bash
set -e

echo "🚀 Starting Amplify setup for JobLander..."

# -------- CONFIGURATION --------
APP_NAME="joblander"
REPO_URL="https://github.com/chrismaz11/Job-Lander-v4.0"
--access-token "<YOUR_HITHUB_TOKEN>"
REGION="us-east-1"
BRANCH="main"
# --------------------------------

# Step 1. Check AWS CLI login
echo "🔑 Checking AWS credentials..."
aws sts get-caller-identity --region $REGION >/dev/null || {
  echo "❌ AWS credentials not found. Run 'aws configure' first."
  exit 1
}

# Step 2. Check for existing Amplify app
APP_ID=$(aws amplify list-apps --region $REGION \
  --query "apps[?name=='$APP_NAME'].appId" --output text)

if [ "$APP_ID" != "None" ] && [ -n "$APP_ID" ]; then
  echo "🟢 Amplify app '$APP_NAME' already exists (AppId: $APP_ID)"
else
  echo "⚙️ Creating new Amplify app..."
  APP_ID=$(aws amplify create-app \
    --name "$APP_NAME" \
    --repository "$REPO_URL" \
    --access-token "$GITHUB_TOKEN" \
    --region "$REGION" \
    --query "app.appId" --output text)

  echo "✅ Amplify app created (AppId: $APP_ID)"
fi

# Step 3. Connect branch
BRANCH_CHECK=$(aws amplify list-branches --app-id "$APP_ID" --region "$REGION" \
  --query "branches[?branchName=='$BRANCH'].branchName" --output text)

if [ "$BRANCH_CHECK" == "$BRANCH" ]; then
  echo "🟢 Branch '$BRANCH' already connected."
else
  echo "🔗 Connecting branch '$BRANCH'..."
  aws amplify create-branch \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH" \
    --enable-auto-build \
    --region "$REGION"
fi

# Step 4. Kick off the build
echo "🚧 Starting build for '$BRANCH'..."
aws amplify start-job \
  --app-id "$APP_ID" \
  --branch-name "$BRANCH" \
  --job-type RELEASE \
  --region "$REGION" >/dev/null

echo "⏳ Build started. You can monitor progress in the Amplify Console:"
echo "👉 https://us-east-1.console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/$BRANCH"

# Step 5. Fetch the live URL
LIVE_URL=$(aws amplify get-app --app-id "$APP_ID" --region "$REGION" \
  --query "app.defaultDomain" --output text)

echo "🌐 Your Amplify app will be available soon at:"
echo "🔹 https://main.$LIVE_URL"
echo "✅ Done!"

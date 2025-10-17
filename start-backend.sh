#!/bin/bash

# Start Job-Lander Backend Server
echo "🚀 Starting Job-Lander Backend Server..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ Please edit .env file with your API keys before running again."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the backend server
echo "🔧 Starting backend server on http://localhost:3000..."
npm run dev:backend

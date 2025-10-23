#!/bin/bash

cd "$(dirname "$0")"
cd frontend

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting Next.js development server..."
npm run dev
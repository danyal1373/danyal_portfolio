#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting deployment..."

# Install dependencies with legacy peer deps
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "🔨 Building project..."
npm run build

# Generate sitemap
echo "🗺️ Generating sitemap..."
npm run generate-sitemap

echo "✅ Deployment build completed successfully!"
echo "📁 Build folder is ready at: ./build" 
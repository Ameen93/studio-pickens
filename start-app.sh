#!/bin/bash

# Studio Pickens Application Startup Script
# This script starts MongoDB and runs the Payload CMS admin panel

echo "🎬 Starting Studio Pickens Application..."
echo "========================================"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ Error: MongoDB is not installed or not in PATH"
    echo "Please install MongoDB first: https://docs.mongodb.com/manual/installation/"
    exit 1
fi

# Start MongoDB service
echo "🗄️  Starting MongoDB service..."
sudo systemctl start mongod

# Check if MongoDB started successfully
if sudo systemctl is-active --quiet mongod; then
    echo "✅ MongoDB started successfully"
else
    echo "❌ Failed to start MongoDB"
    echo "Please check MongoDB installation and try again"
    exit 1
fi

# Wait a moment for MongoDB to fully initialize
echo "⏳ Waiting for MongoDB to initialize..."
sleep 2

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project directory"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Kill any existing processes on the ports we need
echo "🧹 Cleaning up existing processes..."
pkill -f "node server.js" 2>/dev/null || true
pkill -f "react-scripts start" 2>/dev/null || true
sleep 1

# Start both servers in the background
echo "🚀 Starting Express API server..."
echo "API server will be available at: http://localhost:3001"
node server.js &
API_PID=$!

echo "🚀 Starting React development server..."
echo "React app will be available at: http://localhost:3000"
echo "Admin panel will be available at: http://localhost:3000/admin"
echo "Press Ctrl+C to stop both servers"
echo "========================================"

BROWSER=none PORT=3000 npm start &
REACT_PID=$!

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $API_PID $REACT_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait

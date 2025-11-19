#!/bin/bash

# Simple script to start a local web server for the portfolio site

echo "🌍 Starting Portfolio & Travel Guide website..."
echo "================================================"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null
then
    echo "✅ Using Python 3 to start server"
    echo "🌐 Server running at: http://localhost:8000"
    echo "📝 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null
then
    echo "✅ Using Python 2 to start server"
    echo "🌐 Server running at: http://localhost:8000"
    echo "📝 Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
# Check if npx is available
elif command -v npx &> /dev/null
then
    echo "✅ Using Node.js http-server"
    echo "🌐 Server will open in your browser automatically"
    echo "📝 Press Ctrl+C to stop the server"
    echo ""
    npx http-server -p 8000 -o
else
    echo "❌ No suitable web server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3 (recommended)"
    echo "  - Python 2"
    echo "  - Node.js (with npx)"
    echo ""
    echo "Or simply open index.html directly in your browser."
    exit 1
fi


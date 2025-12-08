#!/bin/bash

# Start script for Square Cuadrado Admin Panel
# This starts the admin server with full editing capabilities

echo "Starting Square Cuadrado Admin Panel..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Start the admin server
node admin-server.js &
SERVER_PID=$!

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║     Square Cuadrado Admin Panel Started!          ║"
echo "╠════════════════════════════════════════════════════╣"
echo "║                                                    ║"
echo "║  Dashboard: http://localhost:8889/admin/dashboard ║"
echo "║  Editor:    http://localhost:8889/admin/editor    ║"
echo "║                                                    ║"
echo "║  You can now edit all recommendations directly!   ║"
echo "║  Changes are saved to your JSON files.            ║"
echo "║                                                    ║"
echo "║  Press Ctrl+C to stop the server                  ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Wait for the server process
wait $SERVER_PID

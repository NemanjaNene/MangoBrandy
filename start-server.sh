#!/bin/bash
# Mango Spirit - Local Development Server

echo "🥭 Starting Mango Spirit..."
echo "📂 Project: $(pwd)"
echo "🌐 Opening: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Open Chrome in background
sleep 1 && open -a "Google Chrome" http://localhost:8000 &

# Start Python server
python3 -m http.server 8000

# When stopped
echo ""
echo "🛑 Server stopped"


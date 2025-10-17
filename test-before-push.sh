#!/bin/bash

# Test Before Push Script
# This script helps you test changes locally before pushing to production

echo "🧪 Testing changes before pushing..."
echo "=================================="

# Check if the development server is running
if ! pgrep -f "next dev" > /dev/null; then
    echo "⚠️  Development server not running. Starting it now..."
    echo "📝 Please run: npm run dev"
    echo "🌐 Then visit: http://localhost:3000"
    echo ""
    echo "After testing, come back and run this script again."
    exit 1
fi

echo "✅ Development server is running"
echo "🌐 Test your changes at: http://localhost:3000"
echo ""
echo "📋 Checklist before pushing:"
echo "  □ Tested on desktop browser"
echo "  □ Tested on mobile view"
echo "  □ Checked all affected pages"
echo "  □ Verified no console errors"
echo "  □ Confirmed styling looks correct"
echo ""
echo "When you're ready to push, run:"
echo "  git add ."
echo "  git commit -m 'Your commit message'"
echo "  git push origin main"
echo ""
echo "Or if you want me to help with the commit message, just let me know!"


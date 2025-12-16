#!/bin/bash

# Script to package Piri extension for Chrome Web Store submission

echo "📦 Packaging Piri Extension for Chrome Web Store..."

# Remove old package if it exists
if [ -f "piri-extension.zip" ]; then
    rm piri-extension.zip
    echo "Removed old package"
fi

# Create ZIP file excluding unnecessary files
zip -r piri-extension.zip \
  manifest.json \
  background/ \
  content/ \
  popup/ \
  icons/icon16.png \
  icons/icon48.png \
  icons/icon128.png \
  -x "*.DS_Store" \
  -x "icons/convert-svg-to-png.html" \
  -x "icons/*.svg" \
  -x "*.git*" \
  -x "*.md" \
  -x "package-extension.sh" \
  -x "CHROME_WEB_STORE_GUIDE.md"

# Get file size
SIZE=$(du -h piri-extension.zip | cut -f1)
echo "✅ Package created: piri-extension.zip ($SIZE)"

# Check if package is under 100MB
SIZE_BYTES=$(stat -f%z piri-extension.zip 2>/dev/null || stat -c%s piri-extension.zip 2>/dev/null)
MAX_SIZE=$((100 * 1024 * 1024)) # 100MB in bytes

if [ $SIZE_BYTES -gt $MAX_SIZE ]; then
    echo "⚠️  WARNING: Package size exceeds 100MB limit"
else
    echo "✅ Package size is within limits"
fi

echo ""
echo "📋 Next steps:"
echo "1. Test the extension by loading piri-extension.zip as an unpacked extension"
echo "2. Read CHROME_WEB_STORE_GUIDE.md for submission instructions"
echo "3. Prepare screenshots and store listing content"
echo "4. Upload to Chrome Web Store Developer Console"

#!/bin/bash

# App Icon Setup Script
# This script converts FITSAPIO.svg to app icons for both iOS and Android
# Prerequisites: ImageMagick (convert command) or similar tool

set -e

echo "🎨 Setting up app icons from FITSAPIO.svg..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if FITSAPIO.svg exists
if [ ! -f "assets/FITSAPIO.svg" ]; then
    echo -e "${RED}❌ Error: assets/FITSAPIO.svg not found${NC}"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${YELLOW}⚠️  ImageMagick not found. Please install it:${NC}"
    echo "   macOS: brew install imagemagick"
    echo "   Or use an online SVG to PNG converter:"
    echo "   https://convertio.co/svg-png/"
    exit 1
fi

echo -e "${BLUE}📱 iOS Icons${NC}"

# Create temporary directory for iOS icons
mkdir -p ios_icons_temp

# iOS icon sizes (width x height @ scale)
# 20x20@2x, 20x20@3x, 29x29@2x, 29x29@3x, 40x40@2x, 40x40@3x, 60x60@2x, 60x60@3x, 1024x1024@1x

convert assets/FITSAPIO.svg -resize 40x40 ios_icons_temp/icon-20-2x.png
convert assets/FITSAPIO.svg -resize 60x60 ios_icons_temp/icon-20-3x.png
convert assets/FITSAPIO.svg -resize 58x58 ios_icons_temp/icon-29-2x.png
convert assets/FITSAPIO.svg -resize 87x87 ios_icons_temp/icon-29-3x.png
convert assets/FITSAPIO.svg -resize 80x80 ios_icons_temp/icon-40-2x.png
convert assets/FITSAPIO.svg -resize 120x120 ios_icons_temp/icon-40-3x.png
convert assets/FITSAPIO.svg -resize 120x120 ios_icons_temp/icon-60-2x.png
convert assets/FITSAPIO.svg -resize 180x180 ios_icons_temp/icon-60-3x.png
convert assets/FITSAPIO.svg -resize 1024x1024 ios_icons_temp/icon-1024.png

# Copy to iOS AppIcon.appiconset
iOS_ICON_PATH="ios/HealthApp/Images.xcassets/AppIcon.appiconset"

cp ios_icons_temp/icon-20-2x.png "$iOS_ICON_PATH/Icon-20@2x.png"
cp ios_icons_temp/icon-20-3x.png "$iOS_ICON_PATH/Icon-20@3x.png"
cp ios_icons_temp/icon-29-2x.png "$iOS_ICON_PATH/Icon-29@2x.png"
cp ios_icons_temp/icon-29-3x.png "$iOS_ICON_PATH/Icon-29@3x.png"
cp ios_icons_temp/icon-40-2x.png "$iOS_ICON_PATH/Icon-40@2x.png"
cp ios_icons_temp/icon-40-3x.png "$iOS_ICON_PATH/Icon-40@3x.png"
cp ios_icons_temp/icon-60-2x.png "$iOS_ICON_PATH/Icon-60@2x.png"
cp ios_icons_temp/icon-60-3x.png "$iOS_ICON_PATH/Icon-60@3x.png"
cp ios_icons_temp/icon-1024.png "$iOS_ICON_PATH/Icon-1024@1x.png"

echo -e "${GREEN}✅ iOS icons created${NC}"

echo -e "${BLUE}🤖 Android Icons${NC}"

# Create Android mipmap directories if they don't exist
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

# Android icon sizes (mdpi is baseline 48x48)
convert assets/FITSAPIO.svg -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher.png
convert assets/FITSAPIO.svg -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher.png
convert assets/FITSAPIO.svg -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
convert assets/FITSAPIO.svg -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
convert assets/FITSAPIO.svg -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

# Also create ic_launcher_round for Android 7.1+
convert assets/FITSAPIO.svg -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png
convert assets/FITSAPIO.svg -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png
convert assets/FITSAPIO.svg -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png
convert assets/FITSAPIO.svg -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png
convert assets/FITSAPIO.svg -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png

echo -e "${GREEN}✅ Android icons created${NC}"

# Cleanup
rm -rf ios_icons_temp

echo ""
echo -e "${GREEN}✨ App icons setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Run: cd ios && pod install && cd .."
echo "2. Rebuild iOS: npx react-native run-ios"
echo "3. Rebuild Android: npx react-native run-android"
echo ""
echo "If you're using Xcode:"
echo "1. Open ios/HealthApp.xcworkspace in Xcode"
echo "2. Select 'HealthApp' in project navigator"
echo "3. Select 'HealthApp' target"
echo "4. Go to 'Build Settings' and verify App Icon Set Name is 'AppIcon'"

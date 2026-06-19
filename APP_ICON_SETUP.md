# App Icon Setup Guide

Your `FITSAPIO.png` has been configured as the app icon. Follow these steps to apply it:

## Prerequisites

You need **ImageMagick** installed to resize the PNG into platform-specific icons:

```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Or use an online converter if you can't install it locally
```

## Option 1: Automatic Setup (Recommended)

Run the provided setup script:

```bash
# Make script executable
chmod +x setup-app-icon.sh

# Run the icon setup
./setup-app-icon.sh
```

This will:
- Resize `FITSAPIO.png` to all required iOS sizes
- Resize `FITSAPIO.png` to all required Android sizes
- Place icons in the correct directories

## Option 2: Manual Setup

If you can't run the script, use an online PNG resizer or editor:

1. Open `assets/FITSAPIO.png` in your tool of choice
2. Export/rescale to the required sizes listed below

### iOS Sizes (replace in `ios/HealthApp/Images.xcassets/AppIcon.appiconset/`)
- 40×40 → Icon-20@2x.png
- 60×60 → Icon-20@3x.png
- 58×58 → Icon-29@2x.png
- 87×87 → Icon-29@3x.png
- 80×80 → Icon-40@2x.png
- 120×120 → Icon-40@3x.png
- 120×120 → Icon-60@2x.png
- 180×180 → Icon-60@3x.png
- 1024×1024 → Icon-1024@1x.png

### Android Sizes
Create PNG files in respective `android/app/src/main/res/mipmap-*` folders:
- **mdpi** (48×48): ic_launcher.png, ic_launcher_round.png
- **hdpi** (72×72): ic_launcher.png, ic_launcher_round.png
- **xhdpi** (96×96): ic_launcher.png, ic_launcher_round.png
- **xxhdpi** (144×144): ic_launcher.png, ic_launcher_round.png
- **xxxhdpi** (192×192): ic_launcher.png, ic_launcher_round.png

## After Setup

### Rebuild iOS
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

### Rebuild Android
```bash
npx react-native run-android
```

### Verify in Xcode (iOS)
1. Open `ios/HealthApp.xcworkspace` in Xcode
2. Select **HealthApp** project → **HealthApp** target
3. Go to **Build Settings**
4. Search for "App Icon"
5. Ensure "App Icon Set Name" is set to **AppIcon**

## Troubleshooting

- **Icons not showing**: Clean build folders
  - iOS: `rm -rf ios/build && rm -rf ~/Library/Developer/Xcode/DerivedData/*`
  - Android: `./gradlew clean`
  
- **PNG resize issues**: Use an online converter or image editor and manually place the correctly sized files

- **Wrong icon showing**: Clear app cache on device and reinstall

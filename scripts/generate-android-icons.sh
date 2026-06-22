#!/usr/bin/env bash
set -e
ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
ASSET="$ROOT_DIR/assets/FITSAPIO.png"
if [ ! -f "$ASSET" ]; then
  echo "FITSAPIO.png not found in assets folder: $ASSET"
  exit 1
fi

echo "Generating Android launcher icons from $ASSET"

# target sizes (px)
MDPI=48
HDPI=72
XHDPI=96
XXHDPI=144
XXXHDPI=192

# output directories
OUT_MDPI="$ROOT_DIR/android/app/src/main/res/mipmap-mdpi"
OUT_HDPI="$ROOT_DIR/android/app/src/main/res/mipmap-hdpi"
OUT_XHDPI="$ROOT_DIR/android/app/src/main/res/mipmap-xhdpi"
OUT_XXHDPI="$ROOT_DIR/android/app/src/main/res/mipmap-xxhdpi"
OUT_XXXHDPI="$ROOT_DIR/android/app/src/main/res/mipmap-xxxhdpi"

mkdir -p "$OUT_MDPI" "$OUT_HDPI" "$OUT_XHDPI" "$OUT_XXHDPI" "$OUT_XXXHDPI"

# sips is macOS-specific. If not available, try ImageMagick's convert.
if command -v sips >/dev/null 2>&1; then
  sips -Z $MDPI  "$ASSET" --out "$OUT_MDPI/ic_launcher.png"
  sips -Z $HDPI  "$ASSET" --out "$OUT_HDPI/ic_launcher.png"
  sips -Z $XHDPI "$ASSET" --out "$OUT_XHDPI/ic_launcher.png"
  sips -Z $XXHDPI "$ASSET" --out "$OUT_XXHDPI/ic_launcher.png"
  sips -Z $XXXHDPI "$ASSET" --out "$OUT_XXXHDPI/ic_launcher.png"

  # round icons
  sips -Z $MDPI  "$ASSET" --out "$OUT_MDPI/ic_launcher_round.png"
  sips -Z $HDPI  "$ASSET" --out "$OUT_HDPI/ic_launcher_round.png"
  sips -Z $XHDPI "$ASSET" --out "$OUT_XHDPI/ic_launcher_round.png"
  sips -Z $XXHDPI "$ASSET" --out "$OUT_XXHDPI/ic_launcher_round.png"
  sips -Z $XXXHDPI "$ASSET" --out "$OUT_XXXHDPI/ic_launcher_round.png"

elif command -v convert >/dev/null 2>&1; then
  convert "$ASSET" -resize ${MDPI}x${MDPI} "$OUT_MDPI/ic_launcher.png"
  convert "$ASSET" -resize ${HDPI}x${HDPI} "$OUT_HDPI/ic_launcher.png"
  convert "$ASSET" -resize ${XHDPI}x${XHDPI} "$OUT_XHDPI/ic_launcher.png"
  convert "$ASSET" -resize ${XXHDPI}x${XXHDPI} "$OUT_XXHDPI/ic_launcher.png"
  convert "$ASSET" -resize ${XXXHDPI}x${XXXHDPI} "$OUT_XXXHDPI/ic_launcher.png"

  convert "$ASSET" -resize ${MDPI}x${MDPI} "$OUT_MDPI/ic_launcher_round.png"
  convert "$ASSET" -resize ${HDPI}x${HDPI} "$OUT_HDPI/ic_launcher_round.png"
  convert "$ASSET" -resize ${XHDPI}x${XHDPI} "$OUT_XHDPI/ic_launcher_round.png"
  convert "$ASSET" -resize ${XXHDPI}x${XXHDPI} "$OUT_XXHDPI/ic_launcher_round.png"
  convert "$ASSET" -resize ${XXXHDPI}x${XXXHDPI} "$OUT_XXXHDPI/ic_launcher_round.png"
else
  echo "Neither sips nor ImageMagick 'convert' found. Please install ImageMagick or run the resizing manually."
  exit 1
fi

echo "Icons created in android/app/src/main/res/mipmap-*/"
exit 0

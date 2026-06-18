import { Platform } from "react-native";

const EXTENSION_TO_MIME = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  heic: "image/heic",
  heics: "image/heic-sequence",
  heif: "image/heif",
  heifs: "image/heif-sequence",
  webp: "image/webp",
};

const MIME_TO_EXTENSION = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/heic": "heic",
  "image/heic-sequence": "heic",
  "image/heif": "heif",
  "image/heif-sequence": "heif",
  "image/webp": "webp",
};

const getExtension = (fileName = "") => {
  const cleanName = String(fileName).split("?")[0];
  const parts = cleanName.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
};

const getMimeFromExtension = (extension) =>
  EXTENSION_TO_MIME[extension] || null;

const getExtensionFromMime = (type) =>
  MIME_TO_EXTENSION[String(type || "").toLowerCase().split(";")[0]] || "jpg";

const normalizeMimeType = (type) => {
  const normalized = String(type || "").toLowerCase().split(";")[0];
  return normalized === "image/jpg" ? "image/jpeg" : normalized;
};

const mimeMatchesExtension = (type, extension) => {
  if (!type || !extension) {
    return false;
  }

  return getExtensionFromMime(type) === extension;
};

export const normalizeImageAsset = (asset, fallbackPrefix = "image") => {
  if (!asset?.uri) {
    return asset;
  }

  const originalName = asset.fileName || asset.name || "";
  const originalExtension = getExtension(originalName) || getExtension(asset.uri);
  const assetType = normalizeMimeType(asset.type);
  const mimeFromExtension = getMimeFromExtension(originalExtension);
  const normalizedType =
    (assetType.startsWith("image/") &&
      assetType !== "application/octet-stream" &&
      assetType) ||
    mimeFromExtension ||
    "image/jpeg";

  const mimeExtension = getExtensionFromMime(normalizedType);
  const extension =
    originalExtension && mimeMatchesExtension(normalizedType, originalExtension)
      ? originalExtension
      : mimeExtension;
  const baseName = originalName
    ? originalName.replace(/\.[^.]+$/, "")
    : `${fallbackPrefix}_${Date.now()}`;
  const normalizedName = `${baseName}.${extension}`;

  return {
    ...asset,
    type: normalizedType,
    name: normalizedName,
    fileName: normalizedName,
  };
};

export const buildMultipartImageFile = (asset, fallbackPrefix = "image") => {
  const normalized = normalizeImageAsset(asset, fallbackPrefix);

  if (!normalized?.uri) {
    return null;
  }

  const normalizedUri = (() => {
    if (Platform.OS !== "android") {
      return normalized.uri;
    }

    if (
      normalized.uri.startsWith("file://") ||
      normalized.uri.startsWith("content://")
    ) {
      return normalized.uri;
    }

    return normalized.uri.startsWith("/")
      ? `file://${normalized.uri}`
      : normalized.uri;
  })();

  return {
    uri: normalizedUri,
    name: normalized.fileName,
    type: normalized.type,
  };
};

export const originalPhotoPickerOptions = {
  mediaType: "photo",
  assetRepresentationMode: "current",
  quality: 1,
};

export const compatiblePhotoPickerOptions =
  Platform.OS === "android"
    ? originalPhotoPickerOptions
    : {
        mediaType: "photo",
        assetRepresentationMode: "compatible",
        quality: 1,
        conversionQuality: 0.92,
      };

import { API_BASE_URL } from "../services/api";

const apiOrigin = API_BASE_URL.replace(/\/api\/?$/, "");

export const getMediaUrl = (value) => {
  if (!value || typeof value !== "string") return null;

  const path = value.trim();
  if (!path) return null;

  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }

  return `${apiOrigin}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getImageSource = (value, fallback) => {
  const uri = getMediaUrl(value);
  return uri ? { uri } : fallback;
};
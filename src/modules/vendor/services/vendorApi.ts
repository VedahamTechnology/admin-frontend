/// <reference types="vite/client" />

const DEFAULT_API_BASE_URL = "http://localhost:5000/api";

const getApiBaseUrl = () => {
  const rawBaseUrl = import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL;
  const baseUrl = rawBaseUrl.trim().replace(/\/+$/, "");

  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
};

export const vendorApiBaseUrl = `${getApiBaseUrl()}/vendor`;

export const getVendorRequestConfig = () => {
  const token = localStorage.getItem("vendorToken");

  return {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };
};

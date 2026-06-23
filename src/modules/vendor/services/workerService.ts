import axios from "axios";
import type {
  CategoriesResponse,
  CreateWorkerPayload,
  CreateWorkerResponse,
  WorkersResponse,
} from "../types/vendor";
import { getVendorRequestConfig, vendorApiBaseUrl } from "./vendorApi";

const API = vendorApiBaseUrl;

export const getWorkerErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (message) return message;
    if (status === 400) return "Please check the worker details and try again.";
    if (status === 401) return "Your session has expired. Please sign in again.";
    if (status === 403) return "Your vendor account is not allowed to manage workers yet.";
    if (status === 404) return "The requested worker could not be found.";
  }

  return "Something went wrong while managing workers. Please try again.";
};

export const getWorkers = async (): Promise<WorkersResponse> => {
  const res = await axios.get<WorkersResponse>(`${API}/workers`, getVendorRequestConfig());
  return res.data;
};

export const createWorker = async (
  data: CreateWorkerPayload
): Promise<CreateWorkerResponse> => {
  const res = await axios.post<CreateWorkerResponse>(
    `${API}/workers`,
    data,
    getVendorRequestConfig()
  );

  return res.data;
};

export const getServiceCategories = async (): Promise<CategoriesResponse> => {
  const res = await axios.get<CategoriesResponse>(
    `${API}/services/browse/categories`
  );

  return res.data;
};

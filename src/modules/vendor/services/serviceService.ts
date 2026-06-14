import axios from "axios";
 
const API = "http://localhost:5000/api/vendor/services";
 
const getConfig = () => {
  const token = localStorage.getItem("vendorToken");
 
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
 
// ── Shared shapes ────────────────────────────────────────────
export interface ServiceCategoryRef {
  _id: string;
  name: string;
}
 
export type ApprovalStatus = "pending" | "approved" | "rejected";
 
export interface ApiService {
  _id: string;
  serviceId?: string;
  name: string;
  description: string;
  category: ServiceCategoryRef | string;
  brand?: ServiceCategoryRef | string;
  basePrice: number;
  discountedPrice?: number;
  estimatedDuration: number;
  image?: string;
  images?: string[];
  features?: string[];
  includes?: string[];
  excludes?: string[];
  isActive?: boolean;
  isApproved?: boolean;
  approvalStatus: ApprovalStatus;
  rejectionReason?: string;
  createdByVendor?: string;
  createdAt?: string;
  updatedAt?: string;
}
 
export interface StatusCounts {
  pending: number;
  approved: number;
  rejected: number;
}
 
export interface GetMyServicesResponse {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  pages: number;
  statusCounts: StatusCounts;
  services: ApiService[];
}
 
export interface CreateServicePayload {
  name: string;
  description: string;
  category: string;
  brand?: string;
  basePrice: number;
  discountedPrice?: number;
  estimatedDuration: number;
  image?: string;
  images?: string[];
  features?: string[];
  includes?: string[];
  excludes?: string[];
}
 
export interface CreateServiceResponse {
  success: boolean;
  message: string;
  service: ApiService;
  status: string;
}
 
export interface UpdateServicePayload {
  name?: string;
  description?: string;
  basePrice?: number;
  discountedPrice?: number;
  estimatedDuration?: number;
  image?: string;
  images?: string[];
  features?: string[];
  includes?: string[];
  excludes?: string[];
  isActive?: boolean;
}
 
export interface UpdateServiceResponse {
  success: boolean;
  message: string;
  service: ApiService;
}
 
export interface DeleteServiceResponse {
  success: boolean;
  message: string;
}
 
export interface ServiceCategory {
  _id: string;
  categoryId?: string;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  totalServices?: number;
  avgRating?: number;
}
 
export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  data: ServiceCategory[];
}
 
// ── API calls ────────────────────────────────────────────────
export const getVendorServices = async (): Promise<GetMyServicesResponse> => {
  const res = await axios.get<GetMyServicesResponse>(API, getConfig());
  return res.data;
};
 
export const createService = async (
  data: CreateServicePayload
): Promise<CreateServiceResponse> => {
  const res = await axios.post<CreateServiceResponse>(API, data, getConfig());
  return res.data;
};
 
export const updateService = async (
  id: string,
  data: UpdateServicePayload
): Promise<UpdateServiceResponse> => {
  const res = await axios.put<UpdateServiceResponse>(`${API}/${id}`, data, getConfig());
  return res.data;
};
 
export const deleteService = async (id: string): Promise<DeleteServiceResponse> => {
  const res = await axios.delete<DeleteServiceResponse>(`${API}/${id}`, getConfig());
  return res.data;
};
 
export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const res = await axios.get<GetCategoriesResponse>(`${API}/browse/categories`);
  return res.data;
};
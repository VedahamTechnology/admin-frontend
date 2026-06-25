import API from "./adminApi"
 
// USERS
 
export const getUsers=()=>{
 
return API.get("/admin/users")
 
}
 
export const blockUser=(id)=>{
 
return API.put(
 
`/admin/users/${id}/block`
 
)
 
}
export const getCategories=()=>{
 
return API.get(
 
"/admin/categories",
{
params:{
isActive:"all",
limit:100
}
}
 
)
 
}
 
export const createCategory=(data)=>{
 
return API.post(
 
"/admin/categories",
 
data
 
)
 
}
 
export const updateCategory=(id,data)=>{
 
return API.put(
 
`/admin/categories/${id}`,
 
data
 
)
 
}
 
export const deleteCategory=(id)=>{
 
return API.delete(
 
`/admin/categories/${id}`
 
)
 
}
 
export const bulkUpdateCategoryStatus=(data)=>{
 
return API.post(
 
"/admin/categories/bulk/status",
 
data
 
)
 
}
 
 
export const unblockUser=(id)=>{
 
return API.put(
 
`/admin/users/${id}/unblock`
 
)
 
}
 
export const deleteUser=(id)=>{
 
return API.delete(
 
`/admin/users/${id}`
 
)
 
}
 
export const searchUsers=(query)=>{
 
return API.get(
 
"/admin/users/search",
{
params:{
query
}
}
 
)
 
}
 
 
 
// VENDORS
 
export const getVendors=()=>{
 
return API.get(
 
"/admin/vendors"
 
)
 
}
 
export const approveVendor=(id)=>{
 
return API.put(
 
`/admin/vendors/${id}/approve`
 
)
 
}
export const rejectVendor=(id,reason)=>{
 
return API.put(
 
`/admin/vendors/${id}/reject`,
 
{
 
reason
 
}
 
)
 
}
 
 
export const blockVendor=(id)=>{
 
return API.put(
 
`/admin/vendors/${id}/block`
 
)
 
}
 
export const deleteVendor=(id)=>{
 
return API.delete(
 
`/admin/vendors/${id}`
 
)
 
}
 
 // WORKERS

export const getWorkers = () => {
  return API.get("/admin/workers");
};

export const getPendingWorkers = () => {
  return API.get("/admin/workers/pending");
};

export const getApprovedWorkers = () => {
  return API.get("/admin/workers/approved");
};

export const getRejectedWorkers = () => {
  return API.get("/admin/workers/rejected");
};

export const approveWorker = (id) => {
  return API.patch(`/admin/workers/${id}/approve`);
};

export const rejectWorker = (id, reason) => {
  return API.patch(
    `/admin/workers/${id}/reject`,
    {
      reason,
    }
  );
};

export const getWorkerById = (id) => {
  return API.get(`/admin/workers/${id}`);
};

export const getWorkerBookings = (id) => {
  return API.get(`/admin/workers/${id}/bookings`);
};
 
// SERVICES
 
export const getServices=()=>{
return API.get(
"/admin/services"
)
}

export const getPendingServices = () => {
  return API.get("/admin/services/approval/pending");
};

export const approveService = (serviceId) => {
  return API.put(`/admin/services/approval/${serviceId}/approve`);
};

export const rejectService = (serviceId, reason) => {
  return API.put(
    `/admin/services/approval/${serviceId}/reject`,
    {
      reason,
    }
  );
};

export const deleteService = (id) => {
  return API.delete(`/admin/services/${id}`);
};

export const getTopBookedServices = () => {
  return API.get("/admin/services/top-booked");
};

// BOOKINGS
// Backend mounts bookingRoutes at /api/admin (not /api/admin/bookings)
// So: router.get('/') maps to GET /api/admin/
//     router.get('/:id') maps to GET /api/admin/:id
//     router.patch('/:id/status') maps to PATCH /api/admin/:id/status
// Note: getAllBookings (GET /) returns { data, stats, pagination } inline.

export const getBookings = (params) => {
  return API.get("/admin", { params });
};

export const getBookingById = (id) => {
  return API.get(`/admin/${id}`);
};

export const updateBookingStatus = (id, status) => {
  return API.patch(`/admin/${id}/status`, { status });
};


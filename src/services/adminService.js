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

"/admin/categories?isActive=all&limit=100"

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

`/admin/users/search?query=${query}`

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



// SERVICES

export const getServices=()=>{

return API.get(

"/admin/services"

)

}
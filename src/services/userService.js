import axios from "axios"

const API= import.meta.env.VITE_API_URL + "/admin/users" 

export const getUsers=async(

page=1,
limit=10

)=>{

const token=

localStorage.getItem("token")

const response=

await axios.get(

`${API}?page=${page}&limit=${limit}`,

{

headers:{

Authorization:

`Bearer ${token}`

}

}

)

return response.data

}
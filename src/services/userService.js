import axios from "axios"

const API="http://localhost:5000/api/admin/uses"

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
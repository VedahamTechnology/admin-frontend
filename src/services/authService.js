import axios from "axios"

const API = "http://localhost:5000/api/auth"

export const loginUser = (data) => {
  return axios.post(
    `${API}/login`,
    data
  )
}

export const registerCustomer = (data) => {
  return axios.post(
    `${API}/register/customer`,
    data
  )
}

export const registerVendor = (data) => {
  return axios.post(
    `${API}/register/vendor`,
    data
  )
}
import axios from "axios"
import { getApiBaseUrl } from "./apiBase"

const API = `${getApiBaseUrl()}/auth`

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

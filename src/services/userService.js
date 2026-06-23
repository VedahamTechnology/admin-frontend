import axios from "axios";
import { getApiBaseUrl } from "./apiBase";

const API = `${getApiBaseUrl()}/admin/users`;

export const getUsers = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    API,

    {
      params: {
        page,
        limit,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

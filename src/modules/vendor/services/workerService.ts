import axios from "axios";

const API = "http://localhost:5000/api/vendor";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
  },
});

export const getWorkers = async () => {
  const res = await axios.get(`${API}/workers`, getConfig());
  return res.data;
};

export const createWorker = async (data: any) => {
  const res = await axios.post(
    `${API}/workers`,
    data,
    getConfig()
  );

  return res.data;
};
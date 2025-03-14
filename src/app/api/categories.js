import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createCategorie: (data) => {
    return axios.post(`/api/proxy/categories`, data);
  },
  categorieList: () => {
    return axios.get(`/api/proxy/categories/`);
  },
};

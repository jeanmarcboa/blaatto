import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createShop: (data) => {
    // console.log(data);
    return axios.post(`/api/shops`, data);
  },
  shopList: () => {
    // console.log(data);
    return axios.get(`/api/shops/`);
  },
  shopListByBusinessId: (id) => {
    // console.log(data);
    return axios.get(`/api/shops/merchant/${id}`);
  },
  shopDetail: (uuid) => {
    // console.log(data);
    return axios.get(`/api/shops/${uuid}`);
  },
  shopEdited: (id, data) => {
    return axios.put(`/api/shops/${id}`, data);
  },
};

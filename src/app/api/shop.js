import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createShop: (data) => {
    // console.log(data);
    return axios.post(`/api/proxy/shops`, data);
  },
  shopList: () => {
    // console.log(data);
    return axios.get(`/api/proxy/shops/`);
  },
  shopListByBusinessId: (id) => {
    // console.log(data);
    return axios.get(`/api/proxy/shops/merchant/${id}`);
  },
  shopDetail: (uuid) => {
    // console.log(data);
    return axios.get(`/api/proxy/shops/${uuid}`);
  },
};

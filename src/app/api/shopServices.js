import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createShop: (data, token) => {
    // console.log(data);
    return axios.post(`/api/shops`, data, headersConfig(token));
  },
  shopList: (queryParams) => {
    // console.log(data);
    return axios.get(`/api/shops/${queryParams ?? ""}`);
  },
  shopListByBusinessId: (id, token) => {
    // console.log(data);
    return axios.get(`/api/shops/merchant/${id}`, headersConfig(token));
  },
  shopDetail: (uuid) => {
    // console.log(data);
    return axios.get(`/api/shops/${uuid}`);
  },
  shopEdited: (id, data, token) => {
    return axios.put(`/api/shops/${id}`, data, headersConfig(token));
  },
};

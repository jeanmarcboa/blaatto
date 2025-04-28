import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createOrder: (data) => {
    // console.log(data);
    return axios.post(`/api/orders`, data);
  },
  updateOrder: (uuid, data) => {
    // console.log(data);
    return axios.put(`/api/orders/${uuid}`, data);
  },
  buyOrder: (uuid, data) => {
    // console.log(data);
    return axios.post(`/api/orders/${uuid}/purchase`, data);
  },
  orderList: (queryParams) => {
    // console.log(data);
    return axios.get(`/api/orders${queryParams ?? ""}`);
  },
  orderDetail: (uuid) => {
    // console.log(data);
    return axios.get(`/api/orders/${uuid}`);
  },
};

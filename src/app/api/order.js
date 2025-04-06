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
  buyOrder: (uuid, data) => {
    // console.log(data);
    return axios.post(`/api/orders/${uuid}`, data);
  },
  orderList: () => {
    // console.log(data);
    return axios.get(`/api/orders/`);
  },
  orderDetail: (uuid) => {
    // console.log(data);
    return axios.get(`/api/orders/${uuid}`);
  },
};

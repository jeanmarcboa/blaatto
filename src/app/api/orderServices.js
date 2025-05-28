import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createOrder: (data, token) => {
    // console.log(data);
    return axios.post(`/api/orders`, data, headersConfig(token));
  },
  updateOrder: (uuid, data, token) => {
    // console.log(data);
    return axios.put(`/api/orders/${uuid}`, data, headersConfig(token));
  },
  buyOrder: (uuid, data, token) => {
    // console.log(data);
    return axios.post(
      `/api/orders/${uuid}/purchase`,
      data,
      headersConfig(token)
    );
  },
  orderList: (queryParams, token) => {
    // console.log(data);
    return axios.get(`/api/orders${queryParams ?? ""}`, headersConfig(token));
  },
  orderDetail: (uuid, token) => {
    // console.log(data);
    return axios.get(`/api/orders/${uuid}`, headersConfig(token));
  },
};

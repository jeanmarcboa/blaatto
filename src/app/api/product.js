import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createProduct: (data) => {
    // console.log(data);
    return axios.post(`/api/proxy/products`, data);
  },
  addProductImages: (data, id) => {
    // console.log(data);
    return axios.post(`/api/proxy/products/${id}/images`, data);
  },
  buyProduct: (uuid, data) => {
    // console.log(data);
    return axios.post(`/api/proxy/products/${uuid}`, data);
  },
  productList: () => {
    // console.log(data);
    return axios.get(`/api/proxy/products/`);
  },
  productDetail: (uuid) => {
    // console.log(data);
    return axios.get(`/api/proxy/products/${uuid}`);
  },
};

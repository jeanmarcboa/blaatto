import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createProduct: (data) => {
    // console.log(data);
    return axios.post(`/api/products`, data);
  },
  importProduct: (data) => {
    // console.log(data);
    return axios.post(`/api/products/upload`, data);
  },
  updateProduct: (id, data) => {
    // console.log(data);
    return axios.put(`/api/products/${id}`, data);
  },
  addProductImages: (data, id) => {
    // console.log(data);
    return axios.post(`/api/products/${id}/images`, data);
  },
  buyProduct: (uuid, data) => {
    // console.log(data);
    return axios.post(`/api/products/${uuid}`, data);
  },
  productList: () => {
    // console.log(data);
    return axios.get(`/api/products`);
  },
  searchProductList: (searchQuery) => {
    // console.log(data);
    return axios.post(`/api/products/search`, searchQuery);
  },
  productDetail: (uuid) => {
    // console.log(data);
    return axios.get(`/api/products/${uuid}`);
  },
};

import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createProduct: (data, token) => {
    // console.log(data);
    return axios.post(`/api/products`, data, headersConfig(token));
  },
  importProduct: (data, token) => {
    // console.log(data);
    return axios.post(`/api/products/upload`, data, headersConfig(token));
  },
  importProductDesignations: (data, token) => {
    // console.log(data);
    return axios.post(
      `/api/products-designations/upload`,
      data,
      headersConfig(token)
    );
  },
  updateProduct: (id, data, token) => {
    // console.log(data);
    return axios.put(`/api/products/${id}`, data, headersConfig(token));
  },
  addProductImages: (data, id, token) => {
    // console.log(data);
    return axios.post(`/api/products/${id}/images`, data, headersConfig(token));
  },
  addProductImagesBySelection: (data, token) => {
    // console.log(data);
    return axios.post(`/api/product-photo/images`, data, headersConfig(token));
  },
  buyProduct: (uuid, data) => {
    // console.log(data);
    return axios.post(`/api/products/${uuid}`, data);
  },
  productList: (query) => {
    // console.log(data);
    return axios.get(`/api/products${query ? "?" + query : ""}`);
  },
  productListTopSelling: (uuid, query) => {
    // console.log(data);
    return axios.get(
      `/api/shops/${uuid}/products/statistics/top-selling${
        query ? "?" + query : ""
      }`
    );
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

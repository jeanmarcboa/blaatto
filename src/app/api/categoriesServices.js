import axios from "axios";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createCategorie: (data, token) => {
    return axios.post(`/api/categories`, data, headersConfig(token));
  },
  importCategories: (data, token) => {
    // console.log(data);
    return axios.post(`/api/categories/upload`, data, headersConfig(token));
  },
  categorieList: () => {
    return axios.get(`/api/categories/`);
  },
  updateCategorie: (data, uuid, token) => {
    return axios.put(`/api/categories/${uuid}`, data, headersConfig(token));
  },
  deleteCategorie: (uuid, token) => {
    return axios.delete(`/api/categories/${uuid}`, headersConfig(token));
  },
};

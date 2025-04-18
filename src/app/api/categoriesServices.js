import axios from "axios";

export default {
  createCategorie: (data) => {
    return axios.post(`/api/categories`, data);
  },
  categorieList: () => {
    return axios.get(`/api/categories/`);
  },
};

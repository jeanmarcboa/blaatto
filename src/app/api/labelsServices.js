import axios from "axios";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createLabels: (data, token) => {
    return axios.post(`/api/products-designations`, data, headersConfig(token));
  },
  labelsList: (token) => {
    return axios.get(`/api/products-designations/`, headersConfig(token));
  },
  updateLabels: (data, uuid, token) => {
    return axios.put(
      `/api/products-designations/${uuid}`,
      data,
      headersConfig(token)
    );
  },
  deleteLabels: (uuid, token) => {
    return axios.delete(
      `/api/products-designations/${uuid}`,
      headersConfig(token)
    );
  },
};

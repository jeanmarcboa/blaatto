import axios from "axios";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createPublication: (data, token) => {
    return axios.post(`/api/advertisements`, data, headersConfig(token));
  },
  importPicture: (data, token) => {
    // console.log(data);
    return axios.post(`/api/advertisements/upload`, data, headersConfig(token));
  },
  publicationsList: () => {
    return axios.get(`/api/advertisements/public`);
  },
  publicationsListAdmin: () => {
    return axios.get(`/api/advertisements`);
  },
  updatePublications: (data, uuid, token) => {
    return axios.put(`/api/advertisements/${uuid}`, data, headersConfig(token));
  },
  deletePublications: (uuid, token) => {
    return axios.delete(`/api/advertisements/${uuid}`, headersConfig(token));
  },
};

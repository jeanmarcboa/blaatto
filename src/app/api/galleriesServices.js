import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  createGalleryPhoto: (data, token) => {
    // console.log(data);
    return axios.post(`/api/galleries/photos`, data, headersConfig(token));
  },

  galleryPhotoList: (token) => {
    // console.log(data);
    return axios.get(`/api/galleries/photos/`, headersConfig(token));
  },
  deletedGalleryPhoto: (id, token) => {
    return axios.delete(`/api/galleries/photos/${id}`, headersConfig(token));
  },
};

import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  logsList: (token) => {
    // console.log(data);
    return axios.get(`/api/logs`, headersConfig(token));
  },
};

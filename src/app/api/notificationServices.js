import axios from "axios";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  notificationsList: (token) => {
    return axios.get(`/api/notifications?read=false`, headersConfig(token));
  },
};

import axios from "axios";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  notificationsList: (params, token) => {
    return axios.get(`/api/notifications?read=false${params}`, headersConfig(token));
  },
};

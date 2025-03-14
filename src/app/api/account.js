import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  signIn: (data) => {
    // console.log(data);
    return axios.post(`/api/proxy/accounts/login`, data);
  },
  signUpCustomer: (data) => {
    // console.log(data);
    return axios.post(`/api/proxy/accounts/customers`, data);
  },
  signUpMerchant: (data) => {
    // console.log(data);
    return axios.post(`/api/proxy/accounts/merchants`, data);
  },
  signInAdmin: (data) => {
    // console.log(data);
    return axios.post(`/api/proxy/accounts/admins`, data);
  },
  updateUserAccount: (data, uuid) => {
    return axios.put(`/api/proxy/accounts/${uuid}`, data);
  },
  updateUserPassword: (data, uuid) => {
    return axios.put(`/api/proxy/accounts/${uuid}/update-password`, data);
  },
  resetPassword: (id, data, token) => {
    return axios.put(`/api/proxy/accounts/${uuid}/reset-password`, data);
  },
  requestResetPassword: (id, data) => {
    return axios.post(`/api/proxy/accounts/init-reset-password`, data);
  },
};

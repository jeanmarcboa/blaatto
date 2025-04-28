import axios from "axios";
import { BASE_API_URL } from "./config";

const headersConfig = (token) => {
  const head = { headers: { Authorization: `Bearer ${token}` } };
  return head;
};

export default {
  signIn: (data) => {
    // console.log(data);
    return axios.post(`/api/accounts/login`, data);
  },
  signUpCustomer: (data) => {
    // console.log(data);
    return axios.post(`/api/accounts/customers`, data);
  },
  signUpMerchant: (data) => {
    // console.log(data);
    return axios.post(`/api/accounts/merchants`, data);
  },
  signUpAdmin: (data) => {
    // console.log(data);
    return axios.post(`/api/accounts/admins`, data);
  },
  updateUserAccount: (data, uuid) => {
    return axios.put(`/api/accounts/${uuid}`, data);
  },
  updateUserPassword: (data, uuid) => {
    return axios.put(`/api/accounts/${uuid}/update-password`, data);
  },
  resetPassword: (uuid, data) => {
    return axios.put(`/api/accounts/${uuid}/reset-password`, data);
  },
  requestResetPassword: (id, data) => {
    return axios.post(`/api/accounts/init-reset-password`, data);
  },
  userAccountList: (param) => {
    return axios.get(`/api/accounts${param ?? ""}`);
  },
};

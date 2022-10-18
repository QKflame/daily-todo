import { notification } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 5 * 1000
});

axiosInstance.interceptors.request.use(config => {
  return config;
}, err => {
  console.log(err);
  return Promise.reject(err);
});

axiosInstance.interceptors.response.use((res) => {
  return res;
}, (err) => {
  notification.error({
    message: err.message,
    description: err?.response?.data,
    duration: 3000
  });
  return Promise.reject(err);
});

export default function request(config: AxiosRequestConfig) {
  config.method = config.method || 'GET';
  return axiosInstance(config).then(res => {
    return res.data || {};
  });
}



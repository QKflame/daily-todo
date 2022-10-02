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

export default function request(config: AxiosRequestConfig) {
  config.method = config.method || 'GET';
  return axiosInstance(config).then(res => {
    return res.data || {};
  });
}



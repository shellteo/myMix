/* eslint-disable */
"use strict";

import axios from "axios";
import { getCookie } from './index'
// import { removeCookie, clearAllCookie } from '@/utils/cookie'
// import store from '@/utils/store.js'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// baseURL: process.env.baseURL || process.env.apiUrl || ""
// timeout: 60 * 1000, // Timeout
// withCredentials: true, // Check cross-site Access-Control

const _axios = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 20000,
  headers: {},
});

// let loadingInstance = null;
_axios.interceptors.request.use(
  (config) => {
    if (getCookie('ACCESS_TOKEN')) config.headers['authorization'] = 'Bearer ' + getCookie('ACCESS_TOKEN');
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      // loadingInstance.close()
      // console.log(error.message)
      return Promise.reject(error);
    }
);

export default _axios;

// src/services/axios.js

import axios from "axios";
import Cookies from "js-cookie";
import { Message } from "element-ui";

axios.defaults.withCredentials = true;

// 创建 axios 实例
const instance = axios.create({
  baseURL:
    import.meta.env.VUE_APP_API_BASE_URL || "http://localhost:7001/api/v1", // 替换为你的 API 基础 URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前从 cookie 中读取 token
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    const { response } = error;
    if (response && response.data.code === 401) {
      // 未授权，重定向到登录页
      window.location.href = "/login";
    }
    Message.error(response.data.message);
    return Promise.reject(response.data);
  }
);

export default instance;

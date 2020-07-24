/* 
1.定义拦截器 
*/
import axios from 'axios';
import { Message } from 'element-ui';
import { getToKen, getUserName } from '@/utils/cookie';

// const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const BASEURL = '/api';

// 创建实例
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});
// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    //对请求数据处理
    config.headers['Tokey'] = getToKen();
    config.headers['UserName'] = getUserName();
    return config;
  },
  function(error) {
    //对请求错误处理
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;

    if (data.resCode !== 0) {
      Message({
        message: data.message,
        type: 'error',
        showClose: true,
      });
      return Promise.reject(error);
    } else {
      // return Promise.resolve
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;

import axios from "axios";
import {
  message
} from 'ant-design-vue';
import * as router from '@/router'
import * as store from '@/store'

const ins = axios.create({
  withCredentials: true,
});

//请求拦截
ins.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = "Bearer " + token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


//响应拦截
ins.interceptors.response.use(
  response => {
    if (typeof response.data === "string") {
      if (JSON.parse(response.data).message.status == 401) {
        message.warning("登录过期请重新登录!");
        // 清除当前user信息，跳转到login页
        store.default.commit("login/setUser", null);
        router.default.push({
          name: "Login",
        })
      }
      return
    }
    if (response.config.url == "/api/get_course_data") {
      return response.data;
    }
    if (response.config.url == "/api/get_star" && response.data.code) {
      return;
    }
    if (response.data.data && response.data.data.token) {
      // 将 token 存储到本地
      localStorage.adminToken = response.data.data.token;
    }
    if (!response.data.code) {
      // 响应放行
      return response.data.data
    } else {
      // message.warning(response.data.msg);
      console.log("response error:", response.data.msg);
    }
 
  },
  error => {
    console.log('err', error)
    return Promise.reject(error)
  }
)

export default ins;
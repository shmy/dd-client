import { create } from "axios";
import nprogress from 'nprogress'

const instance = create({
  baseURL: window.VUE_APP_API_URI,
  timeout: 20000,
});

instance.interceptors.request.use(
  request => {
    nprogress.start();
    return request;
  }
);
instance.interceptors.response.use(
  response => {
    nprogress.done();
    response = response.data;
    if (response.success !== true) {
      // 业务错误
      return [response, new Error(response.message)]
    }
    // 只将请求结果的data字段返回
    return [response.payload, null]
  },
  error => {
    nprogress.done();
    return Promise.resolve([null, error])
  }
);
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$http", {
      get() {
        return instance;
      }
    })
  }
};

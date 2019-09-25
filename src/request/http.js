import axios from "axios";
import QS from "qs";
import { Message } from "element-ui";

// const base_url = "http://39.108.184.20:8080/casd2/admin/";
const base_url = "http://192.168.110.173:8080/casd2/admin/";

// 默认请求地址
axios.defaults.baseURL = base_url; //"http://192.168.110.173:8080/casd2/admin/";//39.108.184.20:8080

// 请求超时时间
axios.defaults.timeout = 10000;

axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.data.errorCode === "10002") {
      setTimeout(() => {
        Message.warning("登录失效，请重新登录");
      }, 1000);
      sessionStorage.removeItem("token");
      location.reload();
    }
    if (error.response.status === "500") {
      Message.error("服务器内部错误");
    }
    return Promise.reject(error.response);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get(url, params = "") {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function Delete(url, params = "") {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        transformRequest: [
          function(data) {
            data = QS.stringify(data);
            return data;
          }
        ]
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params, {
        transformRequest: [
          function(data) {
            data = QS.stringify(data);
            return data;
          }
        ]
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export default {
  base_url
};

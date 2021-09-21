import axios from "axios";
import request from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
import {
  API_CODE,
  API_STATUS,
  BASE_URL_DEV,
  SESSION_ID
} from "../utils/contants";

export default () => {
  // return request.create({
  //   baseURL: BASE_URL_DEV,
  //   // withCredentials: true, //Nếu có cookies sẽ gửi n cùng với từng request
  //   timeout: 20000,
  //   headers: { "Content-Type": "application/json" }
  // });
  const instance = axios.create({
    baseURL: BASE_URL_DEV,
    timeout: 20000,
    headers: { "Content-Type": "application/json" }
  });

  instance.interceptors.request.use(
    async config => {
      console.log(config, "config request 27");
      config.headers.token = Cookies.get(SESSION_ID);
      return config;
    },
    error => Promise.reject(error)
  );
  instance.interceptors.response.use(response => {
    const data = response.data;
    console.log(data, "data response 34");
    if (
      (data && data.code === API_STATUS.RE_LOGIN) ||
      data.code === API_STATUS.NOT_FOUND
    ) {
      Cookies.set(SESSION_ID, "");
      localStorage.setItem("token", "");
    } else {
      Cookies.set(SESSION_ID, data.accessToken);
    }
    // else if (data && data.status !== API_CODE.SUCCESS) {
    //   swal({
    //     title: "Lỗi",
    //     text: data.message || "Đã có lỗi xảy ra! Vui lòng thử lại",
    //     icon: "error"
    //   });
    // }
    return response;
  });
  return instance;
};

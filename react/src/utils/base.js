import axios, { AxiosInstance } from "axios";

// 基本配置
const imgPath = "http://127.0.0.1:9011/img/";
const apiPath = "http://127.0.0.1:9010/";

// Ajax 通用配置
const ajax = axios.create({
  baseURL: apiPath
});

// 添加响应拦截器
ajax.interceptors.response.use(
  res => {
    return res.data;
  }
);

// 获取今天的时间戳
const getTodayTime = function() {
  // => 用来表示函数的定义
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

// 获取前一天的日期
const prevDay  = function(
  timestamp = new Date().getTime()
) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "" + month + "" + day;
};

export default {
  imgPath,
  apiPath,
  ajax,
  getTodayTime,
  prevDay
};

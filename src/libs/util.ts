import axios, { AxiosInstance } from "axios";

// 基本配置
const imgPath: string = "http://127.0.0.1:9011/img/";
const apiPath: string = "http://127.0.0.1:9010/";

// Ajax 通用配置
const ajax: AxiosInstance = axios.create({
  baseURL: apiPath
});

// 添加响应拦截器
ajax.interceptors.response.use(
  (res: any): any => {
    return res.data;
  }
);

// 获取今天的时间戳
const getTodayTime: () => number = function(): number {
  // => 用来表示函数的定义
  const date: Date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

// 获取前一天的日期
const prevDay: (timestamp: number) => string = function(
  timestamp = new Date().getTime()
): string {
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

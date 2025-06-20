import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  timeout: 10 * 1000,
});

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(
  (res) => {
    const resData = (res.data || {}) as ResType;
    const { errno, msg, data } = resData;

    if (errno !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg);
      }
      throw new Error(msg);
    }

    return data as any; // 返回完整的响应对象而不是只返回data
  },
  err => {
    message.error('请求失败');
    throw err;
  }
);

export default instance;

// 定义返回数据类型
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

// 定义data数据类型
export type ResDataType = {
  [key: string]: any;
};  
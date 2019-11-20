/**
 * Ajax请求基类
 * 引用Flyio请求库
 * 文档：https://wendux.github.io/dist/#/doc/flyio/readme
 */
const fly = require('flyio');

fly.config.headers = {
    'X-tab': 'flyio',
};
fly.config.timeout = 10000;
fly.config.baseURL = process.env.API_DOMAIN;

// 响应拦截器
fly.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error(error);
    }
);

class Base {
    request ({
        url,
        method = 'get',
        data = {},
        withCredentials = false
    }) {
        const options = {
            method,
            withCredentials
        };

        return fly.request(url, data, options);
    }
}

export default Base;

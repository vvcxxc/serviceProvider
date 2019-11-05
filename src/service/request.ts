import axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import { Toast } from 'antd-mobile';
import { success, error } from "@/components/Hint";

interface Options extends AxiosRequestConfig {
    /**替换的主机域名 */
    host?: string;
}


const host = process.env.apiUrl ? process.env.apiUrl :
    // 'http://192.168.2.151/'
    'http://test.service_provider_api.tdianyi.com/';
// const host = process.env.apiUrl ? process.env.apiUrl : 'http://192.168.2.151/';
 
/**发起请求
 *
 * 使用axios为底层方法
 *
 * 必要参数参考axios
 */
export default function request(options: Options) {
    /**验证token */
    const token = localStorage.getItem('token');
    // console.log(token, 'sad')
    /**合并headers */
    if (token) {
        // console.log(123)
        options.headers = { ...options.headers, Authorization: "Bearer " + token, }
        //   console.log(options.headers)
    } else {
        // console.log(234)
        options.headers = { ...options.headers }
    }
    // options.headers = { ...options.headers, Authorization: token };
    /**拼接接口地址 */
    options.url = options.host ? options.host + options.url : host + options.url;
    /**请求超时 */
    // options.timeout = 5000;
    /**axios 请求 */
    return axios(options)
        .then(res => res.data)
        .catch(err => {
            Toast.hide();
            if (err.response && err.response.status === 400) {
                Toast.fail(err.response.data.message, 1)
            }
            if (err.response && err.response.status === 401) {
                router.push('/login');
            }
            if (err.response && err.response.status === 403) {
                // error(err.response.data.message)
                Toast.fail(err.response.data.message, 1)
            }
            if (err.response && err.response.status !== 401) {
            }
            return new Promise(() => { });
        });
}

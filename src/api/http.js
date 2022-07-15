import axios from 'axios';
// import { Message } from 'element-ui';
// import router from '../router';
axios.defaults.headers["Content-Type"] = "application/json";
const instance = axios.create({
    
});
// instance.interceptors.request.use(function (config) {
//     var token = localStorage.getItem('token');
//     if (token) {
//         config.headers.token = token; //将接口返回的token信息配置到接口请求中
//     }
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// // 添加响应拦截器
// instance.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     if (response.data.code == 401) {
//         // localStorage.removeItem("token")
//         Message({
//             type: 'error',
//             message: response.data.msg,
//             onClose() {
//                 router.push({ name: "Login" })
//             }
//         })
//     }
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });
export default instance;
/*
 * @Author       : TomSawyer2
 * @Date         : 2021-11-4 15:21:32
 * @LastEditors  : GuoXu
 * @LastEditTime : 2021-11-30 16:35:39
 * @Description  : 二次封装axios
 * @FilePath     : \BuddyMiniapp\src\apis\request.js
 */
import { getToken } from '@/utils/storage';
import axios from 'axios';
import { baseURL, TIMEOUT, CONTENT_TYPE, ERROR_CODE } from '../config/index';

const Axios = axios.create({
    baseURL: baseURL,
    timeout: TIMEOUT,
    headers: { 'Content-Type': CONTENT_TYPE },
    withCredentials: false
});

// 自定义适配器来适配uniapp语法
axios.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
                settle(resolve, reject, response);
            }
        });
    });
};

// 请求拦截
Axios.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = getToken(); // getToken
        return config;
    },
    (err) => {
        Promise.reject(err);
    }
);

// 响应拦截
Axios.interceptors.response.use(
    (res) => {
        const errorCode = res?.data?.code;
        // 错误处理
        switch (errorCode) {
            case ERROR_CODE.FAILED:
                wx.showToast({
                    title: '错误：未知错误',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.VALIDATE_FAILED:
                wx.showToast({
                    title: '错误：参数检验失败',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.UNAUTHORIZED:
                wx.showToast({
                    title: '错误：暂未登录或token已经过期',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.FORBIDDEN:
                wx.showToast({
                    title: '错误：没有相关权限',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.TOKEN_MISSING:
                wx.showToast({
                    title: '错误：未检测到token',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.USER_NOT_EXISTS:
                // wx.showToast({
                //     title: '错误：用户不存在',
                //     icon: 'none',
                //     duration: 1000
                // });
                break;

            case ERROR_CODE.USER_ALREADY_EXISTS:
                wx.showToast({
                    title: '错误：用户已存在',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.ALREADY_APPLY:
                wx.showToast({
                    title: '错误：已经提交过申请,或尚存在未撤销的申请',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.TYPE_NOT_EXISTS:
                wx.showToast({
                    title: '错误：属性值不存在',
                    icon: 'none',
                    duration: 1000
                });
                break;

            case ERROR_CODE.BUDDY_ALREADY_EXISTS:
                wx.showToast({
                    title: '已发送过申请或已存在buddy关系,请勿重复发起',
                    icon: 'none',
                    duration: 1000
                });
                break;

            default:
                return res;
        }
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default Axios;

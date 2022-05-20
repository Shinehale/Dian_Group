/**
 * @author TomSawyer2
 * @date 2021/10/24
 * @LastEditors  : GuoXu
 * @LastEditTime : 2021-11-30 16:30:52
 * @brief
 * 用户有关的接口
 * 1. 登录
 * 2. 获取手机号
 * 3. 注册
 * 4. 身份校验
 * 5. 提交人工审核申请
 * 6. 获取token
 * 7. 获取“我的”页面展示信息
 * 8. 获取个人信息页面展示信息
 * 9. 更新个人信息
 * 10.申请成为Buddy
 * 11.获取申请成为Buddy的历史记录
 * 12.撤销成为Buddy的申请
 * 13.Buddy休眠
 * 14.测试账号登录
 */
import { URL } from '@/config';
import axios from '../request';

/**
 * @description 登录
 * @method GET
 * @param {String} code
 */
export function code2Session(param) {
    return axios.get(URL.code2Session, {
        params: param
    });
}

/**
 * @description 获取手机号
 * @method GET
 * @param {String} encryptedData
 * @param {String} openId
 * @param {String} iv
 */
export function getPhone(param) {
    return axios.get(URL.getPhone, {
        params: param
    });
}

/**
 * @description 注册
 * @method POST
 * @param {String} openId
 * @param {String} name
 * @param {String} phone
 * @param {Number} gender
 * @param {String} birthday
 * @param {Number} teamIdentity
 * @param {Number} teamNo
 */
export function register(param) {
    return axios.post(URL.register, param);
}

/**
 * @description 身份校验
 * @method POST
 * @param {String} name
 * @param {Number} teamNo
 */
export function manualCheck(param) {
    return axios.post(URL.manualCheck, param);
}

/**
 * @description 提交人工审核申请
 * @method POST
 * @param {String} name
 * @param {Number} teamNo
 * @param {String} note
 */
export function userCheck(param) {
    return axios.post(URL.userCheck, param);
}

/**
 * @description 获取token
 * @method GET
 * @param {String} openId
 */
export function login(param) {
    return axios.get(URL.login, {
        params: param
    });
}

/**
 * @description: 获取“我的”页面展示信息
 * @method GET
 */
export function getMyInfo() {
    return axios.get(URL.getMyInfo);
}

/**
 * @description: 获取个人信息页面展示信息
 * @method GET
 */
export function getMyInfoDetail() {
    return axios.get(URL.getMyInfoDetail);
}

/**
 * @description: 更新个人信息
 * @method POST
 */
export function updateMyInfo(data) {
    return axios.post(URL.updateMyInfo, data);
}

// 申请成为Buddy
export function applyToBeBuddy(data) {
    return axios.post(URL.applyToBeBuddy, data);
}

// 获取申请成为Buddy的历史记录
export function getApplyToBeBuddyRecord() {
    return axios.get(URL.getApplyToBeBuddyRecord);
}

// 撤销成为Buddy的申请
export function undoTheApplication() {
    return axios.get(URL.undoTheApplication);
}

// Buddy休眠
export function hibernate(data) {
    return axios.post(URL.hibernate, data);
}

/**
 * @description: 测试账号登录
 * @method POST
 */
export function testLogin(params) {
    return axios.post(URL.testLogin, params);
}

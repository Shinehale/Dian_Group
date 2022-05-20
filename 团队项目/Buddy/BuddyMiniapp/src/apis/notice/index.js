/**
 * @author TomSawyer2
 * @date 2022/01/08
 * @brief
 * 通知有关的接口
 */
import { URL } from '@/config';
import axios from '../request';

/**
 * @description 获取未读消息个数详情
 * @method GET
 */
export function getUnreadDetail() {
    return axios.get(URL.getUnreadDetail);
}

/**
 * @description 查看我作为buddy的通知
 * @method GET
 */
export function getBuddyNotice() {
    return axios.get(URL.getBuddyNotice);
}

/**
 * @description 查看我作为newbie的通知
 * @method GET
 */
export function getNewBieNotice() {
    return axios.get(URL.getNewBieNotice);
}

/**
 * @description 获取系统通知列表
 * @method GET
 */
export function getSysNotice() {
    return axios.get(URL.getSysNotice);
}

/**
 * @description 将所有通知标记为已读
 * @method GET
 */
export function readAllNotice() {
    return axios.get(URL.readAllNotice);
}

/**
 * @description 将所有系统通知标记为已读
 * @method GET
 */
export function readAllSysNotice() {
    return axios.get(URL.readAllSysNotice);
}

/**
 * @description 撤销结对请求
 * @method GET
 */
export function undoApply(params) {
    return axios.get(URL.undoApply, { params });
}

/**
 * @description 接收结对申请
 * @method GET
 */
export function agreeApplyAPI(params) {
    return axios.get(URL.agreeApplyAPI, { params });
}

/**
 * @description 拒绝结对申请
 * @method POST
 */
export function refuseApplyAPI(params) {
    return axios.post(URL.refuseApplyAPI, params);
}

/**
 * @description 将指定消息标为已读
 * @method GET
 */
export function readAPI(params) {
    return axios.get(URL.readAPI, { params });
}

/**
 * @description 查看系统通知详情
 * @method GET
 */
export function getSysNoticeDetail(params) {
    return axios.get(URL.getSysNoticeDetail, { params });
}

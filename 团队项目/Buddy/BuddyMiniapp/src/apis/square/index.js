/**
 * @author TomSawyer2
 * @date 2021/12/07
 * @brief
 * 广场有关的接口
 */
import { URL } from '@/config';
import axios from '../request';

/**
 * @description 获取所有buddy的列表
 * @method GET
 */
export function getBuddyList(params) {
    return axios.get(URL.getBuddyList, { params });
}

/**
 * @description 获取指定用户的信息
 * @method GET
 * @param {Number} userId
 */
export function getUserInfo(params) {
    return axios.get(URL.getUserInfo, { params });
}

/**
 * @description 提交buddy申请
 * @method POST
 * @param {Number} buddyId
 * @param {String} reason
 */
export function applyBuddy(params) {
    return axios.post(URL.applyBuddy, params);
}

/**
 * @description 筛选buddy分页查询
 * @method GET
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @param {String} direction
 * @param {String} studyExperience
 * @param {String} city
 * @param {Number} minAge
 * @param {Number} maxAge
 * @param {String} keyWord
 */
export function getFilteredBuddyList(params) {
    return axios.post(URL.getFilteredBuddyList, params);
}

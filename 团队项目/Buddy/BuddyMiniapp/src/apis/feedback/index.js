/*
 * @Author       : GuoXu
 * @Date         : 2022-01-26 01:56:43
 * @LastEditors  : your name
 * @LastEditTime : 2022-01-27 02:50:54
 * @Description  : 反馈接口
 * @FilePath     : \BuddyMiniapp\src\apis\feedback\index.js
 */
import { URL } from '@/config';
import axios from '../request';
// 提交反馈
export function submitFeedback(data) {
    return axios.post(URL.submitFeedback, data);
}

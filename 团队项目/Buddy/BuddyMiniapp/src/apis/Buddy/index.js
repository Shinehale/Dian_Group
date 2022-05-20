import { URL } from '@/config';
import axios from '../request';
//获取已经成为buddy的列表
export function getBuddiedList() {
    return axios.get(URL.getBuddiedList);
}
//获取已经成为当前账户newbie的列表
export function getNewbieList() {
    return axios.get(URL.getNewbieList);
}
export function getTextbookAll(params) {
    return axios.get(URL.getTextbookAll, { params });
}
export function getUniTextbook(params) {
    return axios.get(URL.getUniTextbook, { params });
}
export function updateUniTextbook(params) {
    return axios.post(URL.updateUniTextbook, params);
}
export function deleteTextbooks(params) {
    return axios.post(URL.deleteTextbooks, params);
}
export function searchTextbook(params) {
    return axios.get(URL.searchTextbook, { params });
}
export function cancelRelation(params) {
    return axios.post(URL.cancelRelation, params);
}
export function newTextpage(params) {
    return axios.post(URL.newTextpage, params);
}

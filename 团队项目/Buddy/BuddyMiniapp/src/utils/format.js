/**
 * @author TomSawyer2
 * @date 2021/10/24
 *
 * @brief
 * 1. 时间格式化
 */

import { teamIdentityEnum } from '@/enums';

/**
 * @description 时间格式化
 * @returns {String} 当前时间，类似2021-10-07
 */
function timeFormat(date) {
    var nowDate = new Date(date);
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
    var dateStr = year + '-' + month + '-' + day;
    return dateStr;
}

function formatTeamIdentityNumToTeamIdentityStr(teamIdentityNum) {
    return teamIdentityEnum[teamIdentityNum];
}

function formatTeamIdentityStrToTeamIdentityNum(teamIdentityStr) {
    let teamIdentityNum = 0;
    switch (teamIdentityStr) {
        case '预备队员':
            teamIdentityNum = 1;
            break;
        case '正式队员':
            teamIdentityNum = 2;
            break;
        case '名誉队员':
            teamIdentityNum = 3;
            break;
        case '全职导师':
            teamIdentityNum = 4;
            break;
        case '兼职导师':
            teamIdentityNum = 5;
            break;
        case '顾问':
            teamIdentityNum = 6;
            break;
        default:
            break;
    }
    return teamIdentityNum;
}
export { timeFormat, formatTeamIdentityNumToTeamIdentityStr, formatTeamIdentityStrToTeamIdentityNum };

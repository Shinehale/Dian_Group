export const TIMEOUT = 15000;
export const CONTENT_TYPE = 'application/json';
export const baseURL = 'https://buddy.dian.org.cn/api';

const URL = {
    // login-related
    code2Session: '/wx/code2Session',
    getPhone: '/wx/getPhone',
    register: '/user/register',
    login: '/user/login',
    manualCheck: '/user/check',
    userCheck: '/user/check/manual',
    testLogin: '/user/login',
    // mine-related
    getMyInfo: '/user/info/my',
    updateMyInfo: '/user/info/update',
    applyToBeBuddy: '/buddy/qualification/apply',
    getApplyToBeBuddyRecord: '/buddy/qualification/my',
    undoTheApplication: '/buddy/qualification/undo',
    hibernate: '/buddy/qualification/awake/set',
    // square-related
    getBuddyList: '/buddy/list',
    getUserInfo: '/user/info',
    applyBuddy: '/buddy/apply',
    getFilteredBuddyList: '/buddy/filter',
    //Buddy-related
    getBuddiedList: '/buddy/brief/buddy',
    getNewbieList: '/buddy/brief/newbie',
    getTextbookAll: '/record/all',
    getUniTextbook: '/record/certain',
    updateUniTextbook: '/record/update',
    deleteTextbooks: '/record/delete',
    searchTextbook: '/record/search',
    cancelRelation: '/buddy/cancel',
    newTextpage: '/record/add',
    // notice-related
    getUnreadDetail: '/notice/unread/count/detail',
    getBuddyNotice: '/notice/as/buddy',
    getNewBieNotice: '/notice/as/newbie',
    getSysNotice: '/notice/sys/list',
    readAllNotice: '/notice/read/all',
    undoApply: '/buddy/apply/undo',
    getSysNoticeDetail: '/notice/sys',
    readAllSysNotice: '/notice/read/all/sys',
    agreeApplyAPI: '/buddy/apply/accept',
    refuseApplyAPI: '/buddy/apply/deny',
    readAPI: '/notice/read',
    // feedback
    submitFeedback: '/feedback/save'
};

// https://gitlab.dian.org.cn/hawkeye/buddy_backend/-/blob/dev/src/main/java/com/dian/buddy/common/api/ResultCode.java
const ERROR_CODE = {
    FAILED: -1, // 未知错误
    VALIDATE_FAILED: 101, // 参数检验失败
    UNAUTHORIZED: 102, //暂未登录或token已经过期
    FORBIDDEN: 103, // 没有相关权限
    TOKEN_MISSING: 104, // 未检测到token
    USER_NOT_EXISTS: 105, // 用户不存在
    USER_ALREADY_EXISTS: 106, // 用户已存在
    ALREADY_APPLY: 107, //已经提交过申请,或尚存在未撤销的申请
    TYPE_NOT_EXISTS: 201, //属性值不存在
    BUDDY_ALREADY_EXISTS: 301 // 已申请或通过Buddy
};

export { URL, ERROR_CODE };

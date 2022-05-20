/**
 * @author TomSawyer2
 * @date 2021/10/24
 *
 * @brief
 * 1. 存入token
 * 2. 取得token
 * 3. 删除token
 * 4. 存入openId
 * 5. 取得openId
 * 6. 删除openId
 * 7. 存入phone
 * 8. 取得phone
 * 9. 删除phone
 */

/**
 * @description 存入token
 * @param {String} content
 */
export function setToken(content) {
    wx.setStorageSync('token', content);
}

/**
 * @description 取得token
 * @returns {String} token
 */
export function getToken() {
    return wx.getStorageSync('token');
}

/**
 * @description 删除token
 */
export function removeToken() {
    wx.removeStorageSync('token');
}

/**
 * @description 存入openId
 * @param {String} content
 */
export function setOpenId(content) {
    wx.setStorageSync('openId', content);
}

/**
 * @description 取得openId
 * @returns {String} openId
 */
export function getOpenId() {
    return wx.getStorageSync('openId');
}

/**
 * @description 删除openId
 */
export function removeOpenId() {
    wx.removeStorageSync('openId');
}

/**
 * @description 存入phone
 * @param {String} content
 */
export function setPhone(content) {
    wx.setStorageSync('phone', content);
}

/**
 * @description 取得phone
 * @returns {String} phone
 */
export function getPhoneNumber() {
    return wx.getStorageSync('phone');
}

/**
 * @description 删除phone
 */
export function removePhone() {
    wx.removeStorageSync('phone');
}

/*
 * @Author       : TomSawyer2
 * @Date         : 2021-11-30 20:48:20
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-02-15 17:43:51
 * @Description  : file content
 * @FilePath     : \BuddyMiniapp\src\utils\oss.js
 */

const base64 = require('./base64'); //Base64,hmac,sha1,crypto相关算法
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto');

/**
 * 配置信息
 */
const region = 'https://buddyminiapp.oss-cn-shanghai.aliyuncs.com/';
const accessKeyId = 'LTAI5tQ4ky8rZpx6RHxvm7N7';
const accessKeySecret = '3w4Wh8z12dnur67p3qhdNYrwEEddms';
// const bucket = "buddyminiapp";
const timeout = 87600;

/**
 * @param {String} objectKey 上传是设置文件key , 一般为文件名称
 * @param {File} file 文件file
 */
/**
 * @description: 封装 `uni.uploadFile()` API，使其支持以 Promise 风格调用
 * @param {String} filePath 要上传文件资源的路径
 * @return {Promise} `Promise` 对象, 其 `then` 方法的匿名参数 `onResolved`回调函数返回文件上传成功后的 `url`,
 * 匿名参数 `onRejected`回调函数返回文件上传失败后的 `Error` 对象
 */
export function uploadFile(filePath) {
    if (!filePath) {
        throw Error('uploadFile()方法中传入的filePath参数异常');
    }
    const aliyunFileKey = new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
    const aliyunServerURL = region; //OSS地址，需要https
    const accessid = accessKeyId;
    const policyBase64 = getPolicyBase64();
    const signature = getSignature(policyBase64); //获取签名
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: aliyunServerURL, //开发者服务器 url
            filePath: filePath, //要上传文件资源的路径
            name: 'file', //必须填file
            formData: {
                key: aliyunFileKey,
                policy: policyBase64,
                OSSAccessKeyId: accessid,
                signature: signature,
                success_action_status: '200'
            },
            success: function (res) {
                if (res.statusCode != 200) {
                    reject(new Error('上传错误:' + JSON.stringify(res)));
                }
                resolve(`${aliyunServerURL}${aliyunFileKey}`);
            },
            fail: function (err) {
                err.wxaddinfo = aliyunServerURL;
                reject(err);
            }
        });
    });
}

const getPolicyBase64 = function () {
    let date = new Date();
    date.setHours(date.getHours() + timeout);
    let srcT = date.toISOString();
    const policyText = {
        expiration: srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        conditions: [
            ['content-length-range', 0, 5 * 1024 * 1024] // 设置上传文件的大小限制5MB
        ]
    };
    const policyBase64 = base64.encode(JSON.stringify(policyText));
    return policyBase64;
};

const getSignature = function (policyBase64) {
    const accesskey = accessKeySecret;
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
    });
    const signature = Crypto.util.bytesToBase64(bytes);

    return signature;
};

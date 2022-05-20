<template>
    <div class="index">
        <div class="index-title">Buddy</div>
        <div class="index-button">
            <van-button
                class="index-button__info"
                plain
                :disabled="disabled"
                type="info"
                open-type="getPhoneNumber"
                @getphonenumber="getPhoneNumber"
                >微信登录/注册</van-button
            >
            <span class="index-button__text" @click="toTestLogin">测试账号密码登录</span>
        </div>
        <div class="index-notice">
            <span
                >根据腾讯小程序官方《用户服务协议》及《隐私政策》要求，Buddy小程序收集的信息仅供华中科技大学Dian团队内部使用，不会往第三方泄露个人信息。</span
            >
        </div>
    </div>
</template>

<script>
import { code2Session, getPhone, login } from '@/apis';
import { setPhone, setOpenId, getOpenId, setToken } from '@/utils/storage.js';
export default {
    data() {
        return {
            openId: '',
            disabled: true
        };
    },
    async mounted() {
        this.wxLogin();
        // 开局登录，如果后端返回token不是null就直接跳转，是null显示登录页面
        if (await this.haveToken()) {
            uni.redirectTo({
                url: 'home'
            });
        }
        this.disabled = false;
    },
    methods: {
        wxLogin() {
            var that = this;
            let promise = new Promise((resolve) => {
                wx.login({
                    success: (res) => {
                        if (res.code) {
                            code2Session({ code: res.code }).then((res) => {
                                const loginData = res.data.data;
                                that.openId = loginData.openId;
                                setOpenId(that.openId);
                                resolve(res);
                            });
                        }
                    }
                });
                return promise;
            });
        },
        async haveToken() {
            try {
                const data = (await login({ openId: getOpenId() })).data.data;
                if (data !== null) {
                    setToken(data.token);
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        async getPhoneNumber(e) {
            if (await this.haveToken()) {
                uni.redirectTo({
                    url: 'home'
                });
            } else {
                try {
                    const getPhoneParams = {
                        encryptedData: e.detail.encryptedData,
                        openId: this.openId,
                        iv: e.detail.iv
                    };
                    let phone = (await getPhone(getPhoneParams)).data.data.phoneNum;
                    setPhone(phone);
                    uni.navigateTo({
                        url: 'manualcheck'
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        },
        toTestLogin() {
            uni.navigateTo({
                url: 'testLogin'
            });
        }
    }
};
</script>

<style>
.index {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.index-logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.index-title {
    font-size: 35px;
}

.index-button {
    display: flex;
    flex-direction: column;
    width: 200px;
}

.index-button__info {
    width: 200px;
    display: flex;
    padding-top: 30px;
    justify-content: center;
}

.index-button__text {
    color: #043a47;
    text-align: center;
    padding: 20px 0;
    font-size: 12px;
}

.index-notice {
    position: fixed;
    bottom: 30px;
    width: 80%;
    color: gray;
    font-size: 12px;
}
</style>

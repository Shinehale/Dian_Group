<template>
    <div class="testlogin">
        <li class="testlogin__title">
            <p class="testlogin__title-main">欢迎来到Buddy！</p>
            <p class="testlogin__title-sub">您将以测试账号身份登录：</p>
        </li>
        <li class="testlogin__input">
            <div class="testlogin__input-name">
                <span>账号</span>
                <van-field :value="formData.username" @change="getName" placeholder="请输入账号" input-align="right" />
            </div>
            <div class="testlogin__input-name">
                <span>密码</span>
                <van-field
                    :value="formData.password"
                    @change="getPassword"
                    placeholder="请输入密码"
                    input-align="right" />
            </div>
        </li>
        <li class="testlogin__action">
            <van-button class="testlogin__action-submit" block plain type="info" @click="testLogin">登录</van-button>
        </li>
    </div>
</template>

<script>
import { testLogin } from '@/apis';
import { setToken } from '@/utils/storage.js';

export default {
    name: 'testLogin',
    data() {
        return {
            formData: {
                username: null,
                password: null
            }
        };
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: 'Buddy测试账号登录'
        });
    },
    methods: {
        getName(e) {
            this.formData.username = e.detail;
        },
        getPassword(e) {
            this.formData.password = e.detail;
        },
        async testLogin() {
            if (this.formData.username !== null && this.formData.password !== null) {
                await testLogin(this.formData)
                    .then((res) => {
                        setToken(res.data.data.token);
                        uni.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 1500
                        });
                        setTimeout(() => {
                            uni.redirectTo({
                                url: 'home'
                            });
                        }, 1000);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                uni.showToast({
                    title: '账号或密码错误',
                    icon: 'error',
                    duration: 1500
                });
            }
        }
    }
};
</script>

<style lang="scss">
.testlogin {
    padding: 20px 20px;
}
.testlogin__title {
    padding: 0 16px;
}
.testlogin__title-main {
    font-size: 30px;
    padding-bottom: 5px;
    font-weight: 500;
}
.testlogin__title-sub {
    font-size: 20px;
}
.testlogin__avatar {
    padding: 40px 0px;
    display: flex;
    justify-content: center;
}
.testlogin__input {
    padding: 100px 0;
}
.testlogin__input-name {
    display: flex;
    justify-content: space-between;
    padding: 0px 16px;
    & > span {
        font-size: 14px;
        display: flex;
        align-content: center;
        margin: auto 0;
    }
    & > van-field {
        margin-right: -17px;
    }
}
.testlogin__action {
    display: flex;
    justify-content: center;
    padding: 20px 0;
}
.testlogin__action-submit {
    width: 40vw;
}
</style>

<!--
 * @Author       : TomSawyer2
 * @Date         : 2021-11-18 18:11:58
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-02-21 21:25:42
 * @Description  : 填写姓名、性别、出生日期、团队身份、团队编号等信息
 * @FilePath     : \BuddyMiniapp\src\pages\register.vue
-->
<template>
    <div class="register">
        <div class="register__title">
            <p class="register__title-main">欢迎来到Buddy</p>
            <p class="register__title-sub">请检查并补全您的基础信息</p>
        </div>
        <div class="register__avatar">
            <Avatar :avatar="avatar" />
        </div>
        <ul class="register__form__body">
            <li>
                <van-field
                    label="姓名"
                    size="large"
                    :value="formData.name"
                    @change="getName"
                    placeholder="请输入姓名"
                    input-align="right" />
            </li>
            <li class="register__input-gender">
                <span>性别</span>
                <van-radio-group :value="formData.gender" direction="horizontal" @change="getGender">
                    <van-radio name="1">男</van-radio>
                    <van-radio name="2">女</van-radio>
                </van-radio-group>
            </li>
            <li>
                <van-cell
                    title="出生日期"
                    size="large"
                    :value="formData.birthday ? formData.birthday : '暂无'"
                    is-link
                    @click="showCalender" />
                <van-popup
                    :show="calenderShow"
                    round
                    position="bottom"
                    custom-style="height: 50%"
                    closable
                    @close="closeCalender">
                    <van-datetime-picker
                        type="date"
                        :value="currentDate"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @cancel="closeCalender"
                        @confirm="confirmCalender" />
                </van-popup>
            </li>
            <li>
                <van-cell title="团队身份" size="large" is-link :value="teamIdentity" @click="showTeamIdentity" />
                <van-popup :show="teamIdentityShow" round position="bottom" closable @close="closeTeamIdentity">
                    <van-picker
                        show-toolbar
                        :columns="teamIdentities"
                        @cancel="closeTeamIdentity"
                        @confirm="confirmTeamIdentity" />
                </van-popup>
            </li>
            <li v-if="formData.teamIdentity !== 1">
                <van-field
                    label="团队编号"
                    size="large"
                    :value="formData.teamNo"
                    @change="getTeamNo"
                    placeholder="请输入编号（只填数字）"
                    input-align="right"
                    type="digit" />
            </li>
            <li>
                <van-cell
                    title="十六人格"
                    size="large"
                    is-link
                    :value="formData.personality"
                    @click="showPersonality" />
                <van-popup :show="personalityShow" round position="bottom" closable @close="closePersonality">
                    <van-picker
                        show-toolbar
                        :columns="personalities"
                        @cancel="closePersonality"
                        @confirm="confirmPersonality" />
                </van-popup>
            </li>
            <li class="register__form__body--personality">
                <p @click="toPersonality">点击复制十六人格测试网站地址（可选）</p>
            </li>
        </ul>
        <div class="register__action">
            <van-button class="index__action-submit" block type="info" :disabled="isDisableSubBtn" @click="toRegister"
                >确定</van-button
            >
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar/Avatar.vue';
import { timeFormat } from '@/utils/format.js';
import { getOpenId, getPhoneNumber } from '@/utils/storage.js';
import { register } from '@/apis';
import { teamIdentityEnum } from '../enums';

export default {
    data() {
        return {
            avatar: '/static/default.jpg',
            formData: {
                openId: getOpenId(),
                phone: getPhoneNumber(),
                name: '',
                gender: null,
                birthday: '',
                teamIdentity: null,
                teamNo: null,
                personality: '暂无'
            },
            minDate: new Date(1950, 10, 1).getTime(),
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            calenderShow: false,
            teamIdentityShow: false,
            teamIdentities: teamIdentityEnum,
            personalityShow: false,
            personalities: [
                '暂无',
                'INTJ-A INTJ-T',
                'INTP-A INTP-T',
                'ENTJ-A ENTJ-T',
                'ENTP-A ENTP-T',
                'INFJ-A INFJ-T',
                'INFP-A INFP-T',
                'ENFJ-A ENFJ-T',
                'ENFP-A ENFP-T',
                'ISTJ-A ISTJ-T',
                'ISFJ-A ISFJ-T',
                'ESTJ-A ESTJ-T',
                'ESFJ-A ESFJ-T',
                'ISTP-A ISTP-T',
                'ISFP-A ISFP-T',
                'ESTP-A ESTP-T',
                'ESFP-A ESFP-T'
            ]
        };
    },
    components: { Avatar },
    computed: {
        teamIdentity: function () {
            return this.formData.teamIdentity !== null ? this.teamIdentities[this.formData.teamIdentity] : '暂无';
        },
        isDisableSubBtn: function () {
            const { name, gender, birthday, teamIdentity } = this.formData;
            return !(name && gender && birthday && teamIdentity);
        }
    },
    onLoad(option) {
        wx.showToast({
            title: '已找到您的信息~',
            icon: 'none',
            duration: 1000
        });
        let preData = JSON.parse(option.data);
        this.formData.name = preData.name;
        this.formData.gender = preData.gender == '男' ? '1' : '2';
        this.formData.teamIdentity = teamIdentityEnum.indexOf(preData.identity);
        this.formData.teamNo = preData.teamNo;
        this.formData.birthday = preData.birthday;
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: '基础信息完善'
        });
    },
    methods: {
        showCalender() {
            this.calenderShow = true;
        },
        closeCalender() {
            this.calenderShow = false;
        },
        confirmCalender(e) {
            this.calenderShow = false;
            this.formData.birthday = timeFormat(e.detail);
        },
        showTeamIdentity() {
            this.teamIdentityShow = true;
        },
        closeTeamIdentity() {
            this.teamIdentityShow = false;
        },
        confirmTeamIdentity(e) {
            this.teamIdentityShow = false;
            this.formData.teamIdentity = e.detail.index;
        },
        getName(e) {
            this.formData.name = e.detail;
        },
        getGender(e) {
            this.formData.gender = Number(e.detail);
        },
        getTeamNo(e) {
            this.formData.teamNo = e.detail;
        },
        formattedTime(time) {
            return time + 'T00:00:00';
        },
        showPersonality() {
            this.personalityShow = true;
        },
        closePersonality() {
            this.personalityShow = false;
        },
        confirmPersonality(e) {
            this.personalityShow = false;
            this.formData.personality = e.detail.value;
        },
        async toRegister() {
            if (this.formData.teamIdentity === 1) {
                this.formData.teamNo = 'Y';
            }
            if (
                this.formData.name !== '' &&
                this.formData.birthday !== '' &&
                this.formData.gender !== null &&
                this.formData.teamIdentity !== null &&
                this.formData.teamNo !== null
            ) {
                try {
                    const formData = { ...this.formData, birthday: this.formattedTime(this.formData.birthday) };
                    let data = await register(formData);
                    if (typeof data !== 'undefined') {
                        wx.reLaunch({
                            url: 'index'
                        });
                    } else {
                        wx.showToast({
                            title: '用户已注册，请直接登录~',
                            icon: 'none',
                            duration: 1000
                        });
                        setTimeout(() => {
                            wx.reLaunch({
                                url: 'index'
                            });
                        }, 1000);
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                wx.showToast({
                    title: '请补全信息~',
                    icon: 'none',
                    duration: 1000
                });
            }
        },
        toPersonality() {
            wx.setClipboardData({
                data: 'https://www.16personalities.com/ch/%E4%BA%BA%E6%A0%BC%E6%B5%8B%E8%AF%95',
                success: function () {
                    wx.getClipboardData({
                        success: function () {
                            wx.showToast({
                                title: '复制成功，请前往浏览器进行测试',
                                icon: 'none'
                            });
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.register {
    padding: 20px 30px;
}
.register__title-main {
    text-align: center;
    padding: 16px;
    font-size: 28px;
    font-weight: 500;
}
.register__title-sub {
    text-align: center;
    padding: 15px 16px;
    font-size: 20px;
}
.register__avatar {
    display: flex;
    justify-content: center;
}
.register__form__body {
    padding: 22px 0;
}
.register__input-gender {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    position: relative;
}
.register__input-gender:after {
    border-bottom: 1px solid #ebedf0;
    bottom: 0;
    box-sizing: border-box;
    content: ' ';
    left: 16px;
    pointer-events: none;
    position: absolute;
    right: 16px;
    transform: scaleY(0.5);
    transform-origin: center;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgb(235, 237, 240);
}
.register__action {
    margin: 50px auto 56px auto;
    padding: 0 25%;
}
.register__text {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: flex-end;
    padding: 2px 16px;
}

.register__form__body--personality {
    color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
}
</style>

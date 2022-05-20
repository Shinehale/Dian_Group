<!--
 * @Author       : TomSawyer2
 * @Date         : 2022-01-25 00:27:10
 * @LastEditors  : your name
 * @LastEditTime : 2022-02-18 15:03:48
 * @Description  : 提交人工审核判断是否允许该用户注册登录
 * @FilePath     : \BuddyMiniapp\src\pages\usercheck.vue
-->
<template>
    <div class="user-check__form">
        <div class="user-check__form__title">
            <span>输入您的信息</span>
        </div>
        <ul class="user-check__form__body">
            <li>
                <van-field
                    required
                    label="姓名"
                    size="large"
                    input-align="right"
                    :value="formData.name"
                    @change="getName"
                    placeholder="请输入姓名" />
            </li>
            <li>
                <!-- TODO: 手机号校验-->
                <van-field
                    label="手机号"
                    type="tel"
                    size="large"
                    input-align="right"
                    :value="formData.phone"
                    @change="getPhone"
                    placeholder="请输入手机号" />
            </li>
            <li>
                <van-cell
                    title="团队身份"
                    size="large"
                    is-link
                    input-align="right"
                    :value="teamIdentity"
                    @click="showTeamIdentity" />
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
                    input-align="right"
                    :value="formData.teamNo"
                    @change="getTeamNo"
                    placeholder="请输入团队编号"
                    type="number" />
            </li>
            <li>
                <van-field
                    label="备注"
                    size="large"
                    input-align="right"
                    :value="formData.note"
                    @change="getNote"
                    placeholder="请输入备注" />
            </li>
        </ul>
        <div class="user-check__form__submit">
            <van-button
                class="user-check__form__submit-btn"
                block
                type="info"
                :disabled="isDisableSubBtn"
                @click="toUserCheck"
                >提交</van-button
            >
        </div>
    </div>
</template>

<script>
import { userCheck } from '@/apis';
import { teamIdentityEnum } from '../enums';

export default {
    data() {
        return {
            avatar: '/static/default.jpg',
            formData: {
                name: '',
                teamIdentity: null,
                teamNo: null,
                note: '',
                phone: null
            },
            teamIdentityShow: false,
            teamIdentities: teamIdentityEnum
        };
    },
    computed: {
        teamIdentity: function () {
            return this.formData.teamIdentity !== null ? this.teamIdentities[this.formData.teamIdentity] : '暂无';
        },
        isDisableSubBtn: function () {
            return !(this.formData.name && this.formData.phone);
        }
    },
    onLoad(option) {
        let preData = JSON.parse(option.data);
        this.formData.name = preData.name;
        this.formData.teamNo = preData.teamNo;
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: '提交人工审核'
        });
    },
    methods: {
        getName(e) {
            this.formData.name = e.detail;
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
        getTeamNo(e) {
            this.formData.teamNo = e.detail;
        },
        getPhone(e) {
            this.formData.phone = e.detail;
        },
        getNote(e) {
            this.formData.note = e.detail;
        },
        async toUserCheck() {
            if (!this.formData.name) {
                uni.showToast({
                    title: '请补全信息',
                    icon: 'none',
                    duration: 1500
                });
            } else {
                // if (this.formData.teamIdentity === 1) {
                //     this.formData.teamNo = 'Y';
                // }
                // 预备队员不用传，统一身份审核时不用传
                if (this.formData.teamNo) {
                    // 团队编号不足三位时补零到三位
                    this.formData.teamNo = this.formData.teamNo.padStart(3, 0);
                }
                await userCheck(this.formData)
                    .then(() => {
                        uni.showToast({
                            title: '人工审核提交成功，通过后将会以短信形式通知',
                            icon: 'none',
                            duration: 2000
                        });
                        setTimeout(() => {
                            uni.reLaunch({
                                url: 'index'
                            });
                        }, 2000);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.user-check__form {
    padding: 32px;
}
.user-check__form__title {
    padding: 56px 16px;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
}

.user-check__form__body {
    & > li {
        padding: 4px 0;
    }
}

.user-check__form__submit {
    margin: 100px auto;
    padding: 0 25%;
}
</style>

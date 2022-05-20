<!--
 * @Author       : TomSawyer2
 * @Date         : 2022-01-25 00:27:10
 * @LastEditors  : your name
 * @LastEditTime : 2022-02-18 15:57:42
 * @Description  : 用户身份验证，是否为团队成员
 * @FilePath     : \BuddyMiniapp\src\pages\manualcheck.vue
-->
<template>
    <ul class="manualCheck">
        <li class="manualCheck__title">
            <p class="manualCheck__title-main">欢迎来到Buddy</p>
            <p class="manualCheck__title-sub">输入您的信息</p>
        </li>
        <ul class="manualCheck__form__body">
            <li>
                <van-field
                    required
                    label="姓名"
                    size="large"
                    input-align="right"
                    placeholder="请输入姓名"
                    :value="formData.name"
                    @change="getName" />
            </li>
            <li>
                <van-field
                    required
                    size="large"
                    type="number"
                    label="团队编号"
                    input-align="right"
                    placeholder="请输入团队编号"
                    :value="formData.teamNo"
                    @change="getTeamNo" />
                <span class="manualCheck__text">只填数字，预备队员不填</span>
            </li>
        </ul>
        <li class="manualCheck__form__submit">
            <van-button class="index__action-submit" block type="info" :disabled="isDisableSubBtn" @click="toCheck"
                >提交</van-button
            >
        </li>
    </ul>
</template>

<script>
import { manualCheck } from '@/apis';
import { teamIdentityEnum } from '../enums';

export default {
    data() {
        return {
            avatar: '/static/default.jpg',
            formData: {
                name: '',
                teamNo: null
            },
            teamIdentities: teamIdentityEnum
        };
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: '身份验证'
        });
    },
    computed: {
        isDisableSubBtn: function () {
            return !this.formData.name;
        }
    },

    methods: {
        getName(e) {
            this.formData.name = e.detail;
        },
        getTeamNo(e) {
            this.formData.teamNo = e.detail;
        },
        async toCheck() {
            if (!this.formData.name) {
                uni.showToast({
                    title: '请补全信息',
                    icon: 'error',
                    duration: 1500
                });
            } else {
                try {
                    if (this.formData.teamNo) {
                        // 团队编号不足三位时补零到三位
                        this.formData.teamNo = this.formData.teamNo.padStart(3, 0);
                    }
                    let data = await manualCheck(this.formData);
                    const res = data.data.data;
                    if (res === null) {
                        const that = this;
                        uni.showModal({
                            title: '未找到您的信息',
                            content: '是否申请人工身份审核',
                            success: function (res) {
                                // 点击确定
                                if (res.confirm) {
                                    uni.navigateTo({
                                        url: `usercheck?data=${JSON.stringify(that.formData)}`
                                    });
                                }
                            }
                        });
                    } else {
                        uni.navigateTo({
                            url: `register?data=${JSON.stringify(res)}`
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.manualCheck {
    padding: 32px;
}
.manualCheck__form__body {
    margin: 56px 0;

    & > li {
        padding: 4px 0;
    }
}
.manualCheck__title-main {
    text-align: center;
    padding: 16px;
    font-size: 28px;
    font-weight: 500;
}
.manualCheck__title-sub {
    text-align: center;
    padding: 22px 16px;
    font-size: 20px;
}
.manualCheck__avatar {
    padding: 40px 0px;
    display: flex;
    justify-content: center;
}

.manualCheck__form__submit {
    margin: 150px auto 100px auto;
    padding: 0 25%;
}
.manualCheck__text {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: flex-end;
    padding: 2px 16px;
}
</style>

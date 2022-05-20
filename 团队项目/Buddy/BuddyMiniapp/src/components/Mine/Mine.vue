<!--
 * @Author: GuoXu
 * @Date: 2021-11-19 22:59:23
 * @LastEditTime : 2022-02-19 04:05:25
 * @LastEditors  : GuoXu
 * @Description: 我的页面
 * @FilePath     : \BuddyMiniapp\src\components\Mine\Mine.vue
-->
<template>
    <div class="mine">
        <div class="mine__introduction">
            <div class="mine__identity-and-editInfo">
                <span v-if="isBuddy" @click="navigateToApplyToBeBuddy" class="mine__buddy-logo--is-buddy">
                    Buddy认证
                </span>
                <span v-else @click="navigateToApplyToBeBuddy" class="mine__buddy-logo--not-buddy">申请成为Buddy</span>
                <span @click="toPersonalInfoDetail" class="iconfont icon-bianji mine__edit-icon"></span>
            </div>
            <ul>
                <li class="mine__avatar">
                    <img v-if="myInfo.avatar" :src="myInfo.avatar" />
                    <img v-else src="/static/default.jpg" />
                </li>
                <li class="mine__name">
                    <span v-if="myInfo.name">{{ myInfo.name }}</span>
                    <span v-else>昵称</span>
                </li>
                <li v-if="isBuddy" class="mine__brief-introduction">
                    <span v-if="isBuddy && myInfo.briefIntroduction">
                        {{ myInfo.briefIntroduction }}
                    </span>
                    <span v-else>描述一下你的研究方向</span>
                </li>
                <li class="mine__self-introduction">
                    <span v-if="isBuddy && myInfo.selfIntroduction">{{ myInfo.selfIntroduction }}</span>
                    <span v-else-if="isBuddy">描述一下你的性格</span>
                    <span v-else>这是一句自我介绍~</span>
                </li>
                <li v-if="isBuddy && myInfo.guideDirections.length !== 0" class="mine__guide-direction">
                    <span>指导方向:</span>
                    <div v-for="(field, index) in myInfo.guideDirections.slice(0, 3)" :key="index">
                        <van-tag class="mine__guide-direction-item" size="medium" plain type="primary">
                            {{ field }}
                        </van-tag>
                    </div>
                </li>
                <li v-if="isBuddy && myInfo.personalLabels.length !== 0" class="mine__personal-label">
                    <span>个人标签:</span>
                    <div v-for="(label, index) in myInfo.personalLabels.slice(0, 3)" :key="index">
                        <van-tag class="mine__personal-label-item" size="medium" plain type="primary">
                            {{ label }}
                        </van-tag>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mine__personal-information">
            <ul>
                <li>
                    <span class="iconfont icon-wode"></span>
                    <span> {{ genderAndAgeAndTeamIdentityAndTeamNo }} </span>
                </li>
                <li v-if="isBuddy && myInfo.educationBackground">
                    <span class="iconfont icon-boshimao"></span>
                    <span>{{ myInfo.educationBackground }}</span>
                </li>
                <li v-if="isBuddy && myInfo.city">
                    <span class="iconfont icon-dingwei"></span>
                    <span>{{ myInfo.city }}</span>
                </li>
                <li v-if="isBuddy && companyAndPosition !== ''">
                    <span class="iconfont icon-mingpian"></span>
                    <span>{{ companyAndPosition }}</span>
                </li>
                <li v-if="myInfo.email">
                    <span class="iconfont icon-xinfeng"></span>
                    <span>{{ myInfo.email }}</span>
                </li>
            </ul>
        </div>
        <div class="mine__software-information">
            <ul>
                <li @click="navigateToPersonalInfoDetail"><span>账号信息</span><right-arrow /></li>
                <!-- <li><span>使用须知</span><right-arrow /></li> -->
                <li @click="navigateToFeedbackAndSuggestions"><span>反馈与建议</span><right-arrow /></li>
                <li @click="navigateToInstructionsForUse"><span>使用指南</span><right-arrow /></li>
                <li @click="navigateToAboutThisSmallProgram"><span>关于此小程序</span><right-arrow /></li>
            </ul>
        </div>
        <!-- <div class="mine__log-out">
            <van-button type="info" @click="confirmExit">退出登录</van-button>
        </div> -->
    </div>
</template>

<script>
import RightArrow from '../RightArrow/RightArrow.vue';
import { getMyInfo } from '@/apis';
import { teamIdentityEnum, genderEnum } from '@/enums';
export default {
    components: { RightArrow },
    data() {
        return {
            myInfo: {
                name: '',
                avatar: '',
                age: 0,
                identity: '',
                briefIntroduction: '',
                selfIntroduction: '',
                guideDirections: [],
                personalLabels: [],
                gender: '',
                teamIdentity: '',
                teamNo: '',
                educationBackground: '',
                city: '',
                company: '',
                position: '',
                email: ''
            }
        };
    },
    computed: {
        isBuddy: function () {
            return this.myInfo.identity === 'Buddy' ? true : false;
        },
        genderAndAgeAndTeamIdentityAndTeamNo: function () {
            if (this.myInfo.teamNo != '0' && this.myInfo.teamNo != 'Y' && this.myInfo.teamNo != null) {
                return `${this.myInfo.gender} | ${this.myInfo.age}岁 | ${this.myInfo.teamIdentity} | ${this.myInfo.teamNo}号`;
            } else {
                return `${this.myInfo.gender} | ${this.myInfo.age}岁 | ${this.myInfo.teamIdentity} | 暂无编号`;
            }
        },
        companyAndPosition: function () {
            if (`${this.myInfo.company}-${this.myInfo.position}` !== '-') {
                return `${this.myInfo.company}-${this.myInfo.position}`;
            } else {
                return '';
            }
        }
    },
    created() {
        this.setMyInfoData();
        uni.setNavigationBarTitle({
            title: '我的'
        });
    },
    methods: {
        navigateToApplyToBeBuddy() {
            uni.navigateTo({ url: `applyToBeBuddy?isBuddy=${this.isBuddy}` });
        },
        navigateToPersonalInfoDetail() {
            uni.navigateTo({ url: 'personalInfoDetail' });
        },
        navigateToInstructionsForUse() {
            uni.navigateTo({ url: 'instructionsForUse' });
        },
        navigateToAboutThisSmallProgram() {
            uni.navigateTo({ url: 'aboutThisSmallProgram' });
        },
        navigateToFeedbackAndSuggestions() {
            uni.navigateTo({ url: 'feedbackAndSuggestions' });
        },
        /**
         * @description 将后端返回的数据格式化为前端的格式
         * @param {Object} data 后端返回的个人信息数据
         * @return {Object} formattedMyInfoData 已格式化的数据
         */ formatMyInfoData(data) {
            const formattedMyInfoData = {
                ...this.myInfo,
                avatar: data.avatarUrl,
                name: data.name === null ? '' : data.name,
                age: data.age === null ? 0 : data.age,
                gender: genderEnum[data.gender],
                teamNo: data.teamNo === null ? '' : data.teamNo,
                educationBackground:
                    data.additionalInfo.study_experience === null ? '' : data.additionalInfo.study_experience,
                teamIdentity: teamIdentityEnum[data.teamIdentity],
                identity: data.role === 20 ? 'Buddy' : data.role === 30 ? 'Buddy' : 'noBuddy',
                city: data.city === null ? '' : data.city,
                company: data.additionalInfo.now_company === null ? '' : data.additionalInfo.now_company,
                position: data.additionalInfo.now_duty === null ? '' : data.additionalInfo.now_duty,
                guideDirections: data.additionalInfo.direction === null ? [] : data.additionalInfo.direction,
                personalLabels: data.additionalInfo.tag === null ? [] : data.additionalInfo.tag,
                email: data.email === null ? '' : data.email,
                briefIntroduction: data.introduction === null ? '' : data.introduction,
                selfIntroduction:
                    data.additionalInfo.self_description === null ? '' : data.additionalInfo.self_description
            };
            return formattedMyInfoData;
        },
        /**
         * @description 设置个人信息
         */
        async setMyInfoData() {
            await getMyInfo()
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.myInfo = this.formatMyInfoData(data);
                        uni.stopPullDownRefresh();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        toPersonalInfoDetail() {
            let that = this;
            uni.navigateTo({
                url: 'personalInfoDetail',
                events: {
                    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                    myInfoHasBeenChanged: function () {
                        that.setMyInfoData();
                    }
                }
            });
        },
        confirmExit() {
            uni.showModal({
                title: '提示',
                content: '确定退出吗'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.mine {
    background-color: $BuddyMiniApp-bg-color-primary;
}

// 头像、指导方向、个人标签、身份认证、编辑信息
.mine__introduction {
    display: flex;
    flex-direction: column;
    background-color: $white;
    padding: 18px 0 12px 0;
    // Buddy徽标和编辑图标
    .mine__identity-and-editInfo {
        float: left;
        z-index: 2;
        height: 0px;
        display: flex;
        justify-content: space-between;
        background-color: $white;

        & > span {
            box-sizing: border-box;
            height: 24px;
        }

        // Buddy徽标
        .mine__buddy-logo--is-buddy {
            margin-left: 16px;
            font-size: 14px;
            line-height: 24px;
            color: $white;
            padding: 0 5px;
            border-radius: 2px;
            // vant组件库主题蓝色
            background-color: $BuddyMiniApp-color-primary;
        }
        .mine__buddy-logo--not-buddy {
            margin-left: 16px;
            font-size: 12px;
            line-height: 24px;
            color: $white;
            padding: {
                left: 20rpx;
                right: 20rpx;
            }
            border-radius: 3px;
            background-color: $BuddyMiniApp-color-primary;
        }

        .mine__edit-icon {
            padding-right: 16px;
            font: {
                size: 23px;
                weight: 500;
            }
        }
    }

    & > ul {
        display: flex;
        flex-direction: column;
    }
    & > ul > li {
        display: flex;
        align-items: center;
    }
    .mine__avatar {
        width: 100%;
        & > img {
            height: $height-avatar-mine;
            width: $width-avatar-mine;
            margin: 0 auto;
            display: block;
            border-radius: 50%;
        }
    }
    .mine__name {
        padding: 3px;
        font: {
            size: 24px;
            weight: 600;
        }
        justify-content: center;
        text-align: center;
    }
    .mine__brief-introduction {
        // 字少时居中，字多时左对齐
        font-size: 14px;
        color: #b2b2b2;
        justify-content: center;
        text-align: center;
        padding: 4px 16px;

        & > span {
            text-align: left;
        }
    }
    .mine__self-introduction {
        // 字少时居中，字多时左对齐
        font-size: 14px;
        color: #b2b2b2;
        justify-content: center;
        text-align: center;
        padding: 4px 16px;

        & > span {
            text-align: left;
        }
    }
    .mine__guide-direction {
        padding: 6px;
        font-size: 17px;
        padding-left: 16px;
    }
    .mine__guide-direction-item {
        margin-left: 16px;
    }
    .mine__personal-label {
        padding: 6px;
        font-size: 17px;
        padding-left: 16px;
    }
    .mine__personal-label-item {
        margin-left: 16px;
    }
}

// 具体的个人信息，如性别、教育经历、位置等
.mine__personal-information {
    margin-top: 15rpx;
    background-color: $white;
    & > ul > li {
        height: 56px;
        display: flex;
        align-items: center;
        position: relative;
        font: {
            size: 17px;
        }
    }
    & > ul > li:after {
        content: '';
        position: absolute;
        left: 16px;
        bottom: -0.01rpx;
        width: 100%;
        height: 0.1rpx;
        background-color: $BuddyMiniApp-divider-color;
    }
    & > ul > li > span:nth-child(2n + 1) {
        padding-left: 16px;
        font: {
            size: 20px;
            weight: 500;
        }
    }
    & > ul > li > span:nth-child(2n + 2) {
        padding-left: 16px;
    }
}

// 账号信息、使用须知、版本信息、反馈与建议
.mine__software-information {
    margin-top: 15rpx;
    background-color: $white;
    & > ul > li {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        font-size: 17px;
    }
    & > ul > li:after {
        content: '';
        position: absolute;
        left: 16px;
        bottom: -0.01rpx;
        width: 100%;
        height: 0.1rpx;
        background-color: $BuddyMiniApp-divider-color;
    }
}

// 退出登录
.mine__log-out {
    background-color: $white;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15rpx;
}
</style>

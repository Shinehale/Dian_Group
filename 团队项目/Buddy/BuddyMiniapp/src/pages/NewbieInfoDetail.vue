<!--
 * @Author: HeQikai
 * @LastEditors  : GuoXu
 * @Description: buddy看到的newbie个人信息页面
-->
<template>
    <div class="mine">
        <div class="mine__introduction">
            <div class="mine__identity-and-editInfo">
                <span class="mine__buddy-logo--not-buddy">Newbie</span>
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
                <li class="mine__self-introduction">
                    <span v-if="myInfo.selfIntroduction">{{ myInfo.selfIntroduction }}</span>
                    <span v-else>这个人很懒，还没有写自我介绍~</span>
                </li>
            </ul>
        </div>
        <div class="mine__personal-information">
            <ul>
                <li>
                    <span class="iconfont icon-wode"></span>
                    <span> {{ genderAndTeamIdentity }} </span>
                </li>
                <li v-if="myInfo.city">
                    <span class="iconfont icon-dingwei"></span>
                    <span>{{ myInfo.city }}</span>
                </li>
                <li v-if="myInfo.email">
                    <span class="iconfont icon-xinfeng"></span>
                    <span>{{ myInfo.email }}</span>
                </li>
            </ul>
        </div>
        <div>
            <van-cell size="large" class="contact" title="联系方式" :value="myInfo.contactInfo" />
        </div>
    </div>
</template>

<script>
import { getUserInfo } from '@/apis';
import { teamIdentityEnum, genderEnum } from '@/enums';

export default {
    data() {
        return {
            userId: Number,
            myInfo: {
                name: '',
                avatar: '',
                selfIntroduction: '',
                gender: '',
                age: 0,
                teamIdentity: '',
                teamNo: '',
                city: '',
                email: '',
                contactInfo: ''
            }
        };
    },
    onLoad(options) {
        uni.setNavigationBarTitle({
            title: 'Newbie'
        });
        this.userId = options.userId;
        this.setUserInfoData();
    },
    computed: {
        genderAndTeamIdentity: function () {
            return `${this.myInfo.gender} | ${this.myInfo.age}岁 | ${this.myInfo.teamIdentity} | ${this.myInfo.teamNo}`;
        }
    },
    methods: {
        async setUserInfoData() {
            await getUserInfo({ userId: this.userId })
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.myInfo.name = data.name;
                        this.myInfo.avatar = data.avatarUrl;
                        this.myInfo.selfIntroduction = data.additionalInfo.self_description;
                        this.myInfo.gender = genderEnum[data.gender];
                        this.myInfo.age = data.age;
                        this.myInfo.teamIdentity = teamIdentityEnum[data.teamIdentity];
                        this.myInfo.teamNo =
                            data.teamNo == '0' || data.teamNo == 'Y' || data.teamNo == null
                                ? '暂无编号'
                                : data.teamNo + '号';
                        this.myInfo.city = data.city;
                        this.myInfo.email = data.email;
                        this.myInfo.contactInfo = data.contactInfo;
                    } else {
                        console.log('获取newbie用户信息出错');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.mine {
    background-color: $BuddyMiniApp-bg-color-primary;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

// 头像、指导方向、个人标签、身份认证、编辑信息
.mine__introduction {
    display: flex;
    flex-direction: column;
    background-color: $white;
    padding: 12px 0 12px 0;
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
        .mine__buddy-logo--not-buddy {
            margin-left: 16px;
            font-size: 14px;
            line-height: 24px;
            color: #fff;
            padding: {
                left: 20rpx;
                right: 20rpx;
            }
            border-radius: 3px;
            // vant组件库主题蓝色
            background-color: $BuddyMiniApp-color-primary;
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
    .mine__self-introduction {
        height: 22px;
        font-size: 14px;
        color: #b2b2b2;
        justify-content: center;
        text-align: center;
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
</style>

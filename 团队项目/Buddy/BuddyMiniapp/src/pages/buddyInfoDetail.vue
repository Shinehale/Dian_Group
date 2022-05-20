<template>
    <div class="buddyInfoDetail" v-if="show">
        <div class="buddyInfoDetail__introduction">
            <div class="buddyInfoDetail__identity-and-editInfo">
                <span class="buddyInfoDetail__buddy-logo--is-buddy">Buddy认证</span>
            </div>
            <ul>
                <li class="buddyInfoDetail__avatar">
                    <img mode="aspectFill" :src="buddyInfo.avatarUrl || '/static/default.jpg'" />
                </li>
                <li class="buddyInfoDetail__name">
                    <span v-if="buddyInfo.name">{{ buddyInfo.name }}</span>
                    <span v-else>昵称</span>
                </li>
                <li class="buddyInfoDetail__brief-introduction">
                    <span v-if="buddyInfo.introduction">
                        {{ buddyInfo.introduction }}
                    </span>
                    <span v-else>这个人很懒，还没有写研究方向~</span>
                </li>
                <li class="buddyInfoDetail__self-introduction">
                    <span v-if="buddyInfo.additionalInfo.self_description">{{
                        buddyInfo.additionalInfo.self_description
                    }}</span>
                    <span v-else>ta还没有写自我介绍~</span>
                </li>
                <li v-if="buddyInfo.additionalInfo.direction.length !== 0" class="buddyInfoDetail__guide-direction">
                    <span class="buddyInfoDetail__guide-direction__label">指导方向:</span>
                    <span v-for="(direction, index) in buddyInfo.additionalInfo.direction" :key="index">
                        <van-tag class="buddyInfoDetail__guide-direction-item" size="medium" plain type="primary">
                            {{ direction }}
                        </van-tag>
                    </span>
                </li>
                <li v-if="buddyInfo.additionalInfo.tag.length !== 0" class="buddyInfoDetail__personal-label">
                    <span class="buddyInfoDetail__personal-label__label">个人标签:</span>
                    <span v-for="(tag, index) in buddyInfo.additionalInfo.tag" :key="index">
                        <van-tag class="buddyInfoDetail__personal-label-item" size="medium" plain type="primary">
                            {{ tag }}
                        </van-tag>
                    </span>
                </li>
            </ul>
        </div>

        <div class="buddyInfoDetail__personal-information">
            <ul>
                <li>
                    <span class="iconfont icon-wode"></span>
                    <span> {{ showGender }} | {{ buddyInfo.age }}岁 | {{ showIdentity }} | {{ showTeamNo }} </span>
                </li>
                <li v-if="buddyInfo.city">
                    <span class="iconfont icon-dingwei"></span>
                    <span>{{ buddyInfo.city }}</span>
                </li>
                <li v-if="buddyInfo.additionalInfo.now_company && buddyInfo.additionalInfo.now_duty">
                    <span class="iconfont icon-mingpian"></span>
                    <span>{{ buddyInfo.additionalInfo.now_company }}-{{ buddyInfo.additionalInfo.now_duty }}</span>
                </li>
                <li v-if="buddyInfo.additionalInfo.work_experience.length > 0">
                    <span class="iconfont icon-shijian"></span>
                    <div class="buddyInfoDetail__personal-information-work">
                        <div v-for="(work, index) in buddyInfo.additionalInfo.work_experience" :key="index">
                            <span class="buddyInfoDetail__personal-information-work__work-item">{{ work }}</span>
                        </div>
                    </div>
                </li>
                <li v-if="buddyInfo.email">
                    <span class="iconfont icon-xinfeng"></span>
                    <span>{{ buddyInfo.email }}</span>
                </li>
            </ul>
        </div>

        <div class="buddyInfoDetail__personal-information">
            <van-cell size="large" class="contact" title="联系方式" :value="buddyInfo.contactInfo" />
        </div>
        <div class="buddyinfoDetail__apply">
            <van-button v-if="userId !== buddyInfo.id && showApplyButton" type="info" size="medium" @click="applyBuddy"
                >申请结对</van-button
            >
        </div>
        <van-popup :show="chooseBuddyShow" round position="bottom" @close="closeChooseBuddy">
            <template class="chooseBuddy">
                <van-cell title="Buddy" size="large" is-link :value="chooseBuddyInfo.name" />
                <van-field
                    :autosize="{ maxHeight: 500, minHeight: 150 }"
                    label="申请理由"
                    type="textarea"
                    placeholder="输入你想对ta说的"
                    show-word-limit
                    :value="applyReason"
                    :maxlength="200"
                    @input="bindReason($event)" />
                <van-button
                    class="chooseBuddy-action"
                    hairline
                    size="normal"
                    block
                    type="info"
                    :disabled="isDisableSubBtn"
                    @click="confirmBuddy"
                    >提交</van-button
                >
            </template>
        </van-popup>
    </div>
</template>

<script>
import { getUserInfo } from '@/apis';
import { teamIdentityEnum, genderEnum } from '@/enums';
import { applyBuddy, getMyInfo, getBuddiedList } from '@/apis';

export default {
    data() {
        return {
            userId: 0,
            buddyInfo: {},
            show: false,
            chooseBuddyShow: false,
            chooseBuddyInfo: {},
            applyReason: '',
            showApplyButton: true
        };
    },
    async onLoad(option) {
        let data = option.userId;
        this.buddyInfo = (await getUserInfo({ userId: option.id })).data.data;
        this.show = true;
        this.userId = data;
        this.chooseBuddyInfo = this.buddyInfo;
        this.judgeRelation();
    },
    methods: {
        applyBuddy() {
            this.chooseBuddyShow = true;
        },
        closeChooseBuddy() {
            this.chooseBuddyShow = false;
        },
        bindReason(e) {
            this.applyReason = e.detail;
        },
        async confirmBuddy() {
            // 检测联系方式是否为空
            if (!(await getMyInfo()).data.data.contactInfo) {
                uni.showModal({
                    title: '必要信息缺失',
                    content: '申请之前请先补充联系方式',
                    success: function (res) {
                        // 点击确定
                        if (res.confirm) {
                            uni.navigateTo({
                                // 预留联系方式需补充，且补充完成后需返回此页面
                                url: 'personalInfoDetail?reservedContact=undefined&isNavigateBackRequired=true'
                            });
                        }
                    }
                });
            } else {
                await applyBuddy({ buddyId: this.chooseBuddyInfo.id, reason: this.applyReason })
                    .then((res) => {
                        if (res.data.code == 1) {
                            wx.showToast({
                                title: '申请成功~',
                                icon: 'none',
                                duration: 1000
                            });
                            this.chooseBuddyShow = false;
                            this.applyReason = '';
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        isDisableSubBtn: function () {
            return !this.applyReason;
        },
        async judgeRelation() {
            await getBuddiedList().then((res) => {
                let lis = res.data.data;
                for (let i = 0; i < lis.length; i++) {
                    // console.log(lis[i].personId);
                    if (lis[i].personId == this.chooseBuddyInfo.id) {
                        this.showApplyButton = false;
                    }
                }
            });
        }
    },
    computed: {
        isBuddy: function () {
            return this.buddyInfo.identity === 'Buddy' ? true : false;
        },
        showIdentity() {
            return teamIdentityEnum[this.buddyInfo.teamIdentity];
        },
        showGender() {
            return genderEnum[this.buddyInfo.gender];
        },
        showTeamNo() {
            if (this.buddyInfo.teamNo != '0' && this.buddyInfo.teamNo != 'Y' && this.buddyInfo.teamNo != null) {
                return `${this.buddyInfo.teamNo}号`;
            } else {
                return '暂无编号';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.buddyInfoDetail {
    background-color: $BuddyMiniApp-bg-color-primary;
}

// 头像、指导方向、个人标签、身份认证、编辑信息
.buddyInfoDetail__introduction {
    display: flex;
    flex-direction: column;
    background-color: $white;
    padding: 18px 0 12px 0;
    // Buddy徽标和编辑图标
    .buddyInfoDetail__identity-and-editInfo {
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
        .buddyInfoDetail__buddy-logo--is-buddy {
            margin-left: 16px;
            font-size: 14px;
            line-height: 24px;
            color: $white;
            padding: 0 5px;
            border-radius: 2px;
            // vant组件库主题蓝色
            background-color: $BuddyMiniApp-color-primary;
        }
        .buddyInfoDetail__buddy-logo--not-buddy {
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

        .buddyInfoDetail__edit-icon {
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
    .buddyInfoDetail__avatar {
        width: 100%;

        & > img {
            height: $height-avatar-mine;
            width: $width-avatar-mine;
            margin: 0 auto;
            display: block;
            border-radius: 50%;
        }
    }
    .buddyInfoDetail__name {
        padding: 3px;
        font: {
            size: 24px;
            weight: 600;
        }
        justify-content: center;
        text-align: center;
    }
    .buddyInfoDetail__brief-introduction {
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
    .buddyInfoDetail__self-introduction {
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
    .buddyInfoDetail__guide-direction {
        padding: 6px 16px;

        &__label {
            padding-right: 10px;
        }
    }
    .buddyInfoDetail__guide-direction-item {
        margin-right: 10px;
    }
    .buddyInfoDetail__personal-label {
        padding: 6px 16px;

        &__label {
            padding-right: 10px;
        }
    }
    .buddyInfoDetail__personal-label-item {
        margin-right: 10px;
    }
}

// 具体的个人信息，如性别、教育经历、位置等
.buddyInfoDetail__personal-information {
    margin-top: 15rpx;
    background-color: $white;
    & > ul > li {
        padding: 12px 16px;
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
        font: {
            size: 20px;
            weight: 500;
        }
    }
    & > ul > li > span:nth-child(2n + 2) {
        padding-left: 16px;
    }
    &-work {
        padding-left: 15px;
        display: flex;
        flex-direction: column;
    }
}

.contact {
    height: 56px !important;
    font-size: 15px;
    ::v-deep .van-cell__value {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    ::v-deep .van-cell__title {
        flex: none;
    }
}
.buddyinfoDetail__apply {
    font: size 15px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.chooseBuddy-action {
    padding: 24px 0 24px 0;
    display: flex;
    width: 90px;
    margin: auto;
}
</style>

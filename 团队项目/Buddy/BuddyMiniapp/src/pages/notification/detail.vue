<template>
    <div class="notification-detail">
        <scroll-view scroll-y class="scroll">
            <button class="person" @click="openPersonInfo">
                <p class="person__text1">
                    {{ thatIdentity }}
                </p>
                <p class="person__text2">
                    {{ notiInfoDetail.name }}
                </p>
                <img
                    class="person__head-avatar"
                    mode="aspectFit"
                    :src="notiInfoDetail.avatarUrl || 'https://img01.yzcdn.cn/vant/cat.jpeg'" />
                <div class="right-arrow">
                    <van-icon name="arrow" />
                </div>
            </button>
            <div class="apply-reason">
                <div class="nail"></div>
                <p class="reason__text1">申请理由</p>
                <text class="reason__time" decode="true">{{ notiInfoDetail.applyTime }}</text>
                <p class="reason__text2">
                    {{ notiInfoDetail.reason === null ? '（空）' : notiInfoDetail.reason }}
                </p>
            </div>
            <div class="reason2" v-if="isReason2">
                <div class="nail"></div>
                <p class="reason__text1">
                    {{ reason2StatusText }}
                </p>
                <text class="reason__time" decode="true">{{
                    notiInfoDetail.endTime === null ? '' : notiInfoDetail.endTime
                }}</text>
                <p class="reason__text2" v-if="notiInfoDetail.status != -2">
                    {{ notiInfoDetail.endReason === null ? '（空）' : notiInfoDetail.endReason }}
                </p>
            </div>
            <div class="nail"></div>
            <div class="agree-refuse" v-if="isUnaccepted">
                <button class="refuse" hover-class="refuse__hover" @click="refuseApply">拒绝</button>
                <button class="agree" hover-class="agree__hover" @click="agreeApply">接受</button>
            </div>
            <text class="status-hint" v-else>
                {{ statusHint }}
            </text>
            <div class="agree-refuse" v-if="notiInfoDetail.sender && notiInfoDetail.status == 1">
                <button class="cancel" hover-class="cancel__hover" @click="cancelApply">撤销</button>
            </div>
            <div class="refuse-confirm__cover" v-if="isRefusing">
                <div class="refuse-menu">
                    <p class="refuse-menu__tips">拒绝理由</p>
                    <div
                        v-for="(item, index) in refuseReasonMenu"
                        :key="index"
                        class="refuse-menu__item"
                        hover-class="refuse-menu__item__hover"
                        @click="refuseReasonItemId = index">
                        <div class="menu-circle-outer" />
                        <div v-if="index == refuseReasonItemId" class="menu-circle-inner" />
                        <text class="menu-text">
                            {{ item }}
                        </text>
                    </div>
                    <div
                        class="refuse-menu__item"
                        hover-class="refuse-menu__item__hover"
                        @click="
                            refuseReasonItemId = refuseReasonMenu.length;
                            isRefusing = false;
                            isOtherReason = true;
                        ">
                        <div class="menu-circle-outer" />
                        <div v-if="refuseReasonMenu.length == refuseReasonItemId" class="menu-circle-inner" />
                        <text class="menu-text">其他</text>
                    </div>
                    <div class="refuse-menu__bottom" />
                    <div class="refuse-confirm__cancel">
                        <button
                            class="refuse-confirm__button"
                            hover-class="refuse-confirm__button__hover"
                            @click="refuseCancel">
                            取消
                        </button>
                    </div>
                    <div class="refuse-confirm__confirm">
                        <button
                            class="refuse-confirm__button"
                            hover-class="refuse-confirm__button__hover"
                            @click="refuseConfirm">
                            确定
                        </button>
                    </div>
                </div>
            </div>
            <div class="refuse-confirm__cover" v-if="isOtherReason">
                <div class="refuse-confirm">
                    <p class="refuse-confirm__tips">拒绝理由</p>
                    <p class="refuse-confirm__counter">
                        <span :style="{ color: refuseReasonCounterColor }">{{ refuseReason.length }}</span
                        ><span>/140</span>
                    </p>
                    <textarea
                        class="refuse-confirm__reason"
                        v-model="refuseReason"
                        placeholder="请输入拒绝理由（必填）"
                        @input="inputRefuseReason">
                    </textarea>
                    <div class="refuse-confirm__cancel">
                        <button
                            class="refuse-confirm__button"
                            hover-class="refuse-confirm__button__hover"
                            @click="refuseCancel">
                            取消
                        </button>
                    </div>
                    <div class="refuse-confirm__confirm">
                        <button
                            class="refuse-confirm__button"
                            hover-class="refuse-confirm__button__hover"
                            @click="otherReasonConfirm">
                            确定
                        </button>
                    </div>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
import { agreeApplyAPI, refuseApplyAPI, readAPI, undoApply } from '@/apis';
export default {
    name: 'NotificationDetail',
    data() {
        return {
            notiInfoDetail: Object,
            isRefusing: Boolean, //是否在输入拒绝理由
            isReason2: false, //是否显示拒绝理由或解散理由
            reason2StatusText: String, //为“拒绝理由”或“解散理由”
            isUnaccepted: false, //是否是待处理（可处理）状态
            thatIdentity: String, //对方的身份，Newbie或Buddy
            isOtherReason: false, //是否在输入拒绝理由
            refuseReason: '', //“拒绝理由”文本域中的内容
            refuseReasonCounterColor: 'rgb(127, 127, 127)',
            statusHint: String,
            refuseReasonMenu: [
                '能力不合适，不匹配，建议换buddy',
                '申请理由描述不明确',
                '近期没有时间',
                '申请态度不诚恳'
            ],
            refuseReasonItemId: -1
        };
    },
    onLoad(options) {
        this.notiInfoDetail = JSON.parse(decodeURIComponent(options.notiInfoDetail));
        this.isRefusing = JSON.parse(options.preRefusing);
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: '通知详情'
        });
        if (this.notiInfoDetail.sender) {
            //如果是“我发出的”
            this.thatIdentity = 'Buddy';
            this.isUnaccepted = false;
            if (this.notiInfoDetail.status == 1) {
                this.isReason2 = false;
                this.statusHint = '等待审核中~';
            } else if (this.notiInfoDetail.status == 2) {
                this.isReason2 = false;
                this.statusHint = '申请已通过~\n点击上方用户名可查看联系方式';
            } else if (this.notiInfoDetail.status == -1) {
                this.isReason2 = true;
                this.reason2StatusText = '拒绝理由';
                this.statusHint = '对方已拒绝';
            } else if (this.notiInfoDetail.status == 3) {
                this.isReason2 = true;
                this.reason2StatusText = '解除理由';
                this.statusHint = '结对已解除';
            } else if (this.notiInfoDetail.status == -2) {
                this.isReason2 = true;
                this.reason2StatusText = '撤销时间';
                this.statusHint = '已撤销申请';
            }
        } else {
            //如果是“我收到的”
            this.thatIdentity = 'Newbie';
            if (this.notiInfoDetail.status == 1) {
                this.isReason2 = false;
                this.isUnaccepted = true;
            } else if (this.notiInfoDetail.status == 2) {
                this.isReason2 = false;
                this.isUnaccepted = false;
                this.statusHint = '已接受申请~\n点击上方用户名可查看联系方式';
            } else if (this.notiInfoDetail.status == -1) {
                this.isReason2 = true;
                this.isUnaccepted = false;
                this.reason2StatusText = '拒绝理由';
                this.statusHint = '已拒绝申请~';
            } else if (this.notiInfoDetail.status == 3) {
                this.isReason2 = true;
                this.isUnaccepted = false;
                this.reason2StatusText = '解除理由';
                this.statusHint = '结对已解除';
            } else if (this.notiInfoDetail.status == -2) {
                this.isReason2 = true;
                this.isUnaccepted = false;
                this.reason2StatusText = '撤销时间';
                this.statusHint = '对方已撤销';
            }
        }
        this.read();
    },
    methods: {
        openPersonInfo() {
            if (this.notiInfoDetail.sender) {
                wx.navigateTo({
                    url: '../buddyInfoDetail?id=' + this.notiInfoDetail.userId
                });
            } else {
                wx.navigateTo({
                    url: '../NewbieInfoDetail?userId=' + this.notiInfoDetail.userId
                });
            }
        },
        agreeApply() {
            wx.showModal({
                title: '请问确定要接受申请吗？',
                content: '（最多有3个进行中的buddy）',
                success: (res) => {
                    if (res.confirm) {
                        this.agreeAPI(); //向后端发送请求“接受申请”
                    }
                }
            });
        },
        async agreeAPI() {
            await agreeApplyAPI({ applyId: this.notiInfoDetail.applyId })
                .then((res) => {
                    if (res.data.code === 1) {
                        wx.showToast({
                            title: 'buddy结对成功\r\n请静候newbie联系您',
                            icon: 'none',
                            duration: 1500
                        });
                        setTimeout(function () {
                            wx.navigateBack();
                        }, 1500);
                    } else {
                        console.log('接受申请出错');
                        wx.showToast({
                            title: 'buddy结对失败',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                })
                .catch(() => {
                    console.log('接受申请出错catch');
                    wx.showToast({
                        title: 'buddy结对失败',
                        icon: 'none',
                        duration: 1000
                    });
                });
        },
        refuseApply() {
            this.isRefusing = true;
        },
        refuseCancel() {
            this.isRefusing = false;
            this.isOtherReason = false;
            this.refuseReason = ''; //清空“拒绝理由”文本域中的内容
        },
        refuseConfirm() {
            if (this.refuseReasonItemId == -1) {
                wx.showToast({
                    title: '请选择拒绝理由',
                    icon: 'none',
                    duration: 1000
                });
            } else if (this.refuseReasonItemId < this.refuseReasonMenu.length) {
                this.refuseAPI(); //向后端发送请求“拒绝申请”
            } else {
                this.isRefusing = false;
                this.isOtherReason = true;
            }
        },
        async refuseAPI() {
            await refuseApplyAPI({
                applyId: this.notiInfoDetail.applyId,
                endReason:
                    this.refuseReasonItemId == this.refuseReasonMenu.length
                        ? this.refuseReason
                        : this.refuseReasonMenu[this.refuseReasonItemId]
            })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.isRefusing = false;
                        this.isOtherReason = false;
                        this.refuseReason = '';
                        wx.showToast({
                            title: '拒绝成功',
                            icon: 'success',
                            duration: 1000
                        });
                        setTimeout(function () {
                            wx.navigateBack();
                        }, 1000);
                    } else {
                        console.log('拒绝申请出错');
                        wx.showToast({
                            title: '拒绝失败',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                })
                .catch(() => {
                    console.log('拒绝申请出错catch');
                    wx.showToast({
                        title: '拒绝失败',
                        icon: 'none',
                        duration: 1000
                    });
                });
        },
        otherReasonConfirm() {
            if (this.refuseReason.length == 0) {
                wx.showToast({
                    title: '请输入拒绝理由',
                    icon: 'none',
                    duration: 1000
                });
            } else if (this.refuseReason.length > 140) {
                wx.showToast({
                    title: '拒绝理由不能超过140字',
                    icon: 'none',
                    duration: 1000
                });
            } else {
                this.refuseAPI();
            }
        },
        inputRefuseReason() {
            if (this.refuseReason.length > 140) {
                this.refuseReasonCounterColor = '#FA5151';
            } else {
                this.refuseReasonCounterColor = 'rgb(127, 127, 127)';
            }
        },
        cancelApply() {
            wx.showModal({
                title: '请问确定要撤销申请吗？',
                content: '（撤销后对方仍可看见）',
                success: (res) => {
                    if (res.confirm) {
                        this.undo(); //向后端发送请求“撤销申请”
                    }
                }
            });
        },
        async read() {
            await readAPI({ noticeId: this.notiInfoDetail.applyId, type: this.notiInfoDetail.sender + 1 })
                .then((res) => {
                    if (res.data.code !== 1) {
                        console.log('通知已读出错');
                    }
                })
                .catch(() => {
                    console.log('通知已读出错catch');
                });
        },
        async undo() {
            await undoApply({ applyId: this.notiInfoDetail.applyId })
                .then((res) => {
                    if (res.data.code === 1) {
                        wx.showToast({
                            title: '撤销成功',
                            icon: 'none',
                            duration: 1000
                        });
                        setTimeout(function () {
                            wx.navigateBack();
                        }, 1000);
                    } else {
                        console.log('撤销申请出错');
                        wx.showToast({
                            title: '撤销失败',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                })
                .catch(() => {
                    console.log('撤销申请出错catch');
                    wx.showToast({
                        title: '撤销失败',
                        icon: 'none',
                        duration: 1000
                    });
                });
        }
    }
};
</script>

<style scoped lang="scss">
.notification-detail {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: white;
    overflow: scroll;
}
.scroll {
    height: 100%;
}
.person {
    position: relative;
    width: 100%;
    height: 56px;
    background-color: white;
    border-radius: 0;

    .person__text1 {
        position: absolute;
        left: 16px;
        top: 16px;
        height: 24px;
        line-height: 24px;
        margin: 0;
        font-size: 16px;
        font-weight: 700;
    }
    .person__text2 {
        position: absolute;
        right: 96px;
        top: 16px;
        height: 24px;
        line-height: 24px;
        margin: 0;
        font-size: 16px;
    }
    .person__head-avatar {
        position: absolute;
        height: 40px;
        top: 8px;
        width: 40px;
        right: 40px;
        border-radius: 50%;
    }
    .right-arrow {
        display: inline-block;
        position: absolute;
        right: 12px;
        top: 28px;
        transform: translateY(-50%);
        color: #b2b2b2;
    }
}
.person::after {
    border: none;
    outline: none;
}
.nail {
    height: 16px;
    border-top: 2px solid rgb(240, 240, 240);
}
.reason__text1 {
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
}
.reason__time {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 12px;
    margin: 0;
    color: rgb(178, 178, 178);
}
.reason__text2 {
    font-size: 14px;
    margin: 16px 0 0 0;
    padding: 16px 16px 22px 16px;
    text-indent: 2em;
    white-space: pre-wrap;
    word-break: break-all;
}
.apply-reason {
    position: relative;
    width: 100%;
    background-color: white;
}
.reason2 {
    position: relative;
    width: 100%;
    min-height: 52px;
    background-color: white;
}
.agree-refuse {
    position: relative;
    height: 60px;

    & > button {
        position: absolute;
        height: 40px;
        line-height: 40px;
        width: 30%;
        font-size: 18px;
        padding: 0;
    }
    & > button::after {
        border: none;
    }
}
.agree {
    right: 15%;
    background-color: #07c160;
    color: #ffffff;
}
.agree__hover {
    background-color: #06ae56;
    color: #e5e5e5;
}
.refuse {
    left: 15%;
    background-color: #f2f2f2;
    color: #07c160;
}
.refuse__hover {
    background-color: #dadada;
    color: #07b75b;
}
.cancel {
    left: 35%;
    background-color: #f2f2f2;
    color: #07c160;
}
.cancel__hover {
    background-color: #dadada;
    color: #07b75b;
}
.status-hint {
    width: 100%;
    line-height: 30px;
    font-size: 16px;
    margin: 0 0 10px 0;
    text-align: center;
    color: rgb(127, 127, 127);
    display: block; //加了这个才能让文字居中
}
.refuse-confirm__cover {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.refuse-confirm {
    position: fixed;
    width: 90%;
    height: 256px;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    z-index: 3;
}
.refuse-menu {
    position: fixed;
    width: 84%;
    left: 8%;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    z-index: 3;
}
.refuse-menu__bottom {
    width: 100%;
    height: 48px;
}
.refuse-confirm__tips {
    position: absolute;
    margin: 0;
    left: 16px;
    top: 20px;
    font-size: 12px;
    color: rgb(127, 127, 127);
}
.refuse-menu__tips {
    margin: 20px 0 0 16px;
    font-size: 18px;
    height: 32px;
    line-height: 18px;
}
.refuse-confirm__counter {
    position: absolute;
    margin: 0;
    right: 16px;
    top: 20px;
    font-size: 12px;
    color: rgb(127, 127, 127);
}
.refuse-confirm__reason {
    position: absolute;
    width: auto;
    height: auto;
    top: 56px;
    left: 16px;
    right: 16px;
    bottom: 56px;
    border-bottom: 1px solid rgb(229, 229, 229);
    line-height: 145%;
}
.refuse-confirm__button {
    position: absolute;
    margin: 0;
    padding: 0;
    bottom: 0;
    right: 0;
    width: 54px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    color: #07c160;
    background-color: transparent;
    border-radius: 0;
}
.refuse-confirm__button::after {
    border: none;
    outline: none;
}
.refuse-confirm__button__hover {
    background-color: #dadada;
}
.refuse-confirm__confirm {
    position: absolute;
    bottom: 14px;
    right: 28px;
    width: 54px;
    height: 32px;
}
.refuse-confirm__cancel {
    position: absolute;
    bottom: 14px;
    right: 96px;
    width: 54px;
    height: 32px;
}
.refuse-menu__item {
    position: relative;
    width: 100%;
    height: 48px;
}
.refuse-menu__item__hover {
    background-color: #dadada;
}
.menu-circle-outer {
    position: absolute;
    width: 16px;
    height: 16px;
    left: 27px;
    top: 24px;
    border-radius: 16px;
    border: 2px solid rgb(121, 121, 121);
    transform: translateX(-50%) translateY(-50%);
}
.menu-circle-inner {
    position: absolute;
    width: 12px;
    height: 12px;
    left: 27px;
    top: 24px;
    border-radius: 12px;
    background-color: rgb(121, 121, 121);
    transform: translateX(-50%) translateY(-50%);
}
.menu-text {
    position: absolute;
    left: 54px;
    right: 0;
    height: 48px;
    font-size: 14px;
    line-height: 48px;
}
</style>

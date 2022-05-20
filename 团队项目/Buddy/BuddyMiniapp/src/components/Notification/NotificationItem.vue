<!--
 * @Author: HeQikai
 * @Date: 2021-12-03 23:04:23
 * @LastEditors  : GuoXu
 * @Description: 通知页面中的通知项
 * @FilePath     : \BuddyMiniapp\src\components\Notification\NotificationItem.vue
-->
<template>
    <div
        :class="{ 'notification-item': read, 'notification-item__unread': !read }"
        hover-class="notification-item__click"
        v-if="isShow"
        @click="openNotificationDetail">
        <div class="border-left" v-if="!read"></div>
        <img
            class="notification-item__head-avatar"
            mode="aspectFill"
            :src="notiInfo.avatarUrl || '/static/default.jpg'" />
        <p class="notification-item__text1">
            {{ notiItemText1 }}
        </p>
        <p class="notification-item__text2">
            {{ notiItemText2 }}
        </p>
        <button class="agree" hover-class="agree__click" hover-stop-propagation="true" @click.stop="shortcut">
            {{ buttonText }}
        </button>
        <p
            class="refuse"
            hover-class="refuse__click"
            hover-stop-propagation="true"
            v-if="notiInfo.status == 1 && isSend == false"
            @click.stop="refuseApply">
            拒绝
        </p>
        <div class="divider"></div>
    </div>
</template>

<script>
import { undoApply, agreeApplyAPI, readAPI } from '@/apis';
export default {
    name: 'NotificationItem',
    props: {
        notiId: Number,
        notiInfo: Object,
        isSend: Boolean, //通知主页面中的过滤状态
        seeOnlyUnread: Boolean //是否只看未读
    },
    data() {
        return {
            notiItemText1: String,
            notiItemText2: String,
            buttonText: String,
            isShow: false, //是否应该显示此条通知
            read: Boolean //是否已读
        };
    },
    mounted: function () {
        this.isShow = this.isSend == this.notiInfo.sender && !(this.read && this.seeOnlyUnread); //是否应该显示此条通知
        this.updateView();
    },
    watch: {
        isSend() {
            this.isShow = this.isSend == this.notiInfo.sender && !(this.read && this.seeOnlyUnread);
        },
        seeOnlyUnread() {
            this.isShow = this.isSend == this.notiInfo.sender && !(this.read && this.seeOnlyUnread);
        },
        notiInfo() {
            this.updateView();
        }
    },
    methods: {
        openNotificationDetail() {
            this.$parent.openNotiDetail(this.notiId);
        },
        shortcut() {
            //“接受”或“查看”或“撤销”
            if (this.notiInfo.status == 1) {
                readAPI({ noticeId: this.notiInfo.applyId, type: this.notiInfo.sender + 1 }) //只要点击蓝色按钮，就先标为已读
                    .then((res) => {
                        if (res.data.code === 1) {
                            this.$parent.updateNotiData(this.notiId);
                        } else {
                            console.log('通知已读出错');
                        }
                    })
                    .catch(() => {
                        console.log('通知已读出错catch');
                    });
                if (this.notiInfo.sender) {
                    //是“我发出的”
                    wx.showModal({
                        title: '请问确定要撤销申请吗？',
                        content: '（撤销后对方仍可看见）',
                        success: (res) => {
                            if (res.confirm) {
                                this.cancelApply();
                            }
                        }
                    });
                } else {
                    //是“我收到的”
                    wx.showModal({
                        title: '请问确定要接受申请吗？',
                        content: '（最多有3个进行中的buddy）',
                        success: (res) => {
                            if (res.confirm) {
                                this.agreeApply();
                            }
                        }
                    });
                }
            } else {
                this.$parent.openNotiDetail(this.notiId);
            }
        },
        async cancelApply() {
            await undoApply({ applyId: this.notiInfo.applyId })
                .then((res) => {
                    if (res.data.code === 1) {
                        wx.showToast({
                            title: '撤销成功',
                            icon: 'none',
                            duration: 1000
                        });
                        this.$parent.updateNotiData(this.notiId);
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
        },
        async agreeApply() {
            await agreeApplyAPI({ applyId: this.notiInfo.applyId })
                .then((res) => {
                    if (res.data.code === 1) {
                        wx.showToast({
                            title: 'buddy结对成功\r\n请静候newbie联系您',
                            icon: 'none',
                            duration: 1500
                        });
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
            await readAPI({ noticeId: this.notiInfo.applyId, type: 1 })
                .then((res) => {
                    if (res.data.code !== 1) {
                        console.log('通知已读出错');
                    }
                })
                .catch(() => {
                    console.log('通知已读出错catch');
                });
            this.$parent.updateNotiData(this.notiId);
        },
        refuseApply() {
            this.$parent.refuseApply(this.notiId);
        },
        updateView() {
            if (this.notiInfo.sender) {
                //如果是“我发出的”
                if (this.notiInfo.status == 1) {
                    this.notiItemText1 = '等待' + this.notiInfo.name + '审核你的申请中';
                    this.notiItemText2 = '申请理由：' + (this.notiInfo.reason === null ? '无' : this.notiInfo.reason);
                    this.buttonText = '撤销';
                } else if (this.notiInfo.status == 2) {
                    this.notiItemText1 = this.notiInfo.name + '通过了你的申请';
                    this.notiItemText2 = '申请理由：' + (this.notiInfo.reason === null ? '无' : this.notiInfo.reason);
                    this.buttonText = '查看';
                } else if (this.notiInfo.status == -1) {
                    this.notiItemText1 = this.notiInfo.name + '拒绝了你的申请';
                    this.notiItemText2 =
                        '拒绝理由：' + (this.notiInfo.endReason === null ? '无' : this.notiInfo.endReason);
                    this.buttonText = '查看';
                } else if (this.notiInfo.status == 3) {
                    this.notiItemText1 = '你与' + this.notiInfo.name + '的结对已解除';
                    this.notiItemText2 =
                        '解除理由：' + (this.notiInfo.endReason === null ? '无' : this.notiInfo.endReason);
                    this.buttonText = '查看';
                } else if (this.notiInfo.status == -2) {
                    this.notiItemText1 = '你撤销了向' + this.notiInfo.name + '的申请';
                    this.notiItemText2 = '申请理由：' + (this.notiInfo.reason === null ? '无' : this.notiInfo.reason);
                    this.buttonText = '查看';
                }
            } else {
                //如果是“我收到的”
                if (this.notiInfo.status == 1) {
                    this.notiItemText1 = this.notiInfo.name + '向你发出了申请';
                    this.notiItemText2 = '申请理由：' + (this.notiInfo.reason === null ? '无' : this.notiInfo.reason);
                    this.buttonText = '接受';
                } else if (this.notiInfo.status == 2) {
                    this.notiItemText1 = '你通过了' + this.notiInfo.name + '的申请';
                    this.notiItemText2 = '申请理由：' + (this.notiInfo.reason === null ? '无' : this.notiInfo.reason);
                    this.buttonText = '查看';
                } else if (this.notiInfo.status == -1) {
                    this.notiItemText1 = '你拒绝了' + this.notiInfo.name + '的申请';
                    this.notiItemText2 =
                        '拒绝理由：' + (this.notiInfo.endReason === null ? '无' : this.notiInfo.endReason);
                    this.buttonText = '查看';
                } else if (this.notiInfo.status == 3) {
                    this.notiItemText1 = '你与' + this.notiInfo.name + '的结对已解除';
                    this.notiItemText2 =
                        '解除理由：' + (this.notiInfo.endReason === null ? '无' : this.notiInfo.endReason);
                    this.buttonText = '查看';
                } else if (this.notiInfo.status == -2) {
                    this.notiItemText1 = this.notiInfo.name + '撤销了结对申请';
                    this.notiItemText2 = '申请理由：' + (this.notiInfo.reason === null ? '无' : this.notiInfo.reason);
                    this.buttonText = '查看';
                }
            }
            this.read = this.notiInfo.read;
        },
        unreadToRead() {
            this.read = true;
        }
    }
};
</script>

<style scoped lang="scss">
@import '/src/style';

.notification-item {
    position: relative;
    width: 100%;
    height: 72px;
    background-color: white;
    border-radius: 0;
}
.notification-item__unread {
    position: relative;
    width: 100%;
    height: 72px;
    background-color: rgb(255, 245, 240);
    border-radius: 0;
}
.border-left {
    position: absolute;
    width: 2px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(255, 53, 48, 0.5);
}
.divider {
    margin: 0;
    position: absolute;
    left: 76px;
    right: 0;
    height: 1px;
    bottom: 0;
    background-color: $BuddyMiniApp-divider-color;
}
.notification-item__click {
    background-color: #ededed;
}
.notification-item::after {
    border: none;
    outline: none;
}
.notification-item__head-avatar {
    position: absolute;
    left: 12px;
    width: 48px;
    height: 48px;
    top: 12px;
    border-radius: 50%;
}
.notification-item__text1 {
    position: absolute;
    font-size: 17px;
    line-height: 24px;
    left: 76px;
    top: 13px;
    margin: 0;
}
.notification-item__text2 {
    position: absolute;
    font-size: 14px;
    line-height: 20px;
    opacity: 0.5;
    left: 76px;
    right: 66px;
    top: 37px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}
.agree {
    position: absolute;
    right: 12px;
    top: 12px;
    width: 58px;
    height: 26px;
    line-height: 24px;
    background-color: $BuddyMiniApp-color-primary;
    border-width: 1px;
    border-style: solid;
    border-color: $BuddyMiniApp-color-primary;
    border-radius: 30px;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    color: #ffffff;
    padding: 0;
}
.agree::after {
    outline: none;
    border: none;
}
.agree__click {
    background-color: #167ce2;
    color: rgba(255, 255, 255, 0.8);
}
.refuse {
    position: absolute;
    right: 27px;
    top: 42px;
    font-size: 14px;
    line-height: 18px;
    margin: 0;
    opacity: 0.5;
    display: inline;
}
.refuse__click {
    opacity: 1;
}
</style>

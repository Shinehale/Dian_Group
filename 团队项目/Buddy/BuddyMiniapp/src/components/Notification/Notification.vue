<!--
 * @Author: HeQikai
 * @Date: 2021-12-03 22:59:23
 * @LastEditors  : GuoXu
 * @Description: 通知页面
 * @FilePath     : \BuddyMiniapp\src\components\Notification\Notification.vue
-->
<template>
    <div class="notification">
        <div class="notification__read" hover-class="notification__read__click" @click="readAll">
            <span class="iconfont icon-shuazi notification__read__icon"></span>
            <p class="notification__read__text">全部已读</p>
        </div>
        <div class="system-notification" hover-class="system-notification__click" @click="openSystemNoti">
            <span class="iconfont icon-lingdang-xianxing system-notification__icon"></span>
            <p class="system-notification__text1">系统通知</p>
            <p class="system-notification__text2">
                <nobr>{{ systemNotiText }}</nobr>
            </p>
            <div class="system-notification__number" v-if="notiInfo.systemNotificationUnread">
                {{ notiInfo.systemNotificationUnread }}
            </div>
        </div>
        <div class="receive-send__outer">
            <div class="receive__div" v-if="notiInfo.isBuddy" @click="receiveSelected">
                <button class="receive-send" :class="receiveButtonStyle">申请我的</button>
                <div class="receive-send__number" v-if="notiInfo.receivedNotificationUnread">
                    {{ notiInfo.receivedNotificationUnread }}
                </div>
            </div>
            <div class="send__div" v-if="notiInfo.isBuddy" @click="sendSelected">
                <button class="receive-send" :class="sendButtonStyle">我申请的</button>
                <div class="receive-send__number" v-if="notiInfo.sentNotificationUnread">
                    {{ notiInfo.sentNotificationUnread }}
                </div>
            </div>
            <button
                class="display-unread"
                :class="seeOnlyUnread ? 'display-unread__true' : 'display-unread__false'"
                @click="switchOnlyUnread">
                只看未读
            </button>
        </div>
        <div class="none__tip">{{ seeOnlyUnread ? '暂无未读结对通知' : '暂无结对通知' }}</div>
        <NotificationItem
            v-for="(item, index) in notiInfo.notifications"
            ref="notificationItem"
            :key="index"
            :notiId="index"
            :notiInfo="item"
            :isSend="isSend"
            :seeOnlyUnread="seeOnlyUnread"></NotificationItem>
    </div>
</template>

<script>
import NotificationItem from './NotificationItem.vue';
import { getMyInfo, getUnreadDetail, getBuddyNotice, getNewBieNotice, getSysNotice, readAllNotice } from '@/apis';
import Vue from 'vue';

export default {
    name: 'Notification',
    components: {
        NotificationItem
    },
    data() {
        return {
            systemNotiText: '', //“系统通知”的主界面预览内容
            isSend: false, //是否查看“我发送的”通知
            receiveButtonStyle: 'receive-send__selected',
            sendButtonStyle: 'receive-send__unselected',
            isDetail: false, //是否显示通知详情页
            notiInfoDetailIndex: 0,
            isSystemNoti: false, //是否显示系统通知列表
            seeOnlyUnread: false, //是否只看未读通知
            notiInfo: {
                isBuddy: false, //自己是不是buddy身份，如果不是就没有通知上方选项卡
                systemNotificationUnread: 0,
                receivedNotificationUnread: 0,
                sentNotificationUnread: 0,
                systemNotifications: [],
                notifications: []
            }
        };
    },
    created() {
        this.created_func();
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: 'Buddy通知'
        });
    },
    methods: {
        handleBack() {
            if (this.isDetail) {
                this.closeNotiDetail();
            } else if (this.isSystemNoti) {
                this.closeSystemNoti();
            }
        },
        async created_func() {
            await getMyInfo()
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.notiInfo.isBuddy = data.role !== 10;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    wx.showToast({
                        title: '个人信息获取失败',
                        icon: 'none',
                        duration: 1000
                    });
                });
            await this.getUnreadNumber();
            if ((await this.setNotiData(true)) == false) {
                wx.showToast({
                    title: '通知加载失败',
                    icon: 'none',
                    duration: 1000
                });
            }
        },
        async getUnreadNumber() {
            await getUnreadDetail()
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.notiInfo.receivedNotificationUnread = data.asBuddyCount;
                        this.notiInfo.sentNotificationUnread = data.asNewbieCount;
                        this.notiInfo.systemNotificationUnread = data.sysCount;
                        this.$parent.refreshUnreadNumber(data.asBuddyCount + data.asNewbieCount + data.sysCount);
                    } else {
                        console.log('获取未读通知数出错');
                    }
                })
                .catch(() => {
                    console.log('获取未读通知数出错');
                });
        },
        async setNotiData(isFirst) {
            let return_value = true;
            if (this.notiInfo.isBuddy) {
                await getBuddyNotice()
                    .then((res) => {
                        const code = res.data.code;
                        let data = res.data.data.reverse();
                        if (code === 1) {
                            for (let i = 0; i < data.length; i++) {
                                data[i].sender = false; //是收到的
                                data[i].applyTime = data[i].applyTime.replace('T', '&nbsp;&nbsp;');
                                data[i].applyTime =
                                    data[i].applyTime.split(':')[0] + ':' + data[i].applyTime.split(':')[1];
                                if (data[i].endTime) {
                                    data[i].endTime = data[i].endTime.replace('T', '&nbsp;&nbsp;');
                                    data[i].endTime =
                                        data[i].endTime.split(':')[0] + ':' + data[i].endTime.split(':')[1];
                                }
                                this.notiInfo.notifications.push(data[i]);
                            }
                        } else {
                            console.log('获取作为buddy的通知失败');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        return_value = false;
                    });
            }
            if (isFirst) {
                this.isSend = !this.notiInfo.isBuddy;
            }
            await getNewBieNotice()
                .then((res) => {
                    const code = res.data.code;
                    let data = res.data.data.reverse();
                    if (code === 1) {
                        for (let i = 0; i < data.length; i++) {
                            data[i].sender = true; //是发出的
                            data[i].applyTime = data[i].applyTime.replace('T', '&nbsp;&nbsp;');
                            data[i].applyTime = data[i].applyTime.split(':')[0] + ':' + data[i].applyTime.split(':')[1];
                            if (data[i].endTime) {
                                data[i].endTime = data[i].endTime.replace('T', '&nbsp;&nbsp;');
                                data[i].endTime = data[i].endTime.split(':')[0] + ':' + data[i].endTime.split(':')[1];
                            }
                            this.notiInfo.notifications.push(data[i]);
                        }
                    } else {
                        console.log('获取作为newbie的通知失败');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return_value = false;
                });
            await getSysNotice()
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.notiInfo.systemNotifications = data.reverse();
                        if (data.length) {
                            this.systemNotiText = data[0].content;
                        } else {
                            this.systemNotiText = '暂无系统通知';
                        }
                    } else {
                        console.log('获取系统通知出错');
                    }
                })
                .catch(() => {
                    console.log('获取系统通知出错');
                    return_value = false;
                });
            return return_value;
        },
        async readAll() {
            await readAllNotice()
                .then((res) => {
                    if (res.data.code === 1) {
                        this.getUnreadNumber();
                        for (let i = 0; i < this.notiInfo.notifications.length; i++) {
                            this.$refs.notificationItem[i].unreadToRead();
                        }
                        for (let i = 0; i < this.notiInfo.systemNotifications.length; i++) {
                            this.notiInfo.systemNotifications[i].read = true;
                        }
                    } else {
                        console.log('全部通知标为已读出错');
                    }
                })
                .catch(() => {
                    console.log('全部通知标为已读出错');
                });
        },
        openSystemNoti() {
            if (this.notiInfo.systemNotifications.length) {
                this.isSystemNoti = true;
                wx.navigateTo({
                    url:
                        'notification/system?systemNotifications=' +
                        encodeURIComponent(JSON.stringify(this.notiInfo.systemNotifications))
                });
                this.isDetail = false;
            }
        },
        closeSystemNoti() {
            this.isSystemNoti = false;
            this.getUnreadNumber();
        },
        receiveSelected() {
            this.isSend = false;
            this.receiveButtonStyle = 'receive-send__selected';
            this.sendButtonStyle = 'receive-send__unselected';
        },
        sendSelected() {
            this.isSend = true;
            this.receiveButtonStyle = 'receive-send__unselected';
            this.sendButtonStyle = 'receive-send__selected';
        },
        switchOnlyUnread() {
            this.seeOnlyUnread = !this.seeOnlyUnread;
        },
        openNotiDetail(notiId) {
            this.notiInfoDetailIndex = notiId;
            this.isDetail = true;
            wx.navigateTo({
                url:
                    'notification/detail?notiInfoDetail=' +
                    encodeURIComponent(JSON.stringify(this.notiInfo.notifications[this.notiInfoDetailIndex])) +
                    '&preRefusing=false'
            });
            this.isSystemNoti = false;
        },
        refuseApply(notiId) {
            this.notiInfoDetailIndex = notiId;
            this.isDetail = true;
            wx.navigateTo({
                url:
                    'notification/detail?notiInfoDetail=' +
                    encodeURIComponent(JSON.stringify(this.notiInfo.notifications[this.notiInfoDetailIndex])) +
                    '&preRefusing=true'
            });
        },
        closeNotiDetail() {
            this.isDetail = false;
            this.updateNotiData(this.notiInfoDetailIndex);
        },
        async updateNotiData(notiId) {
            if (this.notiInfo.notifications[notiId].sender) {
                await getNewBieNotice()
                    .then((res) => {
                        const { code, data } = res.data;
                        if (code === 1) {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].applyId == this.notiInfo.notifications[notiId].applyId) {
                                    data[i].sender = true; //是发出的
                                    data[i].applyTime = data[i].applyTime.replace('T', '&nbsp;&nbsp;');
                                    data[i].applyTime =
                                        data[i].applyTime.split(':')[0] + ':' + data[i].applyTime.split(':')[1];
                                    if (data[i].endTime) {
                                        data[i].endTime = data[i].endTime.replace('T', '&nbsp;&nbsp;');
                                        data[i].endTime =
                                            data[i].endTime.split(':')[0] + ':' + data[i].endTime.split(':')[1];
                                    }
                                    Vue.set(this.notiInfo.notifications, notiId, data[i]);
                                    break;
                                }
                            }
                        } else {
                            console.log('更新作为newbie的通知失败');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                await getBuddyNotice()
                    .then((res) => {
                        const { code, data } = res.data;
                        if (code === 1) {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].applyId == this.notiInfo.notifications[notiId].applyId) {
                                    data[i].sender = false; //是收到的
                                    data[i].applyTime = data[i].applyTime.replace('T', '&nbsp;&nbsp;');
                                    data[i].applyTime =
                                        data[i].applyTime.split(':')[0] + ':' + data[i].applyTime.split(':')[1];
                                    if (data[i].endTime) {
                                        data[i].endTime = data[i].endTime.replace('T', '&nbsp;&nbsp;');
                                        data[i].endTime =
                                            data[i].endTime.split(':')[0] + ':' + data[i].endTime.split(':')[1];
                                    }
                                    Vue.set(this.notiInfo.notifications, notiId, data[i]);
                                    break;
                                }
                            }
                        } else {
                            console.log('更新作为buddy的通知失败');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            await this.getUnreadNumber();
        },
        async handleRefresh() {
            if (this.isDetail == false && this.isSystemNoti == false) {
                await getMyInfo()
                    .then((res) => {
                        const { code, data } = res.data;
                        if (code === 1) {
                            this.notiInfo.isBuddy = data.role !== 10;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        wx.showToast({
                            title: '个人信息获取失败',
                            icon: 'none',
                            duration: 1000
                        });
                    });
                await this.getUnreadNumber();
                this.notiInfo.notifications = [];
                if (await this.setNotiData(false)) {
                    wx.showToast({
                        title: '刷新成功',
                        icon: 'none',
                        duration: 1000
                    });
                } else {
                    wx.showToast({
                        title: '刷新失败',
                        icon: 'none',
                        duration: 1000
                    });
                }
            }
            uni.stopPullDownRefresh();
        }
    }
};
</script>

<style scoped lang="scss">
@import '/src/style';

.notification {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}
.notification__read {
    position: relative;
    width: 100%;
    height: 30px;
    opacity: 1;
    color: rgba(0, 0, 0, 0.7);
}
.notification__read__click {
    opacity: 0.6;
}
.notification__read__icon {
    position: absolute;
    left: 4px;
    top: 3px;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.5);
    width: 24px;
    height: 24px;
}
.notification__read__text {
    position: absolute;
    font-size: 16px;
    left: 32px;
    top: 7px;
    color: rgba(0, 0, 0, 0.5);
    line-height: 16px;
}
.system-notification {
    position: relative;
    width: 100%;
    height: 72px;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    background-color: transparent;
}
.system-notification__click {
    background-color: #ededed;
}
.system-notification__icon {
    position: absolute;
    left: 6px;
    top: 6px;
    font-size: 60px;
    color: $BuddyMiniApp-color-primary;
    width: 60px;
    height: 60px;
}
.system-notification__text1 {
    position: absolute;
    font-size: 17px;
    left: 76px;
    top: 13px;
    margin: 0;
}
.system-notification__text2 {
    position: absolute;
    font-size: 14px;
    opacity: 0.5;
    left: 76px;
    right: 16px;
    top: 37px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}
.system-notification__number {
    position: absolute;
    width: 18px;
    height: 18px;
    right: 14px;
    top: 14px;
    background-color: rgb(244, 53, 48);
    border-radius: 9px;
    line-height: 18px;
    color: white;
    font-size: 13px;
    display: inline;
    text-align: center;
}
.receive-send__outer {
    margin: 10px 0 6px 0;
    position: relative;
    height: 22px;
}
.receive-send {
    position: absolute;
    width: 100%;
    background-color: transparent;
    border-radius: 0;
    line-height: 20px;
    font-size: 15px;
    height: 100%;
    padding: 0;
}
.receive-send::after {
    border: none;
    outline: none;
}
.receive__div {
    position: absolute;
    width: 25%;
    height: 100%;
    left: 0;
    border: none;
}
.send__div {
    position: absolute;
    width: 25%;
    left: 25%;
    height: 100%;
    border: none;
}
.display-unread {
    position: absolute;
    width: 20%;
    left: 75%;
    height: 100%;
    padding: 0;
    color: rgba(0, 0, 0, 0.7);
    font-size: 13px;
    line-height: 19px;
    border-radius: 4px;
}
.display-unread::after {
    border: none;
    outline: none;
}
.display-unread__true {
    background-color: rgb(129, 211, 248);
    border: 1px solid rgb(2, 167, 240);
}
.display-unread__false {
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.3);
}
.receive-send__selected {
    color: rgb(2, 167, 240);
}
.receive-send__unselected {
    color: rgb(0, 0, 0);
}
.receive-send__number {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 2px;
    top: -5px;
    background-color: rgb(244, 53, 48);
    border-radius: 9px;
    line-height: 16px;
    color: white;
    font-size: 11px;
    display: inline;
    text-align: center;
    z-index: 1;
}
.none__tip {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: rgb(127, 127, 127);
    height: 36px;
    line-height: 36px;
}
</style>

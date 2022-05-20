<!--
 * @Author: HeQikai
 * @Description: 系统通知页面中的通知项
-->
<template>
    <div
        :class="{ 'notification-item': read, 'notification-item__unread': !read }"
        hover-class="notification-item__click"
        @click="openSystemNotiDetail">
        <div class="border-left" v-if="!read"></div>
        <p class="notification-item__title">
            {{ notiItemTitle }}
        </p>
        <p class="notification-item__text">
            {{ notiItemText }}
        </p>
        <text class="notification-item__time" decode="true">
            {{ notiItemTime }}
        </text>
        <div class="divider"></div>
    </div>
</template>

<script>
export default {
    name: 'SystemNotiItem',
    props: {
        notiId: Number,
        notiInfo: Object
    },
    data() {
        return {
            notiItemTitle: this.notiInfo.title,
            notiItemText: this.notiInfo.content,
            read: this.notiInfo.read, //是不是已读通知
            notiItemTime:
                this.notiInfo.createdTime.split('T')[0] +
                '&nbsp;&nbsp;' +
                this.notiInfo.createdTime.split('T')[1].split(':')[0] +
                ':' +
                this.notiInfo.createdTime.split('T')[1].split(':')[1]
        };
    },
    methods: {
        openSystemNotiDetail() {
            this.$parent.openSystemNotiDetail(this.notiId);
            this.read = true;
        },
        unreadToRead() {
            this.read = true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
    left: 16px;
    right: 0;
    height: 1px;
    bottom: 0;
    background-color: rgb(229, 229, 229);
}
.notification-item__click {
    background-color: #ededed;
}
.notification-item::after {
    border: none;
    outline: none;
}
.notification-item__title {
    position: absolute;
    font-size: 17px;
    line-height: 24px;
    left: 16px;
    right: 128px;
    top: 13px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.notification-item__text {
    position: absolute;
    font-size: 14px;
    line-height: 20px;
    opacity: 0.5;
    left: 16px;
    right: 16px;
    top: 37px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}
.notification-item__time {
    position: absolute;
    font-size: 13px;
    line-height: 13px;
    opacity: 0.5;
    right: 14px;
    top: 17px;
    margin: 0;
    text-align: right;
}
</style>

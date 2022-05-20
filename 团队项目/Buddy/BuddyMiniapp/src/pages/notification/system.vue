<template>
    <div class="system-notification">
        <scroll-view scroll-y class="scroll">
            <div class="notification__read" hover-class="notification__read__click" @click="readAll">
                <p class="iconfont icon-shuazi notification__read__icon"></p>
                <p class="notification__read__text">全部已读</p>
            </div>
            <SystemNotiItem
                v-for="(item, index) in systemNotifications"
                ref="systemNotiItem"
                :key="index"
                :notiId="index"
                :notiInfo="item"></SystemNotiItem>
        </scroll-view>
    </div>
</template>

<script>
import SystemNotiItem from '@/components/Notification/SystemNotiItem.vue';
import { readAllSysNotice } from '@/apis';
export default {
    name: 'SystemNotification',
    components: {
        SystemNotiItem
    },
    data() {
        return {
            systemNotifications: Array,
            systemNotiDetailId: 0
        };
    },
    onLoad(options) {
        uni.setNavigationBarTitle({
            title: '系统通知'
        });
        this.systemNotifications = JSON.parse(decodeURIComponent(options.systemNotifications));
    },
    methods: {
        async readAll() {
            await readAllSysNotice()
                .then((res) => {
                    if (res.data.code === 1) {
                        for (let i = 0; i < this.systemNotifications.length; i++) {
                            this.systemNotifications[i].read = true;
                            this.$refs.systemNotiItem[i].unreadToRead();
                        }
                    } else {
                        console.log('全部系统通知标为已读出错');
                    }
                })
                .catch(() => {
                    console.log('全部系统通知标为已读出错');
                });
        },
        openSystemNotiDetail(notiId) {
            this.systemNotiDetailId = this.systemNotifications[notiId].id;
            wx.navigateTo({
                url: 'systemDetail?notiId=' + this.systemNotiDetailId
            });
        }
    }
};
</script>

<style scoped lang="scss">
.system-notification {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 60px;
    background-color: white;
    overflow: scroll;
}
.scroll {
    height: 100%;
}
.notification__read {
    position: relative;
    width: 100%;
    height: 30px;
    opacity: 1;
    color: rgba(0, 0, 0, 0.7);
    border-bottom: 1px solid rgb(178, 178, 178);
}
.notification__read__click {
    opacity: 0.6;
}
.notification__read__icon {
    position: absolute;
    left: 4px;
    top: 3px;
    font-size: 24px;
    width: 24px;
    height: 24px;
}
.notification__read__text {
    position: absolute;
    font-size: 16px;
    left: 32px;
    top: 7px;
    line-height: 16px;
}
</style>

<template>
    <div class="notification-detail">
        <div class="title">{{ title }}</div>
        <scroll-view scroll-y class="scroll">
            <div class="scroll__inner">
                <text class="text" selectable="true">{{ systemNotiHtml }}</text>
            </div>
        </scroll-view>
    </div>
</template>

<script>
import { getSysNoticeDetail } from '@/apis';

export default {
    name: 'NotificationDetail',
    data() {
        return {
            notiId: Number, //在SystemNotification.vue里改了，传进来的是数据里的id，不是通知数组的索引
            title: '',
            systemNotiHtml: '加载中…'
        };
    },
    onLoad(options) {
        uni.setNavigationBarTitle({
            title: '系统通知'
        });
        this.notiId = options.notiId;
    },
    mounted() {
        this.setSystemNotiHtml();
    },
    methods: {
        async setSystemNotiHtml() {
            await getSysNoticeDetail({ noticeId: this.notiId })
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.title = data.title;
                        this.systemNotiHtml = data.content;
                    } else {
                        console.log('获取系统通知详情出错');
                    }
                })
                .catch(() => {
                    console.log('获取系统通知详情出错');
                    this.systemNotiHtml = '加载失败，请检查网络设置';
                });
        }
    }
};
</script>

<style scoped lang="scss">
.notification-detail {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(248, 248, 248);
}
.title {
    position: fixed;
    text-align: center;
    width: 100%;
    height: 48px;
    font-size: 20px;
    line-height: 48px;
    background-color: white;
}
.scroll {
    position: fixed;
    width: 100%;
    top: 52px;
    bottom: 0;
    overflow-y: scroll;
    background-color: white;
}
.scroll__inner {
    padding: 4px 10px 8px 10px;
}
.text {
    word-break: break-all;
}
</style>

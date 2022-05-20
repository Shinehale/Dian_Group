<template>
    <div>
        <van-tabbar :active="active" @change="changeTab" placeholder>
            <van-tabbar-item icon="home-o">广场</van-tabbar-item>
            <van-tabbar-item icon="friends-o">Buddy</van-tabbar-item>
            <van-tabbar-item icon="comment-o" :info="unreadNumber == 0 ? null : unreadNumber">通知</van-tabbar-item>
            <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'NavigationBar',
    props: ['unreadNumber'],
    data() {
        return {
            active: 0
        };
    },
    methods: {
        changeTab(e) {
            this.active = e.detail;
            this.$emit('changeComponent', e.detail);
        }
    }
};
</script>

<style scoped></style>

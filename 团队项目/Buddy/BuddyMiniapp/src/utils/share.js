/* eslint-disable */
module.exports = {
    onShow() {
        let pages = getCurrentPages();
        if (pages.length >= 1) {
            this.$x.pageRouter = (pages[pages.length - 1]).route
            if (this.$x.pageRouter) {
                this.$x.mpShare = {
                    title: 'Buddy小程序',
                    path: '/pages/index', // 默认为当前页面路径
                    imageUrl: 'https://bbs.dian.org.cn/assets/uploads/system/site-logo.gif?v=1520689070149'
                }
            }
            return;
        }
    },
    // 分享到好友
    onShareAppMessage() {
        return this.$x.mpShare
    },
    // 分享到朋友圈
    onShareTimeline() {
        return this.$x.mpShare
    }
}

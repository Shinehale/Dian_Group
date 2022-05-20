<template>
    <div class="home">
        <Square v-if="showComponent == 0" ref="square" />
        <Buddy v-else-if="showComponent == 1" ref="buddy" />
        <Notification v-else-if="showComponent == 2" ref="notification" />
        <Mine v-else-if="showComponent == 3" ref="mine" />
        <NavigationBar :unreadNumber="unreadNumber" @changeComponent="changeComponent" />
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue';
import Square from '@/components/Square/Square.vue';
import Buddy from '@/components/Buddy/Buddypage.vue';
import Notification from '@/components/Notification/Notification.vue';
import Mine from '@/components/Mine/Mine.vue';
import { getUnreadDetail } from '@/apis';

export default {
    data() {
        return {
            showComponent: 0,
            unreadNumber: 0 //导航栏“通知”图标上的未读数
        };
    },
    components: { NavigationBar, Square, Notification, Mine, Buddy },
    onReachBottom() {
        if (this.showComponent == 0) {
            this.$refs['square'].getNextPage();
        }
    },
    onPullDownRefresh() {
        if (this.showComponent == 0) {
            this.$refs['square'].handleRefresh();
        } else if (this.showComponent == 1) {
            this.$refs['buddy'].handleRefresh();
        } else if (this.showComponent == 2) {
            this.$refs['notification'].handleRefresh();
        } else if (this.showComponent == 3) {
            this.$refs['mine'].setMyInfoData();
        }
    },
    onShow() {
        if (this.showComponent == 2) {
            this.$refs['notification'].handleBack(); //“通知”主界面处理子页面的返回操作
        }
    },
    mounted() {
        this.setUnreadNumber();
    },
    methods: {
        changeComponent(idx) {
            this.showComponent = idx;
        },
        refreshUnreadNumber(number) {
            this.unreadNumber = number;
        },
        async setUnreadNumber() {
            await getUnreadDetail()
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.unreadNumber = data.asBuddyCount + data.asNewbieCount + data.sysCount;
                    } else {
                        console.log('获取未读通知数出错');
                    }
                })
                .catch(() => {
                    console.log('获取未读通知数出错');
                });
        }
    }
};
</script>

<style scoped></style>

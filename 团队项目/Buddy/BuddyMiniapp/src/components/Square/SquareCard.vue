<template>
    <div class="squareCard">
        <div class="squareCard-left">
            <div class="squareCard-left__avatar">
                <Avatar :avatar="buddyInfo.avatarURL || '/static/default.jpg'" />
            </div>
            <div class="squareCard-left__action">
                <van-button v-if="userId !== buddyInfo.id" type="info" size="small" @click="buddy">申请结对</van-button>
            </div>
        </div>
        <div class="squareCard-main" @click="toBuddyDetail">
            <div class="squareCard-main__name">
                <span v-if="buddyInfo.gender == 1">
                    <span class="iconfont icon-nan male"></span>
                </span>
                <span v-if="buddyInfo.gender == 2">
                    <span class="iconfont icon-nv female"></span>
                </span>
                <p>{{ buddyInfo.name }}</p>
            </div>
            <div class="squareCard-main__city">
                <van-icon name="location-o" />
                <p>{{ buddyInfo.city }}</p>
            </div>
            <div class="squareCard-main__job">
                <van-icon name="shop-o" />
                <p>{{ buddyInfo.additionalInfo.now_duty || '暂无' }}</p>
            </div>
            <div class="squareCard-main__fields" v-if="showDirections.length > 0">
                <p>指导方向：</p>
                <div class="squareCard-main__fields-field">
                    <div v-for="(direction, index) in showDirections" :key="index">
                        <van-tag class="tag" size="medium" plain type="primary">{{ direction }}</van-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar/Avatar.vue';

export default {
    name: 'SquareCard',
    props: ['buddyInfo', 'userId'],
    components: { Avatar },
    data() {
        return {};
    },
    computed: {
        showDirections() {
            // 不是给用户自己看的，必须要全部显示
            return this.buddyInfo?.additionalInfo?.direction;
        }
    },
    methods: {
        buddy() {
            this.$emit('buddy', this.buddyInfo);
        },
        toBuddyDetail() {
            wx.navigateTo({ url: `buddyInfoDetail?id=${this.buddyInfo.id}&userId=${this.userId}` });
        }
    }
};
</script>

<style lang="scss" scoped>
.squareCard {
    display: flex;
    flex-direction: row;
    margin: 12px 10px 0 10px;
    min-width: 300px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 20px 20px 20px #f0f0f0, -20px 20px 20px #f0f0f0;
}
.squareCard-left {
    padding: 12px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .squareCard-left__avatar {
        display: flex;
        flex: 1;
        align-items: center;
        padding: 5px 0;
    }
    .squareCard-left__action {
        display: flex;
        justify-content: center;
    }
}
.squareCard-main {
    padding: 12px;
    width: calc(100% - 120px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.squareCard-main__name {
    display: flex;
    flex-direction: row;
    & > p {
        padding-left: 10px;
        font-size: 17px;
    }
}
.squareCard-main__age {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    & > p {
        padding-left: 10px;
        font-size: 16px;
    }
}
.squareCard-main__city {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    & > p {
        padding-left: 10px;
        font-size: 16px;
    }
}
.squareCard-main__job {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    & > p {
        padding-left: 10px;
        font-size: 16px;
    }
}
.squareCard-main__fields {
    padding-top: 10px;
}
.squareCard-main__fields-field {
    & > div {
        padding: 0 10px 0 0;
        display: inline;
        white-space: pre-line;
    }
}
</style>

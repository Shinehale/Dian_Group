<template>
    <div class="Buddy">
        <van-notify v-show="show" type="warning" class="text_all">
            <div class="text">
                <van-icon name="bell" style="font-size: 16px; color: white; margin-left: 5px" />
                <p>抱歉，您的结对未满10天，暂时无法解除。</p>
                <p>(如需提前解除，请联系您的buddy)</p>
            </div>
        </van-notify>
        <div class="header">
            <div :class="{ choose_which: index == 1, chosen: index == 0 }" @click="change(0)">Buddy</div>
            <div v-if="identify >= 2" :class="{ choose_which: index == 0, chosen: index == 1 }" @click="change(1)">
                Newbie
            </div>
            <button class="now_" @click="right__()">{{ tipText }}</button>
        </div>
        <br />
        <div v-if="index == 0">
            <!-- <BuddyCard @check="change_relieve"></BuddyCard> -->
            <div v-for="buddy in buddies" :key="buddy.id">
                <BuddyCard @check="change_relieve" :buddyInfo="buddy" />
            </div>
        </div>
        <div v-if="index == 1">
            <div v-for="newbie in newbies" :key="newbie.id">
                <NewbieCard @check="change_relieve" :newbieinfo="newbie" />
            </div>
        </div>
        <van-popup :show="show_cancel" round position="bottom" custom-style="height: 60%" @close="closeChooseBuddy">
            <template class="chooseBuddy">
                <van-cell title="Name" is-link :value="chosenOneInfo.name" @click="toChosenDetail()" />
                <div class="chooseBuddy-field">
                    <span>解除理由</span>
                    <textarea
                        class="chooseBuddy-field__text"
                        :maxlength="200"
                        :value="applyReason"
                        @input="bindReason"
                        autofocus />
                </div>
                <van-button
                    class="chooseBuddy-action"
                    plain
                    hairline
                    size="normal"
                    block
                    type="info"
                    @click="confirmCancel"
                    >提交</van-button
                >
            </template>
        </van-popup>
    </div>
</template>

<script>
import BuddyCard from './BuddyCard.vue';
import NewbieCard from './NewbieCard.vue';
import { getBuddiedList, getNewbieList, cancelRelation } from '@/apis';
import { getMyInfo } from '@/apis';

export default {
    name: 'Buddypage',
    data() {
        return {
            buddies: [],
            newbies: [],
            buddies_show1: [],
            buddies_show2: [],
            newbies_show1: [],
            newbies_show2: [],
            index: 0,
            right: 0,
            relieve: 1,
            show: 0,
            show_cancel: false,
            chosenOneInfo: {},
            applyReason: '',
            identify: 1,
            tipText: '只看当前'
        };
    },
    components: {
        BuddyCard,
        NewbieCard
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: 'Buddy'
        });
        this.form_information();
        this.form_newbie();
        this.getMyInfo();
    },
    methods: {
        change: function (s) {
            this.index = s;
        },
        toChosenDetail() {
            let flag = 0;
            for (let i = 0; i < this.buddies_show2.length; i++) {
                if (this.chosenOneInfo.personId == this.buddies_show2[i].personId) flag = 1;
            }
            for (let i = 0; i < this.newbies_show2.length; i++) {
                if (this.chosenOneInfo.personId == this.newbies_show2[i].personId) flag = 2;
            }
            if (flag == 1) {
                wx.navigateTo({ url: `buddyInfoDetail?id=${this.chosenOneInfo.personId}` });
            }
            if (flag == 2) {
                wx.navigateTo({ url: `NewbieInfoDetail?userId=${this.chosenOneInfo.personId}` });
            }
        },
        right__: function () {
            this.right = this.right ^ 1;
            if (this.right == 1) {
                if (this.index == 0) {
                    this.buddies = this.buddies_show2;
                } else {
                    this.newbies = this.newbies_show2;
                }
                wx.showToast({
                    title: '已切换到只看当前~',
                    icon: 'none',
                    duration: 1000
                });
                this.tipText = '查看全部';
            } else {
                if (this.index == 1) {
                    this.newbies = this.newbies_show1;
                } else {
                    this.buddies = this.buddies_show1;
                }
                wx.showToast({
                    title: '已切换到全部~',
                    icon: 'none',
                    duration: 1000
                });
                this.tipText = '只看当前';
            }
        },
        change_relieve(data) {
            if (data == '0') {
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                }, 2000);
            } else {
                this.show_cancel = true;
                this.chosenOneInfo = data;
            }
        },
        bindReason(e) {
            this.applyReason = e.target.value;
        },
        closeChooseBuddy() {
            this.show_cancel = false;
        },
        async confirmCancel() {
            if (this.applyReason.length == 0 || this.applyReason.match(/^[ ]*$/)) {
                wx.showToast({
                    title: '理由不能为空或者特殊字符哦',
                    icon: 'none',
                    duration: 1000
                });
                return;
            } else {
                await cancelRelation({ targetUserId: this.chosenOneInfo.personId, reason: this.applyReason })
                    .then(() => {
                        wx.showToast({
                            title: '解除成功~',
                            icon: 'none',
                            duration: 1000
                        });
                        this.show_cancel = false;
                        this.applyReason = '';
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
            this.form_information();
            this.form_newbie();
            this.$forceUpdate();
        },
        async form_information() {
            let that = this;
            await getBuddiedList()
                .then((res) => {
                    that.buddies_show1 = res.data.data;
                    that.buddies_show2 = [];
                    for (let i = 0; i < that.buddies_show1.length; i++) {
                        if (that.buddies_show1[i].status == 2) that.buddies_show2.push(that.buddies_show1[i]);
                    }
                    uni.stopPullDownRefresh();
                    that.buddies_show2 = [];
                    for (let i = 0; i < that.buddies_show1.length; i++) {
                        if (that.buddies_show1[i].status == 2) that.buddies_show2.push(that.buddies_show1[i]);
                    }
                    wx.showToast({
                        title: '获取列表成功',
                        icon: 'none',
                        duration: 1000
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            this.buddies = this.buddies_show1;
        },
        async form_newbie() {
            let that = this;
            await getNewbieList()
                .then((res) => {
                    that.newbies_show1 = res.data.data;
                    that.newbies_show2 = [];
                    for (let i = 0; i < that.newbies_show1.length; i++) {
                        if (that.newbies_show1[i].status == 2) that.newbies_show2.push(that.newbies_show1[i]);
                    }
                    uni.stopPullDownRefresh();
                    that.newbies_show2 = [];
                    for (let i = 0; i < that.newbies_show1.length; i++) {
                        if (that.newbies_show1[i].status == 2) that.newbies_show2.push(that.newbies_show1[i]);
                    }
                    wx.showToast({
                        title: '获取列表成功',
                        icon: 'none',
                        duration: 1000
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
            this.newbies = this.newbies_show1;
        },
        async handleRefresh() {
            switch (this.index) {
                case 0:
                    await this.form_information();
                    break;
                case 1:
                    await this.form_newbie();
                    break;
                default:
                    await this.form_information();
                    break;
            }
        },
        async getMyInfo() {
            await getMyInfo().then((res) => {
                this.identify = res.data.data.role / 10;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.choose_which {
    font-size: 16px;
    color: black;
    width: 15%;
    padding: 10px;
    display: inline-block;
}
.test {
    width: 100%;
    height: 100%;
    /* background-color: blueviolet; */
    position: fixed;
    z-index: 1000;
}
.chosen {
    font-size: 16px;
    color: rgb(25, 137, 250);
    width: 15%;
    padding: 10px;
    display: inline-block;
}
.only_this {
    display: right;
}
.header {
    display: flex;
    width: 100%;
    border-bottom: 3px solid rgb(240, 240, 240);
}
.now_ {
    font-size: 15px;
    color: $BuddyMiniApp-color-primary;
    display: inline-block;
    margin-right: 5px;
    border: none;
    background-color: transparent;
    margin-top: 3px;
}
.inner {
    width: 1px;
    height: auto;
}
.text_all {
    position: fixed;
    background-color: crimson;
    z-index: 101;
    height: 4rem;
    width: 100%;
    line-height: 2rem;
}
.text {
    font-size: 1rem;
    color: white;
    font-family: YouYuan;
    display: inline-block;
    & p {
        display: inline-block;
        margin-left: 0.625rem;
    }
}
.chooseBuddy-field {
    padding: 10px 16px;
    .chooseBuddy-field__text {
        margin: 10px 0;
        width: 100%;
        border: gray 0.5px solid;
        border-radius: 5px;
    }
}
.chooseBuddy-action {
    padding-bottom: 10px;
    display: flex;
    width: 90px;
    margin: auto;
}
</style>

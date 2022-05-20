<template>
    <div class="square">
        <div class="square__search">
            <SquareSearch @getFilteredList="getFilteredList" />
        </div>
        <div class="square__card-wrapper">
            <div v-for="(buddy, index) in buddies" :key="index">
                <SquareCard :buddyInfo="buddy" :userId="userId" @buddy="buddy" />
            </div>
            <van-popup :show="chooseBuddyShow" round position="bottom" @close="closeChooseBuddy">
                <template class="chooseBuddy">
                    <van-cell
                        title="Buddy"
                        size="large"
                        is-link
                        :value="chooseBuddyInfo.name"
                        @click="toBuddyDetail()" />
                    <van-field
                        :autosize="{ maxHeight: 500, minHeight: 150 }"
                        label="申请理由"
                        type="textarea"
                        placeholder="输入你想对ta说的"
                        show-word-limit
                        :value="applyReason"
                        :maxlength="200"
                        @input="bindReason($event)" />
                    <van-button
                        class="chooseBuddy-action"
                        hairline
                        size="normal"
                        block
                        type="info"
                        :disabled="isDisableSubBtn"
                        @click="confirmBuddy"
                        >提交</van-button
                    >
                </template>
            </van-popup>
            <p style="color: rgba(0, 0, 0, 0.3)">{{ showBottomText }}</p>
        </div>
    </div>
</template>

<script>
import SquareSearch from './SquareSearch.vue';
import SquareCard from './SquareCard.vue';
import { applyBuddy } from '@/apis';
import { getFilteredBuddyList, getMyInfo } from '../../apis';

export default {
    name: 'Square',
    components: { SquareSearch, SquareCard },
    data() {
        return {
            chooseBuddyShow: false,
            chooseBuddyInfo: {},
            applyReason: '',
            pageNo: 1,
            pageSize: 5,
            buddies: [],
            userId: null,
            total: null,
            loadDone: false,
            filterParam: {
                direction: [],
                studyExperience: null,
                city: null,
                minAge: null,
                maxAge: null
            }
        };
    },
    async mounted() {
        await this.getList(1, false);
        uni.setNavigationBarTitle({
            title: 'Buddy广场'
        });
    },
    computed: {
        showBottomText() {
            return this.loadDone ? '已经到底了~' : '数据加载中~';
        },
        isDisableSubBtn: function () {
            return !this.applyReason;
        }
    },
    methods: {
        async getList(type, cb) {
            if (type == 1) this.pageNo = 1;
            const params = { ...this.filterParam, pageNum: this.pageNo, pageSize: this.pageSize };
            try {
                let res = (await getFilteredBuddyList(params)).data.data;
                if (type == 1) {
                    this.loadDone = false;
                    this.buddies = res.buddies;
                    this.userId = res.userId;
                    this.total = this.buddies.length;
                    if (cb) {
                        wx.showToast({
                            title: '条件筛选成功',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                    uni.pageScrollTo({ scrollTop: 0, duration: 100 });
                } else if (type == 2) {
                    this.buddies.push(...res.buddies);
                    this.total = this.buddies.length;
                }
                uni.stopPullDownRefresh();
                if (this.total >= res.total || res.total == 0) this.loadDone = true;
            } catch (e) {
                console.log(e);
            }
        },
        buddy(data) {
            this.chooseBuddyShow = true;
            this.chooseBuddyInfo = data;
        },
        closeChooseBuddy() {
            this.chooseBuddyShow = false;
        },
        async confirmBuddy() {
            // 检测联系方式是否为空
            if (!(await getMyInfo()).data.data.contactInfo) {
                uni.showModal({
                    title: '必要信息缺失',
                    content: '申请之前请先补充联系方式',
                    success: function (res) {
                        // 点击确定
                        if (res.confirm) {
                            uni.navigateTo({
                                // 预留联系方式需补充，且补充完成后需返回此页面
                                url: 'personalInfoDetail?reservedContact=undefined&isNavigateBackRequired=true'
                            });
                        }
                    }
                });
            } else {
                await applyBuddy({ buddyId: this.chooseBuddyInfo.id, reason: this.applyReason })
                    .then((res) => {
                        if (res.data.code == 1) {
                            wx.showToast({
                                title: '申请成功~',
                                icon: 'none',
                                duration: 1000
                            });
                            this.chooseBuddyShow = false;
                            this.applyReason = '';
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        bindReason(e) {
            this.applyReason = e.detail;
        },
        toBuddyDetail() {
            wx.navigateTo({ url: `buddyInfoDetail?id=${this.chooseBuddyInfo.id}&userId=${this.userId}` });
        },
        async getFilteredList(param) {
            this.loadDone = false;
            this.filterParam = param;
            await this.getList(1, true);
        },
        async getNextPage() {
            if (!this.loadDone) {
                this.pageNo++;
                await this.getList(2, true);
            }
        },
        async handleRefresh() {
            await this.getList(1, true);
        }
    }
};
</script>

<style lang="scss" scoped>
.square {
    background-color: #f8f8f8;
}
.square__search {
    position: sticky;
    top: 0px;
    width: 100%;
    z-index: 100;
}
.square__card-scroll {
    width: 100%;
    height: calc(100% - 100px);
}
.square__card-wrapper {
    & > p {
        display: flex;
        justify-content: center;
    }
}
.chooseBuddy-action {
    padding: 24px 0 24px 0;
    display: flex;
    width: 90px;
    margin: auto;
}
</style>

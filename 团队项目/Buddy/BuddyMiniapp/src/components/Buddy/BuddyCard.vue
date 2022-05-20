<template>
    <div class="BuddyCard">
        <div class="BuddyCard-left" @click="toBuddyDetail">
            <div v-show="over_date == 1" class="overDate">已结束</div>
            <div class="image">
                <Avatar :avatar="avatar_URL || '/static/default.jpg'" />
            </div>
        </div>
        <div class="BuddyCard-right">
            <div class="first-line">
                <span class="gender">
                    <span v-if="gender == 1">
                        <span class="iconfont icon-nan male"></span>
                    </span>
                    <span v-if="gender == 2">
                        <span class="iconfont icon-nv female"></span>
                    </span>
                </span>
                <span class="name">{{ name }}</span>
                <span>
                    <span class="index-image"> <span class="iconfont icon-bianhao number"></span> </span>
                    <span>
                        {{ status }}
                    </span>
                </span>
            </div>
            <div class="second-line">
                <div>{{ startday }} 至 {{ endday }}</div>
            </div>
            <div class="third-line">指导方向:</div>
            <div class="forth-line squareCard-main__fields-field">
                <div v-for="(content, index) in areas" :key="index">
                    <van-tag size="medium" plain type="primary">{{ content }}</van-tag>
                </div>
            </div>
            <div class="fifth-line">
                <span>
                    <van-button v-if="over_date == 0" plain type="default" size="small" @click="_delete()">
                        解除结对
                    </van-button>
                </span>
                <span>
                    <van-button size="small" type="info" @click="Totextbook()">记事本</van-button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar/Avatar.vue';

export default {
    name: 'BuddyCard',
    props: ['buddyInfo'],
    components: { Avatar },
    data() {
        return {
            gender: null,
            areas: [],
            over_date: null,
            name: '',
            startday: '',
            endday: '',
            team_index: null,
            avatar_URL: '',
            is_reject: null,
            status: ''
        };
    },
    created() {
        this.format_info();
    },
    methods: {
        _delete: function () {
            if (this.is_reject == 1) this.$emit('check', '0');
            else {
                this.$emit('check', this.buddyInfo);
            }
        },
        toBuddyDetail() {
            wx.navigateTo({ url: `buddyInfoDetail?id=${this.buddyInfo.personId}` });
        },
        Totextbook: function () {
            wx.navigateTo({ url: `text-book?id=${this.buddyInfo.id}` });
        },
        format_info: function () {
            this.gender = this.buddyInfo.gender;
            this.areas =
                this.buddyInfo.additionalInfo.direction.length > 3
                    ? this.buddyInfo.additionalInfo.direction.slice(0, 3)
                    : this.buddyInfo.additionalInfo.direction;
            this.name = this.buddyInfo.name;
            if (this.buddyInfo.startTime == null) this.startday = '暂未定';
            else this.startday = this.buddyInfo.startTime.slice(0, 10);
            if (this.buddyInfo.endTime == null) this.endday = '暂未定';
            else this.endday = this.buddyInfo.endTime.slice(0, 10);
            this.over_date = this.buddyInfo.status - 2;
            this.avatar_URL = this.buddyInfo.avatarUrl;
            this.is_reject = this.buddyInfo.tenDay == false ? 1 : 0;
            if (this.buddyInfo.teamIdentity == 1) this.status = '预备队员';
            if (this.buddyInfo.teamIdentity == 2) this.status = 'D' + this.buddyInfo.teamNo;
            if (this.buddyInfo.teamIdentity == 3) this.status = 'M' + this.buddyInfo.teamNo;
            if (this.buddyInfo.teamIdentity == 4) this.status = 'S' + this.buddyInfo.teamNo;
            if (this.buddyInfo.teamIdentity == 5) this.status = 'S' + this.buddyInfo.teamNo;
            if (this.buddyInfo.teamIdentity == 6) this.status = 'G' + this.buddyInfo.teamNo;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.overDate {
    position: relative;
    min-width: 50px;
    width: 3.25rem;
    height: 1.325rem;
    border-radius: 20px;
    background-color: #ee0a24;
    font-size: 13px;
    text-align: center;
    line-height: 1.32rem;
    color: white;

    // 目的是与右边第一行在视觉上对齐
    margin-top: 2px;
}

.image {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}
.BuddyCard {
    display: flex;
    padding: 12px 16px;
    border-bottom: 2px solid $BuddyMiniApp-divider-color;
}
.BuddyCard-left {
    width: 30%;
}
.BuddyCard-right {
    margin-left: 16px;
}
.first-line {
    padding: 0 0 2px 0;
    font-size: 19px;
    font-weight: 700;
}
.gender {
    padding-right: 12px;
}
.male {
    font-size: 20px;
}
.female {
    font-size: 20px;
}
.name {
    padding-right: 14px;
}
.number {
    font-size: 20px;
}
.index-image {
    padding-right: 5px;
}
.second-line {
    padding: 2px 0;
}

.third-line {
    padding: 2px 0 0 0;
}

.squareCard-main__fields-field {
    & > div {
        padding-right: 10px;
        display: inline;
        white-space: pre-line;
    }
}

.fifth-line {
    padding: 12px 0 0 0;
    display: flex;
    justify-content: flex-end;

    & > span:first-child {
        padding-right: 16px;
    }
}
</style>

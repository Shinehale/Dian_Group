<template>
    <div class="NewbieCard">
        <div class="NewbieCard-left" @click="toNewbieDetail">
            <div v-show="over_date == 1" class="overDate">已结束</div>
            <div class="image">
                <Avatar :avatar="avatar_URL || '/static/default.jpg'" />
            </div>
        </div>
        <div class="NewbieCard-right">
            <div class="first-line">
                <div class="gender">
                    <div v-if="gender == 1" class="male">
                        <span class="iconfont icon-nan male"></span>
                    </div>
                    <div v-if="gender == 2" class="male">
                        <span class="iconfont icon-nv female"></span>
                    </div>
                </div>
                <div class="name">{{ name }}</div>
                <div class="status">{{ status }}</div>
            </div>
            <div class="second-line">{{ startday }} 至 {{ endday }}</div>
            <div class="third-line">
                <van-button class="text-book" size="small" round type="info" @click="Totextbook()">记事本</van-button>
                <div v-if="over_date == 0" class="relieve" @click="_delete()">解除</div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar/Avatar.vue';

export default {
    name: 'NewbieCard',
    props: ['newbieinfo'],
    components: { Avatar },
    data() {
        return {
            gender: null, //当前性别
            over_date: null, //是否已经超过当前日期
            is_reject: null, //是否在10天之内
            avatar_URL: '',
            startday: '',
            endday: '',
            name: '',
            status: ''
        };
    },
    created() {
        this.form_data();
    },
    methods: {
        Totextbook: function () {
            wx.navigateTo({ url: `text-book?id=${this.newbieinfo.id}` });
        },
        _delete: function () {
            this.$emit('check', this.newbieinfo);
        },
        toNewbieDetail() {
            wx.navigateTo({ url: `NewbieInfoDetail?userId=${this.newbieinfo.personId}` });
        },
        form_data: function () {
            this.gender = this.newbieinfo.gender;
            this.over_date = this.newbieinfo.status - 2;
            this.is_reject = this.newbieinfo.tenDay == false ? 1 : 0;
            this.name = this.newbieinfo.name;
            if (this.newbieinfo.startTime == null) this.startday = '暂未定';
            else this.startday = this.newbieinfo.startTime.slice(0, 10);
            if (this.newbieinfo.endTime == null) this.endday = '暂未定';
            else this.endday = this.newbieinfo.endTime.slice(0, 10);
            this.avatar_URL = this.newbieinfo.avatarUrl;
            if (this.newbieinfo.teamIdentity == 1) this.status = '预备队员';
            if (this.newbieinfo.teamIdentity == 2) this.status = 'D' + this.newbieinfo.teamNo;
            if (this.newbieinfo.teamIdentity == 3) this.status = 'M' + this.newbieinfo.teamNo;
            if (this.newbieinfo.teamIdentity == 4) this.status = 'S' + this.newbieinfo.teamNo;
            if (this.newbieinfo.teamIdentity == 5) this.status = 'S' + this.newbieinfo.teamNo;
            if (this.newbieinfo.teamIdentity == 6) this.status = 'G' + this.newbieinfo.teamNo;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

button {
    width: 25%;
    display: inline-block;
    height: 25px;
    font-size: 0.9375rem;
}
.male {
    font-size: 25px;
}
.female {
    font-size: 25px;
}
.image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    & > img {
        width: 80%;
        height: 80%;
        object-fit: cover;
        border-radius: 50%;
    }
}
.NewbieCard {
    display: flex;
    width: 100%;
    height: 9.8rem;
    border-bottom: 2px solid $BuddyMiniApp-divider-color;
}
.status {
    height: 25px;
    font-size: 1rem;
    margin-left: 0.3125rem;
    line-height: 25px;
    width: 70px;
    font-family: Comic Sans MS;
}
.NewbieCard-left {
    display: inline-block;
    width: 35%;
    height: 100%;
}
.NewbieCard-right {
    width: 65%;
    box-sizing: border-box;
    height: 100px;
    /* background-color: rebeccapurple; */
    display: inline-block;
}
.first-line {
    display: flex;
    width: 100%;
    height: 25%;
    margin-top: 1.325rem;
    margin-bottom: 2px;
}
.name {
    width: 35%;
    font-size: 20px;
    height: 25px;
    float: left;
    margin-left: 10px;
    font-weight: 1000;
    line-height: 25px;
    text-align: center;
    font-family: Youyuan;
}
.gender {
    width: 10%;
    height: 100%;
    float: left;
    line-height: 25px;
    /* background-color: blue; */
}
.male {
    width: 100%;
    height: 100%;
}
.second-line {
    width: 100%;
    height: 25%;
    float: left;
    margin-top: 4px;
    font-size: 0.8125rem;
    margin-bottom: 1.25rem;
}
.third-line {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 30%;
    margin-top: 6px;
}
.text-book {
    float: right;
    margin-right: 0.625rem;
}
.relieve {
    background-color: transparent;
    margin-right: 5px;
    margin-top: 5px;
    font-size: 14px;
    display: inline-block;
    width: 40px;
    height: 20px;
    line-height: 20px;
    color: gray;
}
.overDate {
    position: relative;
    width: 3.25rem;
    height: 1.325rem;
    border-radius: 20px;
    background-color: red;
    font-size: 13px;
    text-align: center;
    line-height: 1.32rem;
    color: white;
    top: 20%;
}
</style>

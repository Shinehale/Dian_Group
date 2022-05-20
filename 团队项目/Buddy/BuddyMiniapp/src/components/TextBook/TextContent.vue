<template>
    <div class="textContent">
        <div class="radio" v-if="state == 1" @click="change_on_off">
            <van-checkbox v-model="checked" @click="change_on_off"></van-checkbox>
        </div>
        <div class="text-content" @click="Toisserved()">
            <div class="first_line">
                {{ main.headname }}
                <div class="rightarrow">
                    <span class="iconfont icon-you right"></span>
                </div>
            </div>
            <div class="second_line">创建于{{ main.time }}</div>
            <div class="third_line">{{ main.content }}...</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TextContent',
    props: ['content', 'states'],
    data() {
        return {
            main: {
                headname: '',
                content: '',
                time: '',
                index: null
            },
            state: 0,
            checked: 0,
            on_off: 0
        };
    },
    watch: {
        states(newvalue) {
            if (newvalue == true) {
                this.state = 1;
            } else {
                this.state = 0;
            }
        },
        on_off() {
            this.$emit('proms', this.main.index);
        }
    },
    mounted() {
        this.form_data();
    },
    methods: {
        Toisserved: function () {
            this.$emit('chosen', this.main.index);
            wx.navigateTo({ url: `servedpage?id=${this.main.index}` });
        },
        change_on_off: function () {
            this.on_off = this.on_off ^ 1;
            if (this.on_off == 1) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        },
        form_data: function () {
            this.main.headname = this.content.header;
            this.main.time = this.content.createdTime.slice(0, 10) + ' ' + this.content.createdTime.slice(11, 19);
            this.main.content =
                this.content.content.length > 20
                    ? this.content.content.slice(0, 20) + '...'
                    : this.content.content + '...';
            this.main.index = this.content.id;
        }
    }
};
</script>
<style scoped>
.textContent {
    width: 100%;
    height: 7.375rem;
    border-bottom: 1px solid black;
}
.right {
    font-size: 1.75rem;
    width: 10%;
    height: 2.6875rem;
    line-height: 2.6875rem;
    float: right;
    margin-right: 0.375rem;
}
.radio {
    width: 10%;
    float: left;
    height: 100%;
    /* background-color: blueviolet; */
    line-height: 7.375rem;
    font-size: 1.25rem;
    box-sizing: border-box;
    padding-left: 0.3875rem;
    padding-top: 3.125rem;
}
.text-content {
    box-sizing: border-box;
    width: 90%;
    height: 100%;
    padding: 0.825rem;
    float: left;
}
.first_line {
    width: 100%;
    height: 35%;
    font-weight: 700;
    font-size: 1.25rem;
    float: left;
    margin-bottom: 0.3125rem;
}
.second_line {
    width: 100%;
    height: 25%;
    float: left;
    font-size: 15px;
    margin-top: 0.325rem;
}
.third_line {
    display: flex;
    width: 100%;
    font-size: 15px;
    padding-top: 0.625rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.rightarrow {
    float: right;
}
.check {
    width: 5%;
    height: 6.25rem;
    display: inline-block;
    line-height: 7.375rem;
    margin-left: 0.3125rem;
}
</style>

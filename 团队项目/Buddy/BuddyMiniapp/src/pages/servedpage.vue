<template>
    <div class="isserved">
        <div class="first-line">
            <div class="time">编辑于{{ time }}</div>
            <div v-if="state == 0">
                <button class="style_button" @click="change_state(1)">编辑</button>
            </div>
            <div v-if="state == 1">
                <button class="style_button" @click="change_state(0), updateUni()">保存</button>
            </div>
        </div>
        <div class="header">{{ header }}</div>
        <div class="third-line">
            <div class="textsize" v-if="state == 1">{{ sum }}/1000</div>
        </div>
        <div class="last-part">
            <div class="content" v-if="state == 0">{{ content }}</div>
            <textarea class="content" v-if="state == 1" v-model="new_content" @input="changesum()"></textarea>
        </div>
    </div>
</template>

<script>
import { updateUniTextbook, getUniTextbook } from '@/apis';

export default {
    name: 'isserved',
    data() {
        return {
            id: null,
            info: {},
            header: '',
            content: '',
            state: 0, //0表示查看状态,1表示编辑状态
            time: '',
            sum: 0,
            new_content: '',
            new_header: ''
        };
    },
    onLoad(option) {
        this.id = option.id;
        this.getText();
    },
    methods: {
        change_state: function (index) {
            this.state = index;
        },
        changesum: function () {
            this.sum = this.new_content.length;
        },
        form_data: function () {
            this.header = this.info.header;
            this.content = this.info.content;
            this.time = this.info.createdTime.slice(0, 10) + ' ' + this.info.createdTime.slice(11, 19);
            this.id = this.info.id;
            this.new_content = this.info.content;
            this.new_header = this.info.header;
            this.sum = this.content.length;
        },
        async getText() {
            let that = this;
            await getUniTextbook({ id: this.id })
                .then((res) => {
                    that.info = res.data.data;
                    that.form_data();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        async updateUni() {
            if (this.new_content.length == 0 || this.new_content.match(/^[ ]*$/) || this.new_header.length == 0) {
                this.form_data();
                return;
            } else {
                await updateUniTextbook({ id: this.id, header: this.new_header, content: this.new_content })
                    .then(() => {
                        setTimeout(() => {
                            wx.showToast({
                                title: '更新成功~',
                                icon: 'none',
                                duration: 1000
                            });
                        }, 500);
                        this.content = this.new_content;
                        this.header = this.new_header;
                        this.info.content = this.new_content;
                        this.info.header = this.new_header;
                        wx.navigateBack();
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        }
    }
};
</script>

<style scoped>
.isserved {
    width: 100%;
    height: 72.5rem;
    float: left;
}
.first-line {
    width: 100%;
    height: 1.6875rem;
    float: left;
    border-top: 1px solid black;
}
.last-part {
    width: 100%;
    height: 36.75rem;
}
.content {
    width: 100%;
    padding-left: 4%;
    padding-right: 3%;
    box-sizing: border-box;
}
.time {
    width: 65%;
    height: 1.875rem;
    float: left;
    font-size: 0.9375rem;
    padding-left: 0.5125rem;
}
.header {
    width: 100%;
    height: 2.75rem;
    font-weight: 700;
    border-bottom: 0.0625rem solid black;
    font-size: 1.5625rem;
    float: left;
    padding-left: 0.5625rem;
}
.style_button {
    width: 17%;
    height: 2.125rem;
    float: right;
    background-color: rgb(30, 152, 215);
    color: white;
    line-height: 2.125rem;
    text-align: center;
    margin-right: 1.25rem;
    font-size: 1rem;
    margin-top: 0.625rem;
}
.third-line {
    width: 100%;
    height: 1.5625rem;
    float: left;
}
.textsize {
    float: right;
    /* width: 5.625rem; */
    margin-right: 0.6125rem;
    height: 100%;
    line-height: 1.5625rem;
    color: gray;
}
</style>

<template>
    <div class="Newpage">
        <div class="header">
            <input type="text" v-model="header" placeholder="标题(15字以内)" maxlength="15" />
        </div>
        <div class="content">
            <div class="first_line">
                <div class="length">{{ sum }}/1000</div>
            </div>
            <textarea
                placeholder="请输入正文"
                v-model="content"
                @input="changesum()"
                class="put"
                maxlength="1000"></textarea>
        </div>
        <div class="lst-line">
            <van-button class="preserve" plain hairline size="normal" block type="info" @click="pushNew()"
                >保存</van-button
            >
        </div>
    </div>
</template>
<script>
import { newTextpage } from '@/apis';

export default {
    name: 'Newpage',
    data() {
        return {
            header: '',
            content: '',
            time: '',
            sum: 0,
            id: null,
            show: 0
        };
    },
    onLoad(option) {
        this.id = option.id;
    },
    methods: {
        changesum: function () {
            this.sum = this.content.length;
        },
        async pushNew() {
            if (this.content.length == 0 || this.content.match(/^[ ]*$/) || this.header.length == 0) {
                this.content = '';
                this.header = '';
                return;
            } else {
                await newTextpage({ relationId: this.id, header: this.header, content: this.content })
                    .then(() => {
                        setTimeout(() => {
                            wx.showToast({
                                title: '保存成功~',
                                icon: 'none',
                                duration: 1000
                            });
                        }, 500);
                        this.content = '';
                        this.header = '';
                        wx.navigateBack({ url: `text-book?id=${this.id}` });
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
.first_line {
    width: 100%;
    height: 1.5625rem;
    color: gray;
}
.length {
    float: right;
    margin-right: 0.3875rem;
}
.header {
    width: 100%;
    height: 1.875rem;
    margin-left: 5px;
    background-color: violets;
    border-bottom: 1px solid black;
    margin-top: 10px;
    line-height: 1.125rem;
    margin-bottom: 0.625rem;
    font-size: 1.25rem;
}
.text {
    padding-left: 0.3125rem;
}
.content {
    width: 100%;
    height: 28rem;
}
.preserve {
    width: 20%;
    display: flex;
    margin: auto;
}
.put {
    height: 25rem;
    width: calc(100% - 5px);
    padding-left: 5px;
}
.lst-line {
    width: 100%;
    height: 3.125rem;
    margin-top: 1.25rem;
    display: inline-block;
}
</style>

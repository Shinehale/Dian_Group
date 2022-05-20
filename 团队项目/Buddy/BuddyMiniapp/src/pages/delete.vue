<template>
    <div class="relink">
        <div class="first-line">
            <div class="fr_left">Buddy</div>
            <div class="fr_right">
                <div class="image">
                    <img src="/static/default.jpg" alt="" />
                </div>
                <div class="name">李四</div>
                <span class="iconfont icon-you right"></span>
            </div>
        </div>
        <div class="second-line">解除理由</div>
        <div class="frame">
            <textarea
                maxlength="200"
                placeholder="请输入解除理由"
                v-model="content"
                @input="changeSum()"
                class="textarea"></textarea>
            <div class="isline">{{ sum }}/200</div>
        </div>
        <div class="last-line">
            <button class="commit" @click="sure()">提交</button>
        </div>
    </div>
</template>

<script>
// import func from 'vue-editor-bridge';

export default {
    name: 'relink',
    data() {
        return {
            sum: 0,
            content: ' '
        };
    },
    methods: {
        changeSum: function () {
            let leng = this.content.length;
            this.sum = leng;
        },
        sure: function () {}
    }
};
</script>

<style lang="scss" scoped>
.relink {
    width: 100%;
    height: 18.75rem;
}
.first-line {
    width: 100%;
    height: 25%;
    border-bottom: 1px solid black;
    display: flex;
}
.fr_left {
    line-height: 4.6875rem;
    font-weight: 700;
    font-size: 25px;
    padding-left: 16px;
}
.fr_right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.name {
    width: 25%;
    height: 4.6875rem;
    float: right;
    font-size: 1.25rem;
    line-height: 4.6875rem;
    text-align: right;
    padding-right: 0.625rem;
}
.right {
    font-size: 2.25rem;
    width: 10%;
    height: 4.6875rem;
    line-height: 4.6875rem;
}
.image {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 30%;
    & > img {
        width: 80%;
        height: 80%;
        object-fit: cover;
        border-radius: 50%;
    }
}
.second-line {
    width: 100%;
    height: 3.125rem;
    line-height: 3.125rem;
    padding-left: 16px;
    font-weight: 700;
    font-size: 1.5625rem;
}
.frame {
    width: 90%;
    height: 15.5rem;
    /* background-color: blueviolet; */
    display: inline-block;
    padding: 0.625rem;
    margin-left: 5%;
    margin-right: 5%;
    border: 1px solid black;
    box-sizing: border-box;
}
.textarea {
    width: 100%;
    height: 90%;
    /* background-color: blue; */
}
.isline {
    display: flex;
    justify-content: flex-end;
    font-size: 1.05rem;
    line-height: 1.875rem;
}
.last-line {
    width: 100%;
    height: 3.25rem;
    display: inline-block;
    margin-top: 1.3125rem;
}
.commit {
    width: 30%;
    height: 100%;
    background-color: rgb(30, 152, 215);
    line-height: 3.25rem;
    font-size: 1.5625rem;
    color: white;
}
</style>

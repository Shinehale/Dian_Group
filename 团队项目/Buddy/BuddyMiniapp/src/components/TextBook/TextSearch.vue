<template>
    <div class="squareSearch">
        <div class="squareSearch__search">
            <van-search
                class="search"
                :value="searchInfo"
                input-align="center"
                placeholder="请输入搜索关键词"
                @change="bindSearchInfo" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SquareSearch',
    data() {
        return {
            searchInfo: '',
            filterShow: false
        };
    },
    methods: {
        bindSearchInfo: function (e) {
            this.searchInfo = e.detail;
            this.$emit('textSearch', this.searchInfo);
        }
    }
};
</script>

<style scoped>
.squareSearch {
    box-sizing: border-box;
    height: 3.5rem;
    width: 100%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
}
</style>

<template>
    <div class="squareSearch">
        <div class="squareSearch__search">
            <van-search
                :value="searchInfo"
                @change="bindSearchInfo"
                input-align="center"
                placeholder="请输入搜索关键词（姓名或者编号）" />
        </div>
        <div class="squareSearch__filter">
            <van-cell title="筛选" is-link :value="filters[filter]" @click="showFilter" />
            <van-popup
                :show="filterShow"
                round
                position="bottom"
                custom-style="height: 80%"
                closable
                @close="closeFilter">
                <square-search-filter @getFilter="getFilter" />
            </van-popup>
            <!-- <SquareFilter></SquareFilter> -->
        </div>
    </div>
</template>

<script>
import SquareSearchFilter from './SquareSearchFilter.vue';
// import SquareFilter from './SquareFilter.vue'
export default {
    name: 'SquareSearch',
    data() {
        return {
            searchInfo: '',
            filterShow: false,
            filterParam: {
                direction: [],
                studyExperience: null,
                city: null,
                minAge: null,
                maxAge: null
            },
        };
    },
    components: { SquareSearchFilter },
    methods: {
        showFilter() {
            this.filterShow = true;
        },
        async closeFilter() {
            this.filterShow = false;
            const keyWord = this.searchInfo ? this.searchInfo : null;
            this.filterParam = { ...this.filterParam, keyWord };
            this.$emit('getFilteredList', this.filterParam);
        },
        confirmFilter(e) {
            this.filterShow = false;
            this.filter = e.detail.index;
        },
        getFilter(data) {
            this.filterParam = data;
        },
        bindSearchInfo(e) {
            this.searchInfo = e.detail;
            const keyWord = this.searchInfo ? this.searchInfo : null;
            this.filterParam = { ...this.filterParam, keyWord };
            this.$emit('getFilteredList', this.filterParam);
        }
    }
};
</script>

<style scoped>
.squareSearch {
    height: 100px;
    margin-bottom: 5px;
}
.menu {
    height: 50px;
    background-color: white;
    border: 1px solid black;
    width: 100%;
}
</style>

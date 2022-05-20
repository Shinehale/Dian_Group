<template>
    <div class="squareSearchFilter">
        <div class="squareSearchFilter-title">
            <span class="squareSearchFilter-title__text">筛选</span>
            <van-button plain type="info" @click="reset">重置</van-button>
        </div>
        <div class="squareSearchFilter-subtitle">
            <span class="squareSearchFilter-subtitle__text">指导方向</span>
        </div>
        <div class="squareSearchFilter-select">
            <van-checkbox-group :value="selectedItems" @change="bindSelectedItems" direction="horizontal">
                <van-checkbox
                    :name="item.name"
                    v-for="item in filterItems"
                    :key="item.text"
                    class="squareSearchFilter-select__item"
                    >{{ item.text }}</van-checkbox
                >
            </van-checkbox-group>
        </div>
        <div class="squareSearchFilter-subtitle">
            <span class="squareSearchFilter-subtitle__text">深造经历</span>
        </div>
        <div class="squareSearchFilter-exp">
            <van-cell title="选择深造经历" is-link :value="selectedExpItem" @click="showExp" />
            <van-popup :show="expShow" round position="bottom" custom-style="height: 50%" @close="closeExp">
                <van-picker
                    show-toolbar
                    :columns="expItems"
                    @cancel="closeExp"
                    @confirm="bindExpItem"
                    @change="changeExp" />
            </van-popup>
        </div>
        <div class="squareSearchFilter-subtitle">
            <span class="squareSearchFilter-subtitle__text">所在城市</span>
        </div>
        <div class="squareSearchFilter-city">
            <van-cell title="选择城市" is-link :value="selectedCity" @click="showCity" />
            <van-popup :show="cityShow" round position="bottom" custom-style="height: 50%" @close="closeCity">
                <van-area
                    columns-num="2"
                    :area-list="areaList"
                    :value="selectedCityCode"
                    @cancel="closeCity"
                    @confirm="bindCity" />
            </van-popup>
        </div>
        <div class="squareSearchFilter-subtitle">
            <span class="squareSearchFilter-subtitle__text">年龄</span>
        </div>
        <div class="squareSearchFilter-age">
            <van-field
                :value="startAge"
                @change="bindMinAge"
                border
                placeholder="请输入起始年龄"
                class="squareSearchFilter-age__field" />
            <van-field
                :value="endAge"
                @change="bindMaxAge"
                border
                placeholder="请输入终止年龄"
                class="squareSearchFilter-age__field" />
        </div>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';

const expItemsList = {
    硕士: ['保研', '考研', '留学', '其他'],
    博士: ['直博', '考博', '留学', '其他']
};

export default {
    name: 'SquareSearchFilter',
    data() {
        return {
            filterItems: [
                {
                    name: '1',
                    text: '生涯规划'
                },
                {
                    name: '2',
                    text: '学业提升'
                },
                {
                    name: '3',
                    text: '科创竞赛'
                },
                {
                    name: '4',
                    text: '自我管理'
                },
                {
                    name: '5',
                    text: '心态调节'
                },
                {
                    name: '6',
                    text: '生活与健康'
                },
                {
                    name: '7',
                    text: '表达能力'
                },
                {
                    name: '8',
                    text: '人际关系'
                },
                {
                    name: '9',
                    text: '恋爱与性'
                },
                {
                    name: '10',
                    text: '学术科研'
                }
            ],
            selectedItems: [],
            selectedExpItem: null,
            expItems: [
                {
                    values: Object.keys(expItemsList),
                    className: 'column1'
                },
                {
                    values: expItemsList['硕士'],
                    className: 'column2'
                }
            ],
            expShow: false,
            areaList: areaList,
            cityShow: false,
            selectedCity: null,
            startAge: null,
            endAge: null
        };
    },
    methods: {
        bindSelectedItems(e) {
            this.selectedItems = e.detail;
            this.emitFilter();
        },
        bindExpItem(e) {
            this.selectedExpItem = e.target.value.join('-');
            this.expShow = false;
            this.emitFilter();
        },
        showExp() {
            this.expShow = true;
        },
        closeExp() {
            this.expShow = false;
            this.emitFilter();
        },
        changeExp(e) {
            const { picker, value } = e.detail;
            picker.setColumnValues(1, expItemsList[value[0]]);
            this.emitFilter();
        },
        showCity() {
            this.cityShow = true;
        },
        closeCity() {
            this.cityShow = false;
            this.emitFilter();
        },
        bindCity(e) {
            this.selectedCity = e.mp.detail.values[0].name + '-' + e.mp.detail.values[1].name;
            this.selectedCityCode = e.mp.detail.values[1].code;
            this.cityShow = false;
            this.emitFilter();
        },
        bindMinAge(e) {
            this.startAge = e.detail;
            this.emitFilter();
        },
        bindMaxAge(e) {
            this.endAge = e.detail;
            this.emitFilter();
        },
        emitFilter() {
            let direction = [];
            this.selectedItems.forEach((e) => {
                direction.push(this.filterItems[e - 1].text);
            });
            const param = {
                direction: direction,
                studyExperience: this.selectedExpItem || null,
                city: this.selectedCity || null,
                minAge: this.startAge,
                maxAge: this.endAge
            };
            this.$emit('getFilter', param);
        },
        reset() {
            this.selectedItems = [];
            this.selectedExpItem = null;
            this.selectedCity = null;
            this.startAge = null;
            this.endAge = null;
            const param = {
                direction: [],
                studyExperience: null,
                city: null,
                minAge: null,
                maxAge: null
            };
            this.$emit('getFilter', param);
        }
    }
};
</script>

<style lang="scss" scoped>
.squareSearchFilter {
    padding: 30px 20px;
    &-title {
        display: flex;
        justify-content: space-between;
    }
    &-title__text {
        font-size: 36px;
    }
    &-subtitle {
        padding-top: 10px;
        &__text {
            font-size: 25px;
        }
    }
    &-select {
        padding: 10px 5px;
        &__item {
            padding: 5px 0;
        }
    }
    &-age {
        display: flex;
        justify-content: space-around;
        padding: 5px 16px;
        &__field {
            width: 45%;
            border: #1111112e 1px solid;
        }
    }
    ::v-deep {
        white-space: nowrap;
    }
}
</style>

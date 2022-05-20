<template>
    <div class="text-book">
        <div class="searchbox">
            <TextSearch class="search" @textSearch="solve()" />
            <div class="state" v-if="states == 0" @click="change_state(1)">
                <span class="iconfont icon-shezhi setting"></span>
            </div>
            <div class="state" v-if="states == 1" @click="change_state(0), beginDelete()">
                <span class="iconfont icon-lajitong rubbish"></span>
            </div>
        </div>
        <div class="Singlecontent">
            <div class="content" v-if="chosenIf == 0">
                <div v-for="content in text" :key="content.id">
                    <TextContent :content="content" @proms="add()" @chosen="choose()" :states="states" />
                </div>
            </div>
        </div>
        <div class="Singlecontent">
            <div class="content" v-if="chosenIf == 1">
                <div v-for="content in text" :key="content.id">
                    <TextContent :content="content" @proms="add()" @chosen="choose()" :states="states" />
                </div>
            </div>
        </div>
        <div class="addNew" v-if="states == 0">
            <van-icon @click="Tonewtext()" name="add-o" />
        </div>
        <van-dialog
            :show="show"
            title="请问您是否确认删除所选内容"
            showConfirmButton="true"
            showCancelButton="true"
            @confirm="goDelete()"
            @cancel="show = false">
        </van-dialog>
    </div>
</template>

<script>
import TextContent from '../components/TextBook/TextContent.vue';
import TextSearch from '../components/TextBook/TextSearch.vue';
import { getTextbookAll } from '@/apis';
import { deleteTextbooks } from '@/apis';
import { searchTextbook } from '@/apis';
export default {
    data() {
        return {
            states: 0, //0表示查看状态,1表示删除状态
            relieve: 1,
            proms: [],
            final_proms: [],
            id: null,
            text: [],
            key: 0,
            textSearch: '',
            chosen: 0,
            chosenIf: 0,
            show: false
        };
    },
    components: { TextContent, TextSearch },
    onLoad(option) {
        this.id = option.id;
    },
    onShow() {
        this.getAll();
    },
    watch: {
        text(newvalue, oldvalue) {
            let pos = null;
            for (let i = 0; i < newvalue.length; i++) {
                if (newvalue[i].id == this.chosen) {
                    pos = i;
                }
            }
            if (pos != null) {
                if (newvalue[pos].content != oldvalue[pos].content) {
                    this.chosenIf ^= 1;
                    this.chosen = 0;
                }
            }
        }
    },
    methods: {
        choose(data) {
            this.chosen = data;
        },
        Tonewtext: function () {
            wx.navigateTo({ url: `Newtextpage?id=${this.id}` });
        },
        change_state: function (index) {
            this.states = index;
        },
        closeConfirm: function () {
            this.show_confirm = false;
        },
        beginDelete: function () {
            var dt = {};
            for (let i = 0; i < this.proms.length; i++) {
                if (this.proms[i] in dt) {
                    dt[this.proms[i]] += 1;
                } else {
                    dt[this.proms[i]] = 1;
                }
            }
            for (var j in dt) {
                if (dt[j] % 2 != 0) {
                    this.final_proms.push(j);
                }
            }
            this.show = true;
        },
        async goDelete() {
            if (this.final_proms.length == 0) {
                wx.showToast({
                    title: '无可删除的记事本记录~',
                    icon: 'none',
                    duration: 1000
                });
                this.proms = [];
            } else {
                await deleteTextbooks({ idList: this.final_proms })
                    .then(() => {
                        this.proms = [];
                        this.final_proms = [];
                        setTimeout(() => {
                            wx.showToast({
                                title: '删除成功~',
                                icon: 'none',
                                duration: 1000
                            });
                        }, 500);
                        wx.navigateBack();
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        add: function (data) {
            let that = this;
            that.proms.push(data);
        },
        solve: async function (data) {
            let that = this;
            that.textSearch = data;
            await this.search();
        },
        async getAll() {
            await getTextbookAll({ relationId: this.id })
                .then((res) => {
                    this.text = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        async search() {
            let that = this;
            await searchTextbook({ keywords: this.textSearch, relationId: this.id })
                .then((res) => {
                    that.text = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
};
</script>

<style scoped>
.addNew {
    position: fixed;
    box-sizing: border-box;
    bottom: 20px;
    right: 20px;
    font-size: 50px;
    background-color: white;
    border-radius: 5.25rem;
    width: 50px;
    height: 50px;
    line-height: 50px;
    box-shadow: 1px 1px 1px gray;
}
.van-icon-add-o {
    font-size: 60px;
}
.test {
    width: 100px;
    height: 6.25rem;
    background-color: blueviolet;
}
.search {
    width: 88%;
    float: left;
}
.state {
    width: 2.75rem;
    height: 100%;
    margin-left: 0.3125rem;
    line-height: 3.5rem;
    margin-left: auto;
}
.setting {
    font-size: 1.875rem;
}
.rubbish {
    font-size: 1.875rem;
}
.Singlecontent {
    float: left;
    width: 100%;
    height: auto;
}
.content {
    width: 100%;
}
.quan .gou {
    font-size: 1.675rem;
}
</style>

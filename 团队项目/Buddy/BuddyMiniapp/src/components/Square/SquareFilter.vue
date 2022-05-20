<template>
    <div class="SquareFilter">
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            option2: [
                { text: '默认排序', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' }
            ]
        };
    }
};

// export default {

//     data() {
//         return {
//             option1: [
//                 { text: '生涯规划', value: 0 },
//                 { text: '学业提升', value: 1 },
//                 { text: '科创竞赛', value: 2 },
//                 { text: '科研学术', value: 3 },
//                 { text: '自我管理', value: 4 },
//                 { text: '心态调节', value: 5 },
//                 { text: '表达能力', value: 6 },
//                 { text: '人际关系', value: 7 },
//                 { text: '恋爱与性', value: 8 },
//                 { text: '生活与健康', value: 9 }
//             ],
//             option2: [
//                 { text: '本科', value: 'a' },
//                 { text: '硕士', value: 'b' },
//                 { text: '博士', value: 'c' },
//                 { text: '博士后', value: 'd' },
//                 { text: '副教授', value: 'f' },
//                 { text: '教授', value: 'a' }
//             ],
//             option3: [{}],
//             value1: 5,
//             value2: 'a'
//         };
//     },
//     methods: {
//         put() {
//             console.log(this.value1);
//         },
//         change_value1(value1) {
//             console.log(value1);
//         }
//     }
// };
</script>
<style scoped></style>

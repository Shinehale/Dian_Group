<!--
 * @Author       : GuoXu
 * @Date         : 2022-02-19 03:38:33
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-03-14 21:36:54
 * @Description  : 使用指南
 * @FilePath     : \BuddyMiniapp\src\pages\instructionsForUse.vue
-->
<template>
    <div class="about-this-small-program" :style="{ height: screenHeight + 'px' }">
        <p>所有进入小程序的用户初始身份均为 newbie 身份</p>
        <p>newbie通过“申请成为 buddy”可以将身份转化为 buddy</p>
        <p>
            newbie 可以通过向 buddy 发送结对申请来申请结对，在等待申请通过的过程中， Newbie
            随时可以前往【通知】撤销结对申请。
        </p>
        <p>结对成功后newbie 可以获取到buddy的联系方式寻求指导，buddy 可以向 newbie 提供指导与帮助</p>
        <p>当前可供选择的 buddy 都会在【广场】显示</p>
        <p>
            一个 buddy 可以同时与 3 个 newbie 结对，但一个 newbie 同时只能与一个 buddy 结对。buddy 也可以与 buddy 结对
        </p>
        <p>
            newbie方若要解除结对，需要与 buddy 结对满十天才可以解除，若要马上解除结对关系，请联系 buddy 让 buddy
            方解除结对
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            screenHeight: 100,
            show_awakeTimePopup: false
        };
    },
    created() {
        this.screenHeight = uni.getSystemInfoSync().windowHeight;
        uni.setNavigationBarTitle({
            title: '使用指南'
        });
    },
    methods: {
        showApplicationRecordListPopup() {
            this.show_awakeTimePopup = true;
        },
        closeAwakeTimePopup() {
            this.show_awakeTimePopup = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.about-this-small-program {
    min-height: 100%;
    padding: 32px;
    box-sizing: border-box;
    & > p {
        padding: 6px 0;
        text-align: justify;
        font-size: 14px;
    }
}
</style>

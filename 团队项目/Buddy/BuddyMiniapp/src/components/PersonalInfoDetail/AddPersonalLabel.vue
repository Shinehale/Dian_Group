<!--
 * @Author       : GuoXu
 * @Date         : 2021-12-27 21:50:59
 * @LastEditors  : GuoXu
 * @LastEditTime : 2021-12-28 12:17:41
 * @Description  : 添加个人标签组件
 * @FilePath     : \BuddyMiniapp\src\components\PersonalInfoDetail\AddPersonalLabel.vue
-->
<template>
    <div v-if="show_addPersonalLabel" class="personalInfoDetail__AddPersonalLabelPopup">
        <van-popup
            :show="show_addPersonalLabel"
            round
            position="bottom"
            custom-style="height: 50%"
            @close="closeAddPersonalLabelPopup">
            <div class="personalInfoDetail__AddPersonalLabelPopup__confirmAndCancel">
                <span @click="closeAddPersonalLabelPopup" class="personalInfoDetail__AddPersonalLabelPopup__cancel"
                    >取消</span
                >
                <span
                    @click="closeAddPersonalLabelPopup(), modifyPersonalLabels(selectedPersonalLabels)"
                    class="personalInfoDetail__AddPersonalLabelPopup__confirm"
                    >确定</span
                >
            </div>
            <van-checkbox-group
                :value="selectedPersonalLabels"
                @change="getSelectedPersonalLabels"
                direction="horizontal"
                class="personalInfoDetail__AddPersonalLabelPopup__checkbox-group">
                <van-checkbox
                    :name="item.name"
                    v-for="(item, index) in allPersonalLabels"
                    :key="index"
                    class="personalInfoDetail__AddPersonalLabelPopup__checkbox-group__item">
                    {{ item.text }}
                </van-checkbox>
            </van-checkbox-group>
            <van-cell-group>
                <van-field
                    size="large"
                    label="自定义"
                    maxlength="8"
                    :value="customPersonalLabelToBeAdded"
                    placeholder="自定义你的个人标签"
                    @input="getCustomPersonalLabel($event)">
                    <template #button>
                        <van-button size="small" type="info" @click="this.addCustomPersonalLabel">添加</van-button>
                    </template></van-field
                >
            </van-cell-group>
        </van-popup>
    </div>
</template>

<script>
import { allFixedPersonalLabels } from './CONST';

export default {
    props: {
        show_addPersonalLabel: Boolean,
        selectedPersonalLabelsFromBackend: Array
    },
    data() {
        return {
            customPersonalLabelToBeAdded: '',
            selectedPersonalLabels: this.selectedPersonalLabelsFromBackend,
            /**
             * @description 包含了固定的个人标签与自定义标签的对象数组。
             * 先将allFixedPersonalLabels对象数组转为字符串数组，再合并后端返回的
             * 包含自定义个人标签的字符串数组，再对合并后的数组去重，再用map方法返回对应的对象数组
             */
            allPersonalLabels: [
                ...new Set([
                    ...allFixedPersonalLabels.map((labelObj) => {
                        return labelObj.name;
                    }),
                    ...this.selectedPersonalLabelsFromBackend
                ])
            ].map((labelString) => {
                return { name: labelString, text: labelString };
            })
        };
    },
    methods: {
        showAddPersonalLabelPopup() {
            this.show_addPersonalLabel = true;
        },
        closeAddPersonalLabelPopup() {
            this.$emit('closeAddPersonalLabelPopup');
        },
        getSelectedPersonalLabels(e) {
            this.selectedPersonalLabels = e.detail;
        },
        getCustomPersonalLabel(e) {
            this.customPersonalLabelToBeAdded = e.detail;
        },
        addCustomPersonalLabel() {
            this.allPersonalLabels = [
                ...this.allPersonalLabels,
                { name: this.customPersonalLabelToBeAdded, text: this.customPersonalLabelToBeAdded }
            ];
            this.selectedPersonalLabels = [...this.selectedPersonalLabels, this.customPersonalLabelToBeAdded];
            this.customPersonalLabelToBeAdded = '';
        },
        modifyPersonalLabels(personalLabels) {
            this.$emit('updatePersonalLabels', personalLabels);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.personalInfoDetail__AddPersonalLabelPopup {
    &__confirmAndCancel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        padding: 0 16px;
        font-size: 14px;
    }

    &__confirm {
        color: $action-sheet-confirm-color;
    }

    &__checkbox-group {
        padding: 8px 16px;
        display: flex;

        &__item {
            padding: 5px 0;
        }
    }
}
</style>

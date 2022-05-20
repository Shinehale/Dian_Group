<!--
 * @Author       : GuoXu
 * @Date         : 2021-12-14 17:21:28
 * @LastEditors  : GuoXu
 * @LastEditTime : 2021-12-22 12:34:22
 * @Description  : 添加工作经历,个人信息页面点击工作经历所在行弹出的组件
 * @FilePath     : \BuddyMiniapp\src\components\PersonalInfoDetail\AddWorkExperience.vue
-->
<template>
    <div class="personalInfoDetail__AddWorkExperience">
        <van-popup
            :show="addWorkExperienceShow"
            round
            position="bottom"
            custom-style="height: 50%"
            @click-overlay="closeAddWorkExperiencePopup"
            @close="closeAddWorkExperiencePopup">
            <div class="personalInfoDetail__AddWorkExperience__confirmAndCancel">
                <span @click="closeAddWorkExperiencePopup" class="popup__cancel">取消</span>
                <span
                    @click="
                        modifyWorkExperiences(this.workExperiences, this.newWorkExperience),
                            closeAddWorkExperiencePopup()
                    "
                    class="popup__confirm"
                    >确定</span
                >
            </div>
            <div class="personalInfoDetail__AddWorkExperience__workExperienceList">
                <div v-for="(item, index) in workExperiences" :key="index">
                    <ul class="personalInfoDetail__AddWorkExperience__workExperienceList-item">
                        <li>
                            <span>经历{{ index + 1 }}</span>
                            <span><van-icon @click="decWorkExperience(index)" name="minus" /></span>
                        </li>
                        <li>
                            <span>公司</span>
                            <input
                                @input="getWorkExperienceValue($event, 'old', index, 1)"
                                type="text"
                                adjust-position
                                :disabled="disableInput[2 * index + 1]"
                                :value="item.company"
                                class="__input" />
                        </li>
                        <li>
                            <span>职务</span>
                            <input
                                @input="getWorkExperienceValue($event, 'old', index, 2)"
                                type="text"
                                adjust-position
                                :disabled="disableInput[2 * index + 2]"
                                :value="item.position"
                                class="__input" />
                        </li>
                    </ul>
                </div>
                <div>
                    <ul class="personalInfoDetail__AddWorkExperience__workExperienceList-item">
                        <li>
                            <span>经历{{ workExperiences.length + 1 }}</span>
                            <span @click="incWorkExperience(newWorkExperience)"><van-icon name="plus" /></span>
                        </li>
                        <li>
                            <span>公司</span>
                            <input
                                @input="getWorkExperienceValue($event, 'new', workExperiences.length, 1)"
                                :value="newWorkExperience.company"
                                type="text"
                                adjust-position
                                :disabled="disableInput[2 * workExperiences.length + 1]"
                                placeholder="公司名称"
                                class="__input" />
                        </li>
                        <li>
                            <span>职务</span>
                            <input
                                @input="getWorkExperienceValue($event, 'new', workExperiences.length, 2)"
                                :value="newWorkExperience.position"
                                type="text"
                                adjust-position
                                :disabled="disableInput[2 * workExperiences.length + 2]"
                                placeholder="职务名称"
                                class="__input" />
                        </li>
                    </ul>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    props: {
        addWorkExperienceShow: Boolean,
        allWorkExperiences: Array
    },
    data() {
        return {
            disableInput: [],
            newWorkExperience: { company: '', position: '' },
            workExperiences: []
        };
    },
    computed: {
        formatWorkExperiencesData: {
            /**
             * @description 格式化数据，将拼接字符串数组转换为对象数组
             * @param {Array} this.allWorkExperiences 拼接字符串数组
             * @return {Array} formattedWorkExperiences 对象数组
             */
            get: function formatWorkExperiences() {
                let formattedWorkExperiences = this.allWorkExperiences.map((experience) => {
                    let dash = '-';
                    let arrayOfStrings = this.splitString(experience, dash);
                    return { company: arrayOfStrings[0], position: arrayOfStrings[1] };
                });
                return formattedWorkExperiences;
            }
        }
    },
    created() {
        this.workExperiences = this.formatWorkExperiencesData;
    },
    methods: {
        closeAddWorkExperiencePopup() {
            this.$emit('closeAddWorkExperiencePopup');
        },
        changeWorkExperiencesFailed() {
            this.$emit('changeMyInfoFailed');
        },
        /**
         * @description 使用指定的分隔符字符串将一个String对象分割成子字符串数组
         * @param {String} stringToSplit 原数组
         * @param {String} separator 分隔符
         * @return {Array} stringToSplit.split(separator) 子字符串数组
         */
        splitString(stringToSplit, separator) {
            return stringToSplit.split(separator);
        },
        /**
         * @description 获取输入框中的值
         * @param {Event} e input事件
         * @param {String} experienceType 'new'表示新添加的数据,'old'表示在原有的数据上修改
         * @param {Number} listItemIndex 工作经历的序号
         * @param {Number} inputOrderInListItem 一次工作经历中的字段，1表示公司，2表示职位
         */
        getWorkExperienceValue(e, experienceType, listItemIndex, inputOrderInListItem) {
            const { value } = e.detail;
            this.limitInputLength(value, listItemIndex, inputOrderInListItem);
            if (experienceType === 'new') {
                if (inputOrderInListItem === 1) {
                    this.newWorkExperience.company = value;
                } else {
                    this.newWorkExperience.position = value;
                }
            } else {
                if (inputOrderInListItem === 1) {
                    this.workExperiences[listItemIndex].company = value;
                } else {
                    this.workExperiences[listItemIndex].position = value;
                }
            }
        },
        /**
         * @description 限制输入框输入的字数
         * @param {String} value 输入框中输入内容
         * @param {Number} listItemIndex 工作经历的序号
         * @param {*} inputOrderInListItem
         */
        limitInputLength(value, listItemIndex, inputOrderInListItem) {
            if (value.length > 10) {
                this.disableInput[listItemIndex * 2 + inputOrderInListItem] = true;
            }
        },
        /**
         * @description 发出updateWorkExperiences事件，通知父组件更新信息
         * @param {Array} workExperiences 所有工作经历
         */
        updateWorkExperiences(workExperiences) {
            this.$emit('updateWorkExperiences', workExperiences);
        },
        /**
         * @description 增加工作经历
         * @param {Object} workExperience 一项新的工作经历
         */
        incWorkExperience(workExperience) {
            let { company, position } = workExperience;
            if (!(company.length || position.length)) {
                this.changeWorkExperiencesFailed();
            } else {
                this.workExperiences = [...this.workExperiences, workExperience];
                this.newWorkExperience = { company: '', position: '' };
                this.updateWorkExperiences(this.workExperiences);
            }
        },
        /**
         * @description 减少工作经历
         * @param {Number} index 要删除的工作经历的序号
         */
        decWorkExperience(index) {
            this.workExperiences.splice(index, 1);
            this.updateWorkExperiences(this.workExperiences);
        },
        /**
         * @description 修改工作经历
         * @param {Array} workExperiences
         * @param {Object} newWorkExperience
         */
        modifyWorkExperiences(workExperiences, newWorkExperience) {
            let { company, position } = newWorkExperience;
            if (!company.length && !position.length) {
                this.$emit('updateWorkExperiences', workExperiences);
                this.updateWorkExperiences(workExperiences);
            } else {
                this.workExperiences = [...workExperiences, this.newWorkExperience];
                this.newWorkExperience = { company: '', position: '' };
                this.updateWorkExperiences(this.workExperiences);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.personalInfoDetail {
    &__AddWorkExperience {
        &__confirmAndCancel {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 44px;
            padding: 0 16px;
            font-size: 14px;

            & .popup__confirm {
                color: $action-sheet-confirm-color;
            }
        }

        &__workExperienceList {
            border-top: 0.1rpx solid $BuddyMiniApp-divider-color;

            &-item:nth-last-child(1) {
                border-bottom: 0.1rpx solid $BuddyMiniApp-divider-color;
            }

            &-item {
                list-style-type: none;
                padding: 0 16px;

                & > li {
                    height: 56px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                }

                & > li:after {
                    content: '';
                    position: absolute;
                    bottom: 0.01rpx;
                    width: 100%;
                    height: 0.1rpx;
                    background-color: $BuddyMiniApp-divider-color;
                }
                & > li:nth-last-child(1):after {
                    height: 0px;
                }

                & > li:nth-child(1) {
                    height: 48px;
                    font-size: 14px;
                    color: $BuddyMiniApp-cell-start-color;

                    & > span:nth-child(2) {
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        height: 17px;
                        width: 17px;
                        color: $white;
                        border-radius: 50%;
                        background-color: $BuddyMiniApp-color-primary;
                    }
                }

                & > li:nth-child(n + 2) {
                    font-size: 17px;

                    & > span:nth-child(1) {
                        width: 25%;
                    }

                    & .__input {
                        width: 85%;
                        background-color: $white;
                    }
                }
            }
        }
    }
}
</style>

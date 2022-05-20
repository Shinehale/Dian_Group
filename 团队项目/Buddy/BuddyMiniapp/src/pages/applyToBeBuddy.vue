<!--
 * @Author       : GuoXu
 * @Date         : 2021-12-28 20:38:02
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-02-22 22:16:19
 * @Description  : 申请成为buddy页面
 * @FilePath     : \BuddyMiniapp\src\pages\applyToBeBuddy.vue
-->
<template>
    <div>
        <div class="applyToBeBuddy__the-application-history">
            <van-cell title="申请记录" size="large" is-link @click="showApplicationRecordListPopup"></van-cell>
            <application-record-list
                v-if="show_applicationRecordListPopup"
                :show="show_applicationRecordListPopup"
                @closeApplicationRecordListPopup="closeApplicationRecordListPopup" />
        </div>
        <div v-if="isBuddy" class="applyToBeBuddy__dormancy">
            <van-cell
                title="休眠"
                size="large"
                is-link
                :value="DormancyCellValue"
                label="休眠期间您将不再对外显示为Buddy身份"
                @click="showAwakeTimePopup" />
            <div v-if="show_awakeTimePopup">
                <van-popup
                    :show="show_awakeTimePopup"
                    round
                    position="bottom"
                    custom-style="height: 50%"
                    closable
                    @close="closeAwakeTimePopup">
                    <van-datetime-picker
                        :value="currentDate"
                        type="date"
                        title="选择时间"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @cancel="closeAwakeTimePopup"
                        @confirm="submitAwakeTime" />
                </van-popup>
            </div>
        </div>
        <div v-else class="applyToBeBuddy__create-the-application">
            <div>
                <van-field
                    size="large"
                    autofocus
                    rows="1"
                    :autosize="{ maxHeight: 500, minHeight: 150 }"
                    required
                    label="申请理由"
                    type="textarea"
                    placeholder="请输入申请理由，不少于5字"
                    maxlength="255"
                    show-word-limit
                    @input="getReasonForApplication($event)" />
            </div>
            <div class="applyToBeBuddy__submit-application">
                <van-button
                    type="info"
                    size="normal"
                    :disabled="submittedReason.length < 5 || submittedReason.trim() == ''"
                    @click="submitTheApplication">
                    提交申请
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import ApplicationRecordList from '../components/ApplicationRecordList/ApplicationRecordList.vue';
import { timeFormat } from '@/utils/format';
import { applyToBeBuddy, hibernate, getApplyToBeBuddyRecord, getMyInfo } from '@/apis';

export default {
    components: { ApplicationRecordList },
    data() {
        return {
            isBuddy: false,
            setAwakeTime: '',
            minDate: new Date().getTime(),
            // 超前六个月
            maxDate: new Date().getTime() + 13132800000,
            show_awakeTimePopup: false,
            show_applicationRecordListPopup: false,
            submittedReason: ''
        };
    },
    created() {
        uni.setNavigationBarTitle({
            title: '申请成为Buddy'
        });
    },
    onLoad: function (option) {
        this.isBuddy = option.isBuddy === 'true' ? true : false;
    },
    mounted() {
        if (this.isBuddy) {
            this.getAwakeTime();
        }
    },
    computed: {
        currentDate: function () {
            return this.setAwakeTime === '' ? new Date().getTime() : new Date(this.setAwakeTime).getTime();
        },
        DormancyCellValue: function () {
            return this.setAwakeTime === '' ? '设置苏醒时间' : `休眠至${this.setAwakeTime}`;
        }
    },
    methods: {
        closeAwakeTimePopup() {
            this.show_awakeTimePopup = false;
        },
        showAwakeTimePopup() {
            this.show_awakeTimePopup = true;
        },
        async submitAwakeTime(e) {
            await hibernate({ awakeTime: `${timeFormat(e.detail)}T00:00:00` })
                .then((res) => {
                    if (res.data.code === 1) {
                        this.show_awakeTimePopup = false;
                        this.getAwakeTime();
                        uni.showToast({
                            title: '设置成功',
                            icon: 'success',
                            duration: 1500
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        showApplicationRecordListPopup() {
            this.show_applicationRecordListPopup = true;
        },
        closeApplicationRecordListPopup() {
            this.show_applicationRecordListPopup = false;
        },
        getReasonForApplication(e) {
            this.submittedReason = e.detail;
        },
        getAwakeTime() {
            getApplyToBeBuddyRecord().then((res) => {
                if (res.data.data.reverse()[0].awakeTime) {
                    this.setAwakeTime = res.data.data.reverse()[0].awakeTime.slice(0, 10);
                }
            });
        },
        async submitTheApplication() {
            // 检测联系方式是否为空
            if (!(await getMyInfo()).data.data.contactInfo) {
                uni.showModal({
                    title: '必要信息缺失',
                    content: '申请之前请先补充联系方式',
                    success: function (res) {
                        // 点击确定
                        if (res.confirm) {
                            uni.navigateTo({
                                // 预留联系方式需补充，且补充完成后需返回此页面
                                url: 'personalInfoDetail?reservedContact=undefined&isNavigateBackRequired=true'
                            });
                        }
                    }
                });
            } else {
                if (
                    (
                        await applyToBeBuddy({
                            reason: this.submittedReason.trim(),
                            additionalInfo: {}
                        })
                    ).data.code === 1
                ) {
                    uni.showModal({
                        title: '提交成功',
                        content: '申请已提交审核，结果将通过短信通知您，请注意查收',
                        showCancel: false,
                        success: function (res) {
                            // 点击确定按钮
                            if (res.confirm) {
                                // 返回上一个页面，即个人具体信息页面
                                uni.navigateBack({
                                    delta: 1
                                });
                            }
                        }
                    });
                } else {
                    uni.showToast({
                        title: '已经提交过申请,或尚存在未撤销的申请',
                        icon: 'error',
                        duration: 1500
                    });
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.applyToBeBuddy {
    &__create-the-application {
        padding-top: 16px;
        background-color: $BuddyMiniApp-bg-color-primary;
    }

    &__dormancy {
        padding-top: 16px;
        background-color: $BuddyMiniApp-bg-color-primary;
    }

    &__submit-application {
        width: 100%;
        position: absolute;
        bottom: 56px;
        margin: 12px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }
}
</style>

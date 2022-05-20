<!--
 * @Author       : GuoXu
 * @Date         : 2022-01-16 18:52:21
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-01-18 00:08:23
 * @Description  : 申请成为Buddy的历史记录
 * @FilePath     : \BuddyMiniapp\src\components\ApplicationRecordList\ApplicationRecordList.vue
-->
<template>
    <div v-if="show">
        <van-popup
            round
            lock-scroll
            position="bottom"
            custom-style="height: 60%"
            :show="show"
            @click-overlay="closeApplicationRecordListPopup">
            <div style="height: 25px"></div>
            <div v-if="applicationRecordList.length === 0" class="applicationRecordList__none-application">
                还没有申请记录~
            </div>
            <div v-else v-for="(object, index) in applicationRecordList" :key="index">
                <div class="applicationRecordList__theApplicationHasSubmitted">
                    <div class="applicationRecordList__theApplicationHasSubmitted__theApplicationStatus">
                        <span>
                            {{ applicationStatus(object.status) }}
                            <!-- <span class="applicationRecordList__timeStamp applicationRecordList__ApprovedTimeStamp">
                                {{ object.awakeTime.slice(0, 10) }} {{ object.awakeTime.slice(11, 16) }}
                            </span> -->
                        </span>
                        <span>
                            <van-button
                                plain
                                type="info"
                                size="small"
                                :disabled="!(object.status === 1)"
                                @click="undoTheApplication"
                                >撤销</van-button
                            >
                        </span>
                    </div>
                    <p class="applicationRecordList__theApplicationHasSubmitted__reason">
                        {{ object.note }}
                    </p>
                    <span class="applicationRecordList__timeStamp">
                        提交于 {{ object.createdTime.slice(0, 10) }} {{ object.createdTime.slice(11, 16) }}
                    </span>
                    <van-divider />
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { getApplyToBeBuddyRecord, undoTheApplication } from '@/apis';
export default {
    props: { show: Boolean },
    data() {
        return {
            /**
             * @param {Array} [ { note: '', status: 1, createdTime: '', awakeTime: '' } ]
             */
            applicationRecordList: []
        };
    },
    mounted() {
        this.setApplyToBeBuddyRecord();
    },
    methods: {
        closeApplicationRecordListPopup() {
            this.$emit('closeApplicationRecordListPopup');
        },
        applicationStatus: (key) => {
            switch (key) {
                case 1:
                    return '审核中';
                case 2:
                    return '已通过';
                case -1:
                    return '已撤销';
                case -2:
                    return '未通过';
                default:
                    return '未知状态';
            }
        },
        setApplyToBeBuddyRecord() {
            getApplyToBeBuddyRecord().then((res) => {
                this.applicationRecordList = res.data.data.reverse();
            });
        },
        undoTheApplication() {
            undoTheApplication().then((res) => {
                if (res.data.code === 1) {
                    this.setApplyToBeBuddyRecord();
                } else {
                    wx.showToast({
                        title: '撤销失败',
                        icon: 'error',
                        duration: 1500
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';
.applicationRecordList {
    &__none-application {
        padding: 100px 0;
        text-align: center;
        color: #a0a0a0;
    }

    &__theApplicationHasSubmitted {
        padding: 0 32px;

        &__theApplicationStatus {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__reason {
            font-size: 14px;
            padding: 12px 0;
            color: #a0a0a0;
            text-align: justify;
        }
    }

    &__timeStamp {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.3);
    }

    &__ApprovedTimeStamp {
        padding: 0 0 0 10px;
    }
}
</style>

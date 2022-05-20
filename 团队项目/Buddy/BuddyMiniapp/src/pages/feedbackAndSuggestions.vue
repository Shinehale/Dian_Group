<!--
 * @Author       : GuoXu
 * @Date         : 2022-01-24 22:30:33
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-02-22 22:26:57
 * @Description  : 反馈与建议页面
 * @FilePath     : \BuddyMiniapp\src\pages\feedbackAndSuggestions.vue
-->
<template>
    <div class="feedback">
        <div class="feedback__qs-or-suggestion">
            <div>问题或建议</div>
            <div>
                <van-field
                    size="large"
                    autofocus="focus"
                    rows="2"
                    :autosize="{ maxHeight: 500, minHeight: 150 }"
                    required
                    type="textarea"
                    placeholder="任何功能的使用问题和体验建议都期望得到您的反馈"
                    maxlength="255"
                    show-word-limit
                    style="min-height: 150px"
                    @input="getQuestionOrSuggestion($event)" />
            </div>
        </div>
        <div class="feedback__img-uploader">
            <div>添加图片(选填)</div>
            <van-uploader
                multiple
                :max-size="5 * 1024 * 1024"
                :max-count="9"
                :fileList="imgList"
                @oversize="showOverSizeToast"
                @after-read="afterRead"
                @delete="deleteFile"
                :disabled="imgList.length > 9" />
        </div>
        <div class="feedback__submit-btn">
            <van-button
                type="info"
                :loading="isButtonLoading"
                loading-text="提交中···"
                :disabled="questionOrSuggestion.length < 5 || questionOrSuggestion.trim() == ''"
                @click="submitFeedback">
                提交反馈
            </van-button>
        </div>
    </div>
</template>

<script>
import { uploadFile } from '../utils/oss.js';
import { submitFeedback } from '../apis';

export default {
    data() {
        return {
            componentKey: 0,
            // 控制按钮是否为加载中状态
            isButtonLoading: false,
            questionOrSuggestion: '',
            /**
             * @description [
             *    {
             *        message: '',
             *        size: 67381, //图片大小
             *        status: 'done', //上传状态，uploading 表示上传中，failed 表示上传失败，done 表示上传完成
             *        thumb: 'http://tmp/f5aXwOujaBfm625bb318d6301b44d9d3e172f89fb048.jfif',
             *        type: 'image',
             *        url: 'http://tmp/f5aXwOujaBfm625bb318d6301b44d9d3e172f89fb048.jfif'
             *    }
             *]
             * @param {Array<Object>} imgList 对象数组
             */
            imgList: []
        };
    },
    created() {
        uni.setNavigationBarTitle({
            title: '反馈与建议'
        });
    },
    methods: {
        showOverSizeToast() {
            uni.showToast({
                title: '每张图片大小不能超过5MB，请重新选择',
                icon: 'none',
                duration: 2000,
                mask: true
            });
        },
        getQuestionOrSuggestion(e) {
            this.questionOrSuggestion = e.detail;
        },
        /**
         * @description 删除选择的图片
         * @param {Object} deleteObj
         */
        deleteFile(deleteObj) {
            const imgDeletedIndex = () => {
                for (let i = 0; i < this.imgList.length; i++) {
                    return this.imgList[i].url === deleteObj.detail.file.url ? i : -1;
                }
            };
            if (imgDeletedIndex() !== -1) {
                this.imgList.splice(imgDeletedIndex(), 1);
            }
        },
        afterRead(afterReadObj) {
            const fileArray = afterReadObj.detail.file.map((fileObj) => {
                (fileObj.status = ''), (fileObj.message = '');
                return fileObj;
            });
            this.imgList = [...JSON.parse(JSON.stringify(this.imgList)), ...fileArray];
        },
        async submitFeedback() {
            // 设置提交按钮状态为"提交中"
            this.isButtonLoading = true;
            this.imgList.map((element) => {
                (element.status = 'uploading'), (element.message = '上传中...');
            });
            /**
             * @param {Array<Promise>}
             * @return {Promise}
             */
            await Promise.all(
                this.imgList.map((imgObj) => {
                    return uploadFile(imgObj.url);
                })
            )
                .then((res) => {
                    res.forEach((httpsURL, index) => {
                        this.imgList[index] = {
                            ...this.imgList[index],
                            ...{ url: httpsURL, status: 'done', message: '' }
                        };
                    });
                    submitFeedback({
                        content: this.questionOrSuggestion,
                        pictures: this.imgList.map((imgObj) => imgObj.url)
                    }).then((res) => {
                        if (res.data.code === 1) {
                            this.isButtonLoading = false;
                            uni.showToast({
                                title: '提交成功',
                                icon: 'success',
                                duration: 1500
                            });
                        } else {
                            this.isButtonLoading = false;
                            uni.showToast({
                                title: '提交失败，请重试',
                                icon: 'error',
                                duration: 1500
                            });
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';

.feedback {
    background-color: $BuddyMiniApp-bg-color-primary;

    &__qs-or-suggestion {
        margin: 0 0 6px 0;
        background-color: $white;
        & > div:first-child {
            font-size: 17px;
            padding: 12px 16px;
        }
    }

    &__img-uploader {
        margin: 6px 0;
        padding: 0 16px;
        background-color: $white;
        & > div:first-child {
            font-size: 17px;
            padding: 12px 0;
        }
    }

    &__submit-btn {
        background-color: $white;
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

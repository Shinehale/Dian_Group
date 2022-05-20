<!--
 * @Author       : GuoXu
 * @Date         : 2021-12-22 14:41:27
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-03-12 22:13:42
 * @Description  : 修改个人信息的姓名、团队编号、教育经历、现城市、现职位、邮箱、预留联系方式、简介、自我介绍字段
 * @FilePath     : \BuddyMiniapp\src\components\PersonalInfoDetail\ModifyMyInfo.vue
-->
<template>
    <div>
        <van-popup
            :show="show_modifyMyInfoPopup"
            round
            position="bottom"
            custom-style="height: 50%"
            @click-overlay="closeModifyMyInfoPopup"
            @close="closeModifyMyInfoPopup">
            <div class="personalInfoDetail__modifyMyInfo__confirmAndCancel">
                <span @click="closeModifyMyInfoPopup" class="popup__cancel">取消</span>
                <span
                    @click="modifyMyInfo(), this.checkValueLengthAndFormat[1] ? closeModifyMyInfoPopup() : false"
                    class="popup__confirm"
                    >确定</span
                >
            </div>
            <div v-if="key === CONST.reservedContact" style="padding: 12px 16px">
                <van-checkbox-group
                    direction="horizontal"
                    :value="selectedContentType"
                    @change="changeSelectedContentType">
                    <van-checkbox name="QQ">QQ</van-checkbox>
                    <van-checkbox name="微信">微信</van-checkbox>
                    <van-checkbox name="其他">其他</van-checkbox>
                </van-checkbox-group>
            </div>
            <div>
                <van-field
                    size="large"
                    autofocus
                    :autosize="{ maxHeight: 500, minHeight: 150 }"
                    :show-word-limit="showWordLimit"
                    :maxlength="maxInputLength"
                    :value="value"
                    :label="keyZh_CN"
                    :type="inputType"
                    :placeholder="placeholder"
                    :disabled="disableInput"
                    @input="
                        ($event) => {
                            value = $event.detail;
                        }
                    " />
            </div>
        </van-popup>
    </div>
</template>

<script>
import * as CONST from './CONST';
export default {
    props: { show_modifyMyInfoPopup: Boolean, MyInfoItem: Object },
    data() {
        return {
            CONST: CONST,
            selectedContentType: [],
            key: this.MyInfoItem.key,
            keyZh_CN: this.MyInfoItem.keyZh_CN,
            value: ''
        };
    },
    created() {
        this.setData();
    },
    computed: {
        disableInput: function () {
            return this.key != CONST.reservedContact ? false : this.selectedContentType[0] === undefined ? true : false;
        },
        inputType: function () {
            switch (this.key) {
                case CONST.phoneNum:
                    return 'tel';
                case CONST.teamNo:
                    return 'number';
                case CONST.studyExperience:
                    return 'textarea';
                case CONST.briefIntroduction:
                    return 'textarea';
                case CONST.selfIntroduction:
                    return 'textarea';
                default:
                    return 'text';
            }
        },
        maxInputLength: function () {
            switch (this.key) {
                case CONST.teamNo:
                    return 3;
                case CONST.studyExperience:
                    return 50;
                case CONST.email:
                    return 25;
                case CONST.phoneNum:
                    return 11;
                case CONST.reservedContact:
                    return 20;
                case CONST.briefIntroduction:
                    return 50;
                case CONST.selfIntroduction:
                    return 50;
                default:
                    return 10;
            }
        },
        placeholder: function () {
            switch (this.key) {
                case CONST.name:
                    return '请输入姓名';
                case CONST.teamNo:
                    return '请输入团队编号';
                case CONST.studyExperience:
                    return '如"硕士-保研-华中科技大学"';
                case CONST.company:
                    return '请输入现所在公司名称';
                case CONST.position:
                    return '请输入现在所担任职务';
                case CONST.email:
                    return '请输入您的常用邮箱';
                case CONST.reservedContact:
                    if (this.selectedContentType[0]) {
                        return this.selectedContentType[0] === '其他'
                            ? '请输入"软件名称-账号"'
                            : `请输入${this.selectedContentType[0]}号`;
                    } else {
                        return `请选择联系方式并输入帐号`;
                    }
                case CONST.briefIntroduction:
                    return '如擅长客户端，资深算法工程师等';
                case CONST.selfIntroduction:
                    return '如耐心，空余时间较多，希望小朋友懂礼貌等';
                default:
                    return '请输入';
            }
        },
        /**
         * @description 右下角展示字数限制
         * @return {Boolean}
         */
        showWordLimit: function () {
            switch (this.key) {
                case CONST.briefIntroduction:
                    return true;
                case CONST.selfIntroduction:
                    return true;
                default:
                    return false;
            }
        },
        // FIXME:逻辑有问题
        checkValueLengthAndFormat: function () {
            if ((!this.value && this.value.length > this.maxInputLength) || this.value.length === 0) {
                return ['length', false];
            }
            // 长度正确，检查格式
            else {
                if (this.regularDetection()(this.value)) {
                    return ['format', true];
                } else {
                    return ['format', false];
                }
            }
        },
        /**
         * @description 正则检查
         * @param {正则表达式} reg 正则规则
         * @param {String} value 要检查的值
         * @return {Boolean} true 输入正确  false 输入错误
         */
        regularDetection: function () {
            let that = this;
            return function (reg) {
                return function (value) {
                    const teamNoReg = /^\d{1,3}$/;
                    const studyExperienceReg = /^[\S]*-[\S]*-[\S]*$/;
                    const emailReg = /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    const QQReg = /^[1-9][0-9]{4,}$/;
                    const WXReg = /^.{6,20}$/;
                    const otherKindReservedContactReg = /^[\S]*-[\S]*$/;
                    switch (that.key) {
                        case CONST.teamNo:
                            reg = teamNoReg;
                            return reg.test(value);
                        case CONST.studyExperience:
                            return studyExperienceReg.test(value);
                        case CONST.email:
                            reg = emailReg;
                            return reg.test(value);
                        case CONST.reservedContact:
                            if (that.selectedContentType[0] === 'QQ') {
                                reg = QQReg;
                                return reg.test(value);
                            } else if (that.selectedContentType[0] === '微信') {
                                reg = WXReg;
                                return reg.test(value);
                            } else {
                                return otherKindReservedContactReg.test(value);
                            }
                        default:
                            return true;
                    }
                };
            };
        }
    },
    methods: {
        setData() {
            if (this.MyInfoItem.key === CONST.reservedContact) {
                if (this.MyInfoItem.value.slice(0, 2) === 'QQ') {
                    this.selectedContentType = ['QQ'];
                    this.value = this.MyInfoItem.value.substring(3);
                } else if (this.MyInfoItem.value.slice(0, 2) === '微信') {
                    this.selectedContentType = ['微信'];
                    this.value = this.MyInfoItem.value.substring(3);
                } else {
                    this.selectedContentType = ['其他'];
                    this.value = this.MyInfoItem.value.substring(0);
                }
            } else {
                this.value = this.MyInfoItem.value;
            }
        },
        closeModifyMyInfoPopup() {
            this.$emit('closeModifyMyInfoPopup');
        },
        feedBackState() {
            if (this.checkValueLengthAndFormat[1]) {
                return;
            } else {
                let title = '';
                switch (this.checkValueLengthAndFormat[0]) {
                    case 'length':
                        title = this.value.length === 0 ? '不能为空' : `字数不能超过${this.maxInputLength}个`;
                        break;
                    case 'format':
                        title = `${this.keyZh_CN}格式不正确`;
                        break;
                    default:
                        break;
                }
                uni.showToast({
                    title: title,
                    icon: 'none',
                    duration: 800
                });
            }
        },
        /**
         * @description 预留联系方式的种类发生了变化
         * @param {$event} e
         */
        changeSelectedContentType(e) {
            this.selectedContentType = e.detail.slice(-1);
            this.value = '';
        },
        modifyMyInfo() {
            let InfoNeedUpdated = {
                [this.key]: this.value
            };
            if (this.checkValueLengthAndFormat[1]) {
                if (this.key === CONST.reservedContact) {
                    if (!(this.selectedContentType[0] === '其他')) {
                        InfoNeedUpdated = { reservedContact: `${this.selectedContentType[0]}-${this.value}` };
                    } else {
                        InfoNeedUpdated = { reservedContact: `${this.value}` };
                    }
                    this.updateMyInfo(InfoNeedUpdated);
                } else {
                    this.updateMyInfo(InfoNeedUpdated);
                }
            } else {
                this.feedBackState();
                return;
            }
        },
        updateMyInfo(myInfoNeedUpdated) {
            this.$emit('changeMyInfo', myInfoNeedUpdated);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '/src/style';
.personalInfoDetail {
    &__modifyMyInfo {
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

            & .popup__cancel {
                color: $action-sheet-cancel-color;
            }
        }
    }
}
</style>

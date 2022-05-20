<!--
 * @Author: GuoXu
 * @Date: 2021-11-21 14:01:53
 * @LastEditTime : 2022-02-22 22:14:33
 * @LastEditors  : GuoXu
 * @Description: 具体的个人信息页面
 * @FilePath     : \BuddyMiniapp\src\pages\personalInfoDetail.vue
-->
<template>
    <div class="personalInfoDetail">
        <ul class="personalInfoDetail__infoList">
            <li @click="changeAvatar">
                <span>头像</span>
                <span class="infoList__avatar-and-arrow">
                    <span class="infoList__avatar">
                        <img v-if="myDetailInfo.avatar" :src="myDetailInfo.avatar" />
                        <img v-else src="/static/default.jpg" alt="头像" />
                    </span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeThisInfo(CONST.name, '姓名')">
                <span>姓名</span>
                <span>
                    <span>{{ myDetailInfo.name }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeGender">
                <span>性别</span>
                <span>
                    <span>{{ myDetailInfo.gender }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeThisInfo(CONST.BIRTHDAY, '出生日期')">
                <span>出生日期</span>
                <span>
                    <span>{{ myDetailInfo.birthday }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="navigateToApplyToBeBuddy">
                <span>身份</span>
                <span>
                    <span v-if="isBuddy">{{ myDetailInfo.identity }}</span>
                    <span v-else>申请成为Buddy</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeTeamIdentity">
                <span>团队身份</span>
                <span>
                    <span>{{ myDetailInfo.teamIdentity }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeThisInfo(CONST.teamNo, '团队编号')">
                <span>团队编号</span>
                <span>
                    <span v-if="myDetailInfo.teamNo">{{ myDetailInfo.teamNo }}</span>
                    <span v-else>暂无</span>
                    <right-arrow />
                </span>
            </li>
            <li v-if="isBuddy" @click="changeThisInfo(CONST.studyExperience, '教育经历')">
                <span>教育经历</span>
                <span>
                    <span v-if="myDetailInfo.studyExperience">{{ myDetailInfo.studyExperience }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeCity">
                <span>所在城市</span>
                <span>
                    <span>{{ myDetailInfo.city }}</span>
                    <right-arrow />
                </span>
            </li>
            <li v-if="isBuddy" @click="changeThisInfo(CONST.company, '公司')">
                <span>公司</span>
                <span>
                    <span>{{ myDetailInfo.company }}</span>
                    <right-arrow />
                </span>
            </li>
            <li v-if="isBuddy" @click="changeThisInfo(CONST.position, '职务')">
                <span>职务</span>
                <span>
                    <span>{{ myDetailInfo.position }}</span>
                    <right-arrow />
                </span>
            </li>
            <li v-if="isBuddy" @click="showAddWorkExperiencePopup">
                <span>工作经历</span>
                <span>
                    <span
                        v-for="(workExperience, index) of this.sliceArray(2, this.myDetailInfo.workExperiences)"
                        :key="index"
                        >{{ workExperience }}</span
                    >
                    <right-arrow />
                </span>
            </li>
            <li v-if="isBuddy" @click="changeGuideDirection">
                <span>指导方向</span>
                <span>
                    <span>
                        <span
                            v-for="(guideDirection, index) of this.sliceArray(3, this.myDetailInfo.guideDirections)"
                            :key="index">
                            <van-tag class="infoList__guide-direction__item" size="medium" plain type="primary">{{
                                guideDirection
                            }}</van-tag>
                        </span>
                    </span>
                    <right-arrow />
                </span>
            </li>
            <li v-if="isBuddy" @click="changePersonalLabel">
                <span>个人标签</span>
                <span>
                    <span>
                        <span
                            v-for="(label, index) of this.sliceArray(3, this.myDetailInfo.personalLabels)"
                            :key="index">
                            <van-tag class="infoList__guide-direction__item" size="medium" plain type="primary">{{
                                label
                            }}</van-tag>
                        </span>
                    </span>
                    <right-arrow />
                </span>
            </li>
            <li>
                <span>绑定手机号</span>
                <span>
                    <span>{{ myDetailInfo.phoneNum }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeThisInfo(CONST.email, '邮箱')">
                <span>邮箱</span>
                <span>
                    <span>{{ myDetailInfo.email }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeThisInfo(CONST.reservedContact, '预留联系方式')">
                <span>预留联系方式</span>
                <span>
                    <span>{{ myDetailInfo.reservedContact }}</span>
                    <right-arrow />
                </span>
            </li>
            <li @click="changeThisInfo(CONST.briefIntroduction, '简介')">
                <span>简介</span>
                <span>
                    <span v-if="myDetailInfo.briefIntroduction">{{ myDetailInfo.briefIntroduction }}</span>
                    <span v-else>描述一下自己的研究方向~</span>
                    <right-arrow />
                </span>
            </li>
            <li v-if="isBuddy" @click="changeThisInfo(CONST.selfIntroduction, '自我介绍')">
                <span>自我介绍</span>
                <span>
                    <span v-if="myDetailInfo.selfIntroduction">{{ myDetailInfo.selfIntroduction }}</span>
                    <span v-else>描述一下自己的性格~</span>
                    <right-arrow />
                </span>
            </li>
            <!-- 防止手机底部小横条遮挡 -->
            <li></li>
        </ul>
        <!-- 性别选择 -->
        <div v-if="show_genderPicker">
            <van-popup
                :show="show_genderPicker"
                round
                position="bottom"
                custom-style="height: 50%"
                @close="closeGenderPicker">
                <van-picker
                    title="性别"
                    show-toolbar
                    :columns="allGender"
                    :default-index="defaultIndex_genderPicker"
                    @cancel="closeGenderPicker"
                    @confirm="getSelectedGender" />
            </van-popup>
        </div>
        <!-- 选择团队身份 -->
        <div v-if="show_TeamIdentitiesPicker">
            <van-popup
                :show="show_TeamIdentitiesPicker"
                round
                position="bottom"
                custom-style="min-height: 50%"
                @close="closeTeamIdentitiesPicker">
                <van-picker
                    title="团队身份"
                    show-toolbar
                    :columns="allTeamIdentities"
                    :default-index="defaultIndex_teamIdentityPicker"
                    @cancel="closeTeamIdentitiesPicker"
                    @confirm="getSelectedTeamIdentity" />
            </van-popup>
        </div>
        <!-- 选择所在城市 -->
        <div v-if="show_cityPicker">
            <van-popup
                :show="show_cityPicker"
                round
                position="bottom"
                custom-style="min-height: 50%"
                @close="closeCityPicker">
                <van-area :area-list="areaList" :columns-num="2" @cancel="closeCityPicker" @confirm="getSelectedCity" />
            </van-popup>
        </div>
        <!-- 修改姓名、团队编号、教育经历、现城市、现职位、邮箱、预留联系方式、简介、自我介绍 -->
        <modify-my-info
            v-if="show_modifyMyInfoPopup"
            :show_modifyMyInfoPopup="show_modifyMyInfoPopup"
            :MyInfoItem="MyInfoNeedModified"
            @changeMyInfo="updateThisInfo"
            @closeModifyMyInfoPopup="closeModifyMyInfoPopup"></modify-my-info>
        <!-- 修改出生日期 -->
        <birthday-picker
            :show_birthdayPickerPopup="show_birthdayPickerPopup"
            :birthday="myDetailInfo.birthday"
            @closeBirthdayPickerPopup="closeBirthdayPickerPopup"
            @myInfoHasBeenUpdated="setMyInfoData"></birthday-picker>
        <!-- 添加工作经历 -->
        <add-work-experience
            v-if="show_addWorkExperience"
            :addWorkExperienceShow="show_addWorkExperience"
            :allWorkExperiences="myDetailInfo.workExperiences"
            @changeMyInfoFailed="changeMyInfoFailed"
            @updateWorkExperiences="updateWorkExperiences"
            @closeAddWorkExperiencePopup="closeAddWorkExperiencePopup"></add-work-experience>
        <!-- 选择指导方向 -->
        <div v-if="show_guideDirectionPicker" class="personalInfoDetail__guideDirectionPicker">
            <van-popup
                :show="show_guideDirectionPicker"
                round
                position="bottom"
                custom-style="height: 50%"
                @close="closeGuideDirectionPickerShow">
                <div class="personalInfoDetail__guideDirectionPicker__confirmAndCancel">
                    <span
                        @click="closeGuideDirectionPickerShow"
                        class="personalInfoDetail__guideDirectionPicker__cancel"
                        >取消</span
                    >
                    <span
                        @click="closeGuideDirectionPickerShow(), updateGuideDirections()"
                        class="personalInfoDetail__guideDirectionPicker__confirm"
                        >确定</span
                    >
                </div>
                <van-checkbox-group
                    :value="selectedGuideDirections"
                    @change="getSelectedGuideDirections"
                    direction="horizontal"
                    class="personalInfoDetail__guideDirectionPicker__checkbox-group">
                    <van-checkbox
                        :name="item.name"
                        v-for="(item, index) in allGuideDirections"
                        :key="index"
                        class="personalInfoDetail__guideDirectionPicker__checkbox-group__item"
                        >{{ item.text }}</van-checkbox
                    >
                </van-checkbox-group>
            </van-popup>
        </div>
        <!-- 添加个人标签 -->
        <div v-if="show_addPersonalLabel">
            <add-personal-label
                :show_addPersonalLabel="show_addPersonalLabel"
                :selectedPersonalLabelsFromBackend="myDetailInfo.personalLabels"
                @closeAddPersonalLabelPopup="closeAddPersonalLabelPopup"
                @updatePersonalLabels="updatePersonalLabels"></add-personal-label>
        </div>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import RightArrow from '../components/RightArrow/RightArrow.vue';
import * as CONST from '../components/PersonalInfoDetail/CONST';
import AddWorkExperience from '../components/PersonalInfoDetail/AddWorkExperience.vue';
import ModifyMyInfo from '../components/PersonalInfoDetail/ModifyMyInfo.vue';
import AddPersonalLabel from '../components/PersonalInfoDetail/AddPersonalLabel.vue';
import BirthdayPicker from '../components/PersonalInfoDetail/BirthdayPicker.vue';
import { uploadFile } from '@/utils/oss.js';
import { getMyInfo, updateMyInfo } from '@/apis';
import { teamIdentityEnum, genderEnum } from '@/enums';
import { formatTeamIdentityNumToTeamIdentityStr, formatTeamIdentityStrToTeamIdentityNum } from '@/utils/format';

export default {
    components: {
        RightArrow,
        AddWorkExperience,
        ModifyMyInfo,
        AddPersonalLabel,
        BirthdayPicker
    },
    data() {
        return {
            // 是否需要返回，用于例如在申请成为buddy前若预留联系方式为空，
            // 则跳转到此页面完善信息，完善之后通过判断此值是否返回上一个页面
            isNavigateBackRequired: false,
            CONST: CONST,
            show_modifyMyInfoPopup: false,
            show_birthdayPickerPopup: false,
            show_genderPicker: false,
            show_addWorkExperience: false,
            show_guideDirectionPicker: false,
            show_addPersonalLabel: false,
            show_cityPicker: false,
            show_TeamIdentitiesPicker: false,
            allGender: ['男', '女'],
            areaList: areaList,
            allGuideDirections: CONST.allGuideDirections,
            allTeamIdentities: teamIdentityEnum.slice(-teamIdentityEnum.length + 1),
            MyInfoNeedModified: {},
            selectedGender: '',
            defaultIndex_genderPicker: 0,
            selectedTeamIdentity: '',
            defaultIndex_teamIdentityPicker: 0,
            selectedCity: '',
            selectedGuideDirections: [],
            myDetailInfo: {
                id: Number,
                name: '',
                avatar: '',
                birthday: 0,
                identity: '',
                briefIntroduction: '',
                selfIntroduction: '',
                guideDirections: [],
                personalLabels: [],
                gender: '',
                teamIdentity: '',
                teamNo: '',
                studyExperience: '',
                city: '',
                company: '',
                position: '',
                workExperiences: [],
                phoneNum: '',
                email: '',
                reservedContact: ''
            }
        };
    },
    created() {
        this.setMyInfoData();
        uni.setNavigationBarTitle({
            title: '个人信息'
        });
    },
    onLoad: function (option) {
        // 是否需要在完善完本页面的信息后返回跳转前的页面
        this.isNavigateBackRequired = option.isNavigateBackRequired === 'true' ? true : false;
        // 联系方式缺失，补充联系方式
        if (option.reservedContact === 'undefined') {
            setTimeout(() => {
                this.changeThisInfo(CONST.reservedContact, '预留联系方式');
            }, 500);
        }
    },
    computed: {
        /**
         * @description 判断用户是不是Buddy,根据身份展示不同的界面
         * @return {Boolean} 是否为Buddy
         */
        isBuddy: function () {
            return this.myDetailInfo.identity === 'Buddy' ? true : false;
        }
    },
    watch: {
        // 如果myDetailInfo发生改变，发出我的信息已经变更事件
        myDetailInfo: {
            deep: true,
            handler: function () {
                this.emitMyInfoHasBeenChanged();
            }
        },
        /**
         * @description: 检测预留联系方式的变化，有变化就返回上一页
         * myDetailInfo.reservedContact 通过请求服务器获得值，前端不会直接修改此组件中的
         * myDetailInfo.reservedContact 的值，因此此方法是可行的
         */
        'myDetailInfo.reservedContact'() {
            if (this.isNavigateBackRequired && this.myDetailInfo.reservedContact) {
                const that = this;
                uni.showModal({
                    title: '确定预留联系方式为',
                    content: `${this.myDetailInfo.reservedContact}`,
                    success: function (res) {
                        if (res.confirm) {
                            // 确定预留联系方式无误，返回上一页
                            uni.navigateBack({
                                delta: 1,
                                animationType: 'pop-out',
                                animationDuration: 200
                            });
                        } else if (res.cancel) {
                            // 点击了“取消”
                            // 预留联系方式有误，继续修改
                            that.changeThisInfo(CONST.reservedContact, '预留联系方式');
                        }
                    }
                });
            }
        }
    },
    methods: {
        navigateToApplyToBeBuddy() {
            uni.navigateTo({ url: `applyToBeBuddy?isBuddy=${this.isBuddy}` });
        },
        /**
         * @description 将后端返回的数据格式化为前端的格式
         * @param {Object} data 后端返回的个人信息数据
         * @param {String} type 要格式化的数据种类
         * @return {Object} formattedMyInfoData 已格式化的数据
         */
        formatMyInfoData(data) {
            return (type) => {
                let formattedMyInfoData = {};
                let selectedGuideDirections = [];
                switch (type) {
                    case 'myDetailInfo':
                        formattedMyInfoData = {
                            ...this.myDetailInfo,
                            id: data.id,
                            avatar: data.avatarUrl,
                            name: data.name === null ? '' : data.name,
                            birthday: data.birthday === null ? 0 : data.birthday.slice(0, 10),
                            gender: genderEnum[data.gender],
                            identity: data.role === 20 ? 'Buddy' : data.role === 30 ? 'Buddy' : 'noBuddy',
                            teamNo: data.teamNo === null ? '' : data.teamNo,
                            studyExperience:
                                data.additionalInfo.study_experience === null
                                    ? ''
                                    : data.additionalInfo.study_experience,
                            teamIdentity: teamIdentityEnum[data.teamIdentity],
                            city: data.city === null ? '' : data.city,
                            company: data.additionalInfo.now_company === null ? '' : data.additionalInfo.now_company,
                            position: data.additionalInfo.now_duty === null ? '' : data.additionalInfo.now_duty,
                            guideDirections:
                                data.additionalInfo.direction === null ? [] : data.additionalInfo.direction,
                            personalLabels: data.additionalInfo.tag === null ? [] : data.additionalInfo.tag,
                            workExperiences: data.additionalInfo.work_experience,
                            phoneNum: data.phone,
                            email: data.email === null ? '' : data.email,
                            reservedContact: data.contactInfo === null ? '' : data.contactInfo,
                            briefIntroduction: data.introduction === null ? '' : data.introduction,
                            selfIntroduction:
                                data.additionalInfo.self_description === null
                                    ? ''
                                    : data.additionalInfo.self_description
                        };
                        return formattedMyInfoData;
                    case 'selectedGuideDirections':
                        selectedGuideDirections = data.additionalInfo.direction.map((currentValue) => {
                            for (const object of this.allGuideDirections) {
                                if (currentValue === object.text) {
                                    return object.name;
                                }
                            }
                        });
                        return selectedGuideDirections;
                    case 'selectedTeamIdentity':
                        return formatTeamIdentityNumToTeamIdentityStr(data.teamIdentity);
                    case 'selectedGender':
                        return genderEnum[data.gender];
                    case 'defaultIndex_genderPicker':
                        return data.gender - 1;
                    case 'defaultIndex_teamIdentityPicker':
                        return data.teamIdentity - 1;
                    default:
                        break;
                }
            };
        },
        /**
         * @description 从第零个元素开始截取数组中的前num个元素，避免从一行溢出，影响布局，如指导方向、个人标签的数组
         * @param {Number} num
         * @param {Array} array
         * @return {Array}
         */
        sliceArray(num, array) {
            return array.slice(0, num);
        },
        /**
         * @description 发出我的信息已经变更事件，通知上一个页面变更信息
         */
        emitMyInfoHasBeenChanged() {
            const eventChannel = this.getOpenerEventChannel();
            eventChannel.emit('myInfoHasBeenChanged');
        },
        /**
         * @description 更换头像
         */
        changeAvatar() {
            let that = this;
            uni.chooseImage({
                // 最多可选择 1 张图片
                count: 1,
                // 拍摄或从系统相册选择头像照片
                sourceType: ['album', 'camera'],
                success: function (res) {
                    // {Number} 图片大小，单位为 Byte
                    let resSize = res.tempFiles[0].size;
                    if (resSize > 5 * 1024 * 1024) {
                        uni.showToast({
                            title: '图片大小不能超过5MB，请重新选择',
                            icon: 'none',
                            duration: 2000,
                            mask: true
                        });
                        return;
                    }
                    that.uploadAvatarImage(res.tempFilePaths[0]);
                },
                fail: function (error) {
                    console.warn(error);
                }
            });
        },
        changeMyInfoSuccessfully() {
            uni.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1500
            });
        },
        changeMyInfoFailed() {
            uni.showToast({
                title: '修改失败',
                icon: 'error',
                duration: 1500
            });
        },

        // ********** 姓名、团队编号、现城市、现职位、邮箱、预留联系方式 **************
        /**
         * @description 更改某个特定种类的信息
         * @param {String} key 属性
         * @param {String} keyZh_CN 属性中文名
         * @return {String} 某个属性的当前值
         */
        changeThisInfo(key, keyZh_CN) {
            let that = this;
            let value = (object = that.myDetailInfo) => {
                for (const keyInObj in object) {
                    if (keyInObj === key && Object.hasOwnProperty.call(object, keyInObj)) {
                        return object[keyInObj];
                    }
                }
            };
            this.MyInfoNeedModified = {
                key: key,
                keyZh_CN: keyZh_CN,
                value: value()
            };
            switch (key) {
                case CONST.BIRTHDAY:
                    this.showBirthdayPickerPopup();
                    break;
                default:
                    this.showModifyMyInfoPopup();
                    break;
            }
        },
        showModifyMyInfoPopup() {
            this.show_modifyMyInfoPopup = true;
        },
        closeModifyMyInfoPopup() {
            this.show_modifyMyInfoPopup = false;
        },

        // ******************************* 更改性别 *******************************
        changeGender() {
            this.showGenderPicker();
        },
        getSelectedGender(e) {
            this.selectedGender = e.target.value;
            this.updateGender();
            this.closeGenderPicker();
        },
        closeGenderPicker() {
            this.show_genderPicker = false;
        },
        showGenderPicker() {
            this.show_genderPicker = true;
        },

        // ******************************* 更改出生日期 *******************************
        closeBirthdayPickerPopup() {
            this.show_birthdayPickerPopup = false;
        },
        showBirthdayPickerPopup() {
            this.show_birthdayPickerPopup = true;
        },

        // ******************************* 更改团队身份 ****************************
        changeTeamIdentity() {
            this.showTeamIdentitiesPicker();
        },
        showTeamIdentitiesPicker() {
            this.show_TeamIdentitiesPicker = true;
        },
        closeTeamIdentitiesPicker() {
            this.show_TeamIdentitiesPicker = false;
        },
        getSelectedTeamIdentity(e) {
            this.selectedTeamIdentity = e.target.value;
            this.updateTeamIdentity();
            this.closeTeamIdentitiesPicker();
        },

        // ******************************* 更改所在城市 ****************************
        changeCity() {
            this.showCityPicker();
        },
        showCityPicker() {
            this.show_cityPicker = true;
        },
        closeCityPicker() {
            this.show_cityPicker = false;
        },
        getSelectedCity(e) {
            // values = [{code: "130000", name: "河北省"}, {code: "130100", name: "石家庄市"}]
            let values = e.mp.detail.values;
            if (values[0].name === values[1].name) {
                // 直辖市
                this.selectedCity = values[0].name;
            } else {
                this.selectedCity = values[0].name + '-' + values[1].name;
            }
            this.updateCity();
            this.closeCityPicker();
        },
        // ******************************* 更改指导方向 ****************************
        changeGuideDirection() {
            this.showGuideDirectionPickerShow();
        },
        showGuideDirectionPickerShow() {
            this.show_guideDirectionPicker = true;
        },
        closeGuideDirectionPickerShow() {
            this.show_guideDirectionPicker = false;
        },
        getSelectedGuideDirections(e) {
            this.selectedGuideDirections = e.detail;
        },
        // ******************************* 更改个人标签 ****************************
        changePersonalLabel() {
            this.showAddPersonalLabelPopup();
        },
        showAddPersonalLabelPopup() {
            this.show_addPersonalLabel = true;
        },
        closeAddPersonalLabelPopup() {
            this.show_addPersonalLabel = false;
        },

        showAddWorkExperiencePopup() {
            this.show_addWorkExperience = true;
        },
        closeAddWorkExperiencePopup() {
            this.show_addWorkExperience = false;
        },

        /**
         * @description 设置个人信息
         */
        async setMyInfoData() {
            await getMyInfo()
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 1) {
                        this.myDetailInfo = this.formatMyInfoData(data)('myDetailInfo');
                        this.selectedGuideDirections = this.formatMyInfoData(data)('selectedGuideDirections');
                        this.selectedTeamIdentity = this.formatMyInfoData(data)('selectedTeamIdentity');
                        this.selectedGender = this.formatMyInfoData(data)('selectedGender');
                        this.defaultIndex_genderPicker = this.formatMyInfoData(data)('defaultIndex_genderPicker');
                        this.defaultIndex_teamIdentityPicker = this.formatMyInfoData(data)(
                            'defaultIndex_teamIdentityPicker'
                        );
                        // TODO:设置选择的城市
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * @description 上传头像照片到图床并更新服务端数据
         * @param {String} imagePath 本地图片路径
         */
        async uploadAvatarImage(imagePath) {
            let that = this;
            await uploadFile(imagePath).then((res) => {
                that.myDetailInfo.avatar = res;
                that.updateMyInfo(that.formatMyInfoFormData()()()());
            });
        },
        /**
         * @description 将前端数据格式化为后端需要的表单数据
         * @param {Array} personalLabels 个人标签 ['二次元', '健身达人'}]
         * @param {Object} MyInfoNeedModified 姓名、现在所在公司、现在所任职务、邮箱、预留联系方式、简介、自我介绍
         * 等信息 {name: ''}或{now_company: ''}或...
         * @param {Array} workExperiences 过去的工作经历 [{company: '', position: ''}]
         * @param {Array} selectedGuideDirections 选择的指导方向 [1,3,5]
         * @return {Object} formData 符合后端接受的数据格式
         */
        formatMyInfoFormData(personalLabels = []) {
            let that = this;
            return (MyInfoNeedModified = {}) => {
                return (workExperiences = []) => {
                    return (selectedGuideDirections = []) => {
                        // ********* 姓名、团队编号、教育经历、现公司、现在所任职务、邮箱、预留联系方式等 *********
                        if (MyInfoNeedModified) {
                            let formatMyInfoNeedModified = (object = {}, type = '') => {
                                for (const key in object) {
                                    if (Object.hasOwnProperty.call(object, key)) {
                                        if (type === 'key') {
                                            switch (key) {
                                                case CONST.company:
                                                    return 'now_company';
                                                case CONST.position:
                                                    return 'now_duty';
                                                case CONST.reservedContact:
                                                    return 'contactInfo';
                                                case CONST.briefIntroduction:
                                                    return 'introduction';
                                                case CONST.selfIntroduction:
                                                    return 'self_description';
                                                case CONST.studyExperience:
                                                    return 'study_experience';
                                                default:
                                                    return key;
                                            }
                                        } else {
                                            return object[key];
                                        }
                                    }
                                }
                            };
                            let MyInfoNeedModifiedKey = formatMyInfoNeedModified(MyInfoNeedModified, 'key');
                            let MyInfoNeedModifiedValue = formatMyInfoNeedModified(MyInfoNeedModified, 'value');
                            MyInfoNeedModified = Object.defineProperty({}, MyInfoNeedModifiedKey, {
                                value: MyInfoNeedModifiedValue,
                                writable: true,
                                enumerable: true,
                                configurable: true
                            });
                        }
                        // ****************************** 工作经历相关 ******************************
                        let formattedWorkExperiences = () => {
                            if (workExperiences.length > 0) {
                                return workExperiences.map((experience) => {
                                    return `${experience.company}-${experience.position}`;
                                });
                            } else {
                                return that.myDetailInfo.workExperiences;
                            }
                        };
                        // ****************************** 性别相关 **********************************
                        let genderNum = 0;
                        switch (that.selectedGender) {
                            case '男':
                                genderNum = 1;
                                break;
                            case '女':
                                genderNum = 2;
                                break;
                            default:
                                break;
                        }
                        // ****************************** 团队身份相关 ******************************
                        let teamIdentityNum = formatTeamIdentityStrToTeamIdentityNum(that.selectedTeamIdentity);
                        // ****************************** 指导方向相关 ******************************
                        /**
                         * @param {Array} selectedGuideDirections [1,3,5]
                         * @return {Array} guideDirections ["生涯规划", "科创竞赛", "心态调节"]
                         */
                        let guideDirections = selectedGuideDirections.map((currentValue) => {
                            return that.allGuideDirections[currentValue - 1].text;
                        });

                        const formData = {
                            ...{
                                avatarUrl: that.myDetailInfo.avatar === null ? '' : that.myDetailInfo.avatar,
                                name: that.myDetailInfo.name,
                                gender: genderNum === 0 ? null : genderNum,
                                teamIdentity: teamIdentityNum === 0 ? that.selectedTeamIdentity : teamIdentityNum,
                                city: that.selectedCity.length === 0 ? that.myDetailInfo.city : that.selectedCity,
                                now_company: that.myDetailInfo.company,
                                now_duty: that.myDetailInfo.position,
                                work_experience: formattedWorkExperiences(),
                                direction:
                                    guideDirections.length === 0 ? that.myDetailInfo.guideDirections : guideDirections,
                                tag: personalLabels.length === 0 ? that.myDetailInfo.personalLabels : personalLabels
                            },
                            ...MyInfoNeedModified
                        };
                        return formData;
                    };
                };
            };
        },
        /**
         * @description 更新姓名、现城市、现职位
         * @param {Object} MyInfoNeedModified {now_duty: "前端工程师"}
         */
        async updateThisInfo(MyInfoNeedModified) {
            const formattedFormData = this.formatMyInfoFormData()(MyInfoNeedModified)()();
            this.updateMyInfo(formattedFormData);
        },
        async updateGender() {
            this.updateMyInfo(this.formatMyInfoFormData()()()());
        },
        async updateTeamIdentity() {
            this.updateMyInfo(this.formatMyInfoFormData()()()());
        },
        async updateCity() {
            this.updateMyInfo(this.formatMyInfoFormData()()()());
        },
        async updateGuideDirections() {
            this.updateMyInfo(this.formatMyInfoFormData()()()(this.selectedGuideDirections));
        },
        /**
         * @description 更新工作经历
         * @param {Array} workExperiences [{ company: '', position: '' },{ company: '', position: '' }]
         */ async updateWorkExperiences(workExperiences) {
            this.updateMyInfo(this.formatMyInfoFormData()()(workExperiences)());
        },
        /**
         * @description 更新个人标签
         * @param {Array} personalLabels ['养生达人','健身达人','二次元']
         */
        async updatePersonalLabels(personalLabels) {
            this.updateMyInfo(this.formatMyInfoFormData(personalLabels)()()());
        },
        /**
         * @description 更新服务端我的信息数据
         * @param {String} myInfo 我的信息
         */
        async updateMyInfo(myInfo) {
            await updateMyInfo(myInfo)
                .then((res) => {
                    if (res.data.code === 1) {
                        this.setMyInfoData();
                        this.changeMyInfoSuccessfully();
                    } else {
                        this.changeMyInfoFailed();
                    }
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

.personalInfoDetail {
    background-color: $BuddyMiniApp-bg-color-primary;

    .personalInfoDetail__infoList {
        & > li {
            background-color: $white;
            display: flex;
            align-items: center;
            list-style-type: none;
            position: relative;
            height: 56px;
        }
        & > li:after {
            content: '';
            position: absolute;
            left: 16px;
            bottom: 0.01rpx;
            width: 100%;
            height: 0.1rpx;
            background-color: $BuddyMiniApp-divider-color;
        }

        // 行首文字
        & > li > span:nth-child(2n + 1) {
            width: 30%;
            font-size: 17px;
            color: $BuddyMiniApp-cell-end-color;
            padding-left: 16px;
        }
        & > li > span:nth-child(2n + 2) {
            width: 70%;
            display: flex;
            justify-content: flex-end;
        }
        // 行尾文字
        & > li > span:nth-child(2n + 2) > span {
            font-size: 17px;
            color: $BuddyMiniApp-cell-start-color;
            padding-right: 8px;
            // 超出的空白区域不换行
            white-space: nowrap;
            // 超出隐藏
            overflow: hidden;
            // 文本超出显示省略号文本
            text-overflow: ellipsis;
        }

        .infoList__avatar-and-arrow {
            display: flex;
            align-items: center;
        }

        .infoList__avatar {
            display: inline-block;
            & > img {
                height: 48px;
                width: 48px;
                vertical-align: bottom;
                border-radius: 2px;
                background-color: $BuddyMiniApp-bg-color-primary;
            }
        }
        .infoList__guide-direction__item {
            margin-left: 10px;
        }
    }
    .personalInfoDetail__guideDirectionPicker {
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
}
</style>

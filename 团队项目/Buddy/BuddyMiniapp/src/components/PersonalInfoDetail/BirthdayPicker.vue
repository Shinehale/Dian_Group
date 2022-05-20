<!--
 * @Author       : GuoXu
 * @Date         : 2022-01-25 17:25:13
 * @LastEditors  : GuoXu
 * @LastEditTime : 2022-02-18 15:12:49
 * @Description  : 更换出生日期
 * @FilePath     : \BuddyMiniapp\src\components\PersonalInfoDetail\BirthdayPicker.vue
-->
<template>
    <div v-if="show_birthdayPickerPopup">
        <van-popup
            :show="show_birthdayPickerPopup"
            round
            position="bottom"
            custom-style="min-height: 50%"
            closable
            @close="closeBirthdayPickerPopup">
            <van-datetime-picker
                :value="currentDate"
                type="date"
                title="选择时间"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="closeBirthdayPickerPopup"
                @confirm="submitBirthday" />
        </van-popup>
    </div>
</template>

<script>
import { timeFormat } from '@/utils/format';
import { updateMyInfo } from '@/apis';

export default {
    props: {
        show_birthdayPickerPopup: Boolean,
        birthday: String
    },
    data() {
        return {
            minDate: new Date(1950, 10, 1).getTime(),
            maxDate: new Date().getTime()
        };
    },
    computed: {
        currentDate: function () {
            return this.birthday && this.birthday.length !== 0
                ? new Date(`${this.birthday}T00:00`).getTime()
                : new Date().getTime();
        }
    },
    methods: {
        closeBirthdayPickerPopup() {
            this.$emit('closeBirthdayPickerPopup');
        },
        myInfoHasBeenUpdated() {
            this.$emit('myInfoHasBeenUpdated');
            this.closeBirthdayPickerPopup();
        },
        async submitBirthday(e) {
            await updateMyInfo({ birthday: `${timeFormat(e.detail)}T00:00:00` })
                .then((res) => {
                    if (res.data.code === 1) {
                        uni.showToast({
                            title: '修改成功',
                            icon: 'success',
                            duration: 1500
                        });
                        this.myInfoHasBeenUpdated();
                    } else {
                        uni.showToast({
                            title: '修改失败',
                            icon: 'error',
                            duration: 1500
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style></style>

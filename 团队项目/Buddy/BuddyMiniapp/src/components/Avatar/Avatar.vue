<template>
    <div class="avatar">
        <img :src="avatar" mode="aspectFill" class="avatar__img" />
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: ['avatar'],
    data() {
        return {};
    }
};
</script>

<style scoped>
.avatar__img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
}
</style>

<template>
    <div class="error-page">
        <div class="text-center">
            <img src="/img/404.svg" alt="">
            <v-btn color="default" class="mt-5" @click="handleClearError">
                Trang chủ
            </v-btn>
        </div>
    </div>
</template>

<script setup>
defineProps(['error'])
const handleClearError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-page {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-page img {
    width: 350px;
    display: block;
}
</style>
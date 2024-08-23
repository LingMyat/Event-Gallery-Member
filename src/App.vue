<template>
    <Nav />
    <RouterView />
</template>

<script setup>
import Nav from './components/Nav.vue';
import { onMounted } from 'vue';
import axios from './axios';

import { useAuthStore } from './stores/AuthStore';
const authStore = useAuthStore();

onMounted(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token;
})
</script>

<style scoped></style>

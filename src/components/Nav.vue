<template>
    <nav class="bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="hidden md:block">
                        <div class="flex items-baseline space-x-4">
                            <RouterLink :to="{name: 'home'}" class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                                Home
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">

                        <div class="relative ml-3">
                            <div v-if="authStore.isLogin" @click="isOpen = !isOpen">
                                <button type="button"
                                    class="relative max-w-xs flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-800"
                                    id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">
                                        Open user menu
                                    </span>
                                    
                                    {{ avatarText }}
                                </button>
                            </div>

                            <RouterLink :to="{name: 'login'}" v-else class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
                                Login
                            </RouterLink>

                            <div 
                            v-show="isOpen"
                            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                                tabindex="-1">

                                <div class="px-4 py-2">
                                    <p class="text font-medium">{{ authStore.name }}</p>
                                    <p class="text-sm">{{ authStore.email }}</p>
                                </div>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                                    id="user-menu-item-2">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="-mr-2 flex md:hidden">
                    <button @click="isOpen = !isOpen" type="button"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900"
                        aria-controls="mobile-menu" aria-expanded="false">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        
                        <svg v-if="!isOpen" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div v-show="isOpen" class="md:hidden" id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <RouterLink :to="{name: 'home'}" class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-200">Home</RouterLink>
            </div>
            <div class="border-t border-gray-700 pb-3 pt-4">
                <div class="flex items-center px-5">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-800">
                        {{ avatarText }}
                    </div>
                    <div class="ml-3">
                        <div class="text-base font-medium leading-none text-gray-600">
                            {{ authStore.name }}
                        </div>
                        <div class="text-sm font-medium leading-none text-gray-600">
                            {{ authStore.email }}
                        </div>
                    </div>
                </div>
                <div class="mt-3 space-y-1 px-2">
                    <a href="#"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-620 hover:bg-gray-200">
                        Sign out
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const isOpen  = ref(false);
const isLogin = ref(false);

import { useAuthStore } from '../stores/AuthStore';
const authStore = useAuthStore();

const avatarText = computed(() => {
    const nameArr = authStore.name.split(' ');

    const firstName = nameArr[0];
    const firstLetter = firstName.charAt(0);

    let lastLetter = '';
    if (nameArr.length > 1) {
        const lastName = nameArr[nameArr.length - 1];
        lastLetter = lastName.charAt(0);
    }

    return firstLetter + lastLetter;
})
</script>

<style scoped></style>
<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register to get your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6">
                <Input 
                id="name"
                v-model="name"
                :error="nameErr"
                label="User name"
                input-type="text"/>
                
                <Input 
                id="email"
                v-model="email"
                :error="emailErr"
                input-type="email"
                label="Email address"/>

                <Input 
                id="password"
                label="Password"
                v-model="password"
                :error="passwordErr"
                input-type="password"/>

                <Input 
                id="confirmPassword"
                input-type="password"
                label="Confirm Password"
                v-model="confirmPassword"
                :error="confirmPasswordErr"/>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign up
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Already a member?
                <RouterLink 
                :to="{name: 'login'}" 
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Login now
                </RouterLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import Input from '../../components/form-element/Input.vue';

import { ref } from "vue";

const name = ref('');
const nameErr = ref('');

const email = ref('');
const emailErr = ref('');

const password = ref('');
const passwordErr = ref('');

const confirmPassword = ref('');
const confirmPasswordErr = ref('');

</script>

<style scoped></style>
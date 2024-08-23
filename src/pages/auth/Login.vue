<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="loginSubmit" class="space-y-6">
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

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <RouterLink 
                :to="{name: 'register'}" 
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Register now
                </RouterLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import Input from '../../components/form-element/Input.vue';

import { ref } from "vue";

const email = ref('');
const emailErr = ref('');

const password = ref('');
const passwordErr = ref('');

import { login } from "../../api/auth";
import axios from "../../axios";

import { useRouter } from 'vue-router';
const router = useRouter();

const loginSubmit = async () => {

    emailErr.value = email.value ? '' : 'Email address is required';
    passwordErr.value = password.value ? '' : 'Password is required';

    if(email.value && password.value) {
        try {
            const data = {
                email: email.value,
                password: password.value
            }

            const res = await login(data);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;

            localStorage.setItem('login', true);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('token', res.data.token);

            setTimeout(() => router.push({name: 'home'}));
        } catch (err) {

            const errors = err.response.data.errors;
            emailErr.value = errors.email? errors.email[0] :'';
            passwordErr.value = errors.password? errors.password[0] :'';
        }
    }
}
</script>

<style scoped></style>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register to get your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" class="space-y-6">
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

    <Teleport to="body">
        <Transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-400"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-400">
            <div v-show="success" class="flex fixed right-3 bottom-0 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg border border-gray-300 shadow" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span class="sr-only">Check icon</span>
                </div>

                <div class="ms-3 text-sm font-normal">
                    Register success, login now.
                </div>

                <button @click="success = false" type="button" 
                class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        </Transition>
    </Teleport>
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

const success = ref(false);

import { register } from "../../api/auth";

const submit = async () => {
    
    nameErr.value = name.value ? '' : 'User name is required';
    emailErr.value = email.value ? '' : 'Email address is required';
    passwordErr.value = password.value ? '' : 'Password is required';
    confirmPasswordErr.value = confirmPassword.value ? '' : 'Confirm password is required';

    if(email.value && name.value && password.value && confirmPassword.value) {
        try {
            const data = {
                name: name.value,
                email: email.value,
                password: password.value,
                confirm_password: confirmPassword.value
            }

            await register(data);

            success.value = true;

            name.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';

            setTimeout(() => {
                success.value = false;
            }, 4000);
            
        } catch (err) {
            
            const errors = err.response.data.errors;

            nameErr.value = errors.name? errors.name[0] :'';
            emailErr.value = errors.email? errors.email[0] :'';
            passwordErr.value = errors.password? errors.password[0] :'';
            confirmPasswordErr.value = errors.confirm_password? errors.confirm_password[0] :'';
        }
    }

}

</script>

<style scoped></style>
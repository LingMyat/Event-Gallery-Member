<template>
    <button 
    @click="show = !show"
    data-modal-target="default-modal" 
    data-modal-toggle="default-modal" 
        class="text-gray-800 border border-gray-300 bg-white hover:bg-gray-100 hover:text-blue-700 font-medium rounded-lg text-xs px-4 py-2 text-center inline-flex items-center" type="button">

        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"/>
        </svg>

        Upload Photo
    </button>

    <Teleport to="body">
        <Transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-400"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-400">

            <section v-show="show" class="modal-mask">
                <div class="modal-container relative">
                    <svg @click="closeModal" class="w-6 h-6 text-gray-800 absolute right-2 top-2 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>

                    <div class="p-5 h-full">
                        <h1 class="text-2xl font-medium mb-2">Upload Photo</h1>

                        <FileInput :clear="fileClear" placeholder="Upload Photo" accept="image/*" @on-change="onChange"/>

                        <div v-show="!isFormEmpty" class="mt-4 flex gap-3 justify-end">
                            <button @click="clearPhoto" type="button" class="text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-xs px-4 py-2 text-center inline-flex items-center">

                                Clear
                            </button>

                            <button @submit="submit" type="button" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 font-medium rounded-lg text-xs px-4 py-2 text-center inline-flex items-center">

                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </Transition>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import FileInput from './form-element/FileInput.vue';
import { uploadPhoto } from '../api/index';

const show = ref(false);
const isFormEmpty = ref(true);
const fileClear   = ref(false);

const props = defineProps({eventId: String});

let form;

const onChange = (formData) => {
    fileClear.value   = false;

    form = new FormData();
    form.append('photo', formData);
    
    isFormEmpty.value = false;
}

const submit = async () => {
    if(!isFormEmpty.value) {
        try {
            const res = await uploadPhoto({
                event: props.eventId,
                data : form
            });
        } catch (error) {
            
        }
    }
}

const clearPhoto = () => {
    form = null;
    isFormEmpty.value = true;
    fileClear.value   = true;
}

const closeModal = () => {
    show.value = false;
    
    //Use setTimeout for Better UI transition 
    setTimeout(() => {
        clearPhoto();
    }, 600);
}
</script>

<style scoped>
    .modal-mask{
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: grid;
        place-items: center;
        height: 100vh;
    }
    .modal-container{
        background: #fff;
        width: 90vw;
        max-width: 550px;
        min-height: 200px;
        border-radius: 7px;
    }
</style>
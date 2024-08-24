<template>
    <div class="min-h-full">
        
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 v-show="fetched" class="text-3xl font-bold tracking-tight text-gray-900">
                    {{ event.name }}
                </h1>

                <div v-show="!fetched" role="status" class="animate-pulse">
                    <div class="h-7 bg-gray-300 rounded-lg w-[330px]"></div>
                </div>
            </div>
        </header>

        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div class="font-medium mb-2 flex gap-1 items-center">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span v-show="fetched">
                        {{ event.date }} ({{ event.time }})
                    </span>
                    
                    <div v-show="!fetched" role="status" class="animate-pulse">
                        <div class="h-5 bg-gray-300 rounded-lg w-[220px]"></div>
                    </div>

                </div>

                <div class="font-medium mb-2 flex gap-1 items-center">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                    </svg>
                    <span v-show="fetched">
                        {{ event.location??'----' }}
                    </span>

                    <div v-show="!fetched" role="status" class="animate-pulsemt-1">
                        <div class="h-5 bg-gray-300 rounded-lg w-[260px]"></div>
                    </div>
                </div>

                <div class="mb-4" v-show="fetched">
                    {{ event.description }}
                </div>

                <div v-show="!fetched" role="status" class="animate-pulse mt-5 mb-4">
                    <div class="h-3 bg-gray-300 rounded-lg w-[96%] mb-3"></div>
                    <div class="h-3 bg-gray-300 rounded-lg w-[80%] mb-3"></div>
                    <div class="h-3 bg-gray-300 rounded-lg w-[76%] "></div>
                </div>

                <div class="flex gap-4 mb-5">
                    <RouterLink :to="{name: 'event-gallery', params: {event: route.params.event}}" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 font-medium rounded-lg text-xs px-4 py-2 text-center inline-flex items-center">
                        <svg class="w-6 h-6 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                        </svg>

                        Event Gallery
                    </RouterLink>

                    
                    <PhotoUploadModal @uploaded="uploadSuccess('The photo has been uploaded successfully.')" :eventId="route.params.event" />
                </div>

                <div v-if="authStore.isLogin" class="">
                    <h1 class="text-xl font-bold tracking-tight text-gray-900 mb-4">
                        Your Submitted Photos
                    </h1>
                    <div class="relative min-h-[400px] overflow-x-auto overflow-y-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Photo
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Created at
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(photo) in photos" :key="photo.id" 
                                class="bg-white border-b">
                                    <td class="p-3 text-center">
                                        <img class="w-[80px]" :src="photo.photo_url" />
                                    </td>
                                    <td class="px-6 min-w-[180px] py-4">
                                        {{ photo.created_at }}
                                    </td>
                                    <td class="px-6 min-w-[180px] py-4">
                                        <span :class="{
                                            'text-green-500' : photo.status === 'approved',
                                            'text-red-500' : photo.status === 'rejected',
                                            'text-blue-600' : photo.status === 'pending'
                                        }">
                                            {{ photo.status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button @click="submitDelete(photo.id)" class="text-red-600 hover:underline">
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                                {{ alertMessage }}
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
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { eventDetail, myPhotos, deletePhoto } from '../api/index';
import PhotoUploadModal from '../components/PhotoUploadModal.vue';

import { useAuthStore } from '../stores/AuthStore';
const authStore = useAuthStore();

const route = useRoute();
  
const success = ref(false);
const fetched = ref(false);
const event   = ref({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
});

const photos = ref([]);
const photoFetched = ref(false);
const alertMessage = ref('');

onMounted(() => {
    fetchEvent();

    if(authStore.isLogin) {
        fetchSubmittedPhotos();
    }
})

const fetchEvent = async () => {
    const res = await eventDetail(route.params.event);
    event.value = res.data.event;
    
    fetched.value = true;
}

const fetchSubmittedPhotos = async () => {
    const res = await myPhotos(route.params.event);

    photos.value = res.data.photos;
    photoFetched.value = true;
}

const uploadSuccess = (message) => {
    alertMessage.value = message;

    success.value = true;
    setTimeout(() => success.value = false, 3000);

    fetchSubmittedPhotos();
    
}

const submitDelete = async (photo) => {
    try {
        await deletePhoto(photo);

        uploadSuccess('Photo has been deleted successfully.');

    } catch (error) {
        console.log(error);
    }
}

</script>
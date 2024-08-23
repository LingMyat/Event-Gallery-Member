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

                <div class="flex gap-4">
                    <button type="button" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 font-medium rounded-lg text-xs px-4 py-2 text-center inline-flex items-center">
                        <svg class="w-6 h-6 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                        </svg>

                        Event Gallery
                    </button>

                    
                    <PhotoUploadModal :eventId="route.params.event" />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { eventDetail } from '../api/index';
import PhotoUploadModal from '../components/PhotoUploadModal.vue';

const route = useRoute();

const fetched = ref(false);
const event   = ref({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
});

onMounted(() => {
    fetchEvent();
})

const fetchEvent = async () => {
    const res = await eventDetail(route.params.event);
    event.value = res.data.event;
    
    fetched.value = true;
}

</script>
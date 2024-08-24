<template>
    <div class="min-h-full">
        
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <RouterLink :to="{name:'event-detail', params: {event: route.params.event}}" class="text-3xl font-bold tracking-tight text-gray-900 flex items-center">
                    <svg class="w-8 h-8 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>

                    <div v-show="fetched" class="flex gap-1 flex-col sm:flex-row">
                        <span>Event Gallery -</span> <span>({{ event.name }})</span>
                    </div>

                    <div v-show="!fetched" role="status" class="animate-pulse">
                        <div class="h-7 bg-gray-300 rounded-lg w-[300px] sm:w-[450px]"></div>

                        <div class="h-7 bg-gray-300 rounded-lg w-[83%] block sm:hidden mt-2"></div>
                    </div>
                </RouterLink>
            </div>
        </header>

        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div v-show="fetched" id="gallery">
                    <img class="border shadow img" v-for="photo in photos" :key="photo.id" :src="photo.photo_url" />
                </div>

                <div v-show="!fetched" id="gallery-skeleton">
                    <div v-for="n in 8" :key="n" role="status" class="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse img">
                        <svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { eventGallery } from "../api/index";

const photos = ref([]);
const event  = ref({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
});

const fetched = ref(false);

const route = useRoute();

onMounted(() => {
    fetchGallery();
})

const fetchGallery = async () => {
    const res = await eventGallery(route.params.event);

    photos.value = res.data.photos;
    event.value = res.data.event;

    //Use for better UI
    setTimeout(() => fetched.value = true, 600);
}
</script>

<style scoped>
    #gallery, #gallery-skeleton {
        columns: 4;
        gap: 1.25rem;
        padding-top: 1.25rem;
    }

    #gallery .img {
        display: block;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 1.25rem;
    }

    #gallery-skeleton .img {
        width: 100%;
        margin-bottom: 1.25rem;
    }

    @media (max-width: 60rem) {
        #gallery,
        #gallery-skeleton {
            columns: 3;
        }
    }

    @media (max-width: 48rem) {
        #gallery,
        #gallery-skeleton {
            columns: 2;
        }
    }

    @media (max-width: 32rem) {
        #gallery,
        #gallery-skeleton {
            columns: 1;
        }
    }
</style>
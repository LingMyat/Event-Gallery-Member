<template>
    <div class="min-h-full">
        
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                    Upcoming Events
                </h1>
            </div>
        </header>

        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div v-show="fetched" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <RouterLink 
                    v-for="event in events" 
                    :key="event.id"
                    :to="{ name: 'event-detail', params: { event: event.id } }"
                        class="p-5 relative bg-white border border-gray-200 rounded-lg shadow">
                        <svg class="w-6 h-6 absolute right-2 top-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                        </svg>

                        <p class="font-normal mb-2 text-gray-700">
                            {{ event.date }} ({{ event.time }})
                        </p>

                        <h5 class="mb-3 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                            {{strLimit(event.name, 40)}}
                        </h5>

                        <p class="font-normal text-gray-700">
                            {{strLimit(event.description, 90)}}
                        </p>
                    </RouterLink>
                </div>

                <div v-show="!fetched" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div 
                    v-for="(index) in [...Array(9)]"
                    :key="index"
                    role="status"
                        class="animate-pulse p-5 relative bg-white border border-gray-200 rounded-lg shadow">
                        <svg class="w-6 h-6 absolute text-gray-300 right-2 top-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                        </svg>

                        <div class="h-4 mb-4 bg-gray-300 rounded-lg w-[50%]"></div>
                        <div class="h-7 mb-4 bg-gray-300 rounded-lg w-[70%]"></div>
                        <div class="h-3 bg-gray-300 rounded-lg w-[95%] mb-3"></div>
                        <div class="h-3 bg-gray-300 rounded-lg w-[95%] mb-3"></div>
                        <div class="h-3 bg-gray-300 rounded-lg w-[95%] "></div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { eventList } from '../api/index';

const events = ref([]);
const fetched = ref(false);

onMounted(() => {
    fetchEvents();
})

const fetchEvents = async () => {
    const res = await eventList();
    events.value = res.data.events;

    fetched.value = true;
}

const strLimit = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
}
</script>

<style scoped></style>
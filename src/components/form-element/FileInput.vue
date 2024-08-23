<template>
    <div>
        <input class="hidden" ref="myInput" type="file" :accept="accept" @change="onChange">

        <div 
        @click="myInput.click()"
        :class="{
            'text-gray-600 w-full border-2 border-dashed border-gray-700 flex justify-center items-center cursor-pointer py-2 px-3' : true,
            'py-6' : fileType !== 'image',
            'py-2' : fileType === 'image'
        }">
            <div class="flex gap-2" v-show="!fileName">
                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                </svg>

                <span class="text-base font-semibold capitalize">{{ placeholder }}</span>
            </div>
            

            <div v-show="fileName">
                <div class="text-center" v-show="fileType !== 'image'">
                    <svg class="w-6 h-6 text-gray-800 mb-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                    </svg>

                    <p class="text-base font-semibold">
                        {{ fileName }}
                    </p>
                </div>

                <div v-show="fileType === 'image'">
                    <img class="w-full" :src="previewImage">
                </div>
            </div>
        </div>

        <span class="text-red-600 text-sm" v-if="hasError">{{ error }} !</span>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";

    const props = defineProps({
        placeholder: {
            type: String,
            default: "Choose File"
        },
        accept: {
            type: String,
            default: '*'
        },
        clear: {
            type: Boolean,
            default: false,
        },
        error: {
            type: String,
            default: ''
        },
    })

    const emits = defineEmits(['onChange']);

    const myInput   = ref(null);
    const fileType  = ref("");
    const fileName  = ref("");
    const previewImage = ref('');
    let hasError = ref(false);
    
    //hook and vue method
    watch(() => props.clear, (newVal) => {
        if(newVal) {
            fileName.value = '';
            fileType.value = '';
            myInput.value.value = null;
        }
    })

    watch(() => props.error, (newValue) => {
        hasError.value = !!newValue;
    });

    /**
     * Handles the onChange event for the file input.
     *
     * @param {Event} e - The event object.
     * @return {void}
     */
    const onChange = (e) => {
        const file = e.target.files[0];
        fileType.value = file.type.split('/')[0];
        fileName.value = file.name;

        if (fileType.value === 'image') {
            const reader = new FileReader();

            reader.onload = (e) => {
                previewImage.value = e.target.result;
            };

            reader.readAsDataURL(file);
        }

        emits('onChange', file);
    }
</script>

<style scoped></style>
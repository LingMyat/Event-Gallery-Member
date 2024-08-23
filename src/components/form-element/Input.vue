<template>
    <div class="border-none p-0">
        <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">
            {{ label }}
        </label>

        <div class="mt-2">
            <input 
            :id="id" 
            :type="inputType"
            :value="modelValue"
            :placeholder="placeholder"
            @input="emit('update:modelValue',$event.target.value)"
            :class="{
                'block w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 py-1.5 focus:ring-2 sm:text-sm sm:leading-6': true,
                'text-gray-900 focus:ring-inset focus:ring-indigo-600' : !hasError,
                'text-red-500 focus:ring-inset border-red-500 focus:ring-red-600' : hasError
            }"/>
        </div>

        <span class="text-red-600 text-sm" v-if="hasError">{{ error }} !</span>
    </div>
</template>

<script setup>
import { ref,watch } from "vue";

let emit = defineEmits(['update:modelValue']);
    
const props = defineProps({
    id: String,
    label: String,
    modelValue:String,

    inputType: {
        type: String,
        default: 'text'
    },

    placeholder: {
        type: String,
        default: ''
    },

    error: {
        type: String,
        default: ''
    },
});

let hasError = ref(false);

watch(() => props.error, (newValue) => {
    hasError.value = !!newValue;
});
</script>
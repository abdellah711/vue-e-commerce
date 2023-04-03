<script setup lang="ts">

withDefaults(defineProps<{
    labelTxt?: string
    name?: string
    placeholder?: string
    type?: string
    modelValue?: string
    error?: string
    class?: string
}>(),{
    label: '',
    name: '',
    placeholder: '',
    type: 'text',
    error: ''
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const handleInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}

</script>

<template>
    <label :class="class">
        {{ labelTxt }}
        <input class="px-4 py-2 bg-gray-100 rounded outline-sky-500 w-full" :type="type" :name="name" :placeholder="placeholder" :value="modelValue" @input="handleInput" />
        <p class="text-red-400 text-sm italic py-1" v-if="error">{{error}}</p>
    </label>
</template>
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
    error: ''
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'input', value: Event): void
}>()

const handleInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
    emit('input', e)
}

</script>

<template>
    <label :class="class">
        <span class="capitalize">{{ labelTxt }}</span>
        <input class="px-4 py-2 bg-gray-100 rounded outline-sky-500 w-full mt-2" :type="type" :name="name" :placeholder="placeholder" :value="modelValue" @input="handleInput" v-bind="$attrs"/>
        <p class="text-red-400 text-sm italic py-1" v-if="error">{{error}}</p>
    </label>
</template>
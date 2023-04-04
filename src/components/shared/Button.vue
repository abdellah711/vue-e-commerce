<script setup lang="ts">


const { class: className } = withDefaults(defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger',
    class?: string
}>(), {
    variant: 'primary'
})

</script>

<template>
    <button class=" rounded-md active:scale-90 transition" :class="{
        'bg-sky-500 text-white hover:bg-sky-600': variant === 'primary',
        'bg-sky-100 text-sky-600 hover:bg-sky-200': variant === 'secondary',
        'text-sky-500 hover:bg-sky-100': variant === 'tertiary',
        'text-red-400 hover:text-red-500 hover:bg-red-100': variant === 'danger',
        [className ?? '']: className
    }">
        <slot></slot>
    </button>
</template>
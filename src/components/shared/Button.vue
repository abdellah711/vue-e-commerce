<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary',
    className?: string
}>()
</script>

<template>
    <button 
        class=" rounded-md active:scale-95 transition"
    :class="{
        'bg-sky-500 text-white hover:bg-sky-600': variant === 'primary' || !variant,
        'bg-sky-100 text-sky-600 hover:bg-sky-200': variant === 'secondary',
        'text-sky-500 hover:bg-sky-100': variant === 'tertiary',
        [className ?? '']: className
    }"><slot></slot></button>
</template>
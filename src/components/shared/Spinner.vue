<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
    w?: string
    screen?: boolean
}>()

</script>

<template>
    <div :class="{ 'h-screen grid place-items-center pb-64': screen }">
        <div class="w-10 aspect-square rounded-full border-4 border-sky-100 border-t-sky-500 animate-spin"
            :style="{ width: w }"></div>
    </div>
</template>
<script setup lang="ts">
import StartSolidIcon from '@heroicons/vue/24/solid/StarIcon'
import StartOutlinedIcon from '@heroicons/vue/24/outline/StarIcon'


defineProps<{
    value: number
}>()

</script>

<template>

    <div class="flex items-center">
        <template v-for="i in 5">
            <StartSolidIcon v-if="i <= value" class="w-5 h-5 text-yellow-300" />
            <StartOutlinedIcon v-else class="w-5 h-5 text-yellow-300" />
        </template>
    </div>
</template>
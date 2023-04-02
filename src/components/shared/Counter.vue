<script setup lang="ts">
import PlusIcon from '@heroicons/vue/24/outline/PlusIcon'
import MinusIcon from '@heroicons/vue/24/outline/MinusIcon'

withDefaults(defineProps<{
    count: number
    max?: number
    min?: number
}>(), {
    max: Number.POSITIVE_INFINITY,
    min: 1
})

const emits = defineEmits<{
    (e: 'update:count', count: number): void
}>()

</script>

<template>
    <div class="flex border rounded-lg self-start overflow-hidden bg-white">
        <button :disabled="count <= min" @click="emits('update:count', count - 1)"
            class="px-2.5 py-1.5 border-r bg-zinc-50 hover:bg-zinc-100">
            <MinusIcon class="w-4" />
        </button>
        <span class="w-[5ch] text-center self-center">{{ count }}</span>
        <button :disabled="count >= max" @click="emits('update:count', count + 1)"
            class="px-2.5 py-1.5 border-l bg-zinc-50 hover:bg-zinc-100">
            <PlusIcon class="w-4" />
        </button>
    </div>
</template>
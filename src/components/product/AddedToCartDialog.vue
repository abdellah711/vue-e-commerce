<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogOverlay,
} from '@headlessui/vue'
import Button from '@/components/shared/Button.vue'
import { useRouter } from 'vue-router';

defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const router = useRouter()


</script>

<template>
    <Dialog :open="open" class="relative z-50" @close="emit('close')">
        <DialogOverlay class="fixed inset-0 bg-black/10" />
        <div class="fixed inset-0 grid place-items-center p-2">
            <DialogPanel class="bg-white rounded-md w-full max-w-md px-4 py-3">
                <div class="flex flex-col gap-4">
                    <DialogTitle class="text-2xl text-zinc-700">Item has been added to cart</DialogTitle>
                    <div class="flex justify-end gap-2">
                        <Button class-name="py-2 px-4" variant="tertiary" @click="emit('close')">Continue Shopping</Button>
                        <Button class-name="py-2 px-4" variant="primary" @click="router.push('/cart')">Go to Cart</Button>
                    </div>
                </div>
            </DialogPanel>
        </div>
    </Dialog>
</template>
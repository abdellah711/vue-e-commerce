<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogOverlay,
    TransitionRoot,
    TransitionChild,
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
    <TransitionRoot :show="open">
        <Dialog class="relative z-50" @close="emit('close')">
            <TransitionChild enter="transition ease-out duration-200" enter-from="opacity-0" enter-to="opacity-100"
                leave="transition ease-in duration-150" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-black/10" />
            </TransitionChild>
            <div class="fixed inset-0 grid place-items-center p-2">
                <TransitionChild
                    enter="transition ease-out duration-200"
                    enter-from="opacity-0 scale-125"
                    enter-to="opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-90">
                    <DialogPanel class="bg-white rounded-md w-full max-w-md px-4 py-3">
                        <div class="flex flex-col gap-4">
                            <DialogTitle class="text-2xl text-zinc-700">Item has been added to cart</DialogTitle>
                            <div class="flex justify-end gap-2">
                                <Button class-name="py-1.5 px-4" variant="tertiary" @click="emit('close')">Continue
                                    Shopping</Button>
                                <Button class-name="py-1.5 px-4" variant="primary" @click="router.push('/cart')">Go to
                                    Cart</Button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
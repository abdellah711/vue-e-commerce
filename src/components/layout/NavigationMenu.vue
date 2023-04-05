<script setup lang="ts">
import { Dialog, DialogOverlay, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';
import CartIcon from '@heroicons/vue/24/outline/ShoppingBagIcon'
import UserIcon from '@heroicons/vue/24/outline/UserIcon'
import CloseIcon from '@heroicons/vue/24/outline/XMarkIcon'
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

defineProps<{
    show: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void;
}>()

watch(route, () => emit('close'))

</script>

<template>
    <TransitionRoot :show="show">
        <Dialog @close="$emit('close')" as="div">
            <TransitionChild enter="transition duration-200" leave="transition duration-200" enter-from="opacity-0"
                enter-to="opacity-100" leave-from="opacity-100" leave-to="opacity-0" as="template">
                <DialogOverlay class="fixed bg-black/10 inset-0 z-50" />
            </TransitionChild>

            <TransitionChild enter="transition duration-200" leave="transition duration-200" enter-from="translate-x-full"
                enter-to="translate-x-0" leave-from="translate-x-0" leave-to="translate-x-full" as="template">

                <DialogPanel
                    class="z-50 fixed inset-y-0 right-0 w-full max-w-sm bg-white px-7 py-5 flex flex-col justify-between shadow">
                    <div class="flex justify-between items-center">
                        <RouterLink to="/" class="text-2xl font-semibold text-zinc-700"><span
                                class="text-sky-500">E</span>-commmerce
                        </RouterLink>
                        <button class="hover:bg-zinc-50 rounded-lg p-2 text-zinc-700" @click="$emit('close')">
                            <CloseIcon class="w-6 aspect-square" />
                        </button>
                    </div>

                    <ul class="flex flex-col gap-9 items-center text-gray-700 ">
                        <li>
                            <RouterLink to="/" active-class="text-sky-500" class="text-xl hover:text-sky-500">Home
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products" active-class="text-sky-500" class="text-xl hover:text-sky-500">
                                Products
                            </RouterLink>
                        </li>
                    </ul>
                    <div class="flex gap-3 ">
                        <RouterLink to="/account" class="hover:bg-zinc-100 p-2 rounded-xl">
                            <UserIcon class="w-6 h-6" />
                        </RouterLink>

                        <RouterLink to="/cart" class="hover:bg-zinc-100 p-2 rounded-xl">
                            <CartIcon class="w-6 h-6" />
                        </RouterLink>
                    </div>

                </DialogPanel>
            </TransitionChild>
        </Dialog>
    </TransitionRoot>
</template>
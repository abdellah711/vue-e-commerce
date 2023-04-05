<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

defineProps<{
    options: { label: string, value: string }[]
    selectedValue: string
}>()

defineEmits<{
    (e:'select',value: string) : void
}>()

</script>

<template>
    <Menu as="div" class="relative inline-block text-left text-zinc-800">
        <MenuButton class="flex gap-2 items-center bg-white py-2 px-4 rounded-md my-2 shadow-sm">
            <slot></slot>
        </MenuButton>
        <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 z-50 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }" v-for="option in options" :key="option.value">
                    <button class="w-full rounded-md p-2" :class="{ 'bg-zinc-100': active || selectedValue === option.value }" @click="$emit('select',option.value)">
                        {{option.label}}
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Transition>
    </Menu>
</template>
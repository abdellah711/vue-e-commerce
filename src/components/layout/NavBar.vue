<script setup lang="ts">
import CartIcon from '@heroicons/vue/24/outline/ShoppingBagIcon'
import UserIcon from '@heroicons/vue/24/outline/UserIcon'
import NavigationMenu from './NavigationMenu.vue';
import MenuIcon from '@heroicons/vue/24/outline/Bars3Icon'
import { ref } from 'vue';

const showMenu = ref(false)

</script>

<template>
    <header class="border-b bg-white sticky top-0 z-40">
        <nav class="content flex justify-between items-center py-3">
            <RouterLink to="/" class="text-2xl font-semibold text-zinc-700"><span class="text-sky-500">E</span>-commmerce
            </RouterLink>

            <ul class="hidden md:flex gap-5 items-center text-gray-500">
                <li>
                    <RouterLink to="/" active-class="text-sky-500" class="hover:text-sky-500">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/products" active-class="text-sky-500" class="hover:text-sky-500">Products</RouterLink>
                </li>
            </ul>
            <div class="hidden md:flex gap-3">
                <RouterLink to="/account" class="hover:bg-zinc-100 p-2 rounded-xl">
                    <UserIcon class="w-6 h-6" />
                </RouterLink>

                <RouterLink to="/cart" class="hover:bg-zinc-100 p-2 rounded-xl">
                    <CartIcon class="w-6 h-6" />
                </RouterLink>
            </div>

            <!-- mobile menu icon -->
            <button class="hover:bg-zinc-100 p-2 rounded-xl md:hidden" @click="showMenu = true">
                <MenuIcon class="w-6 aspect-square" />
            </button>
        </nav>
        
        <NavigationMenu :show="showMenu" @close="showMenu = false"/>
    </header>
</template>
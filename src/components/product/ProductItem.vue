<script setup lang="ts">
import type { Product } from '@/types/product';
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router';

defineProps<{
    product: Product
}>()

</script>

<template>
    <li class="bg-white rounded-md overflow-hidden p-3 flex flex-col gap-1.5">
        <RouterLink :to="'/products/' + product.id" class="flex-1 flex flex-col">
            <img :src="product.image" :alt="product.title" class="aspect-square object-contain mb-1 p-2" />
            <h3 class="line-clamp-2 overflow-hidden max-w-full text-lg text-zinc-800 hover:underline my-auto">{{
                product.title }}</h3>
        </RouterLink>
        <p class="text-zinc-500">{{ product.category }}</p>
        <p class="text-orange-500 font-medium text-lg">{{ Intl.NumberFormat('en', {
            style: 'currency', currency: 'USD'
        }).format(product.price) }}</p>
        <button class="mt-auto py-1 px-3 bg-sky-100 text-sky-600 rounded-md hover:bg-sky-200 active:scale-95 transition">
            Add to cart
        </button>
    </li>
</template>
<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types/product';
import { RouterLink } from 'vue-router';

const { product } = defineProps<{
    product: Product
    class?: string
}>()

const emit = defineEmits<{
    (e: 'add-to-cart'): void
}>()

const { addToCart } = useCartStore()

const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 })
    emit('add-to-cart')
}

</script>

<template>
    <li class="bg-white rounded-md overflow-hidden p-3 flex flex-col gap-1.5" :class="class">
        <RouterLink :to="'/products/' + product.id" class="flex-1 flex flex-col group">
            <img :src="product.image" :alt="product.title" class="aspect-square object-contain mb-1 p-2 group-hover:scale-105 transition" />
            <h3 class="line-clamp-2 overflow-hidden max-w-full text-lg text-zinc-800 hover:underline my-auto">{{
                product.title }}</h3>
        </RouterLink>
        <p class="text-zinc-500">{{ product.category }}</p>
        <p class="text-orange-500 font-medium text-lg">{{ Intl.NumberFormat('en', {
            style: 'currency', currency: 'USD'
        }).format(product.price) }}</p>
        <Button variant="secondary" class="mt-auto py-1 px-3" @click="handleAddToCart">
            Add to cart
        </Button>
    </li>
</template>
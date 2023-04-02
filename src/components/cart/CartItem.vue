<script setup lang="ts">
import DeleteIcon from '@heroicons/vue/24/outline/TrashIcon'
import Button from '@/components/shared/Button.vue'
import { RouterLink } from 'vue-router';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/utils/currency';
import { useCartStore } from '@/stores/cart';

const { product } = defineProps<{
    product: Product & { quantity: number }
}>()

const { removeFromCart } = useCartStore()

const handleDelete = () => {
    removeFromCart(product)
}

</script>

<template>
    <li class="bg-white flex gap-3 items-center p-2 rounded-md">
        <img :src="product.image" :alt="product.title" class="w-32 aspect-square object-contain p-2 rounded-md">
        <div class="self-stretch space-y-2">
            <RouterLink :to="'/products/' + 1" class="text-xl hover:underline">{{ product.title }}</RouterLink>
            <p class="font-medium text-orange-500">{{ formatCurrency(product.price) }}</p>

        </div>
        <p class="font-medium text-orange-500 text-lg ml-auto">{{ formatCurrency(product.price) }}</p>
        <Button variant="danger" class-name="p-2" @click="handleDelete">
            <DeleteIcon class="w-6" />
        </Button>
    </li>
</template>
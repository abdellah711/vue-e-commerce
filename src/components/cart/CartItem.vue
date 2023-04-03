<script setup lang="ts">
import DeleteIcon from '@heroicons/vue/24/outline/TrashIcon'
import Button from '@/components/shared/Button.vue'
import { RouterLink } from 'vue-router';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/utils/currency';
import { useCartStore } from '@/stores/cart';
import Counter from '../shared/Counter.vue';

const { product } = defineProps<{
    product: Product & { quantity: number }
}>()

const { removeFromCart,updateProductQuantity } = useCartStore()

const handleDelete = () => {
    removeFromCart(product)
}
const handleQtyChange = (qty: number) => {
    updateProductQuantity(product, qty)
}

</script>

<template>
    <li class="bg-white flex gap-3 items-center p-2 rounded-md">
        <img :src="product.image" :alt="product.title" class="w-32 aspect-square object-contain p-2 rounded-md">
        <div class="self-stretch flex flex-col gap-2">
            <RouterLink :to="'/products/' + product.id" class="text-lg hover:underline line-clamp-2">{{ product.title }}</RouterLink>
            <p class="font-medium text-orange-500">{{ formatCurrency(product.price) }}</p>
            <Counter :count="product.quantity" @update:count="handleQtyChange" :max="product.stock" />
        </div>
        <p class="font-medium text-orange-500 text-lg ml-auto">{{ formatCurrency(product.price * product.quantity) }}</p>
        <Button variant="danger" class-name="p-2" @click="handleDelete">
            <DeleteIcon class="w-6" />
        </Button>
    </li>
</template>
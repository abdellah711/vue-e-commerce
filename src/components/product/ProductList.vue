<script setup lang="ts">
import type { Product } from '@/types/product';
import ProductItem from '@/components/product/ProductItem.vue';
import AddedToCartDialog from './AddedToCartDialog.vue';
import { ref } from 'vue';

defineProps<{
    products: Product[]
}>()

const showAddedToCartDialog = ref(false)

</script>

<template>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductItem v-for="product in products" :key="product.id" :product="product" @add-to-cart="showAddedToCartDialog = true"/>
    </ul>
    <AddedToCartDialog :open="showAddedToCartDialog" @close="showAddedToCartDialog = false" />
</template>
<script setup lang="ts">
import type { Product } from '@/types/product';
import { defineProps } from 'vue'
import ProductItem from '@/components/product/ProductItem.vue';

defineProps<{
    products: Product[]
}>()

</script>

<template>
    <ul class="grid grid-cols-4 gap-4">
        <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </ul>
</template>
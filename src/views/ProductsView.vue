<script setup lang="ts">
import { getAllProducts } from '@/services/api';
import type { Product } from '@/types/product';
import { onMounted, ref } from 'vue';
import ProductList from '@/components/product/ProductList.vue';


const products = ref<Product[]>([]);

onMounted(async () => {
  products.value = await getAllProducts();
});

</script>

<template>
    <ProductList :products="products" />
</template>

<script setup lang="ts">
import { getAllProducts } from '@/services/api';
import type { Product } from '@/types/product';
import { onMounted, ref } from 'vue';
import ProductList from '@/components/product/ProductList.vue';


const products = ref<Product[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  products.value = await getAllProducts();
  isLoading.value = false;
});

</script>

<template>
    <Spinner v-if="isLoading" screen/>
    <ProductList v-else :products="products" />
</template>

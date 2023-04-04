<script setup lang="ts">
import ProductsSlide from '@/components/home/ProductsSlide.vue';
import AddedToCartDialog from '@/components/product/AddedToCartDialog.vue';
import { getAllProducts } from '@/services/api';
import type { Product } from '@/types/product';
import { ref, onMounted, computed } from 'vue';

const isLoading = ref(true)
const data = ref<Product[]>([])
const showDialog = ref(false)

const productsGroupedByCategory = computed(() => {
    const categories = new Set(data.value.map((product) => product.category))
    return [...categories].map((category) => ({
        category,
        products: data.value.filter((product) => product.category === category)
    })
    )
})


onMounted(async () => {
    data.value = await getAllProducts()
    isLoading.value = false
});

</script>

<template>
    <Spinner v-if="isLoading" screen/>
    <template v-else>
        <ProductsSlide v-for="group in productsGroupedByCategory" :key="group.category" :category="group.category" :products="group.products" @add-to-cart="showDialog = true"/>
    </template>
    <AddedToCartDialog :open="showDialog" @close="showDialog = false" />
</template>

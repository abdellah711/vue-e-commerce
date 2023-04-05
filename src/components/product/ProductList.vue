<script setup lang="ts">
import type { Product } from '@/types/product';
import ProductItem from '@/components/product/ProductItem.vue';
import AddedToCartDialog from './AddedToCartDialog.vue';
import SortingDropDown from './SortingDropDown.vue'
import { computed, ref } from 'vue';

const SORT_OPTIONS_CONST = [
    { label: 'Default', value: 'default' },
    { label: 'Price', value: 'price' },
    { label: 'Name (a-z)', value: 'name-az' },
    { label: 'Name (z-a)', value: 'name-za' },

] as const
const SORT_OPTIONS = SORT_OPTIONS_CONST as any

type SortValues = (typeof SORT_OPTIONS_CONST[number])['value']


const { products } = defineProps<{
    products: Product[]
}>()

const showAddedToCartDialog = ref(false)

const sortBy = ref<SortValues>('default')

const sortedData = computed(() => {
    switch (sortBy.value) {
        case 'default':
            return products
        case 'price':
            return [...products].sort((a, b) => a.price - b.price)
        case 'name-az':
            return [...products].sort((a, b) => a.title.localeCompare(b.title))
            case 'name-za':
            return [...products].sort((a, b) => b.title.localeCompare(a.title))
    }
})

const handleSelect = (str: string) => sortBy.value = str as any

</script>

<template>
    <div class="flex justify-end">
        <SortingDropDown :options="SORT_OPTIONS" :selected-value="sortBy" @select="handleSelect" />
    </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductItem v-for="product in sortedData" :key="product.id" :product="product"
            @add-to-cart="showAddedToCartDialog = true" />
    </ul>
    <AddedToCartDialog :open="showAddedToCartDialog" @close="showAddedToCartDialog = false" />
</template>
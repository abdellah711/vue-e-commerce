<script setup lang="ts">
import type { Product } from '@/types/product';
import ProductItem from '@/components/product/ProductItem.vue';
import AddedToCartDialog from './AddedToCartDialog.vue';
import DropDown from '@/components/shared/DropDown.vue'

import StarIcon from '@heroicons/vue/24/outline/StarIcon';
import SortIcon from '@heroicons/vue/24/outline/FunnelIcon'

import { computed, ref } from 'vue';

const SORT_OPTIONS_CONST = [
    { label: 'Default', value: 'default' },
    { label: 'Price', value: 'price' },
    { label: 'Name (a-z)', value: 'name-az' },
    { label: 'Name (z-a)', value: 'name-za' },

] as const
const SORT_OPTIONS = SORT_OPTIONS_CONST as any

type SortValues = (typeof SORT_OPTIONS_CONST[number])['value']

const RATING_OPTIONS = [{ label: 'None', value: 'none' }, ...new Array(5).fill(0).map((_, i) => ({ label: `${i + 1} stars`, value: i + 1 + '' })).reverse()]

const { products } = defineProps<{
    products: Product[]
}>()

const showAddedToCartDialog = ref(false)

const sortBy = ref<SortValues>('default')
const ratingFilter = ref<string>('none')

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

const filtredData = computed(() => {
    const rating = +ratingFilter.value
    if (isNaN(rating)) return sortedData.value
    return sortedData.value.filter(item => item.rating >= rating)
})

const handleSelect = (str: string) => sortBy.value = str as any

</script>

<template>
    <div class="flex justify-end gap-3">
        <DropDown :selected-value="ratingFilter" :options="RATING_OPTIONS" @select="ratingFilter = $event">
            <StarIcon class="w-5" /> Rating
        </DropDown>
        <DropDown :selected-value="sortBy" :options="SORT_OPTIONS" @select="handleSelect">
            <SortIcon class="w-5" />
            Sort By
        </DropDown>
    </div>
    <ul v-if="filtredData.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductItem v-for="product in filtredData" :key="product.id" :product="product"
            @add-to-cart="showAddedToCartDialog = true" />
    </ul>
    <div v-else class="text-center mt-[30vh]">
        <h3 class="text-2xl text-zinc-500">No product found</h3>
    </div>
    <AddedToCartDialog :open="showAddedToCartDialog" @close="showAddedToCartDialog = false" />
</template>
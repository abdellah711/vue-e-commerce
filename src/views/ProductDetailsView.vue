<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '@/services/api';
import { formatCurrency } from '@/utils/currency';
import type { Product } from '@/types/product';
import Rating from '@/components/shared/Rating.vue';
import { useCartStore } from '@/stores/cart';
import Counter from '@/components/shared/Counter.vue';
import AddedToCartDialog from '@/components/product/AddedToCartDialog.vue';

const { addToCart } = useCartStore()

const route = useRoute()
const router = useRouter()

const productId = +route.params.id
const product = ref<Product | null>(null)
const isLoading = ref(true)
const quantity = ref(1)
const showAddedToCartDialog = ref(false)

onMounted(async () => {
    try {
        const data = await getProductById(productId)
        if(!data) return router.push('/404')
        product.value = data
    } catch (err) {
        console.log(err)
    } finally {
        isLoading.value = false
    }
})

const handleAddToCart = () => {
    addToCart({ ...product.value!, quantity: quantity.value })
    showAddedToCartDialog.value = true
}

const handleBuyNow = () => {
    addToCart({ ...product.value!, quantity: quantity.value })
    router.push('/cart')
}

const handleQtyChange = (qty: number) => {
    quantity.value = qty
}

</script>

<template>
    <Spinner v-if="isLoading" screen />
    <div v-else>
        <div class="flex gap-5 flex-wrap md:flex-nowrap">
            <img :src="product?.image" :alt="product?.title"
                class="aspect-square object-contain mb-1 p-2 rounded-md w-[500px] bg-white max-w-[90vw]" />
            <div class="flex flex-col gap-2">
                <h1 class="text-3xl">{{ product?.title }}</h1>
                <div class="flex gap-2">
                    <Rating :value="product?.rating ?? 0" />
                    <p class="text-zinc-500">({{ product?.rating_count }}) Reviews</p>
                </div>
                <p class="text-xl text-orange-500 font-semibold">{{ formatCurrency(product?.price!) }}</p>
                <p class="text-zinc-700">{{ product?.description }}</p>
                <Counter :count="quantity" @update:count="handleQtyChange" :max="product?.stock" />
                <div class="space-x-2 mt-5">
                    <Button class="py-2 px-4" @click="handleAddToCart">Add to Cart</Button>
                    <Button variant="tertiary" class="py-2 px-4" @click="handleBuyNow">Buy now</Button>
                </div>
            </div>
        </div>
    </div>
    <AddedToCartDialog :open="showAddedToCartDialog" @close="showAddedToCartDialog = false"/>
</template>
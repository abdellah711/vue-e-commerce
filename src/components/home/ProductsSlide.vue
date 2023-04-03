<script setup lang="ts">
import type { Product } from '@/types/product';
import emblaCarouselVue from 'embla-carousel-vue'
import ProductItem from '../product/ProductItem.vue';

defineProps<{
    category: string;
    products: Product[];
}>()

defineEmits<{
    (e:'add-to-cart'): () => void;
}>()

const [emblaNode] = emblaCarouselVue({ dragFree: true, containScroll: 'keepSnaps' })

</script>

<template>
    <div>
        <h2 class="text-2xl font-semibold capitalize text-zinc-700 my-4">{{ category }}</h2>
        <div class="embla overflow-hidden" ref="emblaNode">
            <div class="embla__container flex gap-3">
                <div v-for="product in products" class="embla__slide w-64 shrink-0">
                    <ProductItem :product="product" class="h-full" @add-to-cart="$emit('add-to-cart')"/>
                </div>
            </div>
        </div>
    </div>
</template>
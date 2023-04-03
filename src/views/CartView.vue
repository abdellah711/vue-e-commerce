<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue';
import Button from '@/components/shared/Button.vue';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/currency';
import { useRouter } from 'vue-router';

const store = useCartStore();
const router = useRouter()

const shippingFees = 10


</script>

<template>
    <h1 class="text-3xl text-zinc-700">Cart</h1>
    <template v-if="store.cart.length > 0">
        <ul class="space-y-3 my-5">
            <CartItem v-for="item in store.cart" :product="item" :key="item.id" />
        </ul>
        <div class="rounded-lg bg-zinc-100 grid grid-cols-2 gap-2 px-4 py-6 max-w-md ml-auto">
            <h3 class="text-2xl font-medium col-span-2 mb-2">Order summary</h3>
            <p class="font-medium">Subtotal:</p>
            <p class="text-center">{{ formatCurrency(store.cartTotal) }}</p>
            <p class="font-medium">Shipping:</p>
            <p class="text-center">{{ formatCurrency(shippingFees) }}</p>
            <p class="font-medium">Total:</p>
            <p class="text-center">{{ formatCurrency(store.cartTotal + shippingFees) }}</p>
            <Button class-name="py-2 col-start-2 mt-4" @click="router.push('/checkout')">Checkout</Button>
        </div>
    </template>
    <div v-else class="flex flex-col gap-2 items-center justify-center min-h-[50vh]">
        <p class="text-xl text-zinc-600">Your cart is empty</p>
        <Button class-name="py-2 px-4 mt-4" variant="secondary" @click="router.push('/')">Continue shopping</Button>
    </div>
</template>
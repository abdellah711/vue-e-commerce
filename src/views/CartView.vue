<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue';

</script>

<template>
    <h1 class="text-3xl text-zinc-700">Cart</h1>
    <ul class="space-y-3 my-5">
        <CartItem />
        <CartItem />
    </ul>
</template>
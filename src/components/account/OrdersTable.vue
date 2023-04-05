<script setup lang="ts">
import { formatCurrency } from '@/utils/currency';
import type { Order } from '@/types/order';

defineProps<{
    orders: Order[]
}>()
</script>

<template>
    <table class="w-full text-center bg-white rounded-md shadow overflow-hidden text-zinc-700">
            <thead class="bg-sky-50 text-sky-600">
                <th class="p-2 font-medium">Order ID</th>
                <th class="p-2 font-medium">Full name</th>
                <th class="p-2 font-medium">Address</th>
                <th class="p-2 font-medium">Total price</th>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id" class="even:bg-zinc-50">
                    <td class="p-2">{{ order.id }}</td>
                    <td class="p-2">{{order.firstName}} {{ order.lastName }}</td>
                    <td class="p-2">{{order.address}}</td>
                    <td class="p-2">{{formatCurrency(order.total)}}</td>
                </tr>
            </tbody>
        </table>
</template>
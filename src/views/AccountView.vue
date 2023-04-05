<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'vue-router';
import type { Order } from '@/types/order';
import OrdersTable from '@/components/account/OrdersTable.vue';

const router = useRouter()
const isLoading = ref(true)
const orders = ref<Order[]>([])

onMounted(async () => {
    const { data, } = await supabase.auth.getUser()
    if (!data.user) {
        router.push('/auth/login')
        return
    }
    
    const ordersResp = await supabase.from('orders')
    .select()
    .eq('email', data.user.email)
    if(ordersResp.data){
        orders.value = ordersResp.data as Order[]
    }
    isLoading.value = false

})
</script>

<template>
    <Spinner v-if="isLoading" screen />
    <template v-else>
        <h1 class="text-3xl text-zinc-700 my-5">Orders </h1>
        <OrdersTable :orders="orders"/>
    </template>
</template>
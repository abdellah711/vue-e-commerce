<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'vue-router';

const router = useRouter()
const isSessionLoading = ref(true)

onMounted(async () => {
    const { data } = await supabase.auth.getSession()
    isSessionLoading.value = false
    if (!data.session) {
        router.push('/auth/login')
    }
})
</script>

<template>
    <Spinner v-if="isSessionLoading" screen/>
    <template v-else>
        <h1>Orders </h1>
        
    </template>
</template>
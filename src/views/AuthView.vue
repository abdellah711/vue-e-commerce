<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()


const formData = reactive({
    email: '',
    password: '',
});

const isSessionLoading = ref(true)
const error = ref('')
const isLoading = ref(false)

onMounted(async () => {
    const { data } = await supabase.auth.getSession()
    isSessionLoading.value = false
    if (data.session) {
        router.replace('/')
    }
})

const handleSubmit = async () => {
    error.value = ''
    isLoading.value = true
    const authFunc = route.params.auth === 'login' ? 'signInWithPassword' : 'signUp';
    const auth = await supabase.auth[authFunc]({
        email: formData.email,
        password: formData.password,
    });
    isLoading.value = false

    if (auth.data.user) {
        router.replace('/account')
        return
    }
    if(auth.error?.message) {
        error.value = auth.error.message
        return
    }

    error.value = 'Something went wrong!'
    

};

</script>

<template>
    <Spinner v-if="isSessionLoading" screen/>
    <form v-else class="max-w-lg mx-auto mt-24 flex flex-col gap-5 bg-white p-7 rounded-xl" @submit.prevent="handleSubmit">
        <h1 class="text-3xl capitalize text-zinc-700 font-medium my-2">{{ $route.params.auth }}</h1>
        <InputField label-txt="Email" type="email" placeholder="joe@email.com" v-model.trim="formData.email" required/>
        <InputField label-txt="Password" type="password" placeholder="*********" v-model="formData.password" required/>
        <p v-if="error" class="py-2 px-4 bg-red-50 text-red-500 rounded">{{ error }}</p>
        <Button class="p-2 capitalize flex justify-center items-center" :disabled="isLoading">
            <Spinner v-if="isLoading" w="25px" bw="2px"/>
            <template v-else>{{ $route.params.auth }}</template>
        </Button>
        <p class="text-zinc-600" v-if="$route.params.auth === 'login'">Don't have an account? <RouterLink
                class="text-sky-500 hover:underline" to="/auth/signup">Register</RouterLink>
        </p>
        <p class="text-zinc-600" v-else>Already have an account? <RouterLink class="text-sky-500 hover:underline"
                to="/auth/login">Login</RouterLink>
        </p>
    </form>
</template>
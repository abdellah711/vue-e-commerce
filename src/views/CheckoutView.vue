<script setup lang="ts">
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/currency';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useCartStore()
const router = useRouter()

const isLoading = ref(false)

const formData = reactive({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
})

const ERRORS_INIT = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    other: ''
}

const formErrors = reactive({ ...ERRORS_INIT });

const handleSubmit = async () => {
    isLoading.value = true
    //clear errors
    Object.assign(formErrors, ERRORS_INIT)

    if (!/^\d+$/.test(formData.zip)) {
        formErrors.zip = 'Invalid zip'
    }

    if (!/^\+?\d{8,12}$/.test(formData.phone.replace('-', ''))) {
        formErrors.phone = 'Invalid phone number'
    }

    if (!/^\d+$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        formErrors.cardNumber = 'Invalid card number'
    }

    if (!/^\d{3}$/.test(formData.cardCvv)) {
        formErrors.cardCvv = 'Invalid CVV'
    }

    const user = await supabase.auth.getUser()

    if (!user.data.user) return router.push('/auth/login')

    const resp = await supabase.from('orders')
        .insert({ ...formData, total: store.cartTotal, email: user.data.user.email })

    isLoading.value = false
    if (resp.error) {
        formErrors.other = resp.error.message ?? 'Something went wrong!'
        return
    }

    store.clearCart()
    router.push('/order-confirmation')
}

const today = new Date().toISOString().split('-').slice(0, 2).join('-')


</script>


<template>
    <form class="bg-white p-5 rounded-md flex flex-col gap-4" @submit.prevent="handleSubmit">
        <h1 class="text-3xl text-zinc-800 font-medium">Checkout</h1>
        <h2 class="text-2xl text-zinc-500">Cart</h2>
        <ul class="border divide-y-[1px] rounded-md">
            <li v-for="item in store.cart" :key="item.id" class="flex gap-4 items-center p-3">
                <img :src="item.image" :alt="item.title" class="w-20 h-20 object-contain p-2" />
                <p class="text-lg text-zinc-800">{{ item.title }}</p>
                <p class="text-lg text-orange-500 ml-auto">{{ item.quantity }} x {{ formatCurrency(item.price) }}</p>
            </li>
        </ul>
        <p class="text-lg text-zinc-700 text-end px-2">Shipping fees: {{ formatCurrency(10) }}</p>
        <p class="text-lg text-zinc-700 text-end px-2">Total: {{ formatCurrency(store.cartTotal + 10) }}</p>
        <hr />
        <h2 class="text-2xl text-zinc-500">Shipping Address</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField name="firstName" placeholder="Joe" label-txt="First Name" v-model="formData.firstName"
                :error="formErrors.firstName" required />
            <InputField name="lastName" placeholder="Smith" label-txt="Last Name" v-model="formData.lastName"
                :error="formErrors.lastName" required />
            <InputField class="col-span-2" name="address" placeholder="Robert Robertson, 1234" label-txt="Address"
                v-model="formData.address" :error="formErrors.address" required />
            <InputField name="city" placeholder="New York" label-txt="City" v-model="formData.city" :error="formErrors.city"
                required />
            <InputField name="state" placeholder="New York" label-txt="State" v-model="formData.state"
                :error="formErrors.state" required />
            <InputField name="zip" placeholder="10001" label-txt="Zip" v-model="formData.zip" :error="formErrors.zip"
                required />
            <InputField name="country" placeholder="USA" label-txt="Country" v-model="formData.country"
                :error="formErrors.country" required />
            <InputField name="phone" placeholder="+12087444184" label-txt="Phone" v-model="formData.phone"
                :error="formErrors.phone" required />
        </div>
        <hr />
        <h2 class="text-2xl text-zinc-500">Payment</h2>
        <div class="grid grid-cols-3 gap-4">
            <InputField class="col-span-3" type="text" name="cardNumber" minlength="16" placeholder="1234 1234 1234 1234"
                label-txt="Card Number" v-model="formData.cardNumber" :error="formErrors.cardNumber" required />
            <InputField name="cardName" placeholder="Joe Smith" label-txt="Name on Card" v-model="formData.cardName"
                :error="formErrors.cardName" required />
            <InputField name="cardExpiry" type="month" :min="today" label-txt="Expiry" v-model="formData.cardExpiry"
                :error="formErrors.cardExpiry" required />
            <InputField name="cardCvv" minlength="3" maxlength="3" placeholder="342" label-txt="CVV"
                v-model="formData.cardCvv" :error="formErrors.cardCvv" required />
        </div>
        <p v-if="formErrors.other" class="py-2 px-4 bg-red-50 text-red-500 rounded">{{ formErrors.other }}</p>
        <Button type="submit" class="p-2 mt-5 flex justify-center items-center" :disabled="isLoading">
            <Spinner v-if="isLoading" w="25px" bw="2px" class="w-fit mx-auto"/>
            <template v-else>Submit</template>
        </Button>
    </form>
</template>
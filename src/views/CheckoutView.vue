<script setup lang="ts">
import Button from '@/components/shared/Button.vue';
import InputField from '@/components/shared/InputField.vue';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/currency';
import { reactive } from 'vue';

const store = useCartStore()

const formData = reactive({
    firstName: '',
    lastName: '',
    email: '',
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

const formErrors = reactive({
    firstName: '',
    lastName: '',
    email: '',
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
});

</script>


<template>
    <form class="bg-white p-3 rounded-md flex flex-col gap-4">
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
        <hr/>
        <h2 class="text-2xl text-zinc-500">Shipping Address</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField name="firstName" placeholder="First Name" v-model="formData.firstName" :error="formErrors.firstName"/>
            <InputField name="lastName" placeholder="Last Name" v-model="formData.lastName" :error="formErrors.lastName"/>
            <InputField name="email" placeholder="Email" v-model="formData.email" :error="formErrors.email"/>
            <InputField name="phone" placeholder="Phone" v-model="formData.phone" :error="formErrors.phone"/>
            <InputField class="col-span-2" name="address" placeholder="Address" v-model="formData.address" :error="formErrors.address"/>
            <InputField name="city" placeholder="City" v-model="formData.city" :error="formErrors.city"/>
            <InputField name="state" placeholder="State" v-model="formData.state" :error="formErrors.state"/>
            <InputField name="country" placeholder="Country" v-model="formData.country" :error="formErrors.country"/>
        </div>
        <hr/>
        <h2 class="text-2xl text-zinc-500">Payment</h2>
        <div class="grid grid-cols-3 gap-4">
            <InputField class="col-span-3" type="text" name="cardNumber" placeholder="Card Number" v-model="formData.cardNumber" :error="formErrors.cardNumber"/>
            <InputField name="cardName" placeholder="Name on Card" v-model="formData.cardName" :error="formErrors.cardName"/>
            <InputField name="cardExpiry" placeholder="Expiry" v-model="formData.cardExpiry" :error="formErrors.cardExpiry"/>
            <InputField name="cardCvv" placeholder="CVV" v-model="formData.cardCvv" :error="formErrors.cardCvv"/>
        </div>
        <Button type="submit" class-name="p-2">Submit</Button>
    </form>
</template>
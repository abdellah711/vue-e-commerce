<template>
    <div class="w-full max-w-lg mx-auto flex flex-col items-center gap-4 bg-white rounded-xl my-5 p-5">
        <h1 class="text-2xl">Your order has been received</h1>

        <p class="text-zinc-600">Thank you for your purchase</p>
        <div class="flex gap-4">
            <Button class="py-2 px-4" variant="tertiary" @click="$router.push('/')">Continue shopping</Button>
            <Button class="py-2 px-4" variant="secondary" @click="$router.push('/account')">View orders</Button>
        </div>
    </div>
</template>
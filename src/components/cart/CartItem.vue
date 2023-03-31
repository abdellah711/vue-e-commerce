<script setup lang="ts">
import DeleteIcon from '@heroicons/vue/24/outline/TrashIcon'
import Button from '@/components/shared/Button.vue'
import { RouterLink } from 'vue-router';

</script>

<template>
    <li class="bg-white flex gap-3 items-center p-2 rounded-md">
            <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" alt=""
                class="w-32 aspect-square object-contain p-2 rounded-md">
            <div class="self-stretch space-y-2">
                <RouterLink :to="'/products/'+1" class="text-xl hover:underline">Iphone 13 pro max</RouterLink>
                <p class="font-medium text-orange-500">200$</p>

            </div>
            <p class="font-medium text-orange-500 text-lg ml-auto">200$</p>
            <Button variant="danger" class-name="p-2">
                <DeleteIcon class="w-6" />
            </Button>
        </li>
</template>
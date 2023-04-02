import type { Product } from '@/types/product'
import { defineStore } from 'pinia'
import { toRaw } from 'vue'

type CartProduct = Product & { quantity: number }

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [] as CartProduct[],
    }),
    getters: {
        cartTotal: (state) => {
            return state.cart.reduce((acc, product) => acc + product.price, 0)
        },
    },
    actions: {
        addToCart(product: CartProduct) {
            this.cart.push(product)
        },
        removeFromCart(product: CartProduct) {
            console.log(product.id)
            this.cart = toRaw(this.cart).filter((p) => p.id !== product.id)
        },
        updateProductQuantity(product: CartProduct, quantity: number) {
            const index = this.cart.findIndex((p) => p.id === product.id)
            this.cart[index].quantity = quantity
        }

    }
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import CartItem from '../cart/CartItem.vue'
import Button from '../shared/Button.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCartStore } from '@/stores/cart'

vi.mock('../../utils/currency', () => ({
    formatCurrency: vi.fn(val => val),
}))
vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    RouterLink: { template: '<div><slot></slot></div>' },
}));

describe('CartItem', () => {
    const product = {
        id: 1,
        title: 'Test',
        price: 100,
        description: 'lorem ipsum dolor sit amet',
        category: 'test',
        image: 'https://via.placeholder.com/150',
        rating: 3,
        rating_count: 5,
        stock: 10,
        quantity: 3,
    }

    let cartItem: VueWrapper

    beforeEach(() => {
        cartItem = mount(CartItem, {
            props: {
                product,
            },
            globalComponents: {
                'Button': Button,
            },
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            }
        })
    })

    it('should render properly', () => {
        expect(cartItem.text()).toContain('Test')
        expect(cartItem.text()).toContain('100')
        expect(cartItem.text()).toContain('3')
    })

    it('should remove product from cart', async () => {
        const store = useCartStore()

        const removeButton = cartItem.find('button[data-testid="remove"]')
        await removeButton.trigger('click')

        expect(store.removeFromCart).toBeCalledWith(product)
    })

    it('should increment product quantity', async () => {
        const store = useCartStore()

        const incButton = cartItem.find('button[data-testid="inc"]')
        await incButton.trigger('click')

        expect(store.updateProductQuantity).toBeCalledWith(product, 4)
    })

    it('should decrement product quantity', async () => {
        const store = useCartStore()

        const decButton = cartItem.find('button[data-testid="dec"]')
        await decButton.trigger('click')

        expect(store.updateProductQuantity).toBeCalledWith(product, 2)
    })

})
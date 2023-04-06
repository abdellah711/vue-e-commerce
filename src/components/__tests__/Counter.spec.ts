import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '@/components/shared/Counter.vue'

describe('Counter', () => {
    it('renders properly', () => {
        const counter = mount(Counter, { props: { count: 0 } })
        expect(counter.text()).toBe('0')
    })
    
    it('plus button increments the counter',async () => {
        const counter = mount(Counter, { props: { count: 0 } })

        await counter.find('button[data-testid="inc"]').trigger('click')

        console.log(counter.emitted('update:count'))
        expect(counter.emitted('update:count')?.[0]?.[0]).toBe(1)
    })
    
    it('minus button decrements the counter',async () => {
        const counter = mount(Counter, { props: { count: 2 } })

        await counter.find('button[data-testid="dec"]').trigger('click')
        expect(counter.emitted('update:count')?.[0]?.[0]).toBe(1)
    })
    
    it('minus button doesn\'t decrement if the counter reaches the min value',async () => {
        const counter = mount(Counter, { props: { count: 0, min: 0 } })
        const button = counter.find('button[data-testid="dec"]')
        await button.trigger('click')
        expect(counter.emitted('update:count')).toBeFalsy()
    })
    
    it('plus button doesn\'t increment if the counter reaches the max value',async () => {
        const counter = mount(Counter, { props: { count: 3, max: 3 } })
        const button = counter.find('button[data-testid="inc"]')
        await button.trigger('click')
        expect(counter.emitted('update:count')).toBeFalsy()
    })



})
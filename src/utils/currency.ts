const formatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})

export const formatCurrency = (value: number) => formatter.format(value)
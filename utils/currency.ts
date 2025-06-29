export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`
  }
  return `$${amount}`
}

export function parseCurrency(value: string): number {
  return Number.parseFloat(value.replace(/\$|,/g, "")) || 0
}

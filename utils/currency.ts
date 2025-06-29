export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`
  }
  return `₹${amount}`
}

export function parseCurrency(value: string): number {
  return Number.parseFloat(value.replace(/₹|,/g, "")) || 0
}

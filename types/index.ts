export interface Transaction {
  id: number
  date: string
  amount: number
  category: "Revenue" | "Expense"
  status: "Paid" | "Pending"
  user_id: string
  user_profile: string
}

export interface User {
  id: string
  name: string
  email: string
}

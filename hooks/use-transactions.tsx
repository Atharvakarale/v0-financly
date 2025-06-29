"use client"

import { useState, useEffect } from "react"
import type { Transaction } from "@/types"
import { sampleTransactions } from "@/data/sample-transactions"

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load transactions from sample data
    setTransactions(sampleTransactions as Transaction[])
    setLoading(false)
  }, [])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Math.max(...transactions.map((t) => t.id)) + 1,
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id.toString() !== id))
  }

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id.toString() === id ? { ...t, ...updates } : t)))
  }

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  }
}

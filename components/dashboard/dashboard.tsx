"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "./header"
import StatsCards from "./stats-cards"
import ChartsSection from "./charts-section"
import TransactionsTable from "./transactions-table"
import RecentTransactions from "./recent-transactions"
import AddTransactionModal from "./add-transaction-modal"
import { useTransactions } from "@/hooks/use-transactions"

export default function Dashboard() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [activeView, setActiveView] = useState<"overview" | "transactions">("overview")
  const { transactions, loading, addTransaction, deleteTransaction, updateTransaction } = useTransactions()

  const stats = {
    balance: transactions.reduce((acc, t) => acc + (t.category === "Revenue" ? t.amount : -t.amount), 0),
    revenue: transactions.filter((t) => t.category === "Revenue").reduce((acc, t) => acc + t.amount, 0),
    expenses: transactions.filter((t) => t.category === "Expense").reduce((acc, t) => acc + t.amount, 0),
    savings:
      transactions.filter((t) => t.category === "Revenue").reduce((acc, t) => acc + t.amount, 0) -
      transactions.filter((t) => t.category === "Expense").reduce((acc, t) => acc + t.amount, 0),
  }

  const handleViewAllTransactions = () => {
    setActiveView("transactions")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAddTransaction={() => setShowAddTransaction(true)} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <StatsCards stats={stats} />
        </motion.div>

        {activeView === "overview" ? (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="xl:col-span-2"
              >
                <ChartsSection transactions={transactions} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="xl:col-span-1"
              >
                <RecentTransactions transactions={transactions} onViewAll={handleViewAllTransactions} />
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView("overview")}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-2"
              >
                <span>← Back to Overview</span>
              </motion.button>
            </div>
            <TransactionsTable transactions={transactions} onDelete={deleteTransaction} onUpdate={updateTransaction} />
          </motion.div>
        )}
      </main>

      <AddTransactionModal
        open={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        onAdd={addTransaction}
      />
    </div>
  )
}

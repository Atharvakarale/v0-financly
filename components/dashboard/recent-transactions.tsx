"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Filter,
  Calendar,
  DollarSign,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Transaction } from "@/types"

interface RecentTransactionsProps {
  transactions: Transaction[]
  onViewAll: () => void
}

export default function RecentTransactions({ transactions, onViewAll }: RecentTransactionsProps) {
  const [filter, setFilter] = useState<"all" | "revenue" | "expense">("all")

  // Get recent transactions (last 7 days or latest 8 transactions)
  const recentTransactions = transactions
    .filter((transaction) => {
      if (filter === "all") return true
      return transaction.category.toLowerCase() === filter
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const getTransactionIcon = (category: string) => {
    return category === "Revenue" ? (
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
        <TrendingUp className="w-5 h-5 text-white" />
      </div>
    ) : (
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center">
        <TrendingDown className="w-5 h-5 text-white" />
      </div>
    )
  }

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const transactionDate = new Date(date)
    const diffInHours = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return transactionDate.toLocaleDateString()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <Clock className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold flex items-center space-x-2">
                  <span>Recent Activity</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                </CardTitle>
                <CardDescription className="text-sm">Latest financial transactions and updates</CardDescription>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Filter Buttons */}
              <div className="flex bg-white/50 dark:bg-gray-800/50 rounded-lg p-1">
                {[
                  { key: "all", label: "All", icon: DollarSign },
                  { key: "revenue", label: "Revenue", icon: TrendingUp },
                  { key: "expense", label: "Expense", icon: TrendingDown },
                ].map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(key as any)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                      filter === key
                        ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{label}</span>
                  </motion.button>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewAll}
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"
                >
                  <span className="hidden sm:inline mr-2">View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-100 dark:divide-gray-800"
          >
            <AnimatePresence>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    variants={itemVariants}
                    layout
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Transaction Icon */}
                        <motion.div whileHover={{ scale: 1.1 }} className="relative">
                          {getTransactionIcon(transaction.category)}
                          <motion.div
                            className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                transaction.status === "Paid" ? "bg-green-500" : "bg-orange-500"
                              }`}
                            />
                          </motion.div>
                        </motion.div>

                        {/* Transaction Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {transaction.category} Transaction
                            </p>
                            <Badge
                              variant={transaction.status === "Paid" ? "default" : "outline"}
                              className={`text-xs ${
                                transaction.status === "Paid"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : "border-orange-300 text-orange-600 dark:border-orange-700 dark:text-orange-400"
                              }`}
                            >
                              {transaction.status}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatTimeAgo(transaction.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Avatar className="w-4 h-4">
                                <AvatarImage src={transaction.user_profile || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs bg-gray-200 dark:bg-gray-700">
                                  {transaction.user_id.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-mono">{transaction.user_id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amount and Actions */}
                      <div className="flex items-center space-x-3">
                        <motion.div whileHover={{ scale: 1.05 }} className="text-right">
                          <div
                            className={`text-lg font-bold ${
                              transaction.category === "Revenue"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {transaction.category === "Revenue" ? "+" : "-"}${transaction.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.category}</div>
                        </motion.div>

                        {/* Action Menu */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Filter className="w-4 h-4 mr-2" />
                                Filter Similar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar for Visual Appeal */}
                    <motion.div
                      className="mt-3 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    >
                      <motion.div
                        className={`h-full rounded-full ${
                          transaction.category === "Revenue"
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : "bg-gradient-to-r from-red-500 to-rose-600"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: transaction.status === "Paid" ? "100%" : "60%" }}
                        transition={{ delay: index * 0.1 + 0.7, duration: 0.8 }}
                      />
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No recent transactions found</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    Start by adding your first transaction
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer with Summary */}
          {recentTransactions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {recentTransactions.filter((t) => t.category === "Revenue").length} Revenue
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {recentTransactions.filter((t) => t.category === "Expense").length} Expenses
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={onViewAll}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  View All Activity →
                </motion.button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

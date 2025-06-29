"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Transaction } from "@/types"
import { DollarSign, TrendingUp, TrendingDown, User, Calendar } from "lucide-react"

interface AddTransactionModalProps {
  open: boolean
  onClose: () => void
  onAdd: (transaction: Omit<Transaction, "id">) => void
}

export default function AddTransactionModal({ open, onClose, onAdd }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    status: "",
    user_id: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.amount || !formData.category || !formData.status || !formData.user_id) {
      toast({
        title: "Missing fields ⚠️",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newTransaction = {
      date: new Date().toISOString(),
      amount: Number.parseFloat(formData.amount),
      category: formData.category as "Revenue" | "Expense",
      status: formData.status as "Paid" | "Pending",
      user_id: formData.user_id,
      user_profile: "https://thispersondoesnotexist.com/",
    }

    onAdd(newTransaction)
    setFormData({ amount: "", category: "", status: "", user_id: "" })
    onClose()

    toast({
      title: "Transaction added! 🎉",
      description: "Your transaction has been successfully added.",
    })
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[500px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 shadow-2xl">
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <DialogHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4"
                >
                  <DollarSign className="w-8 h-8 text-white" />
                </motion.div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Add New Transaction
                </DialogTitle>
                <DialogDescription className="text-base text-gray-600 dark:text-gray-400">
                  Enter the details for your new financial transaction
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="amount" className="text-sm font-medium flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span>Amount</span>
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="h-12 text-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </motion.div>

                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="category" className="text-sm font-medium flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Category</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Revenue" className="flex items-center">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span>Revenue</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Expense" className="flex items-center">
                        <div className="flex items-center space-x-2">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span>Expense</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="status" className="text-sm font-medium flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Status</span>
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">✅ Paid</SelectItem>
                      <SelectItem value="Pending">⏳ Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="user_id" className="text-sm font-medium flex items-center space-x-2">
                    <User className="w-4 h-4 text-orange-600" />
                    <span>User ID</span>
                  </Label>
                  <Input
                    id="user_id"
                    placeholder="user_001"
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </motion.div>

                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                  className="flex justify-end space-x-3 pt-4"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Add Transaction
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

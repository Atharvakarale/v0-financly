"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Upload, Trash2, Filter, SortAsc, SortDesc, Eye } from "lucide-react"
import type { Transaction } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface TransactionsTableProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
  onUpdate: (id: string, transaction: Partial<Transaction>) => void
}

export default function TransactionsTable({ transactions, onDelete, onUpdate }: TransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof Transaction>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const itemsPerPage = 10
  const { toast } = useToast()

  // Filter and sort transactions
  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm)
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
      const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Paginate transactions
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const exportToCSV = () => {
    const headers = ["ID", "Date", "Amount", "Category", "Status", "User ID"]
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedTransactions.map((t) =>
        [t.id, new Date(t.date).toLocaleDateString(), t.amount, t.category, t.status, t.user_id].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export successful! 📊",
      description: "Transactions have been exported to CSV.",
    })
  }

  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target?.result as string
      const lines = csv.split("\n")
      const headers = lines[0].split(",")

      toast({
        title: "Import successful! 📈",
        description: "Transactions have been imported from CSV.",
      })
    }
    reader.readAsText(file)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Transaction History</span>
              </CardTitle>
              <CardDescription className="text-base mt-1">
                Manage and analyze your financial transactions
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={exportToCSV}
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  asChild
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <label htmlFor="csv-import" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV
                    <input id="csv-import" type="file" accept=".csv" className="hidden" onChange={importFromCSV} />
                  </label>
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Enhanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Revenue">Revenue</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Enhanced Table */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {sortField === "date" &&
                        (sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Amount</span>
                      {sortField === "amount" &&
                        (sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {paginatedTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                    >
                      <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`font-semibold ${
                            transaction.category === "Revenue"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.category === "Revenue" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </motion.div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.category === "Revenue" ? "default" : "secondary"}
                          className={`${
                            transaction.category === "Revenue"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.status === "Paid" ? "default" : "outline"}
                          className={`${
                            transaction.status === "Paid"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                              : "border-orange-300 text-orange-600 dark:border-orange-700 dark:text-orange-400"
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{transaction.user_id}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                            >
                              <Eye className="w-4 h-4 text-blue-600" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(transaction.id.toString())}
                              className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </motion.div>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* Enhanced Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between space-x-2 py-6"
          >
            <div className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedTransactions.length)} of{" "}
              {filteredAndSortedTransactions.length} transactions
            </div>
            <div className="flex space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Previous
                </Button>
              </motion.div>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <motion.div key={pageNum} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 ${
                          currentPage === pageNum
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Next
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

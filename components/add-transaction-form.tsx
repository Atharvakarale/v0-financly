"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function AddTransactionForm() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      amount: `₹${amount}`,
      description,
      category,
      type,
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

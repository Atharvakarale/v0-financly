"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ExpenseChart() {
  const data = [
    { month: "Jan", income: 82000, expenses: 45000 },
    { month: "Feb", income: 78000, expenses: 42000 },
    { month: "Mar", income: 85000, expenses: 48000 },
    { month: "Apr", income: 88000, expenses: 44000 },
    { month: "May", income: 85000, expenses: 46000 },
    { month: "Jun", income: 85000, expenses: 42300 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey === "income" ? "Income" : "Expenses"}: ₹${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

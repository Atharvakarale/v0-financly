import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      amount: "-₹2,450",
      date: "Today",
      category: "Food",
      type: "expense",
    },
    {
      id: 2,
      description: "Salary Credit",
      amount: "+₹85,000",
      date: "Yesterday",
      category: "Income",
      type: "income",
    },
    {
      id: 3,
      description: "Electricity Bill",
      amount: "-₹1,200",
      date: "2 days ago",
      category: "Utilities",
      type: "expense",
    },
    {
      id: 4,
      description: "Online Shopping",
      amount: "-₹3,500",
      date: "3 days ago",
      category: "Shopping",
      type: "expense",
    },
    {
      id: 5,
      description: "Freelance Payment",
      amount: "+₹15,000",
      date: "4 days ago",
      category: "Income",
      type: "income",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{transaction.category}</Badge>
                <span className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

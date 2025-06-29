import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function BudgetTracker() {
  const budgets = [
    {
      category: "Food & Dining",
      spent: 8500,
      budget: 12000,
      color: "bg-blue-500",
    },
    {
      category: "Transportation",
      spent: 4200,
      budget: 6000,
      color: "bg-green-500",
    },
    {
      category: "Entertainment",
      spent: 3800,
      budget: 4000,
      color: "bg-yellow-500",
    },
    {
      category: "Shopping",
      spent: 7500,
      budget: 8000,
      color: "bg-purple-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.budget) * 100
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{budget.category}</span>
                  <span className="text-sm text-gray-500">
                    ₹{budget.spent.toLocaleString()} / ₹{budget.budget.toLocaleString()}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{percentage.toFixed(1)}% used</span>
                  <span>₹{(budget.budget - budget.spent).toLocaleString()} remaining</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Wallet, TrendingUp, CreditCard } from "lucide-react"

export function FinancialOverview() {
  const stats = [
    {
      title: "Total Balance",
      amount: "₹1,24,500",
      change: "+12.5%",
      changeType: "positive",
      icon: Wallet,
    },
    {
      title: "Monthly Income",
      amount: "₹85,000",
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUp,
    },
    {
      title: "Monthly Expenses",
      amount: "₹42,300",
      change: "-3.1%",
      changeType: "negative",
      icon: CreditCard,
    },
    {
      title: "Savings",
      amount: "₹42,700",
      change: "+15.3%",
      changeType: "positive",
      icon: ArrowUpIcon,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.amount}</div>
            <div className="flex items-center text-xs">
              {stat.changeType === "positive" ? (
                <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

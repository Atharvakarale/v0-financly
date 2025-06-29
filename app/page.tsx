import { DashboardHeader } from "@/components/dashboard-header"
import { FinancialOverview } from "@/components/financial-overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { BudgetTracker } from "@/components/budget-tracker"
import { ExpenseChart } from "@/components/expense-chart"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <FinancialOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTransactions />
            <BudgetTracker />
          </div>
          <ExpenseChart />
        </div>
      </main>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatsCardsProps {
  stats: {
    balance: number
    revenue: number
    expenses: number
    savings: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Balance",
      value: stats.balance,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Revenue",
      value: stats.revenue,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20",
      iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Expenses",
      value: stats.expenses,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-800/20",
      iconBg: "bg-gradient-to-r from-red-500 to-rose-600",
      trend: "-3.1%",
      trendUp: false,
    },
    {
      title: "Savings",
      value: stats.savings,
      icon: PiggyBank,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20",
      iconBg: "bg-gradient-to-r from-purple-500 to-violet-600",
      trend: "+15.3%",
      trendUp: true,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => (
        <motion.div key={card.title} variants={cardVariants}>
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 ${card.bgColor}`} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent" />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {card.title}
              </CardTitle>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-2.5 rounded-xl ${card.iconBg} shadow-lg`}
              >
                <card.icon className="h-4 w-4 text-white" />
              </motion.div>
            </CardHeader>

            <CardContent className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              >
                ${Math.abs(card.value).toLocaleString()}
              </motion.div>

              <div className="flex items-center space-x-2">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className={`flex items-center text-xs font-medium ${
                    card.trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {card.trendUp ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {card.trend}
                </motion.div>
                <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
              </div>
            </CardContent>

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              style={{ width: "50%" }}
            />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

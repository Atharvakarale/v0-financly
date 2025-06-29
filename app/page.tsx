"use client"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import Dashboard from "@/components/dashboard/dashboard"
import { useAuth } from "@/hooks/use-auth"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        {user ? <Dashboard /> : <LoginForm />}
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, Building, FileText, Home, LogOut, Settings, Users } from "lucide-react"

interface SidebarProps {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    {
      title: "ダッシュボード",
      href: "/portal-admin/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "応募状況",
      href: "/portal-admin/applications",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "企業管理",
      href: "/portal-admin/companies",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "求人管理",
      href: "/portal-admin/jobs",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "ユーザー管理",
      href: "/portal-admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "設定",
      href: "/portal-admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">管理者パネル</h2>
        <p className="text-sm text-muted-foreground">塾講師マッチングポータル</p>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive(item.href) ? "secondary" : "ghost"}
              className={`w-full justify-start ${isActive(item.href) ? "font-medium" : ""}`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Button>
          </Link>
        ))}
      </div>
      <div className="p-3 mt-auto">
        <Button variant="ghost" className="w-full justify-start text-red-500" onClick={onLogout}>
          <LogOut className="h-5 w-5" />
          <span className="ml-3">ログアウト</span>
        </Button>
      </div>
    </div>
  )
}

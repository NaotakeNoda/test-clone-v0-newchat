"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Building, FileCheck, Users, BarChart3 } from "lucide-react"
import { adminLogout } from "../auth/action"

type AdminSessionData = {
  username: string
  role: string
  expiresAt: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [sessionData, setSessionData] = useState<AdminSessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ページロード時に認証チェック
  useEffect(() => {
    console.log("===== AdminDashboardPage マウント =====")

    // 認証状態チェック
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"
    console.log(`ダッシュボード: 認証状態=${isAuthenticated ? "認証済み" : "未認証"}`)

    // セッションデータの取得
    try {
      const sessionStr = localStorage.getItem("adminSession")
      if (sessionStr) {
        const session = JSON.parse(sessionStr) as AdminSessionData
        setSessionData(session)
        console.log("セッションデータ読み込み成功:", session.username)
      }
    } catch (error) {
      console.error("セッションデータ読み込みエラー:", error)
    }

    // Cookieの状態をチェック（クライアントサイドからは制限あり）
    console.log("document.cookie:", document.cookie)

    if (!isAuthenticated) {
      console.log("未認証状態: ログインページへリダイレクト")
      router.push("/portal-admin/auth")
    } else {
      console.log("認証済み: ダッシュボード表示")
      setIsLoading(false)
    }

    return () => {
      console.log("AdminDashboardPage アンマウント")
    }
  }, [router])

  const handleLogout = async () => {
    console.log("ログアウトボタンクリック")

    // ローカルストレージのクリア
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminSession")
    console.log("localStorage認証状態クリア完了")

    // サーバーサイドのログアウト処理を呼び出し
    try {
      await adminLogout()
    } catch (error) {
      console.error("ログアウトエラー:", error)
      router.push("/portal-admin/auth")
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">管理者ダッシュボード</h1>
          {sessionData && (
            <p className="text-sm text-muted-foreground">
              ログインユーザー: {sessionData.username} ({sessionData.role})
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/portal-admin/applications")} variant="outline">
            すべての応募状況
          </Button>
          <Button onClick={handleLogout} variant="outline">
            ログアウト
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">企業アカウント数</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">先月比 +8 (+6.7%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">講師アカウント数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">先月比 +120 (+9.6%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">申請中の求人</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">先週比 +4 (+20%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">閲覧数</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,456</div>
            <p className="text-xs text-muted-foreground">先週比 +1,248 (+10%)</p>
          </CardContent>
        </Card>
      </div>

      {/* 他のダッシュボードコンテンツ */}
    </div>
  )
}

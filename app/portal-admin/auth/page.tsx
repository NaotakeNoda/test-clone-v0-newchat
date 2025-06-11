"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { adminLogin } from "./action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("===== AdminLoginPage コンポーネントがマウントされました =====")

    // すでに認証済みかチェック
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"
    console.log("現在のlocalStorage:", isAuthenticated)
    console.log("document.cookie:", document.cookie)

    if (isAuthenticated) {
      console.log("ダッシュボードへリダイレクト実行")
      router.push("/portal-admin/dashboard")
    }

    return () => {
      console.log("AdminLoginPage コンポーネントがアンマウントされました")
    }
  }, [router])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    console.log("===== ログインフォーム送信開始 =====")

    try {
      const formData = new FormData(event.currentTarget)
      const username = formData.get("username") as string
      const password = formData.get("password") as string

      console.log(`送信データ: username=${username}, password=${password ? "入力あり" : "なし"}`)
      console.log("サーバーアクション adminLogin() 呼び出し...")

      const result = await adminLogin(formData)
      console.log("サーバーアクション結果:", result)

      if (result.error) {
        setError(result.error)
        console.log("認証エラー:", result.error)
      } else if (result.success) {
        console.log("認証成功: localStorage に認証状態を保存します")

        // セッション情報をlocalStorageに保存
        localStorage.setItem("adminAuthenticated", "true")

        if (result.session) {
          localStorage.setItem("adminSession", JSON.stringify(result.session))
        }

        console.log("localStorage 保存成功:", localStorage.getItem("adminAuthenticated"))
        console.log("ダッシュボードへリダイレクト準備...")

        // リダイレクト前に少し待機（Cookieが保存される時間を確保）
        setTimeout(() => {
          router.push("/portal-admin/dashboard")
        }, 500)
      }
    } catch (err) {
      console.error("ログイン処理エラー:", err)
      setError("ログイン処理中にエラーが発生しました")
    } finally {
      setIsLoading(false)
      console.log("ログインフォーム処理完了")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">管理者ログイン</CardTitle>
          <CardDescription className="text-center">管理者アカウントでログインしてください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ユーザー名</Label>
              <Input id="username" name="username" placeholder="admin" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

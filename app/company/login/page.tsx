"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { demoEmployerAccounts } from "@/lib/demo-accounts"

export default function EmployerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // デモアカウントでのログイン処理
      console.log("企業ログイン試行:", email, password)

      // デモアカウントの認証
      const account = demoEmployerAccounts.find((account) => account.email === email && account.password === password)

      if (account) {
        console.log("企業ログイン成功:", account.name)

        // ログイン情報をlocalStorageに保存
        localStorage.setItem(
          "company_auth",
          JSON.stringify({
            isLoggedIn: true,
            userId: account.id,
            name: account.name,
            email: account.email,
          }),
        )

        // 1秒待機してからリダイレクト（UXのため）
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push("/company/dashboard")
      } else {
        console.log("企業ログイン失敗: アカウントが見つかりません")
        setError("メールアドレスまたはパスワードが正しくありません")
      }
    } catch (err) {
      console.error("企業ログインエラー:", err)
      setError("ログイン処理中にエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10 max-w-md">
      <div className="mb-6">
        <Link href="/company" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          採用担当者様向けページに戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">企業様ログイン</h1>

      <Card>
        <CardHeader>
          <CardTitle>アカウントにログイン</CardTitle>
          <CardDescription>登録済みのメールアドレスとパスワードを入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">パスワード</Label>
                <Link href="/employer/forgot-password" className="text-sm text-primary hover:underline">
                  パスワードをお忘れですか？
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "パスワードを隠す" : "パスワードを表示"}</span>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">アカウントをお持ちでない企業様は</p>
          <Link href="/company/contact">
            <Button variant="link" className="p-0 h-auto">
              お問い合わせフォームからご連絡ください
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="text-lg font-semibold mb-2">デモアカウント情報</h2>
        <p className="text-sm mb-2">以下の企業アカウントでログインできます：</p>
        <div className="space-y-4">
          {demoEmployerAccounts.map((account, index) => (
            <div key={index} className="p-3 bg-card rounded border">
              <p>
                <strong>メールアドレス:</strong> {account.email}
              </p>
              <p>
                <strong>パスワード:</strong> {account.password}
              </p>
              <p>
                <strong>企業名:</strong> {account.name}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => {
                  setEmail(account.email)
                  setPassword(account.password)
                }}
              >
                このアカウントを使用
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

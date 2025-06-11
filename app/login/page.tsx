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
import { demoApplicantAccounts } from "@/lib/demo-accounts"

export default function LoginPage() {
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
      console.log("ログイン試行:", email, password)

      // デモアカウントの認証
      const account = demoApplicantAccounts.find((account) => account.email === email && account.password === password)

      if (account) {
        console.log("ログイン成功:", account.name)

        // ログイン情報をlocalStorageに保存
        localStorage.setItem(
          "applicant_auth",
          JSON.stringify({
            isLoggedIn: true,
            userId: account.id,
            name: account.name,
            email: account.email,
          }),
        )

        // 1秒待機してからリダイレクト（UXのため）
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push("/applicant/dashboard")
      } else {
        console.log("ログイン失敗: アカウントが見つかりません")
        setError("メールアドレスまたはパスワードが正しくありません")
      }
    } catch (err) {
      console.error("ログインエラー:", err)
      setError("ログイン処理中にエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10 max-w-md">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページに戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">講師ログイン</h1>

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
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">パスワード</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
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
          <p className="text-sm text-muted-foreground">アカウントをお持ちでない方は</p>
          <Link href="/register">
            <Button variant="link" className="p-0 h-auto">
              新規登録
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="text-lg font-semibold mb-2">デモアカウント情報</h2>
        <p className="text-sm mb-2">以下のアカウントでログインできます：</p>
        <div className="space-y-4">
          {demoApplicantAccounts.map((account, index) => (
            <div key={index} className="p-3 bg-card rounded border">
              <p>
                <strong>メールアドレス:</strong> {account.email}
              </p>
              <p>
                <strong>パスワード:</strong> {account.password}
              </p>
              <p>
                <strong>名前:</strong> {account.name}
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

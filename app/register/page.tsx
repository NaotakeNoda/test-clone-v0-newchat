"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("tutor")

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "tutor" || type === "school") {
      setActiveTab(type)
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 実際の実装では、フォームデータを処理してユーザー登録
    router.push("/dashboard")
  }

  return (
    <div className="container py-10 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">アカウント登録</h1>

      <Card>
        <CardHeader>
          <CardTitle>新規登録</CardTitle>
          <CardDescription>アカウントを作成して、塾講師マッチングサービスを利用しましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="tutor">講師として登録</TabsTrigger>
              <TabsTrigger value="school">塾として登録</TabsTrigger>
            </TabsList>

            <TabsContent value="tutor">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="tutor-name">氏名</Label>
                  <Input id="tutor-name" placeholder="例：山田 太郎" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tutor-email">メールアドレス</Label>
                  <Input id="tutor-email" type="email" placeholder="example@mail.com" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tutor-password">パスワード</Label>
                  <Input id="tutor-password" type="password" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tutor-university">大学名</Label>
                  <Input id="tutor-university" placeholder="例：東京大学" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tutor-faculty">学部・学科</Label>
                  <Input id="tutor-faculty" placeholder="例：文学部" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tutor-grade">学年</Label>
                  <Input id="tutor-grade" placeholder="例：3年" required />
                </div>

                <Button type="submit" className="w-full">
                  登録する
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="school">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="school-name">塾名</Label>
                  <Input id="school-name" placeholder="例：スタディプラス" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="school-email">メールアドレス</Label>
                  <Input id="school-email" type="email" placeholder="example@company.com" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="school-password">パスワード</Label>
                  <Input id="school-password" type="password" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="school-address">住所</Label>
                  <Input id="school-address" placeholder="例：東京都渋谷区道玄坂1-2-3" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="school-phone">電話番号</Label>
                  <Input id="school-phone" placeholder="例：03-1234-5678" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="school-representative">担当者名</Label>
                  <Input id="school-representative" placeholder="例：佐藤 一郎" required />
                </div>

                <Button type="submit" className="w-full">
                  登録する
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">すでにアカウントをお持ちの方は</p>
          <Link href="/login">
            <Button variant="link" className="p-0 h-auto">
              ログイン
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewJobPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState("basic")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 実際の実装では、フォームデータを処理して求人を作成
    router.push("/dashboard?tab=school")
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">新規求人作成</h1>

      <Card>
        <CardHeader>
          <CardTitle>求人情報入力</CardTitle>
          <CardDescription>
            以下のフォームに必要事項を入力してください。入力内容は審査後に公開されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentStep} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="basic" onClick={() => setCurrentStep("basic")}>
                基本情報
              </TabsTrigger>
              <TabsTrigger value="details" onClick={() => setCurrentStep("details")}>
                詳細情報
              </TabsTrigger>
              <TabsTrigger value="confirm" onClick={() => setCurrentStep("confirm")}>
                確認・申請
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">求人タイトル</Label>
                    <Input id="title" placeholder="例：小中学生向け個別指導講師" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="location">勤務地</Label>
                    <Input id="location" placeholder="例：東京都渋谷区道玄坂1-2-3" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="station">最寄り駅</Label>
                    <Input id="station" placeholder="例：渋谷駅から徒歩5分" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="salary">給与</Label>
                    <Input id="salary" placeholder="例：時給1,800円〜2,500円（経験・能力による）" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subjects">指導科目</Label>
                    <Input id="subjects" placeholder="例：数学、英語、国語" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="target">対象学年</Label>
                    <Select>
                      <SelectTrigger id="target">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elementary">小学生</SelectItem>
                        <SelectItem value="junior">中学生</SelectItem>
                        <SelectItem value="high">高校生</SelectItem>
                        <SelectItem value="elementary-junior">小学生・中学生</SelectItem>
                        <SelectItem value="junior-high">中学生・高校生</SelectItem>
                        <SelectItem value="all">全学年</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setCurrentStep("details")}>
                    次へ
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="workingHours">勤務時間</Label>
                    <Input id="workingHours" placeholder="例：平日16:00〜22:00、土日10:00〜22:00で応相談" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="workDays">勤務日数</Label>
                    <Input id="workDays" placeholder="例：週1日〜応相談" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">仕事内容</Label>
                    <Textarea
                      id="description"
                      placeholder="仕事内容の詳細を記入してください"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="requirements">応募資格・条件</Label>
                    <Textarea
                      id="requirements"
                      placeholder="応募資格や条件を記入してください"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="benefits">待遇・福利厚生</Label>
                    <Textarea
                      id="benefits"
                      placeholder="待遇や福利厚生を記入してください"
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep("basic")}>
                    戻る
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep("confirm")}>
                    次へ
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="confirm" className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">確認事項</h3>
                    <p className="text-sm text-muted-foreground">
                      入力内容を確認し、問題がなければ申請ボタンを押してください。申請後、管理者による審査が行われます。
                      審査には通常1〜2営業日かかります。審査が完了すると、メールでお知らせします。
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">注意事項</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>虚偽の情報を掲載することはできません</li>
                      <li>最低賃金を下回る給与の設定はできません</li>
                      <li>差別的な表現や不適切な内容は掲載できません</li>
                      <li>掲載後も内容に問題があると判断された場合は、予告なく掲載を停止することがあります</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep("details")}>
                    戻る
                  </Button>
                  <Button type="submit">申請する</Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

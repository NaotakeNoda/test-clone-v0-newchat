"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// 実際の実装ではデータベースから取得
const getJobById = (id: string) => {
  return {
    id: 1,
    title: "小中学生向け個別指導講師",
    company: "スタディプラス 渋谷校",
  }
}

// 学年の表示名マッピング
const gradeLabels: Record<string, string> = {
  "1": "学部1年",
  "2": "学部2年",
  "3": "学部3年",
  "4": "学部4年",
  m1: "修士1年",
  m2: "修士2年",
  d: "博士課程",
  graduate: "既卒生",
}

// 指導可能科目の定義
const teachableSubjects = {
  elementary: [
    { id: "elem-english", label: "英語" },
    { id: "elem-math", label: "算数" },
    { id: "elem-japanese", label: "国語" },
    { id: "elem-science", label: "理科" },
    { id: "elem-social", label: "社会" },
  ],
  junior: [
    { id: "jr-english", label: "英語" },
    { id: "jr-math", label: "数学" },
    { id: "jr-japanese", label: "国語" },
    { id: "jr-science", label: "理科" },
    { id: "jr-social", label: "社会" },
  ],
  high: [
    { id: "high-english", label: "英語" },
    { id: "high-math-liberal", label: "文系数学" },
    { id: "high-math-science", label: "理系数学" },
    { id: "high-modern-japanese", label: "現代文" },
    { id: "high-classical-japanese", label: "古典" },
    { id: "high-essay", label: "小論文" },
    { id: "high-physics", label: "物理" },
    { id: "high-chemistry", label: "化学" },
    { id: "high-biology", label: "生物" },
    { id: "high-earth-science", label: "地学" },
    { id: "high-japanese-history", label: "日本史" },
    { id: "high-world-history", label: "世界史" },
    { id: "high-geography", label: "地理" },
  ],
}

// 科目IDからラベルを取得する関数
const getSubjectLabel = (level: "elementary" | "junior" | "high", subjectId: string): string => {
  const subject = teachableSubjects[level].find((s) => s.id === subjectId)
  return subject ? subject.label : subjectId
}

interface FormData {
  name: string
  nameKana: string
  postalCode: string
  phone: string
  email: string
  university: string
  grade: string
  birthYear: string
  academicType: string
  selfPR: string
  teachableSubjects: {
    elementary: string[]
    junior: string[]
    high: string[]
  }
}

export default function JobApplyConfirmPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const job = getJobById(params.id)

  // 応募完了状態
  const [isSubmitted, setIsSubmitted] = useState(false)

  // フォームデータ
  const [formData, setFormData] = useState<FormData | null>(null)

  // セッションストレージからデータを取得
  useEffect(() => {
    const storedData = sessionStorage.getItem("jobApplicationData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    } else {
      // データがない場合は入力ページにリダイレクト
      router.push(`/jobs/${params.id}/apply`)
    }
  }, [params.id, router])

  // 応募を確定する
  const handleSubmit = () => {
    // 実際の実装ではAPIにデータを送信
    console.log("応募データを送信:", formData)

    // 応募完了状態に変更
    setIsSubmitted(true)

    // セッションストレージをクリア
    sessionStorage.removeItem("jobApplicationData")
  }

  // データがロードされるまで表示しない
  if (!formData) {
    return <div className="container py-10 text-center">読み込み中...</div>
  }

  return (
    <div className="container py-10 max-w-3xl">
      {!isSubmitted ? (
        // 確認画面
        <>
          <div className="mb-6">
            <Link href={`/jobs/${params.id}/apply`} className="flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              入力画面に戻る
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">応募内容の確認</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {job.company} - {job.title}
          </p>

          <Card>
            <CardHeader>
              <CardTitle>入力内容の確認</CardTitle>
              <CardDescription>以下の内容で応募を確定します。内容をご確認ください。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">氏名</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ふりがな</p>
                    <p>{formData.nameKana}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">郵便番号</p>
                    <p>{formData.postalCode}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">連絡先（電話番号）</p>
                    <p>{formData.phone}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">連絡先（e-mail）</p>
                    <p>{formData.email}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">大学名</p>
                    <p>{formData.university}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">現在の学年</p>
                    <p>{gradeLabels[formData.grade]}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">生まれた年（西暦）</p>
                    <p>{formData.birthYear}年</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">文理</p>
                    <p>{formData.academicType === "liberal" ? "文系" : "理系"}</p>
                  </div>
                </div>

                {/* 指導可能科目 */}
                <div className="space-y-3 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">指導可能科目</p>

                  {/* 小学生の科目 */}
                  {formData.teachableSubjects.elementary.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">小学生</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.teachableSubjects.elementary.map((subjectId) => (
                          <span
                            key={subjectId}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                          >
                            {getSubjectLabel("elementary", subjectId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 中学生の科目 */}
                  {formData.teachableSubjects.junior.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">中学生</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.teachableSubjects.junior.map((subjectId) => (
                          <span
                            key={subjectId}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                          >
                            {getSubjectLabel("junior", subjectId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 高校生の科目 */}
                  {formData.teachableSubjects.high.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">高校生</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.teachableSubjects.high.map((subjectId) => (
                          <span
                            key={subjectId}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                          >
                            {getSubjectLabel("high", subjectId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">自己PR</p>
                  <p className="whitespace-pre-line">{formData.selfPR || "（未入力）"}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4 pt-6">
              <Button onClick={handleSubmit} size="lg" className="px-8">
                応募を確定する
              </Button>
              <p className="text-sm text-muted-foreground">
                「応募を確定する」ボタンをクリックすると、応募が完了します。
              </p>
            </CardFooter>
          </Card>
        </>
      ) : (
        // 応募完了画面
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-3xl font-bold mb-4">応募が完了しました</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            {job.company}の「{job.title}」への応募が完了しました。 担当者からの連絡をお待ちください。
          </p>

          <div className="space-y-4">
            <Link href="/dashboard">
              <Button size="lg">マイページへ</Button>
            </Link>
            <div>
              <Link href="/jobs" className="text-primary hover:underline">
                他の求人を探す
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

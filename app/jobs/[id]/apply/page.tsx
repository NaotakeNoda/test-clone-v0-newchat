"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// 実際の実装ではデータベースから取得
const getJobById = (id: string) => {
  return {
    id: 1,
    title: "小中学生向け個別指導講師",
    company: "スタディプラス 渋谷校",
  }
}

// 現在の年を取得
const currentYear = new Date().getFullYear()
// 生年選択用の年リスト（15歳〜75歳の範囲）
const birthYears = Array.from({ length: 61 }, (_, i) => currentYear - 75 + i)

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

export default function JobApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const job = getJobById(params.id)

  // フォーム状態
  const [formData, setFormData] = useState({
    name: "",
    nameKana: "",
    postalCode: "",
    phone: "",
    email: "",
    university: "",
    grade: "",
    birthYear: "",
    academicType: "liberal", // 文系をデフォルト値に
    selfPR: "",
    teachableSubjects: {
      elementary: [] as string[],
      junior: [] as string[],
      high: [] as string[],
    },
  })

  // エラー状態
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 入力変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // 自己PRの文字数制限チェック
    if (name === "selfPR" && value.length > 300) {
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // ラジオボタン変更ハンドラ
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      academicType: value,
    }))
  }

  // セレクト変更ハンドラ
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // 指導可能科目のチェックボックス変更ハンドラ
  const handleSubjectChange = (level: "elementary" | "junior" | "high", subjectId: string, checked: boolean) => {
    setFormData((prev) => {
      const updatedSubjects = { ...prev.teachableSubjects }

      if (checked) {
        updatedSubjects[level] = [...updatedSubjects[level], subjectId]
      } else {
        updatedSubjects[level] = updatedSubjects[level].filter((id) => id !== subjectId)
      }

      return {
        ...prev,
        teachableSubjects: updatedSubjects,
      }
    })

    // 指導可能科目のエラーをクリア
    if (errors.teachableSubjects) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.teachableSubjects
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "氏名を入力してください"
    if (!formData.nameKana.trim()) newErrors.nameKana = "ふりがなを入力してください"
    if (!formData.postalCode.trim()) newErrors.postalCode = "郵便番号を入力してください"
    if (!formData.phone.trim()) newErrors.phone = "電話番号を入力してください"
    if (!formData.email.trim()) newErrors.email = "メールアドレスを入力してください"
    if (!formData.university.trim()) newErrors.university = "大学名を入力してください"
    if (!formData.grade) newErrors.grade = "学年を選択してください"
    if (!formData.birthYear) newErrors.birthYear = "生まれた年を選択してください"

    // 郵便番号のフォーマットチェック（例: 123-4567）
    const postalCodePattern = /^\d{3}-?\d{4}$/
    if (formData.postalCode && !postalCodePattern.test(formData.postalCode)) {
      newErrors.postalCode = "郵便番号は123-4567の形式で入力してください"
    }

    // 電話番号のフォーマットチェック
    const phonePattern = /^0\d{1,4}-?\d{1,4}-?\d{4}$/
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = "電話番号は正しい形式で入力してください"
    }

    // メールアドレスのフォーマットチェック
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください"
    }

    // 指導可能科目が少なくとも1つ選択されているか確認
    const totalSelectedSubjects =
      formData.teachableSubjects.elementary.length +
      formData.teachableSubjects.junior.length +
      formData.teachableSubjects.high.length

    if (totalSelectedSubjects === 0) {
      newErrors.teachableSubjects = "少なくとも1つの指導可能科目を選択してください"
    }

    // 悪意のあるテキストチェック（簡易版）
    const maliciousPatterns = [/<script/i, /javascript:/i, /onerror=/i, /onclick=/i, /alert\(/i, /document\.cookie/i]

    if (formData.selfPR && maliciousPatterns.some((pattern) => pattern.test(formData.selfPR))) {
      newErrors.selfPR = "不適切な内容が含まれています"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // フォーム送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // フォームデータをセッションストレージに保存（実際の実装ではAPIに送信）
      sessionStorage.setItem("jobApplicationData", JSON.stringify(formData))
      // 確認ページへ遷移
      router.push(`/jobs/${params.id}/apply/confirm`)
    }
  }

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-6">
        <Link href={`/jobs/${params.id}`} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          求人詳細に戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">応募フォーム</h1>
      <p className="text-lg text-muted-foreground mb-6">
        {job.company} - {job.title}
      </p>

      <Card>
        <CardHeader>
          <CardTitle>応募用 簡易履歴書</CardTitle>
          <CardDescription>
            以下のフォームに必要事項を入力してください。入力内容は採用選考のみに使用されます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name" className="font-medium">
                  氏名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="例：山田 太郎"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="nameKana" className="font-medium">
                  ふりがな <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nameKana"
                  name="nameKana"
                  placeholder="例：やまだ たろう"
                  value={formData.nameKana}
                  onChange={handleChange}
                  className={errors.nameKana ? "border-red-500" : ""}
                />
                {errors.nameKana && <p className="text-sm text-red-500">{errors.nameKana}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="postalCode" className="font-medium">
                  郵便番号 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="例：123-4567"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={errors.postalCode ? "border-red-500" : ""}
                />
                {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="phone" className="font-medium">
                  連絡先（電話番号） <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="例：090-1234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email" className="font-medium">
                  連絡先（e-mail） <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="例：example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="university" className="font-medium">
                  大学名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="university"
                  name="university"
                  placeholder="例：東京大学"
                  value={formData.university}
                  onChange={handleChange}
                  className={errors.university ? "border-red-500" : ""}
                />
                {errors.university && <p className="text-sm text-red-500">{errors.university}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="grade" className="font-medium">
                  現在の学年 <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.grade} onValueChange={(value) => handleSelectChange("grade", value)}>
                  <SelectTrigger id="grade" className={errors.grade ? "border-red-500" : ""}>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">学部1年</SelectItem>
                    <SelectItem value="2">学部2年</SelectItem>
                    <SelectItem value="3">学部3年</SelectItem>
                    <SelectItem value="4">学部4年</SelectItem>
                    <SelectItem value="m1">修士1年</SelectItem>
                    <SelectItem value="m2">修士2年</SelectItem>
                    <SelectItem value="d">博士課程</SelectItem>
                    <SelectItem value="graduate">既卒生</SelectItem>
                  </SelectContent>
                </Select>
                {errors.grade && <p className="text-sm text-red-500">{errors.grade}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="birthYear" className="font-medium">
                  生まれた年（西暦） <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.birthYear} onValueChange={(value) => handleSelectChange("birthYear", value)}>
                  <SelectTrigger id="birthYear" className={errors.birthYear ? "border-red-500" : ""}>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {birthYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.birthYear && <p className="text-sm text-red-500">{errors.birthYear}</p>}
              </div>

              <div className="grid gap-3">
                <Label className="font-medium">
                  文理 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={formData.academicType} onValueChange={handleRadioChange} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="liberal" id="liberal" />
                    <Label htmlFor="liberal" className="cursor-pointer">
                      文系
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="science" id="science" />
                    <Label htmlFor="science" className="cursor-pointer">
                      理系
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 指導可能科目 */}
              <div className="grid gap-4">
                <Label className="font-medium">
                  指導可能科目 <span className="text-red-500">*</span>
                </Label>

                {errors.teachableSubjects && <p className="text-sm text-red-500 -mt-2">{errors.teachableSubjects}</p>}

                <div className="space-y-6">
                  {/* 小学生の科目 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">小学生</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {teachableSubjects.elementary.map((subject) => (
                        <div key={subject.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject.id}
                            checked={formData.teachableSubjects.elementary.includes(subject.id)}
                            onCheckedChange={(checked) =>
                              handleSubjectChange("elementary", subject.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={subject.id} className="cursor-pointer text-sm">
                            {subject.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 中学生の科目 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">中学生</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {teachableSubjects.junior.map((subject) => (
                        <div key={subject.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject.id}
                            checked={formData.teachableSubjects.junior.includes(subject.id)}
                            onCheckedChange={(checked) => handleSubjectChange("junior", subject.id, checked as boolean)}
                          />
                          <Label htmlFor={subject.id} className="cursor-pointer text-sm">
                            {subject.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 高校生の科目 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">高校生</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {teachableSubjects.high.map((subject) => (
                        <div key={subject.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject.id}
                            checked={formData.teachableSubjects.high.includes(subject.id)}
                            onCheckedChange={(checked) => handleSubjectChange("high", subject.id, checked as boolean)}
                          />
                          <Label htmlFor={subject.id} className="cursor-pointer text-sm">
                            {subject.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="selfPR" className="font-medium">
                    自己PR <span className="text-muted-foreground text-sm">(任意)</span>
                  </Label>
                  <span className="text-sm text-muted-foreground">{formData.selfPR.length}/300文字</span>
                </div>
                <Textarea
                  id="selfPR"
                  name="selfPR"
                  placeholder="あなたの強みや指導経験、志望動機などを300文字以内で入力してください"
                  rows={6}
                  value={formData.selfPR}
                  onChange={handleChange}
                  className={errors.selfPR ? "border-red-500" : ""}
                />
                {errors.selfPR && <p className="text-sm text-red-500">{errors.selfPR}</p>}
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>エラー</AlertTitle>
                  <AlertDescription>入力内容に誤りがあります。修正してください。</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" size="lg" className="px-8">
                入力内容を確認する
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            応募情報は厳正に管理され、採用選考以外の目的には使用されません。
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

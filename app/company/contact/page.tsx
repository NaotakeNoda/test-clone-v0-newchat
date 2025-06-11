"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmployerContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [activeTab, setActiveTab] = useState("contact")

  const prefectures = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Email validation
    if (email !== confirmEmail) {
      setEmailError(true)
      return
    }

    // In a real implementation, you would send the form data to your backend
    try {
      // Simulate API call
      console.log("Form submitted")
      setFormSubmitted(true)
      setFormError(false)
      window.scrollTo(0, 0)
    } catch (error) {
      setFormError(true)
      setFormSubmitted(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/company" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          採用担当者様向けページに戻る
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">採用担当者様向け情報</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact">お問い合わせ</TabsTrigger>
          <TabsTrigger value="flow">掲載までの流れ</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="pt-6">
          {formSubmitted ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <CardTitle>お問い合わせを受け付けました</CardTitle>
                </div>
                <CardDescription>
                  お問い合わせいただき、ありがとうございます。担当者より3営業日以内にご連絡いたします。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  ご入力いただいたメールアドレス宛に、お問い合わせ内容の控えを送信しております。
                  メールが届かない場合は、お手数ですが再度お問い合わせいただくか、別の方法でご連絡ください。
                </p>
                <Button onClick={() => (window.location.href = "/")}>トップページに戻る</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                塾講師マッチングポータルに求人掲載をご希望の採用ご担当者様は、以下のフォームよりお問い合わせください。
                担当者より詳細をご案内いたします。
              </p>

              {formError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>エラー</AlertTitle>
                  <AlertDescription>
                    送信中にエラーが発生しました。お手数ですが、時間をおいて再度お試しください。
                  </AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>入力フォーム</CardTitle>
                  <CardDescription>
                    以下の項目をご入力ください。<span className="text-red-500">*</span>は必須項目です。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 会社名 */}
                    <div className="grid gap-2">
                      <Label htmlFor="company" className="flex items-center">
                        貴社名 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input id="company" placeholder="例）株式会社　〇〇〇〇" required />
                    </div>

                    {/* 貴社HP */}
                    <div className="grid gap-2">
                      <Label htmlFor="website" className="flex items-center">
                        貴社HP
                      </Label>
                      <Input id="website" placeholder="例）https://〇〇〇〇.jp" type="url" />
                    </div>

                    {/* 塾名・教室名 */}
                    <div className="grid gap-2">
                      <Label htmlFor="school" className="flex items-center">
                        塾名・教室名 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input id="school" placeholder="例）〇〇塾　〇〇教室" required />
                    </div>

                    {/* 郵便番号 */}
                    <div className="grid gap-2">
                      <Label htmlFor="postalCode" className="flex items-center">
                        郵便番号 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="flex gap-2">
                        <Input id="postalCode" placeholder="例）123-4567" required className="max-w-[200px]" />
                        <Button type="button" variant="outline">
                          住所検索
                        </Button>
                      </div>
                    </div>

                    {/* 都道府県 */}
                    <div className="grid gap-2">
                      <Label htmlFor="prefecture" className="flex items-center">
                        都道府県 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Select required>
                        <SelectTrigger id="prefecture" className="max-w-[200px]">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {prefectures.map((prefecture) => (
                            <SelectItem key={prefecture} value={prefecture}>
                              {prefecture}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 住所 */}
                    <div className="grid gap-2">
                      <Label htmlFor="address" className="flex items-center">
                        住所 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input id="address" placeholder="例）世田谷区〇〇 1-2-3" required />
                    </div>

                    {/* 氏名 */}
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="flex items-center">
                        氏名 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input id="name" placeholder="例）鈴木　太郎" required />
                    </div>

                    {/* 氏名(かな) */}
                    <div className="grid gap-2">
                      <Label htmlFor="nameKana" className="flex items-center">
                        氏名(かな) <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input id="nameKana" placeholder="例）すずき　たろう" required />
                    </div>

                    {/* 電話番号 */}
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="flex items-center">
                        電話番号 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input id="phone" placeholder="例）0312345678" required className="max-w-[200px]" />
                        <span className="text-sm text-muted-foreground">ハイフン無し</span>
                      </div>
                    </div>

                    {/* メールアドレス */}
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="flex items-center">
                        メールアドレス (PC) <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="例）〇〇〇〇@jyuku.jp"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setEmailError(false)
                        }}
                      />
                    </div>

                    {/* メールアドレス（確認） */}
                    <div className="grid gap-2">
                      <Label htmlFor="confirmEmail" className="flex items-center">
                        メールアドレス (確認) <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="confirmEmail"
                        type="email"
                        placeholder="確認のため再入力してください。"
                        required
                        value={confirmEmail}
                        onChange={(e) => {
                          setConfirmEmail(e.target.value)
                          setEmailError(false)
                        }}
                        className={emailError ? "border-red-500" : ""}
                      />
                      {emailError && <p className="text-red-500 text-sm">メールアドレスが一致しません</p>}
                    </div>

                    {/* お問い合わせ区分 */}
                    <div className="grid gap-2">
                      <Label className="flex items-center">
                        お問い合わせ区分 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <RadioGroup defaultValue="new" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new">新規掲載希望の方</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="existing" id="existing" />
                          <Label htmlFor="existing">ご掲載済みの方</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* 運営教室数 */}
                    <div className="grid gap-2">
                      <Label htmlFor="schoolCount" className="flex items-center">
                        運営教室数 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Select required>
                        <SelectTrigger id="schoolCount" className="max-w-[200px]">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                          <SelectItem value="11-20">11〜20</SelectItem>
                          <SelectItem value="21-50">21〜50</SelectItem>
                          <SelectItem value="51-100">51〜100</SelectItem>
                          <SelectItem value="101+">101以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* お問い合わせ内容 */}
                    <div className="grid gap-2">
                      <Label htmlFor="message" className="flex items-center">
                        お問い合わせ内容 <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Textarea id="message" placeholder="お問い合わせ内容をご記入ください" required rows={6} />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" size="lg" className="w-full md:w-auto">
                        送信する
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="flow" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">掲載までの流れ</CardTitle>
              <CardDescription className="text-center">求人掲載までの手順をご案内します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-3xl mx-auto">
                <div className="space-y-12">
                  {/* ステップ1 */}
                  <div className="relative pl-10 pb-10 border-l-2 border-primary/30">
                    <div className="absolute left-[-18px] top-0 flex items-center justify-center w-9 h-9 bg-primary text-white rounded-full">
                      1
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">お問い合わせ</h3>
                      <p className="text-muted-foreground">
                        お問い合わせフォームより、求人掲載のご希望をお知らせください。
                        必要事項をご入力いただき、送信してください。
                      </p>
                    </div>
                  </div>

                  {/* ステップ2 */}
                  <div className="relative pl-10 pb-10 border-l-2 border-primary/30">
                    <div className="absolute left-[-18px] top-0 flex items-center justify-center w-9 h-9 bg-primary text-white rounded-full">
                      2
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">弊社担当者よりご連絡</h3>
                      <p className="text-muted-foreground">
                        お問い合わせ内容を確認後、弊社担当者よりメールまたはお電話にてご連絡いたします。
                        サービスの詳細や料金プランについてご説明いたします。
                      </p>
                    </div>
                  </div>

                  {/* ステップ3 */}
                  <div className="relative pl-10 pb-10 border-l-2 border-primary/30">
                    <div className="absolute left-[-18px] top-0 flex items-center justify-center w-9 h-9 bg-primary text-white rounded-full">
                      3
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">アカウント登録</h3>
                      <p className="text-muted-foreground">
                        ご契約内容にご納得いただけましたら、企業アカウントを作成いたします。
                        ログイン情報をメールにてお送りいたします。
                      </p>
                    </div>
                  </div>

                  {/* ステップ4 */}
                  <div className="relative pl-10 pb-10 border-l-2 border-primary/30">
                    <div className="absolute left-[-18px] top-0 flex items-center justify-center w-9 h-9 bg-primary text-white rounded-full">
                      4
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">求人情報を入力</h3>
                      <p className="text-muted-foreground">
                        企業管理画面より、求人情報を入力していただきます。
                        必要に応じて、弊社担当者がサポートいたします。
                      </p>
                    </div>
                  </div>

                  {/* ステップ5 */}
                  <div className="relative pl-10">
                    <div className="absolute left-[-18px] top-0 flex items-center justify-center w-9 h-9 bg-primary text-white rounded-full">
                      5
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">承認されると公開</h3>
                      <p className="text-muted-foreground">
                        入力いただいた求人情報を弊社で確認後、承認されると公開されます。
                        公開後は、随時内容の更新や応募者の管理が可能です。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="mb-6 text-muted-foreground">
                    ご不明な点がございましたら、お気軽にお問い合わせください。
                  </p>
                  <Button onClick={() => setActiveTab("contact")}>お問い合わせフォームへ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

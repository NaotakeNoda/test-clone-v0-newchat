import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building, Mail, UserPlus } from "lucide-react"

export default function EmployerPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">採用担当者様向けページ</h1>
      <p className="text-lg text-muted-foreground mb-10">
        塾講師マッチングポータルをご利用いただき、ありがとうございます。
        すでにアカウントをお持ちの方はログイン、新規掲載をご希望の方はお問い合わせフォームよりご連絡ください。
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5 text-primary" />
              既存企業様ログイン
            </CardTitle>
            <CardDescription>すでにアカウントをお持ちの企業様は、こちらからログインしてください。</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4">ログインすると以下の機能がご利用いただけます：</p>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>求人情報の掲載・編集</li>
              <li>応募者情報の確認</li>
              <li>メッセージ機能の利用</li>
              <li>アカウント情報の管理</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/company/login">
              <Button size="lg">企業様ログイン</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-primary" />
              新規掲載をご希望の方
            </CardTitle>
            <CardDescription>
              新規で求人掲載をご希望の企業様は、お問い合わせフォームよりご連絡ください。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4">お問い合わせいただくと、担当者より詳細をご案内いたします：</p>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>掲載料金のご案内</li>
              <li>掲載までの流れのご説明</li>
              <li>ご不明点へのお答え</li>
              <li>お申し込み手続きのご案内</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/company/contact">
              <Button size="lg" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                お問い合わせ（新規掲載など）はこちら
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

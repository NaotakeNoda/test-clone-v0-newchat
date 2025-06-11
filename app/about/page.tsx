import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Building2, Search, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">サービスについて</h1>

      <div className="prose max-w-none mb-12">
        <p className="text-lg text-muted-foreground">
          塾講師マッチングポータルは、大学生・大学院生の方と塾をつなぐマッチングプラットフォームです。
          希望の条件に合った塾講師のアルバイトを簡単に探すことができます。
        </p>
      </div>

      {/* 特徴セクション（トップページから移植） */}
      <section className="w-full py-12">
        <div className="container px-0">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">サービスの特徴</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                塾講師マッチングポータルは、塾講師を目指す方と塾をつなぐ最適なプラットフォームです
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">簡単検索</h3>
                  <p className="text-sm text-muted-foreground">住所や駅から近い塾を簡単に検索できます</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">多様な塾</h3>
                  <p className="text-sm text-muted-foreground">大手から個人塾まで、様々な塾の求人情報を掲載</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">教育経験</h3>
                  <p className="text-sm text-muted-foreground">教育経験がなくても応募可能な求人も多数掲載</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">安心サポート</h3>
                  <p className="text-sm text-muted-foreground">応募から採用まで、安心のサポート体制</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 追加情報セクション */}
      <section className="w-full py-12 bg-secondary/30 rounded-lg">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">学生の方へ</h3>
              <p className="mb-4">
                塾講師のアルバイトは、教育経験を積みながら収入を得ることができる貴重な機会です。
                当サイトでは、あなたのスキルや希望条件に合った塾を簡単に見つけることができます。
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                <li>自分の得意科目を活かせる</li>
                <li>教育経験を積める</li>
                <li>時給が高い</li>
                <li>将来の教員志望者にもおすすめ</li>
              </ul>
              <Link href="/register?type=tutor">
                <Button>講師として登録する</Button>
              </Link>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">塾経営者の方へ</h3>
              <p className="mb-4">
                優秀な塾講師を見つけることは、塾経営において重要な課題です。
                当サイトを活用することで、意欲的な大学生・大学院生の講師を効率的に採用できます。
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                <li>豊富な講師人材プール</li>
                <li>効率的な採用プロセス</li>
                <li>マッチング精度の高さ</li>
                <li>採用コストの削減</li>
              </ul>
              <Link href="/employer">
                <Button>採用担当者向けページへ</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link href="/search">
          <Button size="lg">求人を探す</Button>
        </Link>
      </div>
    </div>
  )
}

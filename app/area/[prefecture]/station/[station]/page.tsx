import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import { BookOpen, MapPin, JapaneseYenIcon as Yen } from "lucide-react"
import Link from "next/link"

// 駅ごとの求人を取得する関数
const getJobsByStation = (prefecture: string, station: string) => {
  // 実際の実装ではデータベースから取得
  if (prefecture === "東京都" && station === "渋谷駅") {
    return [
      {
        id: 1,
        title: "小中学生向け個別指導講師",
        company: "スタディプラス 渋谷校",
        location: "東京都渋谷区",
        station: "渋谷駅から徒歩5分",
        salary: "時給1,800円〜",
        subjects: ["数学", "英語", "国語"],
        tags: ["未経験歓迎", "高時給"],
      },
      {
        id: 9,
        title: "高校生向け個別指導講師",
        company: "トップ予備校 渋谷校",
        location: "東京都渋谷区",
        station: "渋谷駅から徒歩7分",
        salary: "時給2,100円〜",
        subjects: ["数学", "英語", "物理", "化学"],
        tags: ["未経験歓迎", "高時給"],
      },
      {
        id: 10,
        title: "小学生向け集団授業講師",
        company: "キッズアカデミー 渋谷校",
        location: "東京都渋谷区",
        station: "渋谷駅から徒歩3分",
        salary: "時給1,700円〜",
        subjects: ["算数", "国語", "英語"],
        tags: ["未経験歓迎", "週1日OK"],
      },
    ]
  }
  return []
}

export function generateMetadata({ params }: { params: { prefecture: string; station: string } }) {
  const prefecture = decodeURIComponent(params.prefecture)
  const station = decodeURIComponent(params.station)

  return {
    title: `${station}周辺の塾講師アルバイト・求人情報 | 塾講師マッチングポータル`,
    description: `${station}周辺で募集中の塾講師アルバイト・求人情報。高時給・未経験OK・駅チカなど、${station}から通いやすい塾講師の仕事を探せます。`,
    keywords: `塾講師,アルバイト,求人,${prefecture},${station},駅チカ,個別指導,集団授業,大学生`,
  }
}

export default function StationPage({ params }: { params: { prefecture: string; station: string } }) {
  const prefecture = decodeURIComponent(params.prefecture)
  const station = decodeURIComponent(params.station)
  const jobs = getJobsByStation(prefecture, station)

  // パンくずリストの項目
  const breadcrumbItems = [
    { label: "求人を探す", href: "/jobs" },
    { label: prefecture, href: `/area/${encodeURIComponent(prefecture)}` },
    { label: `${station}周辺` },
  ]

  return (
    <div className="container py-10">
      {/* パンくずリスト */}
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold mb-2">{station}周辺の塾講師アルバイト・求人情報</h1>
      <p className="text-muted-foreground mb-6">
        {station}周辺で募集中の塾講師のアルバイト・求人情報を掲載しています。 高時給・未経験OK・駅チカなど、{station}
        から通いやすい塾講師の仕事を見つけましょう。
      </p>

      {/* 求人一覧 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{station}周辺の塾講師求人一覧</h2>
        {jobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{job.station}</span>
                      </div>
                      <div className="flex items-center">
                        <Yen className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{job.subjects.join(", ")}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {job.tags.map((tag, index) => (
                        <span key={index} className="bg-secondary/50 px-2 py-0.5 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">現在、{station}周辺の求人情報はありません。</p>
            <Link href={`/area/${encodeURIComponent(prefecture)}`}>
              <Button variant="outline">{prefecture}の求人一覧に戻る</Button>
            </Link>
          </div>
        )}
      </section>

      {/* 検索ボタン */}
      <div className="mt-10 text-center">
        <Link href="/search">
          <Button size="lg">詳細条件で塾講師バイトを探す</Button>
        </Link>
      </div>
    </div>
  )
}

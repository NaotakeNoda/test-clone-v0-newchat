import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import { BookOpen, MapPin, JapaneseYenIcon as Yen } from "lucide-react"
import Link from "next/link"

// 市区町村ごとの求人を取得する関数
const getJobsByCity = (prefecture: string, city: string) => {
  // 実際の実装ではデータベースから取得
  if (prefecture === "東京都" && city === "渋谷区") {
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
        id: 7,
        title: "高校生向け個別指導講師",
        company: "アカデミア 恵比寿校",
        location: "東京都渋谷区",
        station: "恵比寿駅から徒歩3分",
        salary: "時給2,000円〜",
        subjects: ["数学", "英語", "物理"],
        tags: ["未経験歓迎", "高時給"],
      },
      {
        id: 8,
        title: "中学生向け集団授業講師",
        company: "進学ゼミナール 代々木校",
        location: "東京都渋谷区",
        station: "代々木駅から徒歩2分",
        salary: "時給1,900円〜",
        subjects: ["数学", "英語", "理科", "社会"],
        tags: ["未経験歓迎", "週1日OK"],
      },
    ]
  }
  return []
}

// 市区町村内の主要駅を取得する関数
const getStationsByCity = (prefecture: string, city: string) => {
  // 実際の実装ではデータベースから取得
  if (prefecture === "東京都" && city === "渋谷区") {
    return ["渋谷駅", "恵比寿駅", "代々木駅", "原宿駅", "表参道駅", "神泉駅", "代官山駅"]
  }
  return []
}

export function generateMetadata({ params }: { params: { prefecture: string; city: string } }) {
  const prefecture = decodeURIComponent(params.prefecture)
  const city = decodeURIComponent(params.city)

  return {
    title: `${prefecture}${city}の塾講師アルバイト・求人情報 | 塾講師マッチングポータル`,
    description: `${prefecture}${city}で募集中の塾講師アルバイト・求人情報。高時給・未経験OK・駅チカなど、${city}内の各エリアで塾講師の仕事を探せます。`,
    keywords: `塾講師,アルバイト,求人,${prefecture},${city},個別指導,集団授業,大学生`,
  }
}

export default function CityPage({ params }: { params: { prefecture: string; city: string } }) {
  const prefecture = decodeURIComponent(params.prefecture)
  const city = decodeURIComponent(params.city)
  const jobs = getJobsByCity(prefecture, city)
  const stations = getStationsByCity(prefecture, city)

  // パンくずリストの項目
  const breadcrumbItems = [
    { label: "求人を探す", href: "/jobs" },
    { label: prefecture, href: `/area/${encodeURIComponent(prefecture)}` },
    { label: city },
  ]

  return (
    <div className="container py-10">
      {/* パンくずリスト */}
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold mb-2">
        {prefecture}
        {city}の塾講師アルバイト・求人情報
      </h1>
      <p className="text-muted-foreground mb-6">
        {prefecture}
        {city}で募集中の塾講師のアルバイト・求人情報を掲載しています。
        高時給・未経験OK・駅チカなど、あなたの希望に合った塾講師の仕事を見つけましょう。
      </p>

      {/* 駅から探す */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{city}内の主要駅から塾講師バイトを探す</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {stations.map((station, index) => (
            <Link key={index} href={`/area/${encodeURIComponent(prefecture)}/station/${encodeURIComponent(station)}`}>
              <div className="p-3 border rounded-lg text-center hover:bg-secondary/50 transition-colors">
                <span className="font-medium">{station}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 求人一覧 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{city}の塾講師求人一覧</h2>
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
            <p className="text-muted-foreground mb-4">現在、{city}の求人情報はありません。</p>
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

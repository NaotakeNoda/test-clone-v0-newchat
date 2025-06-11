import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import { BookOpen, MapPin, JapaneseYenIcon as Yen } from "lucide-react"
import Link from "next/link"

// 都道府県ごとの求人を取得する関数
const getJobsByPrefecture = (prefecture: string) => {
  // 実際の実装ではデータベースから取得
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
      id: 2,
      title: "高校生向け集団授業講師（数学）",
      company: "アカデミア 新宿校",
      location: "東京都新宿区",
      station: "新宿駅から徒歩7分",
      salary: "時給2,200円〜",
      subjects: ["数学"],
      tags: ["未経験歓迎", "高時給"],
    },
    {
      id: 3,
      title: "小学生向け個別指導講師",
      company: "キッズアカデミー 池袋校",
      location: "東京都豊島区",
      station: "池袋駅から徒歩10分",
      salary: "時給1,600円〜",
      subjects: ["全科目"],
      tags: ["未経験歓迎", "交通費支給"],
    },
    {
      id: 4,
      title: "中高生向け英語講師",
      company: "イングリッシュラボ 新橋校",
      location: "東京都港区",
      station: "新橋駅から徒歩3分",
      salary: "時給2,000円〜",
      subjects: ["英語"],
      tags: ["経験者優遇", "高時給"],
    },
    {
      id: 5,
      title: "小中学生向け算数・数学講師",
      company: "マスアカデミー 東京校",
      location: "東京都千代田区",
      station: "東京駅から徒歩8分",
      salary: "時給1,900円〜",
      subjects: ["算数", "数学"],
      tags: ["未経験歓迎", "週1日OK"],
    },
    {
      id: 6,
      title: "大学受験対策講師",
      company: "東進ハイスクール 神田校",
      location: "東京都千代田区",
      station: "神田駅から徒歩3分",
      salary: "時給2,300円〜",
      subjects: ["数学", "英語", "物理"],
      tags: ["経験者優遇", "高時給"],
    },
  ]
}

// 都道府県内の市区町村を取得する関数
const getCitiesByPrefecture = (prefecture: string) => {
  // 実際の実装ではデータベースから取得
  if (prefecture === "東京都") {
    return [
      "渋谷区",
      "新宿区",
      "豊島区",
      "港区",
      "千代田区",
      "中央区",
      "文京区",
      "台東区",
      "墨田区",
      "江東区",
      "品川区",
      "目黒区",
      "大田区",
      "世田谷区",
      "中野区",
      "杉並区",
      "北区",
      "荒川区",
      "板橋区",
      "練馬区",
      "足立区",
      "葛飾区",
      "江戸川区",
    ]
  }
  return []
}

// 都道府県内の主要駅を取得する関数
const getStationsByPrefecture = (prefecture: string) => {
  // 実際の実装ではデータベースから取得
  if (prefecture === "東京都") {
    return [
      "渋谷駅",
      "新宿駅",
      "池袋駅",
      "東京駅",
      "品川駅",
      "上野駅",
      "秋葉原駅",
      "恵比寿駅",
      "目黒駅",
      "中目黒駅",
      "代々木駅",
      "高田馬場駅",
      "四ツ谷駅",
      "飯田橋駅",
      "御茶ノ水駅",
      "赤坂見附駅",
      "六本木駅",
      "銀座駅",
      "有楽町駅",
      "日本橋駅",
    ]
  }
  return []
}

export function generateMetadata({ params }: { params: { prefecture: string } }) {
  const prefecture = decodeURIComponent(params.prefecture)

  return {
    title: `${prefecture}の塾講師アルバイト・求人情報 | 塾講師マッチングポータル`,
    description: `${prefecture}で募集中の塾講師アルバイト・求人情報。高時給・未経験OK・駅チカなど、${prefecture}内の各エリアで塾講師の仕事を探せます。`,
    keywords: `塾講師,アルバイト,求人,${prefecture},個別指導,集団授業,大学生`,
  }
}

export default function PrefecturePage({ params }: { params: { prefecture: string } }) {
  const prefecture = decodeURIComponent(params.prefecture)
  const jobs = getJobsByPrefecture(prefecture)
  const cities = getCitiesByPrefecture(prefecture)
  const stations = getStationsByPrefecture(prefecture)

  // パンくずリストの項目
  const breadcrumbItems = [{ label: "求人を探す", href: "/jobs" }, { label: prefecture }]

  return (
    <div className="container py-10">
      {/* パンくずリスト */}
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold mb-2">{prefecture}の塾講師アルバイト・求人情報</h1>
      <p className="text-muted-foreground mb-6">
        {prefecture}で募集中の塾講師のアルバイト・求人情報を掲載しています。
        高時給・未経験OK・駅チカなど、あなたの希望に合った塾講師の仕事を見つけましょう。
      </p>

      {/* 市区町村から探す */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{prefecture}内の市区町村から塾講師バイトを探す</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {cities.map((city, index) => (
            <Link key={index} href={`/area/${encodeURIComponent(prefecture)}/${encodeURIComponent(city)}`}>
              <div className="p-3 border rounded-lg text-center hover:bg-secondary/50 transition-colors">
                <span className="font-medium">{city}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 駅から探す */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{prefecture}内の主要駅から塾講師バイトを探す</h2>
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
        <h2 className="text-xl font-semibold mb-4">{prefecture}の塾講師求人一覧</h2>
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

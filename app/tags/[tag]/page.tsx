import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import { BookOpen, MapPin, JapaneseYenIcon as Yen } from "lucide-react"
import Link from "next/link"

// タグごとの求人を取得する関数
const getJobsByTag = (tag: string) => {
  // 実際の実装ではデータベースから取得
  if (tag === "未経験歓迎") {
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
        id: 5,
        title: "小中学生向け算数・数学講師",
        company: "マスアカデミー 東京校",
        location: "東京都千代田区",
        station: "東京駅から徒歩8分",
        salary: "時給1,900円〜",
        subjects: ["算数", "数学"],
        tags: ["未経験歓迎", "週1日OK"],
      },
    ]
  }
  return []
}

export function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `${tag}の塾講師アルバイト・求人情報 | 塾講師マッチングポータル`,
    description: `${tag}の塾講師アルバイト・求人情報。高時給・未経験OK・駅チカなど、${tag}の条件に合った塾講師の仕事を探せます。`,
    keywords: `塾講師,アルバイト,求人,${tag},個別指導,集団授業,大学生`,
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const jobs = getJobsByTag(tag)

  // パンくずリストの項目
  const breadcrumbItems = [
    { label: "求人を探す", href: "/jobs" },
    { label: "特徴から探す", href: "/features" },
    { label: tag },
  ]

  return (
    <div className="container py-10">
      {/* パンくずリスト */}
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold mb-2">{tag}の塾講師アルバイト・求人情報</h1>
      <p className="text-muted-foreground mb-6">
        {tag}の塾講師アルバイト・求人情報を掲載しています。 高時給・未経験OK・駅チカなど、{tag}
        の条件に合った塾講師の仕事を見つけましょう。
      </p>

      {/* 求人一覧 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{tag}の塾講師求人一覧</h2>
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
                      {job.tags.map((tagItem, index) => (
                        <span
                          key={index}
                          className={`px-2 py-0.5 rounded text-xs ${
                            tagItem === tag ? "bg-primary/20 text-primary font-medium" : "bg-secondary/50"
                          }`}
                        >
                          {tagItem}
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
            <p className="text-muted-foreground mb-4">現在、{tag}の求人情報はありません。</p>
            <Link href="/jobs">
              <Button variant="outline">全ての求人一覧に戻る</Button>
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

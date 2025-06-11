import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Building, Clock, Heart, MapPin, School, Users, JapaneseYenIcon as Yen } from "lucide-react"
import Link from "next/link"
import { Breadcrumb } from "@/components/breadcrumb"

// 実際の実装ではデータベースから取得
const getJobById = (id: string) => {
  return {
    id: 1,
    title: "小中学生向け個別指導講師",
    company: "スタディプラス 渋谷校",
    location: "東京都渋谷区道玄坂1-2-3 渋谷ビル5F",
    station: "渋谷駅から徒歩5分",
    salary: "時給1,800円〜2,500円（経験・能力による）",
    subjects: ["数学", "英語", "国語"],
    targetStudents: "小学生・中学生",
    workingHours: "平日16:00〜22:00、土日10:00〜22:00で応相談",
    workDays: "週1日〜応相談",
    description:
      "未経験者歓迎！大学生・大学院生の方、教員志望の方におすすめです。当塾では、生徒一人ひとりに合わせた指導を行っています。教える喜びを感じながら、自身のスキルアップにもつながる環境です。",
    requirements: [
      "大学生・大学院生・社会人",
      "週1日以上勤務可能な方",
      "長期勤務可能な方（3ヶ月以上）",
      "子どもが好きな方",
    ],
    benefits: ["交通費支給（月額上限20,000円）", "昇給あり", "研修制度あり", "正社員登用制度あり"],
    applicationProcess: "書類選考 → 面接 → 採用",
    companyInfo: {
      name: "株式会社スタディプラス",
      founded: "2010年",
      employees: "50名（講師含む）",
      locations: ["渋谷校", "新宿校", "池袋校"],
      website: "https://example.com",
    },
    area: "東京都",
    city: "渋谷区",
    jobType: "個別指導",
    tags: ["未経験歓迎", "高時給", "大学生歓迎", "交通費支給"],
  }
}

// 関連求人を取得する関数
const getRelatedJobs = (jobId: string, area: string, jobType: string) => {
  // 実際の実装ではデータベースから同じエリアや同じ求人タイプの求人を取得
  return [
    {
      id: 2,
      title: "高校生向け個別指導講師",
      company: "スタディプラス 新宿校",
      location: "東京都新宿区",
      station: "新宿駅から徒歩7分",
      salary: "時給2,000円〜",
      subjects: ["数学", "英語"],
      tags: ["未経験歓迎", "高時給"],
    },
    {
      id: 3,
      title: "中学生向け集団授業講師",
      company: "アカデミア 渋谷校",
      location: "東京都渋谷区",
      station: "渋谷駅から徒歩10分",
      salary: "時給1,900円〜",
      subjects: ["数学", "英語", "理科"],
      tags: ["未経験歓迎", "週1日OK"],
    },
    {
      id: 4,
      title: "小学生向け個別指導講師",
      company: "キッズスタディ 恵比寿校",
      location: "東京都渋谷区",
      station: "恵比寿駅から徒歩5分",
      salary: "時給1,800円〜",
      subjects: ["算数", "国語", "英語"],
      tags: ["未経験歓迎", "交通費支給"],
    },
  ]
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const job = getJobById(params.id)

  return {
    title: `${job.title} | ${job.company} | 塾講師マッチングポータル`,
    description: `${job.area}${job.city}の${job.company}で${job.title}のアルバイト・求人。${job.salary}、${job.station}。${job.subjects.join("・")}の指導。${job.tags.join("、")}。`,
    keywords: `塾講師,アルバイト,${job.area},${job.city},${job.subjects.join(",")},${job.tags.join(",")}`,
  }
}

// 動的なURLパスを生成するための関数
export function generateStaticParams() {
  // 実際の実装ではデータベースから全ての求人IDを取得
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id)
  const relatedJobs = getRelatedJobs(params.id, job.area, job.jobType)

  // パンくずリストの項目
  const breadcrumbItems = [
    { label: "求人を探す", href: "/jobs" },
    { label: job.area, href: `/area/${encodeURIComponent(job.area)}` },
    { label: job.city, href: `/area/${encodeURIComponent(job.area)}/${encodeURIComponent(job.city)}` },
    { label: job.title },
  ]

  return (
    <div className="container py-10">
      {/* パンくずリスト */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左側：求人詳細 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="text-xl mt-2">{job.company}</p>
            </div>
            {/* タイトル右に応募ボタンを追加 */}
            <Link href={`/jobs/${params.id}/apply`}>
              <Button size="lg" className="font-semibold">
                応募する
              </Button>
            </Link>
          </div>

          {/* タグ表示 */}
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <Link key={index} href={`/tags/${encodeURIComponent(tag)}`}>
                <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 transition-colors">
                  {tag}
                </span>
              </Link>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">勤務地</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                    <p className="text-sm text-muted-foreground">{job.station}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Yen className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">給与</p>
                    <p className="text-sm text-muted-foreground">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">指導科目</p>
                    <p className="text-sm text-muted-foreground">{job.subjects.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">対象学年</p>
                    <p className="text-sm text-muted-foreground">{job.targetStudents}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">勤務時間</p>
                    <p className="text-sm text-muted-foreground">{job.workingHours}</p>
                    <p className="text-sm text-muted-foreground">{job.workDays}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>仕事内容</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{job.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>応募資格・条件</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>待遇・福利厚生</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>応募プロセス</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{job.applicationProcess}</p>
            </CardContent>
          </Card>

          {/* 応募プロセスカードの下に応募ボタンを追加 */}
          <div className="flex justify-center">
            <Link href={`/jobs/${params.id}/apply`}>
              <Button size="lg" className="px-8 py-6 text-lg font-semibold">
                この求人に応募する
              </Button>
            </Link>
          </div>

          {/* 関連求人 */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">関連する求人</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedJobs.map((relatedJob) => (
                <Link key={relatedJob.id} href={`/jobs/${relatedJob.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{relatedJob.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{relatedJob.company}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{relatedJob.station}</span>
                        </div>
                        <div className="flex items-center">
                          <Yen className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{relatedJob.salary}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{relatedJob.subjects.join(", ")}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {relatedJob.tags.map((tag, index) => (
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
          </div>
        </div>

        {/* 右側：応募ボタンと企業情報 */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardContent className="pt-6 space-y-4">
              <Link href={`/jobs/${params.id}/apply`}>
                <Button className="w-full" size="lg">
                  この求人に応募する
                </Button>
              </Link>
              <Button variant="outline" className="w-full" size="lg">
                <Heart className="mr-2 h-4 w-4" />
                お気に入りに追加
              </Button>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">企業情報</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">会社名</p>
                      <p className="text-sm text-muted-foreground">{job.companyInfo.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <School className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">教室</p>
                      <p className="text-sm text-muted-foreground">{job.companyInfo.locations.join(", ")}</p>
                    </div>
                  </div>
                </div>
                <Link href={`/companies/${job.companyInfo.name}`}>
                  <Button variant="link" className="p-0 h-auto">
                    企業の詳細を見る
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* エリア情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">エリア情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href={`/area/${encodeURIComponent(job.area)}`} className="block hover:underline text-primary">
                {job.area}の塾講師求人一覧
              </Link>
              <Link
                href={`/area/${encodeURIComponent(job.area)}/${encodeURIComponent(job.city)}`}
                className="block hover:underline text-primary"
              >
                {job.city}の塾講師求人一覧
              </Link>
              <Link
                href={`/area/${encodeURIComponent(job.area)}/station/${encodeURIComponent(job.station.split("から")[0])}`}
                className="block hover:underline text-primary"
              >
                {job.station.split("から")[0]}周辺の塾講師求人一覧
              </Link>
            </CardContent>
          </Card>

          {/* 科目情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">指導科目から探す</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {job.subjects.map((subject, index) => (
                <Link
                  key={index}
                  href={`/subjects/${encodeURIComponent(subject)}`}
                  className="block hover:underline text-primary"
                >
                  {subject}の塾講師求人一覧
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

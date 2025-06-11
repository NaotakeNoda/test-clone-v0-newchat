import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, MapPin, JapaneseYenIcon as Yen } from "lucide-react"
import Link from "next/link"

// 実際の実装ではデータベースから取得
const mockJobs = [
  {
    id: 1,
    title: "小中学生向け個別指導講師",
    company: "スタディプラス 渋谷校",
    location: "東京都渋谷区",
    station: "渋谷駅から徒歩5分",
    salary: "時給1,800円〜",
    subjects: ["数学", "英語", "国語"],
    targetStudents: "小学生・中学生",
    workingHours: "平日16:00〜22:00、土日10:00〜22:00で応相談",
    description: "未経験者歓迎！大学生・大学院生の方、教員志望の方におすすめです。",
    teachingType: "個別指導",
  },
  {
    id: 2,
    title: "高校生向け集団授業講師（数学）",
    company: "アカデミア 新宿校",
    location: "東京都新宿区",
    station: "新宿駅から徒歩7分",
    salary: "時給2,200円〜",
    subjects: ["数学"],
    targetStudents: "高校生",
    workingHours: "平日18:00〜22:00、土日13:00〜22:00で応相談",
    description: "数学が得意な方、教えることに情熱のある方を募集しています。",
    teachingType: "集団指導",
  },
  {
    id: 3,
    title: "小学生向け個別指導講師",
    company: "キッズアカデミー 池袋校",
    location: "東京都豊島区",
    station: "池袋駅から徒歩10分",
    salary: "時給1,600円〜",
    subjects: ["算数", "国語", "英語"],
    targetStudents: "小学生",
    workingHours: "平日15:00〜19:00、土日10:00〜18:00で応相談",
    description: "子どもが好きな方、教育に興味のある方を募集しています。",
    teachingType: "個別指導",
  },
  {
    id: 4,
    title: "中高生向け英語講師",
    company: "イングリッシュラボ 新橋校",
    location: "東京都港区",
    station: "新橋駅から徒歩3分",
    salary: "時給2,000円〜",
    subjects: ["英語"],
    targetStudents: "中学生・高校生",
    workingHours: "平日17:00〜21:00、土日10:00〜18:00で応相談",
    description: "英語指導に情熱をお持ちの方、ネイティブレベルの方歓迎。",
    teachingType: "集団指導",
  },
  {
    id: 5,
    title: "小中学生向け算数・数学講師",
    company: "マスアカデミー 東京校",
    location: "東京都千代田区",
    station: "東京駅から徒歩8分",
    salary: "時給1,900円〜",
    subjects: ["算数", "数学"],
    targetStudents: "小学生・中学生",
    workingHours: "平日16:00〜21:00、土日10:00〜18:00で応相談",
    description: "算数・数学の指導経験がある方優遇。未経験でも熱意のある方歓迎。",
    teachingType: "個別指導",
  },
  {
    id: 6,
    title: "大学受験対策講師",
    company: "東進ハイスクール 神田校",
    location: "東京都千代田区",
    station: "神田駅から徒歩3分",
    salary: "時給2,300円〜",
    subjects: ["数学", "英語", "物理"],
    targetStudents: "高校生",
    workingHours: "平日17:00〜22:00、土日10:00〜22:00で応相談",
    description: "大学受験指導経験者歓迎。難関大学出身者優遇。",
    teachingType: "集団指導",
  },
  {
    id: 7,
    title: "プログラミング講師",
    company: "テックキッズ 上野校",
    location: "東京都台東区",
    station: "上野駅から徒歩5分",
    salary: "時給2,000円〜",
    subjects: ["プログラミング"],
    targetStudents: "小学生・中学生",
    workingHours: "平日16:00〜19:00、土日10:00〜17:00で応相談",
    description: "プログラミングの基礎知識がある方。子どもに教えることが好きな方歓迎。",
    teachingType: "オンライン",
  },
]

export default function JobsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  console.log("受け取った検索パラメータ:", JSON.stringify(searchParams))

  // 検索パラメータから駅を取得（JSONエンコードされた駅リストを処理）
  let selectedStations: string[] = []

  try {
    if (searchParams.stations) {
      // JSONエンコードされた駅リストをデコード
      const stationsParam = Array.isArray(searchParams.stations) ? searchParams.stations[0] : searchParams.stations

      selectedStations = JSON.parse(stationsParam)
      console.log("JSONからデコードされた駅:", selectedStations)
    } else if (searchParams.station) {
      // 後方互換性のために古い形式もサポート
      selectedStations = Array.isArray(searchParams.station) ? searchParams.station : [searchParams.station]
      console.log("従来の方法で取得した駅:", selectedStations)
    }
  } catch (error) {
    console.error("駅パラメータの解析エラー:", error)
    selectedStations = []
  }

  // 科目パラメータの取得
  const selectedSubjects = searchParams.subject
    ? Array.isArray(searchParams.subject)
      ? searchParams.subject
      : [searchParams.subject]
    : []

  // 学年パラメータの取得
  const selectedGrades = searchParams.grade
    ? Array.isArray(searchParams.grade)
      ? searchParams.grade
      : [searchParams.grade]
    : []

  // 指導形態パラメータの取得
  const selectedTypes = searchParams.type
    ? Array.isArray(searchParams.type)
      ? searchParams.type
      : [searchParams.type]
    : []

  console.log("選択された駅の数:", selectedStations.length)
  console.log("選択された科目:", selectedSubjects)
  console.log("選択された学年:", selectedGrades)
  console.log("選択された指導形態:", selectedTypes)

  // 選択された条件に基づいて求人をフィルタリング
  let filteredJobs = [...mockJobs]

  // 検索アルゴリズムの修正
  // 条件が指定されている場合のみフィルタリングを適用する

  // 駅でフィルタリング - 駅が選択されている場合のみ適用
  if (selectedStations.length > 0) {
    filteredJobs = filteredJobs.filter((job) => {
      // いずれかの選択された駅が求人の駅情報に含まれているかチェック
      return selectedStations.some((station) => job.station.includes(station))
    })
  }

  // 科目でフィルタリング - 科目が選択されている場合のみ適用
  if (selectedSubjects.length > 0) {
    filteredJobs = filteredJobs.filter((job) => {
      // 選択された科目のいずれかが求人の科目に含まれているかチェック
      // 科目名の部分一致ではなく、科目のマッピングを行う
      return selectedSubjects.some((subject) => {
        if (subject === "math") return job.subjects.some((s) => ["数学", "算数"].includes(s))
        if (subject === "english") return job.subjects.includes("英語")
        if (subject === "japanese") return job.subjects.includes("国語")
        if (subject === "science") return job.subjects.some((s) => ["理科", "物理", "化学", "生物"].includes(s))
        if (subject === "social") return job.subjects.includes("社会")
        if (subject === "programming") return job.subjects.includes("プログラミング")
        return false
      })
    })
  }

  // 学年でフィルタリング - 学年が選択されている場合のみ適用
  if (selectedGrades.length > 0) {
    filteredJobs = filteredJobs.filter((job) => {
      // 選択された学年のいずれかが求人の対象学年に含まれているかチェック
      return selectedGrades.some((grade) => {
        if (grade === "elementary") return job.targetStudents.includes("小学生")
        if (grade === "junior") return job.targetStudents.includes("中学生")
        if (grade === "high") return job.targetStudents.includes("高校生")
        return false
      })
    })
  }

  // 指導形態でフィルタリング - 指導形態が選択されている場合のみ適用
  if (selectedTypes.length > 0) {
    filteredJobs = filteredJobs.filter((job) => {
      // 選択された指導形態のいずれかが求人の指導形態と一致するかチェック
      return selectedTypes.some((type) => {
        if (type === "individual") return job.teachingType === "個別指導"
        if (type === "group") return job.teachingType === "集団指導"
        if (type === "online") return job.teachingType === "オンライン"
        return false
      })
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">塾講師募集一覧</h1>

      {/* 選択された駅の表示 */}
      {selectedStations.length > 0 && (
        <div className="bg-secondary/30 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">選択中の駅:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedStations.map((station, index) => (
              <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {station}
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Link href="/search">
              <Button variant="outline" size="sm">
                検索条件を変更
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* 選択された科目・学年・指導形態の表示 */}
      {(selectedSubjects.length > 0 || selectedGrades.length > 0 || selectedTypes.length > 0) && (
        <div className="bg-secondary/30 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">選択中の条件:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSubjects.map((subject, index) => (
              <div key={`subject-${index}`} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                科目:{" "}
                {subject === "math"
                  ? "数学"
                  : subject === "english"
                    ? "英語"
                    : subject === "japanese"
                      ? "国語"
                      : subject === "science"
                        ? "理科"
                        : subject === "social"
                          ? "社会"
                          : subject === "programming"
                            ? "プログラミング"
                            : subject}
              </div>
            ))}
            {selectedGrades.map((grade, index) => (
              <div key={`grade-${index}`} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                学年:{" "}
                {grade === "elementary"
                  ? "小学生"
                  : grade === "junior"
                    ? "中学生"
                    : grade === "high"
                      ? "高校生"
                      : grade}
              </div>
            ))}
            {selectedTypes.map((type, index) => (
              <div key={`type-${index}`} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                形態:{" "}
                {type === "individual"
                  ? "個別指導"
                  : type === "group"
                    ? "集団指導"
                    : type === "online"
                      ? "オンライン"
                      : type}
              </div>
            ))}
          </div>
          <div className="mt-3">
            <Link href="/">
              <Button variant="outline" size="sm">
                検索条件を変更
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* 並び替えタブ */}
      <Tabs defaultValue="new" className="mb-6">
        <TabsList>
          <TabsTrigger value="new">新着順</TabsTrigger>
          <TabsTrigger value="salary">時給順</TabsTrigger>
          <TabsTrigger value="distance">距離順</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 求人一覧 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-1">{job.title}</h3>
              <p className="text-sm font-medium mb-3">{job.company}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-primary font-medium">{job.station}</span>
                </div>
                <div className="flex items-center">
                  <Yen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.subjects.join(", ")}</span>
                </div>
                <p className="line-clamp-2 mt-2">{job.description}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm">
                  お気に入り
                </Button>
                <Link href={`/jobs/${job.id}`}>
                  <Button size="sm">詳細を見る</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 検索結果がない場合 */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">条件に一致する求人が見つかりませんでした。</p>
          <Link href="/">
            <Button>検索条件を変更する</Button>
          </Link>
        </div>
      )}

      {/* 検索・フィルターセクション - 最後に配置 */}
      <Card className="mt-10 mb-8">
        <CardHeader>
          <CardTitle className="text-xl">条件を変えて再検索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="location">エリア・駅</Label>
              <Input id="location" placeholder="渋谷、新宿など" />
            </div>
            <div>
              <Label htmlFor="subject">指導科目</Label>
              <Select>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="math">数学</SelectItem>
                  <SelectItem value="english">英語</SelectItem>
                  <SelectItem value="japanese">国語</SelectItem>
                  <SelectItem value="science">理科</SelectItem>
                  <SelectItem value="social">社会</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="target">対象学年</Label>
              <Select>
                <SelectTrigger id="target">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="elementary">小学生</SelectItem>
                  <SelectItem value="junior">中学生</SelectItem>
                  <SelectItem value="high">高校生</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">検索</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

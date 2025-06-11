"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, BookOpen, JapaneseYenIcon as Yen } from "lucide-react"
import { StationSelectModal } from "@/components/station-select-modal"
import { MultiSelect, type OptionType } from "@/components/multi-select"

// モックの新着求人データ
const recentJobs = [
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
  // 他の求人データは省略...
]

// 科目リスト
const subjectOptions: OptionType[] = [
  { value: "math", label: "数学" },
  { value: "english", label: "英語" },
  { value: "japanese", label: "国語" },
  { value: "science", label: "理科" },
  { value: "social", label: "社会" },
  { value: "programming", label: "プログラミング" },
]

// 学年リスト
const gradeOptions: OptionType[] = [
  { value: "elementary", label: "小学生" },
  { value: "junior", label: "中学生" },
  { value: "high", label: "高校生" },
]

// 指導形態リスト
const teachingTypeOptions: OptionType[] = [
  { value: "individual", label: "個別指導" },
  { value: "group", label: "集団指導" },
  { value: "online", label: "オンライン" },
]

export default function Home() {
  const router = useRouter()

  // 駅選択関連
  const [selectedStations, setSelectedStations] = useState<string[]>([])
  const [isStationModalOpen, setIsStationModalOpen] = useState(false)

  // ドロップダウン選択用の状態
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [selectedTeachingTypes, setSelectedTeachingTypes] = useState<string[]>([])

  // 検索処理
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // 検索パラメータの構築
    const params = new URLSearchParams()

    // 選択された駅をJSONとしてエンコード
    if (selectedStations.length > 0) {
      const stationsJson = JSON.stringify(selectedStations)
      params.append("stations", stationsJson)
    }

    // 科目
    if (selectedSubjects.length > 0) {
      selectedSubjects.forEach((subject) => {
        params.append("subject", subject)
      })
    }

    // 学年
    if (selectedGrades.length > 0) {
      selectedGrades.forEach((grade) => {
        params.append("grade", grade)
      })
    }

    // 指導形態
    if (selectedTeachingTypes.length > 0) {
      selectedTeachingTypes.forEach((type) => {
        params.append("type", type)
      })
    }

    // 検索ページへ遷移
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* ヒーローセクション */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <span className="gradient-text-green">塾講師と塾をつなぐ</span>
                  <br />
                  マッチングプラットフォーム
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  大学生・大学院生の方と塾をつなぐ、新しい形の求人サイト。あなたの希望に合った塾を見つけましょう。
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/search">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    求人を探す
                  </Button>
                </Link>
                <Link href="/register?type=tutor">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    講師として登録
                  </Button>
                </Link>
              </div>
            </div>

            {/* 検索ボックス - 改善版 */}
            <div className="mx-auto w-full max-w-[500px]">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6 space-y-5">
                  <h2 className="text-xl font-semibold mb-4">希望の条件で検索</h2>

                  <form onSubmit={handleSearch} className="space-y-5">
                    {/* 駅選択 - 1行レイアウト */}
                    <div className="flex items-center gap-3">
                      <Label className="text-sm font-medium w-24 flex-shrink-0">エリア・駅名</Label>
                      <div className="flex-1">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between"
                          onClick={() => setIsStationModalOpen(true)}
                        >
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            {selectedStations.length > 0
                              ? `${selectedStations.length}駅選択中`
                              : "駅を選択してください"}
                          </div>
                          <span className="text-xs text-primary">選択</span>
                        </Button>

                        {/* 選択中の駅を表示 */}
                        {selectedStations.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedStations.slice(0, 3).map((station, index) => (
                              <div key={index} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                                {station}
                              </div>
                            ))}
                            {selectedStations.length > 3 && (
                              <div className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs">
                                +{selectedStations.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 指導科目 - 1行レイアウト */}
                    <div className="flex items-center gap-3">
                      <Label className="text-sm font-medium w-24 flex-shrink-0">指導科目</Label>
                      <div className="flex-1">
                        <MultiSelect
                          options={subjectOptions}
                          selected={selectedSubjects}
                          onChange={setSelectedSubjects}
                          placeholder="指導科目を選択"
                        />
                      </div>
                    </div>

                    {/* 対象学年 - 1行レイアウト */}
                    <div className="flex items-center gap-3">
                      <Label className="text-sm font-medium w-24 flex-shrink-0">対象学年</Label>
                      <div className="flex-1">
                        <MultiSelect
                          options={gradeOptions}
                          selected={selectedGrades}
                          onChange={setSelectedGrades}
                          placeholder="対象学年を選択"
                        />
                      </div>
                    </div>

                    {/* 指導形態 - 1行レイアウト */}
                    <div className="flex items-center gap-3">
                      <Label className="text-sm font-medium w-24 flex-shrink-0">指導形態</Label>
                      <div className="flex-1">
                        <MultiSelect
                          options={teachingTypeOptions}
                          selected={selectedTeachingTypes}
                          onChange={setSelectedTeachingTypes}
                          placeholder="指導形態を選択"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      検索する
                    </Button>
                  </form>

                  <div className="text-xs text-muted-foreground text-center pt-2">
                    4月24日現在の新着求人: <span className="font-bold text-primary">152</span>件
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 駅選択モーダル */}
      <StationSelectModal
        open={isStationModalOpen}
        onOpenChange={setIsStationModalOpen}
        selectedStations={selectedStations}
        onStationsChange={setSelectedStations}
      />

      {/* 新着求人セクション */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">新着求人</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">最新の塾講師求人情報をチェックしましょう</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentJobs.slice(0, 8).map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="group">
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
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

          <div className="mt-10 text-center">
            <Link href="/search">
              <Button size="lg">希望の求人を探す</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

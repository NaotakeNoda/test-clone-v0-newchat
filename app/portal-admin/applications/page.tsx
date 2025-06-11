"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ApplicationStatus } from "@/lib/schema/application"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

// モックデータ
const mockApplications = [
  {
    id: "app1",
    applicantId: "user1",
    jobId: "job1",
    status: "未対応" as ApplicationStatus,
    appliedAt: new Date("2023-05-15T10:30:00"),
    updatedAt: new Date("2023-05-15T10:30:00"),
    name: "山田 太郎",
    nameKana: "やまだ たろう",
    email: "yamada@example.com",
    phone: "090-1234-5678",
    university: "東京大学",
    grade: "3",
    jobTitle: "小中学生向け個別指導講師",
    companyName: "スタディプラス 渋谷校",
  },
  {
    id: "app2",
    applicantId: "user2",
    jobId: "job2",
    status: "対応中" as ApplicationStatus,
    appliedAt: new Date("2023-05-14T14:20:00"),
    updatedAt: new Date("2023-05-16T11:15:00"),
    name: "佐藤 花子",
    nameKana: "さとう はなこ",
    email: "sato@example.com",
    phone: "090-8765-4321",
    university: "早稲田大学",
    grade: "2",
    jobTitle: "高校生向け集団授業講師（数学）",
    companyName: "アカデミア 新宿校",
  },
  {
    id: "app3",
    applicantId: "user3",
    jobId: "job3",
    status: "採用" as ApplicationStatus,
    appliedAt: new Date("2023-05-10T09:45:00"),
    updatedAt: new Date("2023-05-18T16:30:00"),
    name: "鈴木 一郎",
    nameKana: "すずき いちろう",
    email: "suzuki@example.com",
    phone: "090-2345-6789",
    university: "慶應義塾大学",
    grade: "4",
    jobTitle: "小学生向け個別指導講師",
    companyName: "キッズアカデミー 池袋校",
  },
  {
    id: "app4",
    applicantId: "user4",
    jobId: "job4",
    status: "保留" as ApplicationStatus,
    appliedAt: new Date("2023-05-12T13:10:00"),
    updatedAt: new Date("2023-05-17T10:20:00"),
    name: "田中 美咲",
    nameKana: "たなか みさき",
    email: "tanaka@example.com",
    phone: "090-3456-7890",
    university: "上智大学",
    grade: "3",
    jobTitle: "中高生向け英語講師",
    companyName: "イングリッシュラボ 新橋校",
  },
  {
    id: "app5",
    applicantId: "user5",
    jobId: "job5",
    status: "辞退" as ApplicationStatus,
    appliedAt: new Date("2023-05-08T11:25:00"),
    updatedAt: new Date("2023-05-15T09:40:00"),
    name: "高橋 健太",
    nameKana: "たかはし けんた",
    email: "takahashi@example.com",
    phone: "090-4567-8901",
    university: "明治大学",
    grade: "2",
    jobTitle: "小中学生向け算数・数学講師",
    companyName: "マスアカデミー 東京校",
  },
  {
    id: "app6",
    applicantId: "user6",
    jobId: "job6",
    status: "不採用" as ApplicationStatus,
    appliedAt: new Date("2023-05-09T15:50:00"),
    updatedAt: new Date("2023-05-16T14:15:00"),
    name: "伊藤 大輔",
    nameKana: "いとう だいすけ",
    email: "ito@example.com",
    phone: "090-5678-9012",
    university: "立教大学",
    grade: "3",
    jobTitle: "大学受験対策講師",
    companyName: "東進ハイスクール 神田校",
  },
]

// ステータスに応じた色を返す関数
const getStatusColor = (status: ApplicationStatus) => {
  switch (status) {
    case "未対応":
      return "bg-gray-100 text-gray-800"
    case "対応中":
      return "bg-blue-100 text-blue-800"
    case "採用":
      return "bg-green-100 text-green-800"
    case "保留":
      return "bg-yellow-100 text-yellow-800"
    case "辞退":
      return "bg-purple-100 text-purple-800"
    case "不採用":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// 日付をフォーマットする関数
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState(mockApplications)
  const [filteredApplications, setFilteredApplications] = useState(mockApplications)
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "すべて">("すべて")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  }>({
    key: "appliedAt",
    direction: "descending",
  })

  // ステータスでフィルタリング
  useEffect(() => {
    let filtered = [...applications]

    // ステータスフィルター
    if (statusFilter !== "すべて") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    // 検索クエリでフィルタリング
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.nameKana.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query) ||
          app.university.toLowerCase().includes(query) ||
          app.jobTitle.toLowerCase().includes(query) ||
          app.companyName.toLowerCase().includes(query),
      )
    }

    // ソート
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a]
      const bValue = b[sortConfig.key as keyof typeof b]

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredApplications(filtered)
  }, [applications, statusFilter, searchQuery, sortConfig])

  // ソート設定を変更する関数
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // ソートアイコンを表示する関数
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    )
  }

  // 応募詳細ページに遷移する関数
  const viewApplicationDetail = (id: string) => {
    router.push(`/portal-admin/applications/${id}`)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">すべての応募者の応募状況</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>応募状況フィルター</CardTitle>
          <CardDescription>応募状況を絞り込むことができます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status-filter">ステータスでフィルター</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as ApplicationStatus | "すべて")}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="すべて">すべて</SelectItem>
                  <SelectItem value="未対応">未対応</SelectItem>
                  <SelectItem value="対応中">対応中</SelectItem>
                  <SelectItem value="採用">採用</SelectItem>
                  <SelectItem value="保留">保留</SelectItem>
                  <SelectItem value="辞退">辞退</SelectItem>
                  <SelectItem value="不採用">不採用</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search">検索</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="名前、大学、企業名などで検索"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>応募一覧</CardTitle>
          <CardDescription>
            全{applications.length}件中 {filteredApplications.length}件表示
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] cursor-pointer" onClick={() => requestSort("name")}>
                    応募者名 {getSortIcon("name")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("university")}>
                    大学・学年 {getSortIcon("university")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("jobTitle")}>
                    応募求人 {getSortIcon("jobTitle")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("companyName")}>
                    企業名 {getSortIcon("companyName")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("appliedAt")}>
                    応募日時 {getSortIcon("appliedAt")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("status")}>
                    ステータス {getSortIcon("status")}
                  </TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.name}</TableCell>
                    <TableCell>
                      {application.university} {application.grade}年
                    </TableCell>
                    <TableCell>{application.jobTitle}</TableCell>
                    <TableCell>{application.companyName}</TableCell>
                    <TableCell>{formatDate(application.appliedAt)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => viewApplicationDetail(application.id)}>
                        詳細
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      該当する応募データがありません
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

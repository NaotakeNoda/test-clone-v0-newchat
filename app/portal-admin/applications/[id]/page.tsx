"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ApplicationStatus } from "@/lib/schema/application"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Mail, MapPin, Phone, School, User, JapaneseYenIcon as Yen } from "lucide-react"
import Link from "next/link"

// モックデータ
const mockApplication = {
  id: "app1",
  applicantId: "user1",
  jobId: "job1",
  status: "未対応" as ApplicationStatus,
  appliedAt: new Date("2023-05-15T10:30:00"),
  updatedAt: new Date("2023-05-15T10:30:00"),

  // 応募者情報
  name: "山田 太郎",
  nameKana: "やまだ たろう",
  postalCode: "123-4567",
  phone: "090-1234-5678",
  email: "yamada@example.com",
  university: "東京大学",
  grade: "3",
  birthYear: "2000",
  academicType: "liberal" as const,
  teachableSubjects: {
    elementary: ["elem-math", "elem-english"],
    junior: ["jr-math", "jr-english"],
    high: ["high-math-liberal", "high-english"],
  },
  selfPR:
    "大学では教育学を専攻しており、将来は教員を目指しています。塾講師のアルバイトを通じて、教育現場での経験を積みたいと考えています。英語と数学が得意で、中学時代は英検2級、高校時代は数学オリンピックに参加した経験があります。",

  // 求人情報
  jobTitle: "小中学生向け個別指導講師",
  companyName: "スタディプラス 渋谷校",
  location: "東京都渋谷区道玄坂1-2-3",
  station: "渋谷駅から徒歩5分",
  salary: "時給1,800円〜",

  // 内部メモ
  internalNotes: "",

  // ステータス履歴
  statusHistory: [
    {
      status: "未対応" as ApplicationStatus,
      changedAt: new Date("2023-05-15T10:30:00"),
      changedBy: "system",
      note: "応募受付",
    },
  ],
}

// 科目IDからラベルを取得する関数
const getSubjectLabel = (subjectId: string): string => {
  const subjectMap: Record<string, string> = {
    "elem-math": "算数",
    "elem-english": "英語",
    "elem-japanese": "国語",
    "elem-science": "理科",
    "elem-social": "社会",
    "jr-math": "数学",
    "jr-english": "英語",
    "jr-japanese": "国語",
    "jr-science": "理科",
    "jr-social": "社会",
    "high-math-liberal": "文系数学",
    "high-math-science": "理系数学",
    "high-english": "英語",
    "high-modern-japanese": "現代文",
    "high-classical-japanese": "古典",
    "high-physics": "物理",
    "high-chemistry": "化学",
    "high-biology": "生物",
  }
  return subjectMap[subjectId] || subjectId
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

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [application, setApplication] = useState(mockApplication)
  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>(mockApplication.status)
  const [statusNote, setStatusNote] = useState("")
  const [internalNotes, setInternalNotes] = useState(mockApplication.internalNotes)
  const [isUpdating, setIsUpdating] = useState(false)

  // 実際の実装では、IDに基づいてデータを取得する
  useEffect(() => {
    // APIからデータを取得する処理
    // ここではモックデータを使用
    setApplication(mockApplication)
    setCurrentStatus(mockApplication.status)
    setInternalNotes(mockApplication.internalNotes)
  }, [params.id])

  // ステータスを更新する関数
  const updateStatus = () => {
    setIsUpdating(true)

    // 実際の実装では、APIを呼び出してステータスを更新
    setTimeout(() => {
      // ステータス履歴に追加
      const newHistory = [
        ...application.statusHistory,
        {
          status: currentStatus,
          changedAt: new Date(),
          changedBy: "admin", // 実際の実装では管理者IDを使用
          note: statusNote,
        },
      ]

      // アプリケーション情報を更新
      setApplication({
        ...application,
        status: currentStatus,
        updatedAt: new Date(),
        statusHistory: newHistory,
      })

      setStatusNote("")
      setIsUpdating(false)
    }, 500)
  }

  // 内部メモを更新する関数
  const updateInternalNotes = () => {
    setIsUpdating(true)

    // 実際の実装では、APIを呼び出して内部メモを更新
    setTimeout(() => {
      setApplication({
        ...application,
        internalNotes,
        updatedAt: new Date(),
      })

      setIsUpdating(false)
    }, 500)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/portal-admin/applications" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          応募一覧に戻る
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">応募詳細</h1>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
            {application.status}
          </span>
          <span className="text-sm text-muted-foreground">最終更新: {formatDate(application.updatedAt)}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左側：応募者情報と求人情報 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>応募者情報</CardTitle>
              <CardDescription>応募時に入力された応募者の情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    <span>氏名</span>
                  </div>
                  <p className="font-medium">{application.name}</p>
                  <p className="text-sm text-muted-foreground">{application.nameKana}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>メールアドレス</span>
                  </div>
                  <p>{application.email}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>電話番号</span>
                  </div>
                  <p>{application.phone}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>郵便番号</span>
                  </div>
                  <p>{application.postalCode}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <School className="h-4 w-4 mr-2" />
                    <span>大学・学年</span>
                  </div>
                  <p>
                    {application.university} {application.grade}年
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>生年</span>
                  </div>
                  <p>{application.birthYear}年</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">文理</h3>
                <p>{application.academicType === "liberal" ? "文系" : "理系"}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">指導可能科目</h3>

                {application.teachableSubjects.elementary.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">小学生</p>
                    <div className="flex flex-wrap gap-2">
                      {application.teachableSubjects.elementary.map((subjectId) => (
                        <span
                          key={subjectId}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                        >
                          {getSubjectLabel(subjectId)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {application.teachableSubjects.junior.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">中学生</p>
                    <div className="flex flex-wrap gap-2">
                      {application.teachableSubjects.junior.map((subjectId) => (
                        <span
                          key={subjectId}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                        >
                          {getSubjectLabel(subjectId)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {application.teachableSubjects.high.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">高校生</p>
                    <div className="flex flex-wrap gap-2">
                      {application.teachableSubjects.high.map((subjectId) => (
                        <span
                          key={subjectId}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                        >
                          {getSubjectLabel(subjectId)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">自己PR</h3>
                <p className="whitespace-pre-line">{application.selfPR || "（未入力）"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>応募求人情報</CardTitle>
              <CardDescription>応募された求人の詳細</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">{application.jobTitle}</h3>
                <p className="text-muted-foreground">{application.companyName}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>勤務地</span>
                  </div>
                  <p>{application.location}</p>
                  <p className="text-sm text-muted-foreground">{application.station}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <Yen className="h-4 w-4 mr-2" />
                    <span>給与</span>
                  </div>
                  <p>{application.salary}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/portal-admin/jobs/${application.jobId}`)}
                >
                  求人詳細を見る
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ステータス履歴</CardTitle>
              <CardDescription>応募ステータスの変更履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.statusHistory.map((history, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(history.status)}`}>
                      {history.status}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{formatDate(history.changedAt)}</p>
                      {history.note && <p className="mt-1">{history.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右側：ステータス管理と内部メモ */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ステータス管理</CardTitle>
              <CardDescription>応募のステータスを更新します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select
                  value={currentStatus}
                  onValueChange={(value) => setCurrentStatus(value as ApplicationStatus)}
                  disabled={isUpdating}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Label htmlFor="status-note">ステータス変更メモ</Label>
                <Textarea
                  id="status-note"
                  placeholder="ステータス変更の理由や詳細を入力"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  disabled={isUpdating}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={updateStatus}
                disabled={isUpdating || currentStatus === application.status}
                className="w-full"
              >
                {isUpdating ? "更新中..." : "ステータスを更新"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>内部メモ</CardTitle>
              <CardDescription>応募に関する内部メモ（応募者には表示されません）</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="内部メモを入力"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                disabled={isUpdating}
                rows={6}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={updateInternalNotes} disabled={isUpdating} className="w-full">
                {isUpdating ? "保存中..." : "メモを保存"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>応募者連絡</CardTitle>
              <CardDescription>応募者に直接連絡します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = `mailto:${application.email}`)}
              >
                <Mail className="mr-2 h-4 w-4" />
                メールを送信
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = `tel:${application.phone.replace(/-/g, "")}`)}
              >
                <Phone className="mr-2 h-4 w-4" />
                電話をかける
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

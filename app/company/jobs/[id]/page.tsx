"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { demoEmployerAccounts } from "@/lib/demo-accounts"
import { demoApplicantAccounts } from "@/lib/demo-accounts"
import { ChevronLeft, Home, Calendar, MapPin, GraduationCap, Clock, Building } from "lucide-react"

type EmployerAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

export default function CompanyJobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [auth, setAuth] = useState<EmployerAuth | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [jobData, setJobData] = useState<any>(null)
  const [applicants, setApplicants] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ログイン状態の確認
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("company_auth")
        if (!authData) {
          router.push("/company/login")
          return
        }

        const parsedAuth = JSON.parse(authData) as EmployerAuth
        if (!parsedAuth.isLoggedIn) {
          router.push("/company/login")
          return
        }

        setAuth(parsedAuth)

        // デモアカウントデータの取得
        const accountData = demoEmployerAccounts.find((account) => account.id === parsedAuth.userId)
        if (accountData) {
          setUserData(accountData)

          // 求人データの取得
          const job = accountData.jobs.find((j) => j.id === params.id)
          if (job) {
            setJobData(job)

            // 応募者データの取得
            const jobApplicants = demoApplicantAccounts.filter((applicant) =>
              applicant.applications.some((app) => app.jobId === params.id),
            )
            setApplicants(jobApplicants)
          } else {
            // 求人が見つからない場合
            router.push("/company/jobs")
          }
        }
      } catch (error) {
        console.error("認証チェックエラー:", error)
        router.push("/company/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, params.id])

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!jobData) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">求人情報が見つかりませんでした</p>
        </div>
      </div>
    )
  }

  // 応募者の応募情報を取得
  const getApplicationInfo = (applicantId: string) => {
    const applicant = demoApplicantAccounts.find((a) => a.id === applicantId)
    if (!applicant) return null

    return applicant.applications.find((app) => app.jobId === params.id)
  }

  return (
    <div className="container py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/company/dashboard">
              <Home className="h-4 w-4 mr-1" />
              ダッシュボード
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/company/jobs">求人管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/company/jobs/${params.id}`}>{jobData.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/company/jobs")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{jobData.title}</h1>
          <Badge variant={jobData.status === "active" ? "success" : "outline"}>
            {jobData.status === "active" ? "掲載中" : "下書き"}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/company/jobs/${params.id}/edit`)}>
            編集する
          </Button>
          {jobData.status === "active" ? (
            <Button variant="destructive">掲載を停止する</Button>
          ) : (
            <Button variant="default">掲載を開始する</Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">求人詳細</TabsTrigger>
          <TabsTrigger value="applicants">応募者一覧 ({applicants.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>求人情報</CardTitle>
                <CardDescription>掲載中の求人の詳細情報</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    企業情報
                  </h3>
                  <p className="text-sm mt-1">{userData?.name}</p>
                  <p className="text-sm text-muted-foreground">{userData?.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    指導科目
                  </h3>
                  <p className="text-sm mt-1">
                    {jobData.title.includes("英語")
                      ? "英語"
                      : jobData.title.includes("数学")
                        ? "数学"
                        : jobData.title.includes("国語")
                          ? "国語"
                          : jobData.title.includes("理科")
                            ? "理科"
                            : "その他"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    勤務地
                  </h3>
                  <p className="text-sm mt-1">{userData?.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    掲載日
                  </h3>
                  <p className="text-sm mt-1">{jobData.createdAt.toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>応募状況</CardTitle>
                <CardDescription>この求人への応募状況</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">応募者数</h3>
                  <p className="text-2xl font-bold mt-1">{applicants.length}人</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">審査中</h4>
                    <p className="text-xl font-semibold mt-1">
                      {
                        applicants.filter((a) => {
                          const app = getApplicationInfo(a.id)
                          return app && app.status === "pending"
                        }).length
                      }
                      人
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">面接予定</h4>
                    <p className="text-xl font-semibold mt-1">
                      {
                        applicants.filter((a) => {
                          const app = getApplicationInfo(a.id)
                          return app && app.status === "interview"
                        }).length
                      }
                      人
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">採用決定</h4>
                    <p className="text-xl font-semibold mt-1">
                      {
                        applicants.filter((a) => {
                          const app = getApplicationInfo(a.id)
                          return app && app.status === "accepted"
                        }).length
                      }
                      人
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    最新の応募
                  </h3>
                  {applicants.length > 0 ? (
                    <div className="mt-2">
                      {applicants
                        .sort((a, b) => {
                          const appA = getApplicationInfo(a.id)
                          const appB = getApplicationInfo(b.id)
                          return new Date(appB?.appliedAt || 0).getTime() - new Date(appA?.appliedAt || 0).getTime()
                        })
                        .slice(0, 3)
                        .map((applicant, index) => {
                          const app = getApplicationInfo(applicant.id)
                          return (
                            <div key={index} className="text-sm py-2 border-b last:border-0">
                              <p className="font-medium">{applicant.name}</p>
                              <p className="text-muted-foreground">
                                {app?.appliedAt.toLocaleDateString()} (
                                {app?.status === "pending"
                                  ? "審査中"
                                  : app?.status === "interview"
                                    ? "面接予定"
                                    : "採用決定"}
                                )
                              </p>
                            </div>
                          )
                        })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">まだ応募はありません</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applicants">
          <div className="space-y-6">
            {applicants.length > 0 ? (
              applicants.map((applicant, index) => {
                const app = getApplicationInfo(applicant.id)
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{applicant.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {applicant.university} {applicant.faculty} {applicant.grade}
                          </p>
                          <div className="mt-4 space-y-2">
                            <p>
                              <span className="font-medium">応募日:</span> {app?.appliedAt.toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-medium">指導可能科目:</span>{" "}
                              {applicant.subjects?.join(", ") || "未設定"}
                            </p>
                            {app?.notes && (
                              <p>
                                <span className="font-medium">応募メモ:</span> {app.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge
                            variant={
                              app?.status === "accepted"
                                ? "success"
                                : app?.status === "interview"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="mb-4"
                          >
                            {app?.status === "accepted"
                              ? "採用決定"
                              : app?.status === "interview"
                                ? "面接予定"
                                : "審査中"}
                          </Badge>
                          <div className="flex gap-2 mt-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/company/applicants/${applicant.id}`)}
                            >
                              詳細を見る
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/company/messages/${applicant.id}`)}
                            >
                              メッセージを送る
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="text-center py-16 bg-muted rounded-lg">
                <p className="text-muted-foreground">まだ応募はありません</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

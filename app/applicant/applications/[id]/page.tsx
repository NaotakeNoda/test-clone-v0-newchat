"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { demoApplicantAccounts, demoEmployerAccounts } from "@/lib/demo-accounts"
import { MapPin, Calendar, Clock, Building, Briefcase, Phone, User } from "lucide-react"

type ApplicantAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [auth, setAuth] = useState<ApplicantAuth | null>(null)
  const [application, setApplication] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ログイン状態の確認
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("applicant_auth")
        if (!authData) {
          router.push("/login")
          return
        }

        const parsedAuth = JSON.parse(authData) as ApplicantAuth
        if (!parsedAuth.isLoggedIn) {
          router.push("/login")
          return
        }

        setAuth(parsedAuth)

        // デモアカウントデータの取得
        const accountData = demoApplicantAccounts.find((account) => account.id === parsedAuth.userId)
        if (accountData && accountData.applications) {
          // 応募データを検索
          const app = accountData.applications.find((a) => a.id === params.id)

          if (app) {
            // 求人情報を検索
            const employer = demoEmployerAccounts.find((emp) => emp.jobs.some((job) => job.id === app.jobId))
            const job = employer?.jobs.find((j) => j.id === app.jobId)

            setApplication({
              ...app,
              employer: employer
                ? {
                    id: employer.id,
                    name: employer.name,
                    address: employer.address,
                    phone: employer.phone,
                    representative: employer.representative,
                    description: employer.description,
                  }
                : null,
              job: job || null,
            })
          } else {
            // 応募が見つからない場合
            router.push("/applicant/applications")
          }
        }
      } catch (error) {
        console.error("認証チェックエラー:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, params.id])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">審査中</Badge>
      case "interview_scheduled":
        return <Badge variant="secondary">面接予定</Badge>
      case "accepted":
        return <Badge variant="success">採用決定</Badge>
      case "rejected":
        return <Badge variant="destructive">不採用</Badge>
      default:
        return <Badge variant="outline">審査中</Badge>
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "審査中"
      case "interview_scheduled":
        return "面接予定"
      case "accepted":
        return "採用決定"
      case "rejected":
        return "不採用"
      default:
        return "審査中"
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="container py-10">
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">応募情報が見つかりません</h2>
          <Button asChild className="mt-4">
            <Link href="/applicant/applications">応募履歴に戻る</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/applicant/dashboard">ダッシュボード</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/applicant/applications">応募履歴</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>応募詳細</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">応募詳細</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/applicant/applications">応募履歴に戻る</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl">{application.job?.title || "求人タイトル"}</CardTitle>
                {getStatusBadge(application.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{application.employer?.name || "企業名"}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{application.employer?.address || "住所情報なし"}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>応募日: {application.appliedAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>ステータス: {getStatusText(application.status)}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">求人詳細</h3>
              <p className="mb-4">{application.job?.description || "求人の詳細情報がありません。"}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {application.job?.subjects && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">指導科目</h4>
                    <div className="flex flex-wrap gap-1">
                      {application.job.subjects.map((subject: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {application.job?.salary && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">給与</h4>
                    <p>{application.job.salary}</p>
                  </div>
                )}

                {application.job?.workingHours && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">勤務時間</h4>
                    <p>{application.job.workingHours}</p>
                  </div>
                )}

                {application.job?.workingDays && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">勤務日</h4>
                    <p>{application.job.workingDays}</p>
                  </div>
                )}
              </div>

              {application.status === "interview_scheduled" && application.interviewDate && (
                <div className="bg-secondary/20 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-2">面接情報</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>面接日: {application.interviewDate.toLocaleDateString()}</span>
                    </div>
                    {application.interviewTime && (
                      <div className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>面接時間: {application.interviewTime}</span>
                      </div>
                    )}
                    {application.interviewLocation && (
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>面接場所: {application.interviewLocation}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {application.status === "accepted" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">採用情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-success/10 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-success-foreground">おめでとうございます！</h3>
                  <p className="mb-4">
                    あなたは{application.employer?.name}の{application.job?.title}ポジションに採用されました。
                  </p>
                  <p>詳細な情報や次のステップについては、企業からのメッセージをご確認ください。</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">企業情報</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">企業名</h3>
                  <p>{application.employer?.name || "企業名"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">住所</h3>
                  <p>{application.employer?.address || "住所情報なし"}</p>
                </div>
                {application.employer?.phone && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1">電話番号</h3>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p>{application.employer.phone}</p>
                    </div>
                  </div>
                )}
                {application.employer?.representative && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1">担当者</h3>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p>{application.employer.representative}</p>
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/company/${application.employer?.id}`}>企業詳細を見る</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">応募情報</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">応募日</h3>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p>{application.appliedAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">ステータス</h3>
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p>{getStatusText(application.status)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

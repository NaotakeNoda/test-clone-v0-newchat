"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { demoApplicantAccounts, demoEmployerAccounts } from "@/lib/demo-accounts"
import { MapPin, Calendar, Building, ChevronRight } from "lucide-react"

type ApplicantAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

export default function ApplicationsPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<ApplicantAuth | null>(null)
  const [applications, setApplications] = useState<any[]>([])
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
          // 応募データを取得し、企業情報と求人情報を結合
          const applicationsWithDetails = accountData.applications.map((app) => {
            // 求人情報を検索
            const employer = demoEmployerAccounts.find((emp) => emp.jobs.some((job) => job.id === app.jobId))
            const job = employer?.jobs.find((j) => j.id === app.jobId)

            return {
              ...app,
              employer: employer
                ? {
                    id: employer.id,
                    name: employer.name,
                    address: employer.address,
                  }
                : null,
              job: job || null,
            }
          })

          setApplications(applicationsWithDetails)
        }
      } catch (error) {
        console.error("認証チェックエラー:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

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

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">応募履歴</h1>
        <Button variant="outline" onClick={() => router.push("/applicant/dashboard")}>
          ダッシュボードに戻る
        </Button>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application, index) => (
            <Link href={`/applicant/applications/${application.id}`} key={index}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{application.job?.title || "求人タイトル"}</h2>
                      <p className="text-muted-foreground">{application.employer?.name || "企業名"}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building className="mr-2 h-4 w-4" />
                          <span>{application.employer?.name || "企業名"}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{application.employer?.address || "住所情報なし"}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>応募日: {application.appliedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(application.status)}
                      <div className="mt-4 flex items-center">
                        <span className="text-sm mr-1">詳細を見る</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">応募履歴がありません</h2>
          <p className="text-muted-foreground mb-6">
            まだ求人に応募していません。興味のある求人を探して応募してみましょう。
          </p>
          <Button asChild>
            <Link href="/jobs">求人を探す</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

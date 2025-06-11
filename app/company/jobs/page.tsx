"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { demoEmployerAccounts } from "@/lib/demo-accounts"
import { demoApplicantAccounts } from "@/lib/demo-accounts"
import { Home, Plus } from "lucide-react"

type EmployerAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

export default function CompanyJobsPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<EmployerAuth | null>(null)
  const [userData, setUserData] = useState<any>(null)
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
        }
      } catch (error) {
        console.error("認証チェックエラー:", error)
        router.push("/company/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // 応募者データを求人IDに基づいて取得
  const getApplicantsForJob = (jobId: string) => {
    return demoApplicantAccounts.filter((applicant) => applicant.applications.some((app) => app.jobId === jobId))
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
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">求人管理</h1>
        <Button onClick={() => router.push("/company/jobs/new")}>
          <Plus className="h-4 w-4 mr-2" />
          新規求人を作成
        </Button>
      </div>

      <div className="space-y-6">
        {userData?.jobs && userData.jobs.length > 0 ? (
          userData.jobs.map((job, index) => {
            const applicants = getApplicantsForJob(job.id)
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">掲載日: {job.createdAt.toLocaleDateString()}</p>
                      <div className="mt-4 space-y-2">
                        <p>
                          <span className="font-medium">応募者数:</span> {applicants.length}人
                        </p>
                        <p>
                          <span className="font-medium">新着応募:</span>{" "}
                          {
                            applicants.filter((a) =>
                              a.applications.some(
                                (app) =>
                                  app.jobId === job.id &&
                                  new Date(app.appliedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
                              ),
                            ).length
                          }
                          人
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant={job.status === "active" ? "success" : "outline"} className="mb-4">
                        {job.status === "active" ? "掲載中" : "下書き"}
                      </Badge>
                      <div className="flex gap-2 mt-auto">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/company/jobs/${job.id}`)}>
                          詳細を見る
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/company/jobs/${job.id}/edit`)}>
                          編集する
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
            <p className="text-muted-foreground mb-4">掲載中の求人はありません</p>
            <Button onClick={() => router.push("/company/jobs/new")}>
              <Plus className="h-4 w-4 mr-2" />
              新規求人を作成
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

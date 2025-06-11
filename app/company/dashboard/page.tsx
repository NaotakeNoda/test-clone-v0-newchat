"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { demoEmployerAccounts } from "@/lib/demo-accounts"
import { demoApplicantAccounts } from "@/lib/demo-accounts"

type EmployerAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

export default function EmployerDashboardPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<EmployerAuth | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [unreadMessageCount, setUnreadMessageCount] = useState(0)
  const [latestMessageSender, setLatestMessageSender] = useState("")

  useEffect(() => {
    // ログイン状態の確認
    const checkAuth = () => {
      try {
        // ローカルストレージのキー名を更新
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

          // メッセージデータの処理
          if (accountData.messages && accountData.messages.length > 0) {
            // 未読メッセージのカウント
            const unreadCount = accountData.messages.filter(
              (msg) => msg.senderType === "applicant" && !msg.isRead,
            ).length
            setUnreadMessageCount(unreadCount)

            // 最新メッセージの送信者を取得
            const latestMessage = [...accountData.messages].sort(
              (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
            )[0]

            if (latestMessage && latestMessage.senderType === "applicant") {
              const sender = demoApplicantAccounts.find((a) => a.id === latestMessage.senderId)
              if (sender) {
                setLatestMessageSender(sender.name)
              }
            }
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
  }, [router])

  const handleLogout = () => {
    // ログアウト処理のキー名とリダイレクト先を更新
    localStorage.removeItem("company_auth")
    router.push("/company/login")
  }

  // 求人管理ページへ移動
  const handleManageJobs = () => {
    router.push("/company/jobs")
  }

  // メッセージページへ移動
  const handleCheckMessages = () => {
    router.push("/company/messages")
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

  // 応募者データを求人IDに基づいて取得
  const getApplicantsForJob = (jobId: string) => {
    return demoApplicantAccounts.filter((applicant) => applicant.applications.some((app) => app.jobId === jobId))
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">企業ダッシュボード</h1>
        <Button variant="outline" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>企業情報</CardTitle>
            <CardDescription>基本情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>企業名:</strong> {userData?.name || auth?.name}
              </p>
              <p>
                <strong>メールアドレス:</strong> {userData?.email || auth?.email}
              </p>
              <p>
                <strong>住所:</strong> {userData?.address || "未設定"}
              </p>
              <p>
                <strong>電話番号:</strong> {userData?.phone || "未設定"}
              </p>
              <p>
                <strong>担当者:</strong> {userData?.representative || "未設定"}
              </p>
            </div>
            <Button className="w-full mt-4" variant="outline">
              企業情報編集
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>求人状況</CardTitle>
            <CardDescription>掲載中の求人</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>掲載求人数:</strong> {userData?.jobs?.length || 0}
              </p>
              <p>
                <strong>応募総数:</strong>{" "}
                {userData?.jobs?.reduce((total, job) => total + getApplicantsForJob(job.id).length, 0) || 0}
              </p>
              <p>
                <strong>新着応募:</strong> 3件
              </p>
            </div>
            <Button className="w-full mt-4" onClick={handleManageJobs}>
              求人を管理
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>メッセージ</CardTitle>
            <CardDescription>未読メッセージ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>未読:</strong> {unreadMessageCount}件
              </p>
              <p>
                <strong>最新メッセージ:</strong> {latestMessageSender ? `${latestMessageSender}からの連絡` : "なし"}
              </p>
            </div>
            <Button className="w-full mt-4" onClick={handleCheckMessages}>
              メッセージを確認
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="mb-4">
          <TabsTrigger value="jobs">求人管理</TabsTrigger>
          <TabsTrigger value="applications">応募者管理</TabsTrigger>
          <TabsTrigger value="analytics">統計情報</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">求人管理</h2>

          {userData?.jobs && userData.jobs.length > 0 ? (
            userData.jobs.map((job, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{job.title}</h3>
                      <p className="text-sm mt-2">掲載日: {new Date(job.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm">応募者数: {getApplicantsForJob(job.id).length}人</p>
                    </div>
                    <Badge variant={job.status === "active" ? "success" : "outline"}>
                      {job.status === "active" ? "掲載中" : "下書き"}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      編集する
                    </Button>
                    <Button variant="ghost" size="sm">
                      応募者を見る
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 bg-muted rounded-lg">
              <p className="text-muted-foreground">掲載中の求人はありません</p>
              <Button className="mt-4">新規求人を作成</Button>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <Button>新規求人を作成</Button>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">応募者管理</h2>

          {userData?.jobs && userData.jobs.some((job) => getApplicantsForJob(job.id).length > 0) ? (
            userData.jobs.flatMap((job) =>
              getApplicantsForJob(job.id).map((applicant, index) => {
                const application = applicant.applications.find((app) => app.jobId === job.id)
                return (
                  <Card key={`${job.id}-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{applicant.name}</h3>
                          <p className="text-muted-foreground">
                            {applicant.university} {applicant.faculty}
                          </p>
                          <p className="text-sm mt-2">応募求人: {job.title}</p>
                          <p className="text-sm">応募日: {application?.appliedAt.toLocaleDateString()}</p>
                        </div>
                        <Badge
                          variant={
                            application?.status === "accepted"
                              ? "success"
                              : application?.status === "pending"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {application?.status === "accepted"
                            ? "採用決定"
                            : application?.status === "pending"
                              ? "審査中"
                              : "面接予定"}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          詳細を見る
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/company/messages/${applicant.id}`)}
                        >
                          メッセージを送る
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              }),
            )
          ) : (
            <div className="text-center py-10 bg-muted rounded-lg">
              <p className="text-muted-foreground">応募者はまだいません</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-10 bg-muted rounded-lg">
            <p className="text-muted-foreground">統計情報は準備中です</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

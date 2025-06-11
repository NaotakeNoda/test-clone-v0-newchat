"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { demoApplicantAccounts } from "@/lib/demo-accounts"
import { demoEmployerAccounts } from "@/lib/demo-accounts" // Import demoEmployerAccounts
import Link from "next/link"

type ApplicantAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

export default function ApplicantDashboardPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<ApplicantAuth | null>(null)
  const [userData, setUserData] = useState<any>(null)
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
        if (accountData) {
          setUserData(accountData)
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

  const handleLogout = () => {
    localStorage.removeItem("applicant_auth")
    router.push("/login")
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
        <h1 className="text-3xl font-bold">講師ダッシュボード</h1>
        <Button variant="outline" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>プロフィール</CardTitle>
            <CardDescription>あなたの基本情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>名前:</strong> {userData?.name || auth?.name}
              </p>
              <p>
                <strong>メールアドレス:</strong> {userData?.email || auth?.email}
              </p>
              <p>
                <strong>大学:</strong> {userData?.university || "未設定"}
              </p>
              <p>
                <strong>学部:</strong> {userData?.faculty || "未設定"}
              </p>
              <p>
                <strong>学年:</strong> {userData?.grade || "未設定"}
              </p>
            </div>
            <Button className="w-full mt-4" variant="outline">
              プロフィール編集
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>応募状況</CardTitle>
            <CardDescription>あなたの応募履歴</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>応募数:</strong> {userData?.applications?.length || 0}
              </p>
              <p>
                <strong>面接予定:</strong>{" "}
                {userData?.applications?.filter((a) => a.status === "interview_scheduled")?.length || 0}
              </p>
              <p>
                <strong>採用決定:</strong> {userData?.applications?.filter((a) => a.status === "accepted")?.length || 0}
              </p>
            </div>
            <Link href="/applicant/applications">
              <Button className="w-full mt-4">応募履歴を見る</Button>
            </Link>
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
                <strong>未読:</strong> {userData?.unreadMessageCount || 0}件
              </p>
              <p>
                <strong>最新メッセージ:</strong> {userData?.latestMessageFrom || "メッセージはありません"}
              </p>
            </div>
            <Link href="/applicant/messages">
              <Button className="w-full mt-4">メッセージを確認</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications">
        <TabsList className="mb-4">
          <TabsTrigger value="applications">応募履歴</TabsTrigger>
          <TabsTrigger value="recommended">おすすめ求人</TabsTrigger>
          <TabsTrigger value="saved">保存した求人</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">応募履歴</h2>

          {userData?.applications && userData.applications.length > 0 ? (
            userData.applications.map((application, index) => {
              const employer = demoEmployerAccounts.find((e) => e.jobs.some((j) => j.id === application.jobId))
              const job = employer?.jobs.find((j) => j.id === application.jobId)

              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{job?.title || "求人タイトル"}</h3>
                        <p className="text-muted-foreground">{employer?.name || "企業名"}</p>
                        <p className="text-sm mt-2">応募日: {application.appliedAt.toLocaleDateString()}</p>
                      </div>
                      <Badge
                        variant={
                          application.status === "accepted"
                            ? "success"
                            : application.status === "pending"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {application.status === "accepted"
                          ? "採用決定"
                          : application.status === "pending"
                            ? "審査中"
                            : "面接予定"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link href={`/applicant/applications/${application.id}`}>
                        <Button variant="outline" size="sm">
                          詳細を見る
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="text-center py-10 bg-muted rounded-lg">
              <p className="text-muted-foreground">応募履歴はありません</p>
              <Button className="mt-4">求人を探す</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommended">
          <div className="text-center py-10 bg-muted rounded-lg">
            <p className="text-muted-foreground">あなたにおすすめの求人が表示されます</p>
            <Button className="mt-4">求人を探す</Button>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="text-center py-10 bg-muted rounded-lg">
            <p className="text-muted-foreground">保存した求人が表示されます</p>
            <Button className="mt-4">求人を探す</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

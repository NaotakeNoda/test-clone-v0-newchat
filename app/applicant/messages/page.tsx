"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { demoApplicantAccounts, demoEmployerAccounts } from "@/lib/demo-accounts"
import { Building, Clock, MessageSquare } from "lucide-react"

type ApplicantAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  isRead: boolean
  senderType: "applicant" | "employer"
}

type EmployerWithMessages = {
  id: string
  name: string
  latestMessage: Message
  unreadCount: number
}

export default function MessagesPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<ApplicantAuth | null>(null)
  const [employersWithMessages, setEmployersWithMessages] = useState<EmployerWithMessages[]>([])
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
        if (accountData && accountData.messages) {
          // メッセージのある企業を取得
          const employerIds = new Set<string>()
          accountData.messages.forEach((message) => {
            if (message.senderType === "employer") {
              employerIds.add(message.senderId)
            } else if (message.senderType === "applicant") {
              employerIds.add(message.receiverId)
            }
          })

          // 企業ごとのメッセージ情報を作成
          const employers: EmployerWithMessages[] = []

          employerIds.forEach((employerId) => {
            const employer = demoEmployerAccounts.find((emp) => emp.id === employerId)
            if (employer) {
              // この企業とのメッセージを取得
              const messagesWithEmployer = accountData.messages.filter(
                (message) =>
                  (message.senderType === "employer" && message.senderId === employerId) ||
                  (message.senderType === "applicant" && message.receiverId === employerId),
              )

              // 最新のメッセージを取得
              const latestMessage = messagesWithEmployer.sort(
                (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
              )[0]

              // 未読メッセージの数を取得
              const unreadCount = messagesWithEmployer.filter(
                (message) => message.senderType === "employer" && !message.isRead,
              ).length

              employers.push({
                id: employerId,
                name: employer.name,
                latestMessage,
                unreadCount,
              })
            }
          })

          // 最新メッセージの日時でソート
          employers.sort((a, b) => b.latestMessage.timestamp.getTime() - a.latestMessage.timestamp.getTime())

          setEmployersWithMessages(employers)
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

  const formatMessageTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    // 24時間以内
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // 7日以内
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = ["日", "月", "火", "水", "木", "金", "土"]
      return days[date.getDay()] + "曜日"
    }

    // それ以外
    return date.toLocaleDateString()
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
            <BreadcrumbLink href="/applicant/dashboard">ダッシュボード</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>メッセージ</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">メッセージ</h1>

      <div className="space-y-4">
        {employersWithMessages.length > 0 ? (
          employersWithMessages.map((employer) => (
            <Link href={`/applicant/messages/${employer.id}`} key={employer.id}>
              <Card className="hover:bg-accent/10 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Building className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{employer.name}</h3>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatMessageTime(employer.latestMessage.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {employer.latestMessage.senderType === "employer" ? "" : "あなた: "}
                        {employer.latestMessage.content}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span>メッセージ履歴を表示</span>
                        </div>
                        {employer.unreadCount > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs font-medium rounded-full px-2 py-0.5">
                            {employer.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-16 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-2">メッセージはありません</h2>
            <p className="text-muted-foreground mb-6">企業からのメッセージがここに表示されます</p>
            <Button asChild>
              <Link href="/applicant/dashboard">ダッシュボードに戻る</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

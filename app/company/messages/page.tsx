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
import { Home, MessageCircle } from "lucide-react"

type EmployerAuth = {
  isLoggedIn: boolean
  userId: string
  name: string
  email: string
}

type MessagePreview = {
  applicantId: string
  applicantName: string
  latestMessage: {
    content: string
    timestamp: Date
    isRead: boolean
    senderType: string
  }
  unreadCount: number
}

export default function CompanyMessagesPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<EmployerAuth | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [messageData, setMessageData] = useState<MessagePreview[]>([])
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

          // メッセージデータの取得と整形
          if (accountData.messages && accountData.messages.length > 0) {
            // 応募者ごとにメッセージをグループ化
            const applicantMessages = new Map<string, any[]>()

            accountData.messages.forEach((message) => {
              const applicantId = message.senderType === "employer" ? message.receiverId : message.senderId

              if (!applicantMessages.has(applicantId)) {
                applicantMessages.set(applicantId, [])
              }

              applicantMessages.get(applicantId)?.push(message)
            })

            // 各応募者の最新メッセージと未読数を取得
            const messagePreviewData: MessagePreview[] = []

            applicantMessages.forEach((messages, applicantId) => {
              // 日付でソート（新しい順）
              const sortedMessages = [...messages].sort(
                (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
              )

              const latestMessage = sortedMessages[0]
              const applicantData = demoApplicantAccounts.find((a) => a.id === applicantId)

              if (applicantData) {
                // 未読メッセージ数をカウント（企業が受信したメッセージで未読のもの）
                const unreadCount = sortedMessages.filter((msg) => msg.senderType === "applicant" && !msg.isRead).length

                messagePreviewData.push({
                  applicantId,
                  applicantName: applicantData.name,
                  latestMessage: {
                    content: latestMessage.content,
                    timestamp: new Date(latestMessage.timestamp),
                    isRead: latestMessage.isRead,
                    senderType: latestMessage.senderType,
                  },
                  unreadCount,
                })
              }
            })

            // 最新メッセージの日付でソート
            messagePreviewData.sort((a, b) => b.latestMessage.timestamp.getTime() - a.latestMessage.timestamp.getTime())

            setMessageData(messagePreviewData)
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
            <BreadcrumbLink href="/company/messages">メッセージ</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">メッセージ</h1>
      </div>

      <div className="space-y-4">
        {messageData.length > 0 ? (
          messageData.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium">{item.applicantName}</h3>
                      {item.unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          未読 {item.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(item.latestMessage.timestamp).toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mt-2 line-clamp-1">
                      {item.latestMessage.senderType === "employer" ? "あなた: " : ""}
                      {item.latestMessage.content}
                    </p>
                  </div>
                  <Button onClick={() => router.push(`/company/messages/${item.applicantId}`)} className="ml-4">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    メッセージを見る
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 bg-muted rounded-lg">
            <p className="text-muted-foreground">メッセージのやりとりはありません</p>
          </div>
        )}
      </div>
    </div>
  )
}

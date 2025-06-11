"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { demoEmployerAccounts } from "@/lib/demo-accounts"
import { demoApplicantAccounts } from "@/lib/demo-accounts"
import { Home, Send, ArrowLeft } from "lucide-react"

type EmployerAuth = {
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
  senderType: string
}

export default function CompanyMessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [auth, setAuth] = useState<EmployerAuth | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [applicantData, setApplicantData] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const applicantId = params.id

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

          // 応募者データの取得
          const applicant = demoApplicantAccounts.find((a) => a.id === applicantId)
          if (applicant) {
            setApplicantData(applicant)

            // メッセージデータの取得
            const allMessages = [...(accountData.messages || []), ...(applicant.messages || [])].filter(
              (msg) =>
                (msg.senderId === accountData.id && msg.receiverId === applicantId) ||
                (msg.senderId === applicantId && msg.receiverId === accountData.id),
            )

            // 日付でソート（古い順）
            const sortedMessages = allMessages.sort(
              (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
            )

            setMessages(sortedMessages)
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
  }, [router, applicantId])

  useEffect(() => {
    // メッセージが更新されたら一番下にスクロール
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !userData || !applicantData) return

    const newMessageObj = {
      id: `msg-${Date.now()}`,
      senderId: userData.id,
      receiverId: applicantId,
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false,
      senderType: "employer",
    }

    setMessages([...messages, newMessageObj])
    setNewMessage("")
  }

  // メッセージを日付ごとにグループ化する関数
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {}

    messages.forEach((message) => {
      const date = new Date(message.timestamp).toLocaleDateString("ja-JP")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })

    return groups
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

  if (!applicantData) {
    return (
      <div className="container py-10">
        <div className="text-center py-16 bg-muted rounded-lg">
          <p className="text-muted-foreground">応募者が見つかりませんでした</p>
          <Button onClick={() => router.push("/company/messages")} className="mt-4">
            メッセージ一覧に戻る
          </Button>
        </div>
      </div>
    )
  }

  const messageGroups = groupMessagesByDate(messages)

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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{applicantData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/company/messages")} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          戻る
        </Button>
        <h1 className="text-3xl font-bold">{applicantData.name}とのメッセージ</h1>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">応募者情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">名前</p>
              <p>{applicantData.name}</p>
            </div>
            <div>
              <p className="font-medium">大学・学部</p>
              <p>
                {applicantData.university} {applicantData.faculty}
              </p>
            </div>
            <div>
              <p className="font-medium">学年</p>
              <p>{applicantData.grade}</p>
            </div>
            <div>
              <p className="font-medium">メールアドレス</p>
              <p>{applicantData.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="h-96 overflow-y-auto mb-4 p-2">
            {Object.keys(messageGroups).length > 0 ? (
              Object.entries(messageGroups).map(([date, msgs]) => (
                <div key={date} className="mb-6">
                  <div className="text-center mb-4">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">{date}</span>
                  </div>
                  <div className="space-y-4">
                    {msgs.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.senderType === "employer" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-lg ${
                            msg.senderType === "employer" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.senderType === "employer" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString("ja-JP", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">メッセージのやりとりはありません</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              送信
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

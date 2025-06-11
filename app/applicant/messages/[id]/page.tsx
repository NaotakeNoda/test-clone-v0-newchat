"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
import { demoApplicantAccounts, demoEmployerAccounts } from "@/lib/demo-accounts"
import { Building, Send, ArrowLeft, AlertCircle } from "lucide-react"

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

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [auth, setAuth] = useState<ApplicantAuth | null>(null)
  const [employer, setEmployer] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasEmployerMessage, setHasEmployerMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

        // 企業情報の取得
        const employerData = demoEmployerAccounts.find((emp) => emp.id === params.id)
        if (employerData) {
          setEmployer(employerData)
        } else {
          // 企業が見つからない場合
          router.push("/applicant/messages")
          return
        }

        // デモアカウントデータの取得
        const accountData = demoApplicantAccounts.find((account) => account.id === parsedAuth.userId)
        if (accountData && accountData.messages) {
          // この企業とのメッセージを取得
          const relevantMessages = accountData.messages.filter(
            (message) =>
              (message.senderType === "employer" && message.senderId === params.id) ||
              (message.senderType === "applicant" && message.receiverId === params.id),
          )

          // 企業からのメッセージがあるか確認
          const hasEmployerMsg = relevantMessages.some(
            (message) => message.senderType === "employer" && message.senderId === params.id,
          )
          setHasEmployerMessage(hasEmployerMsg)

          // 日付順にソート
          const sortedMessages = relevantMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

          setMessages(sortedMessages)
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

  useEffect(() => {
    // メッセージが更新されたら一番下にスクロール
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatMessageDate = (date: Date) => {
    return date.toLocaleDateString()
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !auth || !hasEmployerMessage) return

    // 新しいメッセージを作成
    const newMessageObj: Message = {
      id: `msg-${Date.now()}`,
      senderId: auth.userId,
      receiverId: params.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      senderType: "applicant",
    }

    // メッセージリストに追加
    setMessages([...messages, newMessageObj])

    // 入力フィールドをクリア
    setNewMessage("")
  }

  const shouldShowDate = (index: number) => {
    if (index === 0) return true

    const currentDate = messages[index].timestamp
    const prevDate = messages[index - 1].timestamp

    return currentDate.toDateString() !== prevDate.toDateString()
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

  if (!employer) {
    return (
      <div className="container py-10">
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">企業情報が見つかりません</h2>
          <Button asChild className="mt-4">
            <Link href="/applicant/messages">メッセージ一覧に戻る</Link>
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
            <BreadcrumbLink href="/applicant/messages">メッセージ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{employer.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="h-[calc(100vh-200px)] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/applicant/messages">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Building className="h-5 w-5" />
                </div>
                <CardTitle>{employer.name}</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index}>
                  {shouldShowDate(index) && (
                    <div className="flex justify-center my-4">
                      <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                        {formatMessageDate(message.timestamp)}
                      </div>
                    </div>
                  )}
                  <div className={`flex ${message.senderType === "applicant" ? "justify-end" : "justify-start"} mb-4`}>
                    {message.senderType === "employer" && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                        <Building className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] ${message.senderType === "applicant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} rounded-lg px-4 py-2`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${message.senderType === "applicant" ? "text-primary-foreground/70" : "text-secondary-foreground/70"}`}
                      >
                        {formatMessageTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-muted-foreground mb-2">まだメッセージのやり取りはありません</p>
                <p className="text-sm text-muted-foreground">企業からのメッセージをお待ちください</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <div className="p-4 border-t">
          {hasEmployerMessage ? (
            <div className="flex gap-2">
              <Textarea
                placeholder="メッセージを入力..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center p-2 bg-muted/30 rounded-md">
              <AlertCircle className="h-4 w-4 text-muted-foreground mr-2" />
              <p className="text-sm text-muted-foreground">企業からのメッセージがあった場合のみ返信できます</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

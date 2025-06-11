import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import Link from "next/link"

// 実際の実装ではデータベースから取得
const mockMessages = [
  {
    id: 1,
    sender: {
      id: 2,
      name: "スタディプラス 渋谷校",
      avatar: "/placeholder-user.jpg",
      isCompany: true,
    },
    messages: [
      {
        id: 1,
        content: "山田様、応募ありがとうございます。面接日程を調整したいのですが、来週の都合の良い日はありますか？",
        timestamp: "2023-04-01T10:30:00",
        isFromSender: true,
      },
      {
        id: 2,
        content: "ご連絡ありがとうございます。来週であれば、火曜日の午後か木曜日の午前中が都合が良いです。",
        timestamp: "2023-04-01T11:15:00",
        isFromSender: false,
      },
      {
        id: 3,
        content: "木曜日の10時でしたら面接可能です。場所は渋谷校になります。ご都合はいかがでしょうか？",
        timestamp: "2023-04-01T13:45:00",
        isFromSender: true,
      },
    ],
  },
  {
    id: 2,
    sender: {
      id: 3,
      name: "アカデミア 新宿校",
      avatar: "/placeholder-user.jpg",
      isCompany: true,
    },
    messages: [
      {
        id: 1,
        content:
          "山田様、この度は採用面接にご参加いただきありがとうございました。面接の結果、採用させていただきたいと思います。",
        timestamp: "2023-03-28T15:20:00",
        isFromSender: true,
      },
    ],
  },
]

export default function MessagesPage() {
  // 最初のメッセージスレッドを表示
  const selectedThread = mockMessages[0]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">メッセージ</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* メッセージリスト */}
        <div className="md:col-span-1">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader className="pb-3">
              <CardTitle>会話一覧</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0">
              {mockMessages.map((thread) => (
                <Link key={thread.id} href={`/messages/${thread.id}`}>
                  <div
                    className={`p-4 hover:bg-muted flex items-center gap-3 ${thread.id === selectedThread.id ? "bg-muted" : ""}`}
                  >
                    <Avatar>
                      <AvatarImage src={thread.sender.avatar} alt={thread.sender.name} />
                      <AvatarFallback>{thread.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{thread.sender.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(thread.messages[thread.messages.length - 1].timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {thread.messages[thread.messages.length - 1].content}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* メッセージ詳細 */}
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedThread.sender.avatar} alt={selectedThread.sender.name} />
                  <AvatarFallback>{selectedThread.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedThread.sender.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedThread.sender.isCompany ? "企業" : "講師"}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedThread.messages.map((message) => (
                <div key={message.id} className={`flex ${message.isFromSender ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isFromSender ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isFromSender ? "text-muted-foreground" : "text-primary-foreground/80"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t">
              <form className="flex gap-2">
                <Input placeholder="メッセージを入力..." className="flex-1" />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

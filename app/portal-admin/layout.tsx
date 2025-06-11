"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "./components/sidebar"

type AdminSessionData = {
  username: string
  role: string
  expiresAt: number
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionData, setSessionData] = useState<AdminSessionData | null>(null)

  console.log(`===== AdminLayout レンダリング: パス=${pathname} =====`)

  // 認証状態をチェック
  useEffect(() => {
    console.log("AdminLayout: 認証状態チェック開始")

    const checkAuth = () => {
      try {
        // ローカルストレージから認証状態を取得
        const auth = localStorage.getItem("adminAuthenticated") === "true"
        console.log(`localStorage認証状態: ${auth ? "認証済み" : "未認証"}`)

        // セッションデータの取得
        try {
          const sessionStr = localStorage.getItem("adminSession")
          if (sessionStr) {
            const session = JSON.parse(sessionStr) as AdminSessionData

            // セッションの有効期限をチェック
            if (session.expiresAt < Date.now()) {
              console.log("セッションの有効期限切れ")
              localStorage.removeItem("adminAuthenticated")
              localStorage.removeItem("adminSession")
              setIsAuthenticated(false)
            } else {
              setSessionData(session)
              setIsAuthenticated(auth)
            }
          } else {
            setIsAuthenticated(auth)
          }
        } catch (error) {
          console.error("セッションデータ読み込みエラー:", error)
          setIsAuthenticated(false)
        }

        // Cookieの状態をチェック（クライアントサイドからは制限あり）
        console.log("document.cookie:", document.cookie)
      } catch (error) {
        console.error("認証状態チェックエラー:", error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
        console.log("認証状態チェック完了")
      }
    }

    checkAuth()
  }, [])

  // ログインページへのパスかどうかをチェック
  const isAuthPage = pathname === "/portal-admin/auth"
  console.log(`現在のページ: ${isAuthPage ? "ログインページ" : "その他の管理者ページ"}`)

  // ログアウト処理
  const handleLogout = async () => {
    console.log("ログアウト処理開始")
    try {
      localStorage.removeItem("adminAuthenticated")
      localStorage.removeItem("adminSession")
      console.log("localStorage認証状態クリア完了")

      console.log("ログインページへリダイレクト")
      router.push("/portal-admin/auth")
    } catch (error) {
      console.error("ログアウト処理エラー:", error)
    }
  }

  // 認証チェック中はローディング表示
  if (isLoading) {
    console.log("認証チェック中: ローディング表示")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // 認証されていない場合、ログインページへリダイレクト（ただし、現在のページがログインページでない場合）
  if (!isAuthenticated && !isAuthPage) {
    console.log("未認証状態でログインページ以外にアクセス: リダイレクト準備")
    if (typeof window !== "undefined") {
      console.log("ログインページへリダイレクト実行")
      router.push("/portal-admin/auth")
      return null
    }
  }

  // ログインページの場合は、サイドバーなしでコンテンツを表示
  if (isAuthPage) {
    console.log("ログインページ表示: サイドバーなし")
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
  }

  // 認証済みの場合は、サイドバー付きのレイアウトを表示
  console.log("認証済み: 管理者ダッシュボード表示")
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <div className="w-64 hidden md:block">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

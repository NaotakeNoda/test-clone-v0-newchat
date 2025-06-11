"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// セッション情報の型定義
type AdminSession = {
  userId: string
  username: string
  role: string
  expiresAt: number
}

// セッションの作成と暗号化
function createSessionToken(username: string): AdminSession {
  return {
    userId: "admin-1",
    username,
    role: "admin",
    expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24時間
  }
}

export async function adminLogin(formData: FormData) {
  console.log("===== サーバーアクション: adminLogin 開始 =====")

  const username = formData.get("username") as string
  const password = formData.get("password") as string

  console.log(`認証試行: ユーザー名="${username}", パスワード長=${password ? password.length : 0}`)

  // 認証エラーの場合
  if (!username || !password) {
    console.log("エラー: ユーザー名またはパスワードが空です")
    return {
      error: "ユーザー名とパスワードを入力してください",
    }
  }

  try {
    // ダミーの認証ロジック
    console.log("認証チェック実行中...")
    if (username === "admin" && password === "password") {
      console.log("認証成功: 正しい認証情報が提供されました")

      // セッション情報を作成
      const session = createSessionToken(username)
      const sessionStr = JSON.stringify(session)

      console.log("セッション情報作成:", sessionStr.substring(0, 20) + "...")

      try {
        // Cookieにセッション情報を保存
        cookies().set({
          name: "admin_session",
          value: sessionStr,
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 1日
        })

        console.log("Cookie設定成功: admin_session")

        // セッション情報をレスポンスに含める（クライアント側でlocalStorageに保存するため）
        return {
          success: true,
          session: {
            username: session.username,
            role: session.role,
            expiresAt: session.expiresAt,
          },
        }
      } catch (cookieError) {
        console.error("Cookie設定エラー:", cookieError)
        return {
          error: "セッション情報の保存に失敗しました",
        }
      }
    }

    console.log(`認証失敗: ユーザー名またはパスワードが一致しません (入力: ${username}/${password})`)
    return {
      error: "ユーザー名またはパスワードが正しくありません",
    }
  } catch (error) {
    console.error("認証処理中の予期せぬエラー:", error)
    return {
      error: "ログイン処理中にエラーが発生しました",
    }
  } finally {
    console.log("===== サーバーアクション: adminLogin 終了 =====")
  }
}

// セッション検証関数（ミドルウェアとサーバーコンポーネントで使用）
export async function getAdminSession(): Promise<AdminSession | null> {
  const sessionCookie = cookies().get("admin_session")

  if (!sessionCookie?.value) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value) as AdminSession

    // セッションの有効期限をチェック
    if (session.expiresAt < Date.now()) {
      // 期限切れの場合はCookieを削除
      cookies().delete("admin_session")
      return null
    }

    return session
  } catch (error) {
    console.error("セッション解析エラー:", error)
    return null
  }
}

// ログアウト処理
export async function adminLogout() {
  cookies().delete("admin_session")
  redirect("/portal-admin/auth")
}

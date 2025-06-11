import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log(`===== ミドルウェア実行: パス=${pathname} =====`)

  // 管理者ページのパスかどうかをチェック
  if (pathname.startsWith("/portal-admin") && !pathname.includes("/auth")) {
    console.log("管理者ページへのアクセス検出")

    // 管理者セッションクッキーがあるかチェック
    const adminSession = request.cookies.get("admin_session")
    console.log("セッションクッキー状態:", adminSession ? `値あり (${adminSession.value.substring(0, 10)}...)` : "なし")

    // すべてのCookieをログ
    const allCookies = request.cookies.getAll()
    console.log(
      "すべてのCookies:",
      allCookies.map((c) => c.name),
    )

    // セッションがない場合、ログインページにリダイレクト
    if (!adminSession?.value) {
      console.log("認証されていないため、ログインページにリダイレクト")
      const url = new URL("/portal-admin/auth", request.url)
      console.log(`リダイレクト先: ${url.toString()}`)
      return NextResponse.redirect(url)
    }

    try {
      // セッションの検証（簡易版）
      const session = JSON.parse(adminSession.value)

      // 有効期限切れの場合
      if (session.expiresAt && session.expiresAt < Date.now()) {
        console.log("セッションの有効期限切れ")
        const url = new URL("/portal-admin/auth", request.url)
        const response = NextResponse.redirect(url)

        // 期限切れのCookieを削除
        response.cookies.delete("admin_session")

        return response
      }

      console.log("セッション検証成功: アクセス許可")
    } catch (error) {
      console.error("セッション検証エラー:", error)
      const url = new URL("/portal-admin/auth", request.url)
      return NextResponse.redirect(url)
    }
  } else {
    console.log("管理者認証不要のパス")
  }

  console.log("ミドルウェア処理完了: 次へ進む")
  return NextResponse.next()
}

export const config = {
  // 管理者関連のページにのみミドルウェアを適用
  matcher: ["/portal-admin/:path*"],
}

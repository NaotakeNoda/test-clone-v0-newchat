import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Noto Sans JPフォントを使用（銀行風のフォントに近い）
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "塾講師マッチングポータル",
  description: "塾講師を目指す方と塾をつなぐマッチングサイト",
    generator: 'v0.dev'
}

// スクロール位置をリセットするコンポーネント
function ScrollToTop() {
  // クライアントサイドでのみ実行
  if (typeof window !== "undefined") {
    // ページ遷移時にスクロール位置をトップに戻す
    window.scrollTo(0, 0)
  }
  return null
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <ScrollToTop />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

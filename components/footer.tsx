import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8 bg-secondary/30">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link href="/" className="font-semibold text-primary">
            塾講師マッチング
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} 塾講師マッチングポータル All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 md:gap-8">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary hover:underline">
            利用規約
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary hover:underline">
            プライバシーポリシー
          </Link>
          <Link href="/company" className="text-sm text-muted-foreground hover:text-primary hover:underline">
            運営会社
          </Link>
        </div>
      </div>
    </footer>
  )
}

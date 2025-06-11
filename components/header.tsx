import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { UserNav } from "./user-nav"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl text-primary tracking-tight">
            塾講師マッチング
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/search"
              className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
            >
              求人を探す
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
            >
              サービスについて
            </Link>
            <Link
              href="/company"
              className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
            >
              採用担当者の方はこちら
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Link href="/search">
              <Button variant="default" size="sm">
                求人を探す
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                ログイン
              </Button>
            </Link>
          </div>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

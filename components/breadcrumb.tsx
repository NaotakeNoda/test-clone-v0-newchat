import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className="mb-4">
      <ol className="flex flex-wrap items-center text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            ホーム
          </Link>
          {items.length > 0 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />}
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <>
                <Link href={item.href || "#"} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

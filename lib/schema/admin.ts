// 管理者用のスキーマ定義
export type Admin = {
  id: string
  username: string
  email: string
  passwordHash: string
  role: "admin" | "super_admin"
  createdAt: Date
  updatedAt: Date
  lastLoginAt: Date | null
}

// 管理者のセッション情報
export type AdminSession = {
  id: string
  adminId: string
  validUntil: Date
}

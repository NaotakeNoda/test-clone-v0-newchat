// 応募ステータスの定義
export type ApplicationStatus = "未対応" | "対応中" | "採用" | "保留" | "辞退" | "不採用"

// 応募情報のスキーマ
export type JobApplication = {
  id: string
  applicantId: string // 応募者ID
  jobId: string // 求人ID
  status: ApplicationStatus
  appliedAt: Date
  updatedAt: Date

  // 応募時に入力されたデータ
  name: string // 氏名
  nameKana: string // ふりがな
  postalCode: string // 郵便番号
  phone: string // 電話番号
  email: string // メールアドレス
  university: string // 大学名
  grade: string // 学年
  birthYear: string // 生年
  academicType: "liberal" | "science" // 文系/理系
  teachableSubjects: {
    elementary: string[] // 小学生向け指導可能科目
    junior: string[] // 中学生向け指導可能科目
    high: string[] // 高校生向け指導可能科目
  }
  selfPR: string // 自己PR

  // 面接や選考に関するメモ（管理者・企業用）
  internalNotes: string

  // 選考プロセスの履歴
  statusHistory: {
    status: ApplicationStatus
    changedAt: Date
    changedBy: string // 変更者のID
    note: string // 変更理由など
  }[]
}

// 応募者のスキーマ（ユーザーテーブルと関連）
export type Applicant = {
  id: string
  userId: string // ユーザーID
  applications: string[] // 応募IDのリスト

  // 応募者の基本情報
  name: string
  email: string
  phone: string
  university: string
  grade: string

  // その他の情報
  createdAt: Date
  updatedAt: Date
}

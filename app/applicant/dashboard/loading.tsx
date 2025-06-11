export default function DashboardLoading() {
  return (
    <div className="container py-10">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-6"></div>
      <div className="space-y-6">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CreateTrainingLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-96 animate-pulse"></div>
        </div>

        <div className="space-y-6">
          {/* Үндсэн мэдээлэл skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-72 animate-pulse"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-32 animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24 animate-pulse"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-28 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-36 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-32 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Модулиуд skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-56 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-80 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 space-y-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-40 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-16 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-20 animate-pulse"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
                <div className="flex justify-end">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-32 animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Товчлууруудын skeleton */}
          <div className="flex justify-end gap-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-36 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

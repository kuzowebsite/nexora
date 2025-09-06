import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TrainingDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Training Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Skeleton className="h-15 w-15 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Card>
              <CardContent className="p-0">
                <div className="p-6">
                  <Skeleton className="h-6 w-40 mb-4" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Image */}
            <Card>
              <CardContent className="p-0">
                <Skeleton className="aspect-video w-full rounded-t-lg" />
              </CardContent>
            </Card>

            {/* Enrollment Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Skeleton className="h-10 w-24 mx-auto mb-2" />
                  <Skeleton className="h-6 w-16 mx-auto mb-4" />
                </div>

                <Skeleton className="h-12 w-full mb-4" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full" />

                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>

                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

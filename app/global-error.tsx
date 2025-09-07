"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Системийн алдаа</h2>
            <p className="text-zinc-600 mb-6">Уучлаарай, системд ноцтой алдаа гарлаа.</p>
            <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Дахин оролдох
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

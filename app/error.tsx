'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <h1
        className="text-white font-bold text-4xl sm:text-6xl mb-4"
        style={{ fontFamily: 'var(--font-k2d)' }}
      >
        Oops!
      </h1>
      <p
        className="text-white/50 text-base sm:text-lg mb-10 max-w-sm leading-relaxed"
        style={{ fontFamily: 'var(--font-k2d)' }}
      >
        Something went sideways. Please try again or come back shortly.
      </p>
      <button
        onClick={reset}
        className="rounded-full border-2 border-[#0A64BC] text-[#0A64BC] px-8 py-3 text-lg font-bold hover:bg-[#0A64BC]/10 transition-colors"
        style={{ fontFamily: 'var(--font-jersey10)' }}
      >
        Try Again
      </button>
    </div>
  )
}

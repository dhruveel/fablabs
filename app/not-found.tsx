import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <h1
        className="font-black leading-none text-white/10 select-none"
        style={{ fontFamily: 'var(--font-k2d)', fontSize: 'clamp(120px, 30vw, 300px)' }}
        aria-hidden
      >
        404
      </h1>
      <p
        className="text-white text-2xl sm:text-4xl font-bold -mt-8 sm:-mt-14 mb-4"
        style={{ fontFamily: 'var(--font-k2d)' }}
      >
        Page Not Found
      </p>
      <p
        className="text-white/50 text-base sm:text-lg mb-10 max-w-sm leading-relaxed"
        style={{ fontFamily: 'var(--font-k2d)' }}
      >
        Yeh page toh nahi mila — par custom merch zaroor milega.
      </p>
      <Link
        href="/"
        className="rounded-full border-2 border-[#0A64BC] text-[#0A64BC] px-8 py-3 text-lg font-bold hover:bg-[#0A64BC]/10 transition-colors"
        style={{ fontFamily: 'var(--font-jersey10)' }}
      >
        Go Home
      </Link>
    </div>
  )
}

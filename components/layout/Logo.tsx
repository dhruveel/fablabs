import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="FabLabs — Home"
      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A64BC]/50 rounded-sm"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="44" height="44" rx="6" fill="#0A64BC" />
        <path
          d="M10 12h10v4H14v4h6v4h-6v8h-4V12zM22 12h8c2.2 0 4 1.8 4 4v2c0 1.5-.8 2.8-2 3.5L34 32h-4.5l-1.8-9H26v9h-4V12zm4 4v4h3.5c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5H26z"
          fill="white"
        />
      </svg>
      <span className="text-3xl font-bold tracking-tight text-[#0A64BC]">
        FabLabs
      </span>
    </Link>
  );
}

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="h-28 w-full border-b border-border/40 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center px-8">
        {/* Logo — left */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop navigation — center */}
        <div className="hidden flex-1 justify-center md:flex">
          <Navigation />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
          <Link href="/shop" aria-label="View shop">
            <Button variant="ghost" size="icon" className="text-[#0A64BC]/70 hover:text-[#0A64BC]">
              <ShoppingBagIcon className="size-5" />
            </Button>
          </Link>

          {/* Hamburger — mobile only */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

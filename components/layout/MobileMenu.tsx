"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
          />
        }
      >
        <MenuIcon className="size-5 text-[#0A64BC]" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-left text-[#0A64BC]">
            FabLabs
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="px-4 py-6">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <SheetClose
                    render={
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#0A64BC]/10 text-[#0A64BC]"
                            : "text-[#0A64BC]/70 hover:bg-[#0A64BC]/5 hover:text-[#0A64BC]"
                        )}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

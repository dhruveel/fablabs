"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-8" role="list">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-lg font-medium text-[#0A64BC] transition-opacity duration-150",
                  "after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0A64BC] after:transition-opacity after:duration-150",
                  isActive
                    ? "opacity-100 after:opacity-100"
                    : "opacity-[0.69] after:opacity-0 hover:opacity-100"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/data/navigation";

const LOGO = "/assets/logo.png";

export function DarkNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-360 items-center gap-4 px-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={LOGO}
            alt="FabLabs"
            width={200}
            height={48}
            className="h-12 w-auto object-contain"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-[#0A64BC]/70 hover:text-[#0A64BC] hover:bg-[#0A64BC]/10 text-sm font-bold px-4 py-2 rounded-full"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: cart + mobile menu */}
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <Link href="/shop" aria-label="View shop">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#0A64BC]/70 hover:text-[#0A64BC]"
            >
              <ShoppingBagIcon className="size-5" />
            </Button>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    className="text-[#0A64BC]/70 hover:text-[#0A64BC]"
                  />
                }
              >
                <MenuIcon className="size-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-black/95 border-l border-white/10 w-72 p-0 text-white"
              >
                <SheetHeader className="border-b border-white/10 px-6 py-5">
                  <SheetTitle className="text-left text-[#0A64BC]">
                    FabLabs
                  </SheetTitle>
                </SheetHeader>
                <nav className="px-4 py-6" aria-label="Mobile navigation">
                  <ul className="flex flex-col gap-1" role="list">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <SheetClose
                          render={
                            <Link
                              href={item.href}
                              className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-bold text-[#0A64BC]/70 hover:bg-[#0A64BC]/10 hover:text-[#0A64BC] transition-colors"
                            />
                          }
                        >
                          {item.label}
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

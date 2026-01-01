"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { DollarSign, History, Menu, Package, ShoppingCart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Products",
      icon: Package,
      active: pathname === "/",
    },
    {
      href: "/sales",
      label: "Sales",
      icon: ShoppingCart,
      active: pathname === "/sales",
    },
    {
      href: "/sales/history",
      label: "History",
      icon: History,
      active: pathname === "/sales/history",
    },
    {
      href: "/receivables",
      label: "Receivables",
      icon: DollarSign,
      active: pathname === "/receivables",
    },
    {
      href: "/financial",
      label: "Financial",
      icon: TrendingUp,
      active: pathname === "/financial",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center px-4">
        {/* Desktop Navigation */}
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 transition-all group-hover:shadow-xl group-hover:shadow-primary/30">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                StockFlow
              </span>
              <span className="text-[10px] text-muted-foreground leading-none mt-1">Management System</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  route.active
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <Icon className="h-4 w-4" />
                {route.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-1 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-base bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
              StockFlow
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {routes.map((route) => {
                    const Icon = route.icon
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                          route.active
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {route.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

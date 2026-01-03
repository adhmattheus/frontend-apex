"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  ChevronDown,
  DollarSign,
  History,
  Home,
  Menu,
  Package,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navGroups = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      label: "Sales",
      icon: ShoppingCart,
      active: pathname.startsWith("/sales") || pathname === "/customers",
      items: [
        { href: "/sales", label: "New Sale", icon: ShoppingCart },
        { href: "/sales/history", label: "Sales History", icon: History },
        { href: "/customers", label: "Customers", icon: Users },
      ],
    },
    {
      label: "Inventory",
      icon: Package,
      active:
        pathname === "/products" ||
        pathname === "/purchases" ||
        pathname === "/suppliers",
      items: [
        { href: "/products", label: "Products", icon: Package },
        { href: "/purchases", label: "Purchase Orders", icon: ShoppingBag },
        { href: "/suppliers", label: "Suppliers", icon: Building2 },
      ],
    },
    {
      label: "Finance",
      icon: DollarSign,
      active:
        pathname === "/financial" ||
        pathname === "/receivables" ||
        pathname === "/expenses",
      items: [
        { href: "/financial", label: "Dashboard", icon: TrendingUp },
        { href: "/receivables", label: "Receivables", icon: DollarSign },
        { href: "/expenses", label: "Expenses", icon: Receipt },
      ],
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      active: pathname === "/analytics",
    },
  ];

  return (
    <header className="flex h-16 items-center sticky top-0 z-50 w-full border-b border-primary/15 bg-background backdrop-blur supports-backdrop-filter:bg-background/80 justify-between px-4 ">
      <div className="hidden md:flex">
        <Link href="/" className="flex items-center group gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20 transition-all group-hover:shadow-xl group-hover:shadow-primary/30">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
              Apex
            </span>
            <span className="text-[10px] text-muted-foreground leading-none mt-1">
              Management System
            </span>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {navGroups.map((group) => {
          const Icon = group.icon;

          // Single link items (no dropdown)
          if (group.href) {
            return (
              <Link
                key={group.href}
                href={group.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  group.active
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                {group.label}
              </Link>
            );
          }
          return (
            <DropdownMenu key={group.label}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 h-auto",
                    group.active
                      ? "bg-primary/15 text-primary shadow-sm backdrop-blur-sm hover:bg-primary/20 hover:text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 backdrop-blur-sm"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 glass dark:glass-dark"
              >
                {group.items?.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 cursor-pointer",
                          pathname === item.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <ItemIcon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>

      <div className="hidden md:flex items-center">
        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden flex-1 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary/90 shadow-lg shadow-primary/25 transition-all group-hover:scale-105">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            StockFlow
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-accent/50"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navGroups.map((group) => {
                  const Icon = group.icon;

                  // Single link items
                  if (group.href) {
                    return (
                      <Link
                        key={group.href}
                        href={group.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          group.active
                            ? "bg-primary/15 text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {group.label}
                      </Link>
                    );
                  }

                  // Grouped items
                  return (
                    <div key={group.label} className="space-y-1">
                      <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                        <Icon className="h-4 w-4" />
                        {group.label}
                      </div>
                      <div className="space-y-1 pl-2">
                        {group.items?.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                pathname === item.href
                                  ? "bg-primary/15 text-primary shadow-sm"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                              )}
                            >
                              <ItemIcon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

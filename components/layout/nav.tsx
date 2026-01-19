"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { mainMenu } from "@/app/data/navsData";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PDFIcon from "@/components/icons/pdfIcon";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function Nav({ className, children, id }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10); // adjust threshold if you want
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b bg-background",
        "transition-[background-color,backdrop-filter,box-shadow] duration-1000 ease-in-out",
        scrolled && "bg-background/50 backdrop-blur-md shadow-sm",
        className,
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="mx-auto flex max-w-5xl items-center justify-between py-2 px-6 sm:px-8"
      >
        <Link
          className="flex items-center gap-4 transition-all hover:opacity-75"
          href="/"
        >
          {/* <PDFIcon className="text-foreground" /> */}
          <img
            src="http://www.alfredorafael.com/wp-content/uploads/2019/02/myLogo.png"
            alt="Logo"
            className="max-w-16 h-auto"
          />
          <h2 className="hidden text-sm">{siteConfig.site_name}</h2>
        </Link>

        {children}

        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>

          <Button asChild className="hidden sm:flex">
            <Link href="/contact">Contact</Link>
          </Button>
          {/* <ThemeToggle /> */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}

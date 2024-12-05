"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex">
      <Link href="/" className="mr-8 flex items-center space-x-2">
        <Image
          src="/images/plura-logo.png"
          alt="logo"
          width={30}
          height={30}
          className="rounded-md"
        />
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
        <Link
          href="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/about")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          About
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/features">
                <NavigationMenuTrigger
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/features")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  Features
                </NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[1000px] grid-cols-3 grid-flow-col max-h-[80vh]">
                  <li className="row-span-6">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/40 to-muted p-6 no-underline outline-none transition-all duration-300 ease-in-out hover:scale-[1.02] focus:shadow-md hover:from-muted/60 hover:to-muted group"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Feature 1
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground/60 group-hover:text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/40 to-muted p-6 no-underline outline-none transition-all duration-300 ease-in-out hover:scale-[1.02] focus:shadow-md hover:from-muted/60 hover:to-muted group"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Feature 2{" "}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground/60 group-hover:text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/40 to-muted p-6 no-underline outline-none transition-all duration-300 ease-in-out hover:scale-[1.02] focus:shadow-md hover:from-muted/60 hover:to-muted group"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Feature 3{" "}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground/60 group-hover:text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/40 to-muted p-6 no-underline outline-none transition-all duration-300 ease-in-out hover:scale-[1.02] focus:shadow-md hover:from-muted/60 hover:to-muted group"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Feature 4{" "}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground/60 group-hover:text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/40 to-muted p-6 no-underline outline-none transition-all duration-300 ease-in-out hover:scale-[1.02] focus:shadow-md hover:from-muted/60 hover:to-muted group"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Feature 5
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground/60 group-hover:text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/40 to-muted p-6 no-underline outline-none transition-all duration-300 ease-in-out hover:scale-[1.02] focus:shadow-md hover:from-muted/60 hover:to-muted group"
                        href="/"
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Feature 6
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground/60 group-hover:text-muted-foreground">
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href="/methods"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/methods")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Methods
        </Link>
        <Link
          href="/integrations"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/integrations")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Integrations
        </Link>
        <Link
          href="/pricing"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/pricing")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Pricing
        </Link>
        <Link
          href="https://status.plura.pro"
          target="_blank"
          rel="noreferrer"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/colors")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Status
        </Link>
        <Link
          href="/contact"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/contact")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}

"use client";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-[500] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-3">
      <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/images/plura-logo.png"
            alt="logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <p className="font-bold text-xl tracking-tighter">Plura Ai</p>
          <Badge variant={"outline"} className="px-2">
            Beta
          </Badge>
        </Link>

        <Link href={"https://l.devwtf.in/plura-dc"}>
      <Button size={"sm"} variant={"secondary"} className="ml-4">
              Get Updates
            </Button>
        </Link>
      </div>
    </header>
  )
}

import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="flex flex-col items-center gap-4 md:h-24 md:flex-row">
        <p className="inline-flex gap-1 text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Powered by <Link href={"https://l.devwtf.in/plura-x"} className='hover:underline font-semibold text-primary cursor-pointer'>Plura Ai</Link>
        </p>
      </div>
    </footer>
  )
}

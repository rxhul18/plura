'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  title: string
}

interface TableOfContentsProps {
  sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav className="space-y-1 sticky top-16">
      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">On this page</h3>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={cn(
            'block text-sm py-1 px-2 rounded-md transition-colors duration-200 ease-in-out',
            activeSection === section.id
              ? 'bg-muted font-medium text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {section.title}
        </a>
      ))}
    </nav>
  )
}


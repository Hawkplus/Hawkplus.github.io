import { useEffect, useState } from 'react'

type NavigationItem = { id: string; label: string }

export function Navigation({ items }: { items: NavigationItem[] }) {
  const [active, setActive] = useState('')
  const sectionIds = items.map((item) => item.id).join(',')

  useEffect(() => {
    const sections = sectionIds.split(',').map((id) => document.getElementById(id))
    let frame: number | null = null
    const update = () => {
      frame = null
      const readingLine = Math.min(window.innerHeight * 0.4, 280)
      let current = ''
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= readingLine) current = section.id
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        // Near the footer, two anchors may share the same clamped scroll position.
        // Preserve the explicitly requested section while it is still visible.
        const linkedSection = sections.find((section) => section && `#${section.id}` === window.location.hash)
        const linkedBounds = linkedSection?.getBoundingClientRect()
        current = linkedBounds && linkedBounds.top < window.innerHeight && linkedBounds.bottom > 112
          ? linkedSection!.id
          : sections.at(-1)?.id ?? current
      }
      setActive(current)
    }
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [sectionIds])

  return (
    <nav aria-label="主导航">
      {items.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>
      ))}
    </nav>
  )
}

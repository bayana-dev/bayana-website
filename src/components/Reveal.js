import { useEffect } from 'react'

/**
 * Site-wide scroll animations (no extra library — keeps the bundle light for Core Web Vitals).
 * - Any element with `data-reveal` (optionally "left" | "right" | "zoom" | "fade") fades in when it
 *   scrolls into view. Stagger with style={{ '--d': '120ms' }}.
 * - Elements with `.draw-line` animate their width when visible.
 * - `.spotlight` cards get a soft green light that follows the pointer.
 * Without JavaScript nothing is hidden (the `js` class on <html> is added in index.html).
 */
export function useReveal(pathname) {
  useEffect(() => {
    const els = () => document.querySelectorAll('[data-reveal]:not(.is-in), .draw-line:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      els().forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    const scan = () => els().forEach((el) => io.observe(el))
    scan()
    // Catch elements rendered later (accordions, menus, route changes)
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.('.spotlight')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--x', `${e.clientX - r.left}px`)
      card.style.setProperty('--y', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

// Helper: spread on an element → <div {...reveal(2)}> staggers by 2 × 90 ms
export const reveal = (i = 0, type = true, step = 90) => ({
  'data-reveal': type === true ? '' : type,
  style: { '--d': `${i * step}ms` },
})

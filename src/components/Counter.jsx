import { useEffect, useRef, useState } from 'react'

// Number that counts up when it scrolls into view. Server-rendered with the final value (good for SEO/no-JS).
export default function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(to)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setVal(0)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration)
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

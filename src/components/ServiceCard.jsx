import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { serviceBySlug } from '../siteConfig'
import ServiceIcon from './ServiceIcon'
import { reveal } from './Reveal'

export default function ServiceCard({ slug, index = 0, number }) {
  const s = serviceBySlug[slug]
  return (
    <Link
      to={`/${slug}`}
      {...reveal(index % 4)}
      className="card card-hover spotlight group flex h-full flex-col overflow-hidden"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-100/0 blur-2xl transition duration-500 group-hover:bg-brand-100/80" />
      <div className="relative mb-6 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
          <ServiceIcon slug={slug} className="h-[22px] w-[22px]" />
        </span>
        {number && <span className="font-display text-sm font-bold text-gray-300 transition group-hover:text-brand-300">{String(number).padStart(2, '0')}</span>}
      </div>
      <h3 className="relative mb-2 text-lg transition group-hover:text-brand-800 md:text-xl">{s.short}</h3>
      <p className="relative mb-6 flex-1 text-[15px] leading-relaxed text-body/90">{s.cardText}</p>
      <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
        Learn more
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 transition duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  )
}

// Phones: a swipeable row of cards (snap scrolling). Tablet/desktop: a grid.
export function CardGrid({ slugs, cols = 'lg:grid-cols-3', numbered = false }) {
  const swipe = slugs.length > 1
  return (
    <div
      className={`${swipe ? 'no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-1 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0' : 'grid'} sm:grid-cols-2 md:gap-5 ${cols}`}
    >
      {slugs.map((s, i) => (
        <div key={s} className={swipe ? 'w-[84%] shrink-0 snap-start scroll-ml-5 sm:w-auto' : ''}>
          <ServiceCard slug={s} index={i} number={numbered ? i + 1 : undefined} />
        </div>
      ))}
    </div>
  )
}

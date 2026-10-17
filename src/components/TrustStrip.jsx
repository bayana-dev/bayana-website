import { BadgeCheck, Briefcase, Building2, Landmark, Layers, LifeBuoy, Plane } from 'lucide-react'

const trust = [
  { icon: Landmark, text: 'ADGM-Registered Company located in Addax Tower' },
  { icon: BadgeCheck, text: '1,000+ ADGM Incorporations & Migration' },
  { icon: Building2, text: 'All Types of Company Formation' },
  { icon: Layers, text: 'SPV & Foundation Formation' },
  { icon: Briefcase, text: 'Financial Licensing Support' },
  { icon: Plane, text: 'Office & Visa Solutions' },
  { icon: LifeBuoy, text: 'Post-Registration Support' },
]

const Row = ({ hidden }) => (
  <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
    {trust.map(({ icon: Icon, text }) => (
      <li key={text} className="flex items-center gap-3 whitespace-nowrap font-medium text-ink">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-600 shadow-soft ring-1 ring-brand-100">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        {text}
        <span className="ml-6 h-1.5 w-1.5 rounded-full bg-brand-300" />
      </li>
    ))}
  </ul>
)

// Infinite trust marquee (pauses on hover)
function TrustStrip() {
  return (
    <section aria-label="Why clients trust Bayana" className="group relative overflow-hidden border-b border-brand-100 bg-brand-50 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-50 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-50 to-transparent md:w-40" />
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}

export default TrustStrip

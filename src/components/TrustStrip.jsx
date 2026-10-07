import { BadgeCheck, Briefcase, Landmark, MapPin, Plane, Stamp } from 'lucide-react'

const trust = [
  { icon: Landmark, text: 'Registered in ADGM' },
  { icon: BadgeCheck, text: '500+ DED-to-ADGM conversions & related cases' },
  { icon: Briefcase, text: 'Financial, non-financial and retail businesses' },
  { icon: MapPin, text: 'Office at Addax Tower, Al Reem Island' },
  { icon: Plane, text: 'Establishment card, visas & work permits' },
  { icon: Stamp, text: 'ADGM Courts notary & wills coordination' },
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

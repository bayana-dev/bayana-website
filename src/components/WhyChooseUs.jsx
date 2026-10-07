import { BadgeCheck, Building2, Users } from 'lucide-react'
import { reveal } from './Reveal'

// The three proof points used on every service page (blueprint section 3)
const points = [
  { icon: Building2, title: 'On Al Reem Island', text: 'Our office is at 3812 Addax Tower, inside ADGM’s Al Reem Island jurisdiction.' },
  { icon: BadgeCheck, title: '500+ licence conversions', text: 'Hands-on experience with DED-to-ADGM conversions and related cases.' },
  { icon: Users, title: 'One point of contact', text: 'Licence, visas and office handled by one team — no chasing multiple providers.' },
]

export default function WhyChooseUs() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
      {points.map(({ icon: Icon, title, text }, i) => (
        <div key={title} {...reveal(i, true, 120)} className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 transition duration-500 hover:-translate-y-1 hover:shadow-lift">
          <span className="absolute -right-6 -top-6 font-display text-[7rem] font-extrabold leading-none text-brand-100/70 transition group-hover:text-brand-200/70">{i + 1}</span>
          <span className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="relative mb-1 text-lg">{title}</h3>
          <p className="relative text-[15px] leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  )
}

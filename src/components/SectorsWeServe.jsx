import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Check, Landmark, ShoppingBag } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { reveal } from './Reveal'

const advantages = [
  ['Dedicated ADGM focus', 'Financial, non-financial and retail businesses in ADGM are our core work.'],
  ['500+ licence conversion cases', 'Hands-on DED-to-ADGM conversion experience on Al Reem Island.'],
  ['Incorporation to visa to office in one place', 'One team, one point of contact, no chasing providers.'],
  ['AccessRP and government-procedure support', 'Lease registration, establishment card and ACCESSADGM.'],
  ['Notary and court coordination', 'Documents prepared for the ADGM Courts Notary Public.'],
  ['Network of AML and specialist partners', 'MLRO, translation and attestation through trusted UAE providers.'],
]

const sectors = [
  { icon: Landmark, title: 'Financial', text: 'Asset managers, advisers, brokers and fintech firms — alongside your FSRA consultant.', to: '/adgm-financial-services-company-setup' },
  { icon: Building2, title: 'Non-Financial', text: 'Consultancies, tech, holding, trading and professional services firms.', to: '/adgm-non-financial-company-setup' },
  { icon: ShoppingBag, title: 'Retail', text: 'Shops, restaurants, cafés and salons on Al Reem Island.', to: '/adgm-retail-licence' },
]

// Home: "Why Choose Bayana" (6 advantages) + "Sectors We Serve" on a deep-green band
function SectorsWeServe() {
  return (
    <section className="noise relative isolate overflow-hidden bg-brand-950 text-brand-50">
      <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
      <div className="absolute -right-40 top-0 -z-10 h-[520px] w-[520px] animate-drift rounded-full bg-brand-600/25 blur-[130px]" />
      <div className="section container grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div>
          <SectionHeader dark eyebrow="Why Bayana" title="Why Choose Bayana" id="why-bayana" intro="A single point of coordination for establishing and running your business in ADGM." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {advantages.map(([t, d], i) => (
              <li key={t} {...reveal(i % 2, true, 120)} className="glass group rounded-2xl p-4 transition sm:p-5 duration-500 hover:-translate-y-1 hover:bg-white/15">
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-brand-950 transition group-hover:scale-110">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <h3 className="mb-1 text-base text-white">{t}</h3>
                <p className="text-sm leading-relaxed text-brand-50/70">{d}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeader dark eyebrow="Sectors" title="Sectors We Serve" id="sectors" />
          <div className="space-y-4">
            {sectors.map(({ icon: Icon, title, text, to }, i) => (
              <Link key={title} to={to} {...reveal(i, 'right', 140)} className="group relative flex items-center gap-5 overflow-hidden rounded-3xl bg-white p-5 text-body shadow-2xl transition duration-500 hover:-translate-y-1 md:p-6">
                <span className="absolute inset-y-0 left-0 w-1 bg-brand-600 transition-all duration-500 group-hover:w-2" />
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition duration-500 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-ink">{title}</span>
                  <span className="text-sm leading-relaxed">{text}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectorsWeServe

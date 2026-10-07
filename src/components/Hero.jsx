import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, CircleCheck, FileCheck2, MapPin, Plane, Sparkles } from 'lucide-react'
import { business, whatsappLink } from '../siteConfig'
import { WhatsAppIcon } from './Icons'
import heroImg from '../assets/adgm-corporate-services-al-reem-island.webp'
import heroImgMobile from '../assets/adgm-corporate-services-al-reem-island-960.webp'

// The ADGM journey shown on the floating card (from the PDF: licence → establishment card → visas → office)
const journey = [
  { icon: FileCheck2, title: 'Company registered', text: 'ADGM Registration Authority' },
  { icon: BadgeCheck, title: 'Commercial licence issued', text: 'Financial, non-financial or retail' },
  { icon: Plane, title: 'Establishment card & visas', text: 'Director, employee & dependent' },
  { icon: Building2, title: 'Office & lease on AccessRP', text: 'Via Aegis Coworking, Addax Tower' },
]

// Home hero. Hero text and buttons animate with CSS on load (no JS needed → fast LCP)
function Hero() {
  return (
    <section className="noise relative isolate overflow-hidden bg-brand-950 text-white">
      {/* Background: Al Reem Island skyline + brand-green overlays */}
      <picture>
        <source media="(max-width: 767px)" srcSet={heroImgMobile} />
        <img
          src={heroImg}
          alt="Al Reem Island skyline in Abu Dhabi Global Market (ADGM), home of Bayana's office at Addax Tower"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full animate-kenburns object-cover object-[65%_center] opacity-60"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/95 via-brand-950/80 to-brand-950/95 lg:bg-gradient-to-r lg:from-brand-950 lg:via-brand-950/85 lg:to-brand-950/30" />
      <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
      <div className="absolute -left-32 top-10 -z-10 h-[420px] w-[420px] animate-drift rounded-full bg-brand-600/30 blur-[110px]" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[460px] w-[460px] animate-drift rounded-full bg-brand-500/20 blur-[120px] [animation-delay:-6s]" />

      <div className="container grid items-center gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_.85fr] lg:pb-28 lg:pt-24">
        <div>
          <p className="eyebrow-dark animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" /> Registered in Abu Dhabi Global Market
          </p>
          <h1 className="animate-fade-up text-[2.45rem] font-extrabold leading-[1.05] text-white [animation-delay:80ms] sm:text-6xl lg:text-[4.1rem]">
            ADGM Corporate Services <span className="text-gradient-light">in Abu Dhabi</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-[17px] leading-relaxed text-brand-50/85 [animation-delay:160ms] md:text-xl">
            ADGM corporate services in Abu Dhabi — company formation, licensing, visas, filings and office space for
            ADGM businesses, handled by one team on Al Reem Island.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whatsapp" data-track="whatsapp">
              <WhatsAppIcon /> WhatsApp us
            </a>
            <Link to="/contact" className="btn-ghost-light">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-10 grid max-w-xl animate-fade-up grid-cols-3 gap-3 border-t border-white/10 pt-8 [animation-delay:320ms]">
            {[
              ['500+', 'DED-to-ADGM conversions & related cases'],
              ['3', 'sectors: financial, non-financial, retail'],
              ['1', 'team for licence, visas & office'],
            ].map(([n, t]) => (
              <li key={t}>
                <p className="font-display text-3xl font-extrabold text-white md:text-4xl">{n}</p>
                <p className="mt-1 text-xs leading-snug text-brand-50/70 md:text-[13px]">{t}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Floating journey card */}
        <div className="relative hidden animate-fade-up [animation-delay:300ms] lg:block">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-500/30 to-transparent blur-2xl" />
          <div className="glass relative animate-float rounded-[2rem] p-7 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-lg font-bold">Your ADGM journey</p>
              <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-200">One point of contact</span>
            </div>
            <ol className="relative space-y-5">
              <span className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-brand-400 to-white/10" aria-hidden="true" />
              {journey.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="relative flex animate-fade-up items-center gap-4" style={{ animationDelay: `${520 + i * 140}ms` }}>
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white ring-4 ring-brand-950/60">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{title}</span>
                    <span className="text-sm text-brand-50/70">{text}</span>
                  </span>
                  <CircleCheck className="h-5 w-5 text-brand-400" />
                </li>
              ))}
            </ol>
            <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm">
              <MapPin className="h-5 w-5 shrink-0 text-brand-300" />
              <span>{business.street}, {business.area}, {business.city}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

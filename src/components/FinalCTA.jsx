import { Clock, MapPin, Phone } from 'lucide-react'
import { business, whatsappLink } from '../siteConfig'
import { WhatsAppIcon } from './Icons'
import { reveal } from './Reveal'

// Simple contact band (no form): WhatsApp or call
export default function FinalCTA({ service = '' }) {
  return (
    <section className="section" id="contact-form" aria-labelledby="cta-title">
      <div className="container">
        <div className="noise relative isolate overflow-hidden rounded-[2rem] bg-brand-950 px-5 py-12 text-center text-white sm:px-8 md:rounded-[2.5rem] md:py-16">
          <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
          <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 animate-drift rounded-full bg-brand-600/40 blur-[100px]" />
          <div className="absolute -bottom-32 right-10 -z-10 h-96 w-96 animate-drift rounded-full bg-brand-500/20 blur-[110px] [animation-delay:-7s]" />

          <p {...reveal(0)} className="eyebrow-dark"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" /> We reply the same working day</p>
          <h2 id="cta-title" {...reveal(1)} className="section-title text-white">Talk to us on WhatsApp</h2>
          <p {...reveal(2)} className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-brand-50/80 md:text-lg">
            Tell us what you need{service ? ` with ${service}` : ''} and an ADGM specialist will reply the same working day. Or visit us at {business.street}, {business.area}.
          </p>

          <div {...reveal(3)} className="mx-auto mt-8 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappLink(service ? `Hello Bayana, I need help with: ${service}` : undefined)} target="_blank" rel="noopener" className="btn-whatsapp" data-track="whatsapp">
              <WhatsAppIcon /> WhatsApp {business.phone}
            </a>
            <a href={business.phoneHref} className="btn-ghost-light" data-track="call"><Phone className="h-4 w-4" /> Call now</a>
          </div>

          <ul {...reveal(4)} className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 border-t border-white/10 pt-8 text-sm text-brand-50/80 md:flex-row md:gap-8">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand-400" /> {business.street}, {business.area}, {business.city}</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-brand-400" /> Mon–Thu 8:00–17:00 · Fri 8:00–11:30</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
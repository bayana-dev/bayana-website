import { CircleCheck, Clock, Phone } from 'lucide-react'
import Breadcrumbs from './Breadcrumbs'
import { WhatsAppIcon } from './Icons'
import { business, whatsappLink } from '../siteConfig'

// Top section of inner pages: breadcrumbs + H1 + intro (+ optional quick-contact card on desktop)
function PageHero({ crumbs, title, eyebrow, children, aside = true, service }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-brand-100/70 bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="bg-grid mask-fade absolute inset-0 -z-10" />
      <div className="absolute -right-24 -top-32 -z-10 h-[420px] w-[420px] animate-drift rounded-full bg-brand-200/60 blur-[110px]" />
      <div className="absolute -left-40 bottom-0 -z-10 h-[300px] w-[300px] animate-drift rounded-full bg-brand-100/80 blur-[100px] [animation-delay:-5s]" />
      <div className={`container grid gap-10 py-10 md:py-16 ${aside ? 'lg:grid-cols-[1fr_340px] lg:items-end lg:gap-14' : ''}`}>
        <div className="max-w-3xl">
          {crumbs && <div className="animate-fade-in"><Breadcrumbs items={crumbs} /></div>}
          {eyebrow && <p className="eyebrow mt-6 animate-fade-up"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{eyebrow}</p>}
          <h1 className={`${eyebrow ? '' : 'mt-6'} mb-5 animate-fade-up text-[2rem] font-extrabold leading-[1.1] [animation-delay:80ms] sm:text-5xl lg:text-[3.4rem]`}>{title}</h1>
          <div className="animate-fade-up [animation-delay:160ms]">{children}</div>
        </div>
        {aside && (
          <aside className="hidden animate-fade-up rounded-3xl border border-brand-100 bg-white/80 p-6 shadow-lift backdrop-blur [animation-delay:260ms] lg:block" aria-label="Quick contact">
            <p className="font-display text-lg font-bold text-ink">Speak to an ADGM specialist</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Free first consultation', 'One point of contact', 'Office at Addax Tower, Al Reem'].map((t) => (
                <li key={t} className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-brand-600" />{t}</li>
              ))}
            </ul>
            <div className="mt-5 grid gap-2">
              <a href={whatsappLink(service ? `Hello Bayana, I need help with: ${service}` : undefined)} target="_blank" rel="noopener" className="btn-whatsapp !min-h-[44px] w-full" data-track="whatsapp"><WhatsAppIcon className="h-4 w-4" /> WhatsApp us</a>
              <a href={business.phoneHref} className="btn-outline !min-h-[44px] w-full" data-track="call"><Phone className="h-4 w-4" /> {business.phone}</a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-body/70"><Clock className="h-3.5 w-3.5" /> Mon–Thu 8–17 · Fri 8–11:30</p>
          </aside>
        )}
      </div>
    </section>
  )
}

export default PageHero

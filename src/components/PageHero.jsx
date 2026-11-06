// import { CircleCheck, Clock, Phone } from 'lucide-react'
// import Breadcrumbs from './Breadcrumbs'
// import { WhatsAppIcon } from './Icons'
// import { business, whatsappLink } from '../siteConfig'

// // Top section of inner pages: breadcrumbs + H1 + intro (+ optional quick-contact card on desktop)
// function PageHero({ crumbs, title, eyebrow, children, aside = false, service }) {
//   return (
//     <section className="relative isolate overflow-hidden border-b border-brand-100/70 bg-gradient-to-b from-brand-50 via-white to-white">
//       <div className="bg-grid mask-fade absolute inset-0 -z-10" />
//       <div className="absolute -right-24 -top-32 -z-10 h-[420px] w-[420px] animate-drift rounded-full bg-brand-200/60 blur-[110px]" />
//       <div className="absolute -left-40 bottom-0 -z-10 h-[300px] w-[300px] animate-drift rounded-full bg-brand-100/80 blur-[100px] [animation-delay:-5s]" />
//             <div className={`container grid gap-10 pt-10 pb-6 md:pt-16 md:pb-8 ${aside ? 'lg:grid-cols-[1fr_340px] lg:items-end lg:gap-14' : ''}`}>
//                      <div className="mx-auto max-w-5xl py-4 text-center md:py-8">
//           <h1 className="animate-fade-up text-[1.7rem] font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">{title}</h1>
//           <div className="mx-auto mt-4 max-w-4xl animate-fade-up [animation-delay:120ms]">{children}</div>
//         </div>
//         {aside && (
//           <aside className="hidden animate-fade-up rounded-3xl border border-brand-100 bg-white/80 p-6 shadow-lift backdrop-blur [animation-delay:260ms] lg:block" aria-label="Quick contact">
//             <p className="font-display text-lg font-bold text-ink">Speak to an ADGM specialist</p>
//             <ul className="mt-4 space-y-2.5 text-sm">
//               {['Free first consultation', 'One point of contact', 'Office at Addax Tower, Al Reem'].map((t) => (
//                 <li key={t} className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-brand-600" />{t}</li>
//               ))}
//             </ul>
//             <div className="mt-5 grid gap-2">
//               <a href={whatsappLink(service ? `Hello Bayana, I need help with: ${service}` : undefined)} target="_blank" rel="noopener" className="btn-whatsapp !min-h-[44px] w-full" data-track="whatsapp"><WhatsAppIcon className="h-4 w-4" /> WhatsApp us</a>
//               <a href={business.phoneHref} className="btn-outline !min-h-[44px] w-full" data-track="call"><Phone className="h-4 w-4" /> {business.phone}</a>
//             </div>
//             <p className="mt-4 flex items-center gap-2 text-xs text-body/70"><Clock className="h-3.5 w-3.5" /> Mon–Fri 9 AM – 5 PM</p>
//           </aside>
//         )}
//       </div>
//     </section>
//   )
// }

// export default PageHero












import { CircleCheck, Clock, Phone } from 'lucide-react'
import { WhatsAppIcon } from './Icons'
import { business, whatsappLink } from '../siteConfig'

// Top section of inner pages: centred H1 + intro (+ optional quick-contact card on desktop)
function PageHero({ title, children, aside = false, service }) {
  // Heading size adapts to its length so it always fits on one line on laptops
  const fit = typeof title === 'string' ? { '--fit': `calc((min(100vw, 1320px) - 80px) / ${(title.length * 0.66).toFixed(1)})` } : undefined

  return (
    <section className="relative isolate overflow-hidden border-b border-brand-100/70 bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="bg-grid mask-fade absolute inset-0 -z-10" />
      <div className="absolute -right-24 -top-32 -z-10 h-[420px] w-[420px] animate-drift rounded-full bg-brand-200/60 blur-[110px]" />
      <div className="absolute -left-40 bottom-0 -z-10 h-[300px] w-[300px] animate-drift rounded-full bg-brand-100/80 blur-[100px] [animation-delay:-5s]" />
      <div className={`container grid gap-10 pt-10 pb-6 md:pt-16 md:pb-8 ${aside ? 'lg:grid-cols-[1fr_340px] lg:items-end lg:gap-14' : ''}`}>
        <div className="w-full py-4 text-center md:py-8">
          <h1 style={fit} className="animate-fade-up text-[1.7rem] font-extrabold uppercase leading-tight tracking-normal text-ink [-webkit-text-stroke:0.6px_currentColor] sm:text-4xl lg:whitespace-nowrap lg:text-[length:min(2.75rem,var(--fit))]">{title}</h1>
          <div className="mx-auto mt-5 max-w-4xl animate-fade-up [animation-delay:120ms]">{children}</div>
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
            <p className="mt-4 flex items-center gap-2 text-xs text-body/70"><Clock className="h-3.5 w-3.5" /> Mon–Fri 9 AM – 5 PM</p>
          </aside>
        )}
      </div>
    </section>
  )
}

export default PageHero

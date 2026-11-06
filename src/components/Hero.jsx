// import { Link } from 'react-router-dom'
// import { ArrowRight, BadgeCheck, Building2, CircleCheck, FileCheck2, MapPin, Plane, Sparkles } from 'lucide-react'
// import { business, whatsappLink } from '../siteConfig'
// import { WhatsAppIcon } from './Icons'
// import heroImg from '../assets/adgm-corporate-services-al-reem-island.webp'
// import heroImgMobile from '../assets/adgm-corporate-services-al-reem-island-960.webp'

// // The ADGM journey shown on the floating card (from the PDF: licence → establishment card → visas → office)
// const journey = [
//   { icon: FileCheck2, title: 'Company registered', text: 'ADGM Registration Authority' },
//   { icon: BadgeCheck, title: 'Commercial licence issued', text: 'Financial, non-financial or retail' },
//   { icon: Building2, title: 'Office & lease on AccessRP', text: <>Via <a href="https://www.aegiscoworking.ae/" target="_blank" rel="noopener" className="font-semibold text-brand-200 transition hover:text-white">Aegis Coworking</a>, Addax Tower</> },
//   { icon: Plane, title: 'Establishment card & visas', text: 'Director, employee & dependent' },
  
// ]

// // Home hero. Hero text and buttons animate with CSS on load (no JS needed → fast LCP)
// function Hero() {
//   return (
//     <section className="noise relative isolate overflow-hidden bg-brand-950 text-white">
//       {/* Background: Al Reem Island skyline + brand-green overlays */}
//       <picture>
//         <source media="(max-width: 767px)" srcSet={heroImgMobile} />
//         <img
//           src={heroImg}
//           alt="Al Reem Island skyline in Abu Dhabi Global Market (ADGM), home of Bayana's office at Addax Tower"
//           width="1920"
//           height="1080"
//           fetchPriority="high"
//           decoding="async"
//           className="absolute inset-0 -z-20 h-full w-full animate-kenburns object-cover object-[65%_center] opacity-60"
//         />
//       </picture>
//       <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/95 via-brand-950/80 to-brand-950/95 lg:bg-gradient-to-r lg:from-brand-950 lg:via-brand-950/85 lg:to-brand-950/30" />
//       <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
//       <div className="absolute -left-32 top-10 -z-10 h-[420px] w-[420px] animate-drift rounded-full bg-brand-600/30 blur-[110px]" />
//       <div className="absolute -bottom-40 right-0 -z-10 h-[460px] w-[460px] animate-drift rounded-full bg-brand-500/20 blur-[120px] [animation-delay:-6s]" />

//                 <div className="container grid items-center gap-x-12 gap-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_.85fr] lg:pb-28 lg:pt-24">
//         {/* Heading spans both columns so it fits on one line on laptops */}
//         <div className="lg:col-span-2">
//           <p className="eyebrow-dark animate-fade-up">
//             <Sparkles className="h-3.5 w-3.5" /> Registered in Abu Dhabi Global Market
//           </p>
//           <h1 className="animate-fade-up text-[2.45rem] font-extrabold leading-[1.05] text-white [animation-delay:80ms] sm:text-6xl lg:whitespace-nowrap lg:text-[3.4rem] xl:text-[4.1rem]">
//             ADGM Corporate Services <span className="text-gradient-light">in Abu Dhabi</span>
//           </h1>
//         </div>
//         <div className="min-w-0">
//           <p className="max-w-xl animate-fade-up text-[17px] leading-relaxed text-brand-50/85 [animation-delay:160ms] md:text-xl">
//             Your trusted partner for ADGM company formation, licensing, visa processing, regulatory filings and office arrangements at affordable prices. From incorporation to ongoing corporate support, our dedicated team in Al Reem Island helps you manage your business requirements through one convenient point of contact, including office solutions and registered office arrangements.
//           </p>
//                    <div className="mt-9 flex animate-fade-up [animation-delay:240ms]">
//             <Link to="/contact" className="btn-primary !px-8 font-bold uppercase tracking-[.12em]" data-track="contact">
//               Book a consultation
//             </Link>
//           </div>
//           {/* <ul className="mt-10 grid max-w-xl animate-fade-up grid-cols-3 gap-3 border-t border-white/10 pt-8 [animation-delay:320ms]">
//             {[
//               ['1000+', 'ADGM Incorporations & Corporate Migration Experience-Including company migration between ADGM and Abu Dhabi DED.'],
//               ['3', 'sectors: financial, non-financial, retail'],
//               ['1', 'Partner for Licences, Visas & Office Solutions-One trusted partner. All your business support needs.'],
//             ].map(([n, t]) => (
//               <li key={t}>
//                 <p className="font-display text-3xl font-extrabold text-white md:text-4xl">{n}</p>
//                 <p className="mt-1 text-xs leading-snug text-brand-50/70 md:text-[13px]">{t}</p>
//               </li>
//             ))}
//           </ul> */}

//                                          <ul className="no-scrollbar -mx-5 mt-10 flex max-w-2xl animate-fade-up snap-x gap-3 overflow-x-auto px-5 [animation-delay:320ms] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
//             {[
//               { n: '1000', suffix: '+', label: 'ADGM Incorporations & Migrations Experience', detail: 'Including company migration between ADGM and Abu Dhabi DED' },
//               { title: 'Sectors Covered', list: ['Financial', 'Non-financial', 'Retail'] },
//               { title: 'Partner for Licences, Visas & Office Solutions', detail: 'One trusted partner. All your business support needs.' },
//             ].map((c) => (
//               <li
//                 key={c.label || c.title}
//                 className="group relative flex min-w-[230px] snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/10 sm:min-w-0 sm:p-5"
//               >
//                 <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-brand-200 transition duration-500 group-hover:scale-x-100" />
//                 {c.n ? (
//                   <>
//                     <p className="font-display text-4xl font-extrabold leading-none text-white md:text-[2.6rem]">
//                       {c.n}<span className="text-brand-400">{c.suffix}</span>
//                     </p>
//                     <p className="mt-3 text-sm font-semibold leading-snug text-white">{c.label}</p>
//                   </>
//                 ) : (
//                   <p className="font-display text-lg font-extrabold leading-tight text-white md:text-xl">{c.title}</p>
//                 )}
//                 {c.list && (
//                   <ul className="mt-3 space-y-2">
//                     {c.list.map((item) => (
//                       <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-brand-50/85">
//                         <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 {c.detail && <p className={`${c.n ? 'mt-1 text-xs' : 'mt-3 text-sm'} leading-relaxed text-brand-50/70`}>{c.detail}</p>}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Floating journey card */}
//         <div className="relative hidden animate-fade-up [animation-delay:300ms] lg:block">
//           <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-500/30 to-transparent blur-2xl" />
//           <div className="glass relative animate-float rounded-[2rem] p-7 shadow-2xl">
//             <div className="mb-6 flex items-center justify-between">
//               <p className="font-display text-lg font-bold">Your ADGM journey</p>
//               <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-200">One point of contact</span>
//             </div>
//             <ol className="relative space-y-5">
//               <span className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-brand-400 to-white/10" aria-hidden="true" />
//               {journey.map(({ icon: Icon, title, text }, i) => (
//                 <li key={title} className="relative flex animate-fade-up items-center gap-4" style={{ animationDelay: `${520 + i * 140}ms` }}>
//                   <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white ring-4 ring-brand-950/60">
//                     <Icon className="h-[18px] w-[18px]" />
//                   </span>
//                   <span className="flex-1">
//                     <span className="block font-semibold">{title}</span>
//                     <span className="text-sm text-brand-50/70">{text}</span>
//                   </span>
//                   <CircleCheck className="h-5 w-5 text-brand-400" />
//                 </li>
//               ))}
//             </ol>
//             <a
//               href={business.mapLink}
//               target="_blank"
//               rel="noopener"
//               className="mt-7 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm transition hover:bg-white/15"
//             >
//               <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
//               <span>
//                 <span className="block font-semibold">{business.unit}</span>
//                               <span className="text-brand-50/80">{business.area}, {business.city}, {business.country}</span>
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero












import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, Building2, CircleCheck, FileCheck2, MapPin, Plane, Sparkles } from 'lucide-react'
import { business } from '../siteConfig'
import heroImg from '../assets/adgm-corporate-services-al-reem-island.webp'
import heroImgMobile from '../assets/adgm-corporate-services-al-reem-island-960.webp'

// The ADGM journey shown on the floating card (from the PDF: licence → establishment card → visas → office)
const journey = [
  { icon: FileCheck2, title: 'Company registered', text: 'ADGM Registration Authority' },
  { icon: BadgeCheck, title: 'Commercial licence issued', text: 'Financial, non-financial or retail' },
  { icon: Building2, title: 'Office & lease on AccessRP', text: <>Via <a href="https://www.aegiscoworking.ae/" target="_blank" rel="noopener" className="font-semibold text-brand-200 transition hover:text-white">Aegis Coworking</a>, Addax Tower</> },
  { icon: Plane, title: 'Establishment card & visas', text: 'Director, employee & dependent' },
  
]

// Counts up from 0 to `to` when the hero loads (shows the final number straight away for Google / no-JS)
function CountUp({ to, duration = 1800 }) {
  const [n, setN] = useState(to)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3)))) // ease-out
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setN(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <span className="tabular-nums">{n}</span>
}

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

      <div className="container grid items-center gap-x-12 gap-y-6 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_.85fr] lg:pb-28 lg:pt-24">
        {/* Heading spans both columns so it fits on one line on laptops */}
        <div className="lg:col-span-2">
          <p className="eyebrow-dark animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" /> Registered in Abu Dhabi Global Market
          </p>
          <h1 className="animate-fade-up text-[2.45rem] font-extrabold leading-[1.05] text-white [animation-delay:80ms] sm:text-6xl lg:whitespace-nowrap lg:text-[3.4rem] xl:text-[4.1rem]">
            ADGM Corporate Services <span className="text-gradient-light">in Abu Dhabi</span>
          </h1>
        </div>
        <div className="min-w-0">
          <p className="max-w-xl animate-fade-up text-[17px] leading-relaxed text-brand-50/85 [animation-delay:160ms] md:text-xl">
            Your trusted partner for ADGM company formation, licensing, visa processing, regulatory filings, office arrangements and affordable prices. From incorporation to ongoing corporate support, our dedicated team in Al Reem Island helps you manage your business requirements through one convenient point of contact, including office solutions and registered office arrangements.
          </p>
          <div className="mt-9 flex animate-fade-up [animation-delay:240ms]">
            <Link to="/contact" className="btn-primary !px-8 font-bold uppercase tracking-[.12em]" data-track="contact">
              Book a consultation
            </Link>
          </div>
          {/* <ul className="mt-10 grid max-w-xl animate-fade-up grid-cols-3 gap-3 border-t border-white/10 pt-8 [animation-delay:320ms]">
            {[
              ['1000+', 'ADGM Incorporations & Corporate Migration Experience-Including company migration between ADGM and Abu Dhabi DED.'],
              ['3', 'sectors: financial, non-financial, retail'],
              ['1', 'Partner for Licences, Visas & Office Solutions-One trusted partner. All your business support needs.'],
            ].map(([n, t]) => (
              <li key={t}>
                <p className="font-display text-3xl font-extrabold text-white md:text-4xl">{n}</p>
                <p className="mt-1 text-xs leading-snug text-brand-50/70 md:text-[13px]">{t}</p>
              </li>
            ))}
          </ul> */}

                                         <ul className="no-scrollbar -mx-5 mt-10 flex max-w-2xl animate-fade-up snap-x gap-3 overflow-x-auto px-5 [animation-delay:320ms] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {[
              { n: '1000', suffix: '+', label: 'ADGM Incorporations & Migrations Experience', detail: 'Including company migration between ADGM and Abu Dhabi DED' },
              { title: 'Sectors Covered', list: ['Financial', 'Non-financial', 'Retail'] },
              { title: 'Partner for Licences, Visas & Office Solutions', detail: 'One trusted partner. All your business support needs.' },
            ].map((c) => (
              <li
                key={c.label || c.title}
                className="group relative flex min-w-[230px] snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/10 sm:min-w-0 sm:p-5"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-brand-200 transition duration-500 group-hover:scale-x-100" />
                {c.n ? (
                  <>
                    <p className="font-display text-4xl font-extrabold leading-none text-white md:text-[2.6rem]">
                      <CountUp to={Number(c.n)} /><span className="text-brand-400">{c.suffix}</span>
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-snug text-white">{c.label}</p>
                  </>
                ) : (
                  <p className="font-display text-lg font-extrabold leading-tight text-white md:text-xl">{c.title}</p>
                )}
                {c.list && (
                  <ul className="mt-3 space-y-2">
                    {c.list.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-brand-50/85">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {c.detail && <p className={`${c.n ? 'mt-1 text-xs' : 'mt-3 text-sm'} leading-relaxed text-brand-50/70`}>{c.detail}</p>}
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
            <a
              href={business.mapLink}
              target="_blank"
              rel="noopener"
              className="mt-7 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm transition hover:bg-white/15"
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
              <span>
                <span className="block font-semibold">{business.unit}</span>
                              <span className="text-brand-50/80">{business.area}, {business.city}, {business.country}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

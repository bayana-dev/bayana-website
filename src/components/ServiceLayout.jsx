import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Info } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import SEO from './SEO'
import PageHero from './PageHero'
import FAQ from './FAQ'
import FinalCTA from './FinalCTA'
import SectionHeader from './SectionHeader'
import { CardGrid } from './ServiceCard'
import { verifyText } from './Verify'
import { reveal } from './Reveal'
import { breadcrumbSchema, faqSchema, serviceSchema } from '../schema'
import { CSP_LICENCE_CONFIRMED, DISCLAIMER, serviceBySlug } from '../siteConfig'

const GOLD = '#b8892d'

// One look per service group. Edit the classes here to restyle every page in that group.
const THEMES = {
  // Company Setup: dark green hero, numbered cards
  'Company Setup': {
    dark: true,
    hero: 'bg-brand-950 text-white',
    decor: 'bg-brand-600/35',
    eyebrow: 'eyebrow-dark',
    tile: 'bg-brand-600 text-white shadow-glow',
    ring: 'border-brand-400/40',
    cta: 'btn bg-white text-brand-900 hover:-translate-y-0.5 hover:bg-brand-50',
    label: 'text-brand-600',
    audience: 'bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-100',
    bullets: 'numbered',
    bar: 'bg-brand-500',
    toc: 'border-brand-600 text-brand-800',
    steps: 'bg-gradient-to-br from-brand-950 to-brand-900 text-white',
    stepNum: 'bg-brand-500 text-brand-950',
    stepItem: 'bg-white/5 ring-white/10 hover:bg-white/10',
  },
  // Corporate Services: clean white hero with a green side bar, checklist rows
  'Corporate Services': {
    dark: false,
    hero: 'bg-white',
    decor: 'bg-brand-100',
    eyebrow: 'eyebrow',
    tile: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
    ring: 'border-brand-200',
    cta: 'btn-primary',
    label: 'text-brand-700',
    audience: 'bg-gradient-to-br from-brand-50/70 to-white ring-1 ring-brand-100',
    bullets: 'list',
    bar: 'bg-brand-700',
    toc: 'border-brand-700 text-brand-800',
    steps: 'bg-white ring-1 ring-gray-200 shadow-soft',
    stepNum: 'bg-brand-700 text-white',
    stepItem: 'bg-brand-50/60 ring-brand-100 hover:bg-brand-50',
  },
  // Visa & Office: bright green gradient hero, pill chips
  'Visa & Office': {
    dark: true,
    hero: 'bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white',
    decor: 'bg-white/20',
    eyebrow: 'eyebrow-dark',
    tile: 'bg-white text-brand-700 shadow-lift',
    ring: 'border-white/40',
    cta: 'btn bg-white text-brand-900 hover:-translate-y-0.5 hover:bg-brand-50',
    label: 'text-brand-600',
    audience: 'bg-gradient-to-br from-brand-100/60 via-brand-50 to-white ring-1 ring-brand-200',
    bullets: 'chips',
    bar: 'bg-brand-500',
    toc: 'border-brand-500 text-brand-800',
    steps: 'bg-gradient-to-br from-brand-600 to-brand-800 text-white',
    stepNum: 'bg-white text-brand-800',
    stepItem: 'bg-white/10 ring-white/20 hover:bg-white/15',
  },
  // Legal & Documents: warm paper hero with gold accents
  'Legal & Documents': {
    dark: false,
    hero: 'bg-[#faf7f0]',
    decor: 'bg-[#b8892d]/20',
    eyebrow: 'eyebrow !border-[#b8892d]/30 !bg-white !text-[#8a6620]',
    tile: 'bg-white text-[#b8892d] ring-1 ring-[#b8892d]/30',
    ring: 'border-[#b8892d]/30',
    cta: 'btn bg-brand-900 text-white hover:-translate-y-0.5 hover:bg-brand-950',
    label: 'text-[#a07624]',
    audience: 'bg-[#faf7f0] ring-1 ring-[#b8892d]/20',
    bullets: 'gold',
    bar: 'bg-[#b8892d]',
    toc: 'border-[#b8892d] text-[#8a6620]',
    steps: 'bg-brand-950 text-white',
    stepNum: 'bg-[#b8892d] text-white',
    stepItem: 'bg-white/5 ring-white/10 hover:bg-white/10',
  },
  // Other UAE free zones: soft green tint
  Other: {
    dark: false,
    hero: 'bg-gradient-to-b from-brand-50 via-white to-white',
    decor: 'bg-brand-200/60',
    eyebrow: 'eyebrow',
    tile: 'bg-brand-600 text-white shadow-glow',
    ring: 'border-brand-300',
    cta: 'btn-primary',
    label: 'text-brand-600',
    audience: 'bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-100',
    bullets: 'cards',
    bar: 'bg-brand-600',
    toc: 'border-brand-600 text-brand-800',
    steps: 'bg-gradient-to-br from-brand-950 to-brand-900 text-white',
    stepNum: 'bg-brand-500 text-brand-950',
    stepItem: 'bg-white/5 ring-white/10 hover:bg-white/10',
  },
}

// Bullet lists — a different premium style per service group
function Bullets({ items, style }) {
  // Company Setup: white cards with a large faint number and a green line that grows on hover
  if (style === 'numbered') return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {items.map((b, i) => (
        <li key={b} {...reveal(i % 6, true, 70)} className="group relative flex items-center gap-4 overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-5 shadow-soft sm:block sm:p-6 transition duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
          <span className="pointer-events-none absolute -right-1 -top-3 font-display text-[3.5rem] sm:-right-2 sm:-top-4 sm:text-[5.5rem] font-extrabold leading-none text-brand-50 transition duration-500 group-hover:text-brand-100" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-[0_8px_20px_-8px_rgba(22,163,74,.7)]">
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <p className="relative pr-8 text-[16px] sm:mt-5 sm:pr-0 font-semibold leading-snug text-ink">{verifyText(b)}</p>
          <span className="absolute inset-x-6 bottom-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition duration-500 group-hover:scale-x-100" />
        </li>
      ))}
    </ol>
  )
  // Corporate Services: one elegant panel with numbered rows
  if (style === 'list') return (
    <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-br from-white to-brand-50/40 shadow-soft">
      <ul className="divide-y divide-gray-100">
        {items.map((b, i) => (
          <li key={b} {...reveal(i % 8, 'fade', 50)} className="group flex items-center gap-5 px-5 py-4 transition duration-300 hover:bg-white md:px-7 md:py-5">
            <span className="w-7 shrink-0 font-display text-sm font-bold text-brand-600/70 transition group-hover:text-brand-700">{String(i + 1).padStart(2, '0')}</span>
            <span className="flex-1 text-[15px] font-medium text-ink md:text-base">{verifyText(b)}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition duration-300 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
  // Visa & Office: soft green gradient tiles with a glowing icon
  if (style === 'chips') return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((b, i) => (
        <li key={b} {...reveal(i % 6, 'zoom', 60)} className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 via-white to-white p-4 ring-1 ring-brand-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:ring-brand-300 md:p-5">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white ring-[6px] ring-brand-100 transition duration-300 group-hover:ring-brand-200">
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold leading-snug text-brand-950">{verifyText(b)}</span>
        </li>
      ))}
    </ul>
  )
  // Legal & Documents: refined cards with gold hairlines
  if (style === 'gold') return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((b, i) => (
        <li key={b} {...reveal(i % 6, true, 70)} className="group relative flex items-center gap-4 rounded-2xl border border-[#b8892d]/20 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-[#b8892d]/50 hover:shadow-lift">
          <span className="flex h-10 w-10 shrink-0 rotate-45 items-center justify-center rounded-lg border border-[#b8892d]/40 bg-[#faf7f0] transition duration-500 group-hover:rotate-[135deg] group-hover:bg-[#b8892d]">
            <Check className="h-4 w-4 -rotate-45 text-[#b8892d] transition duration-500 group-hover:-rotate-[135deg] group-hover:text-white" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold text-ink">{verifyText(b)}</span>
          <span className="absolute inset-y-4 left-0 w-[3px] rounded-r-full bg-[#b8892d] opacity-0 transition group-hover:opacity-100" />
        </li>
      ))}
    </ul>
  )
  // Other: clean cards
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((b, i) => (
        <li key={b} {...reveal(i % 6, true, 60)} className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white">
            <Check className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold text-ink">{verifyText(b)}</span>
        </li>
      ))}
    </ul>
  )
}

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Highlights the "On this page" link for the section in view
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps
  return active
}

// Shared layout for all 17 service pages (blueprint section 3: "Every service page follows the same template").
// Each page in src/pages/ passes its own `service` content object.
function ServiceLayout({ service }) {
  const s = { ...serviceBySlug[service.slug], ...service } // adds short name + group from siteConfig
  // Home › (ADGM Company Formation hub, for setup pages) › this page
  const crumbs = [
    { name: 'Home', path: '/' },
    ...(s.group === 'Company Setup' && s.slug !== 'adgm-company-formation'
      ? [{ name: 'ADGM Company Formation', path: '/adgm-company-formation' }]
      : []),
    { name: s.short, path: `/${s.slug}` },
  ]

  const description = s.descriptionLicensed && CSP_LICENCE_CONFIRMED ? s.descriptionLicensed : s.description

  const toc = [
    ...s.sections.map((sec) => ({ id: slugify(sec.h2), label: sec.h2 })),
    ...(s.steps ? [{ id: slugify(s.steps.h2), label: s.steps.h2 }] : []),
    { id: 'who-it-is-for', label: 'Who It Is For' },
    { id: 'faq-title', label: 'FAQs' },
  ]
  const active = useScrollSpy(toc.map((t) => t.id))
  const t = THEMES[s.group] || THEMES.Other

  return (
    <div className="App">
      <Navbar />
      <main id="main">
        <SEO
          title={s.title}
          description={description}
          path={`/${s.slug}`}
          schema={[serviceSchema({ ...s, description }), faqSchema(s.faqs), breadcrumbSchema(crumbs)]}
        />

        {/* 1–2. H1 + intro (same header style on every service page) */}
        <PageHero crumbs={crumbs} title={s.h1} eyebrow={s.group === 'Other' ? 'UAE company setup' : s.group} service={s.short}>
          <div className="prose-bayana lead max-w-2xl">{verifyText(s.intro)}</div>
         
          
        </PageHero>

        {/* Mobile: "On this page" chips */}
        <nav className="no-scrollbar -mb-4 flex gap-2 overflow-x-auto px-4 pt-6 lg:hidden" aria-label="On this page">
          {toc.map((x) => (
            <a key={x.id} href={`#${x.id}`} className="shrink-0 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-body transition hover:border-brand-400 hover:text-brand-800">{x.label}</a>
          ))}
        </nav>

        {/* 3. What we handle — sections from data, with a sticky "On this page" menu on desktop */}
        <div className="container grid gap-10 py-10 md:py-16 lg:grid-cols-[230px_1fr] lg:gap-14">
          <aside className="hidden lg:block" aria-label="On this page">
            <nav className="sticky top-28">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-body/60">On this page</p>
              <ul className="space-y-1 border-l border-gray-200">
                {toc.map((x) => (
                  <li key={x.id}>
                    <a
                      href={`#${x.id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition ${active === x.id ? `${t.toc} font-semibold` : 'border-transparent text-body/80 hover:border-gray-300 hover:text-ink'}`}
                    >
                      {x.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            {s.sections.map((sec, si) => (
              <section key={sec.h2} className="border-b border-gray-100 py-12 first:pt-0 last:border-0 md:py-14" aria-labelledby={slugify(sec.h2)}>
                <div {...reveal(0)} className="mb-7">
                  <p className={`mb-2 flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[.2em] ${t.label}`}>
                    <span className={`h-px w-8 ${t.bar}`} />{String(si + 1).padStart(2, '0')}
                  </p>
                  <h2 id={slugify(sec.h2)} className="text-[1.65rem] leading-tight md:text-[2.15rem]">{sec.h2}</h2>
                </div>
                {sec.text && <div {...reveal(1)} className="prose-bayana max-w-3xl text-[17px] leading-relaxed">{verifyText(sec.text)}</div>}
                {sec.bullets && <Bullets items={sec.bullets} style={t.bullets} />}
                {sec.defs && (
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {sec.defs.map(([dt, d], i) => (
                      <div key={dt} {...reveal(i % 4)} className="card card-hover spotlight overflow-hidden !rounded-3xl">
                        <span className={`absolute inset-x-0 top-0 h-1 ${t.bar}`} />
                        <dt className="mb-2 font-display text-lg font-bold text-ink">{dt}</dt>
                        <dd className="text-[15px] leading-relaxed">{d}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {sec.cards && <CardGrid slugs={sec.cards} cols={sec.cards.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} />}
                {sec.table && <p className="mb-3 text-xs font-medium text-body/60 sm:hidden">Swipe the table sideways to see all columns →</p>}
                {sec.table && (
                  <div {...reveal(1)} className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[560px] overflow-hidden rounded-2xl text-left text-[15px] shadow-soft ring-1 ring-gray-100">
                      <thead>
                        <tr>{sec.table.head.map((h, i) => <th key={i} scope="col" className="bg-brand-900 p-4 font-display font-semibold text-white">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {sec.table.rows.map((r, i) => (
                          <tr key={i} className="bg-white even:bg-brand-50/40">
                            {r.map((c, j) => j === 0
                              ? <th key={j} scope="row" className="border-t border-gray-100 p-4 font-semibold text-ink">{verifyText(c)}</th>
                              : <td key={j} className="border-t border-gray-100 p-4">{verifyText(c)}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* 4. How it works */}
            {s.steps && (
              <section className={`mt-6 rounded-[2rem] p-6 md:p-10 ${t.steps}`} aria-labelledby={slugify(s.steps.h2)}>
                <h2 id={slugify(s.steps.h2)} {...reveal(0)} className={`mb-8 text-2xl md:text-[2rem] ${t.steps.includes('text-white') ? 'text-white' : ''}`}>{s.steps.h2}</h2>
                <ol className="relative grid gap-x-8 gap-y-4 md:grid-cols-2">
                  {s.steps.items.map((step, i) => (
                    <li key={step} {...reveal(i, 'left', 90)} className={`flex items-center gap-4 rounded-2xl p-4 ring-1 transition ${t.stepItem}`}>
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold ${t.stepNum}`}>{i + 1}</span>
                      <span className="font-medium">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* 5–6. Who it's for + Why Bayana */}
            <section className="pt-14" aria-labelledby="who-it-is-for">
             <div {...reveal(0)} className={`relative overflow-hidden rounded-3xl p-6 md:p-9 ${t.audience}`}>
                <p className={`mb-2 font-display text-xs font-bold uppercase tracking-[.2em] ${t.label}`}>Who it is for</p>
                <h2 id="who-it-is-for" className="mb-3 text-2xl md:text-[2rem]">Is This Service Right for You?</h2>
                <p className="max-w-3xl text-[17px] leading-relaxed">{s.audience}</p>
              </div>

              {(s.note || s.disclaimer) && (
                <p className="mt-8 flex gap-3 rounded-2xl bg-gray-50 p-4 text-sm text-body/80">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>{s.note && <>{s.note} </>}{s.disclaimer && DISCLAIMER}</span>
                </p>
              )}
            </section>
          </div>
        </div>

        {/* 7. FAQ */}
        <FAQ faqs={s.faqs} />

        {/* 8. Related services */}
        <section className="section pb-0" aria-labelledby="related">
          <div className="container">
            <SectionHeader eyebrow="Keep exploring" title="Related Services" id="related" />
            <CardGrid slugs={s.related} />
          </div>
        </section>

        {/* 9. CTA + form */}
        {/* <FinalCTA service={s.short} /> */}
                     <FinalCTA page={s.slug} variant={s.group} />
      </main>
      <Footer />
    </div>
  )
}

export default ServiceLayout

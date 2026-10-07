import { useEffect, useState } from 'react'
import { Check, Info } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import SEO from './SEO'
import PageHero from './PageHero'
import FAQ from './FAQ'
import FinalCTA from './FinalCTA'
import WhyChooseUs from './WhyChooseUs'
import SectionHeader from './SectionHeader'
import { CardGrid } from './ServiceCard'
import { WhatsAppIcon } from './Icons'
import { verifyText } from './Verify'
import { reveal } from './Reveal'
import { breadcrumbSchema, faqSchema, serviceSchema } from '../schema'
import { CSP_LICENCE_CONFIRMED, DISCLAIMER, serviceBySlug, whatsappLink } from '../siteConfig'

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
  const cspPending = s.requiresCsp && !CSP_LICENCE_CONFIRMED
  const toc = [
    ...s.sections.map((sec) => ({ id: slugify(sec.h2), label: sec.h2 })),
    ...(s.steps ? [{ id: slugify(s.steps.h2), label: s.steps.h2 }] : []),
    { id: 'who-it-is-for', label: 'Who It Is For' },
    { id: 'faq-title', label: 'FAQs' },
  ]
  const active = useScrollSpy(toc.map((t) => t.id))

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

        {/* 1–2. H1 + intro */}
        <PageHero crumbs={crumbs} title={s.h1} eyebrow={s.group === 'Other' ? 'UAE company setup' : s.group} service={s.short}>
          <div className="prose-bayana lead max-w-2xl">{verifyText(s.intro)}</div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink(`Hello Bayana, I need help with: ${s.short}`)} target="_blank" rel="noopener" className="btn-primary" data-track="whatsapp">
              <WhatsAppIcon /> Talk to us on WhatsApp
            </a>
            <a href="#contact-form" className="btn-outline">Send an enquiry</a>
          </div>
          {cspPending && (
            <div className="mt-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-amber-900">
              <Info className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">These services are coming soon, once Bayana’s ADGM company service provider licence is confirmed. Contact us to register your interest.</p>
            </div>
          )}
        </PageHero>

        {/* 3. What we handle — sections from data, with a sticky "On this page" menu on desktop */}
        <div className="container grid gap-10 py-10 md:py-16 lg:grid-cols-[230px_1fr] lg:gap-14">
          <aside className="hidden lg:block" aria-label="On this page">
            <nav className="sticky top-28">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-body/60">On this page</p>
              <ul className="space-y-1 border-l border-gray-200">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition ${active === t.id ? 'border-brand-600 font-semibold text-brand-800' : 'border-transparent text-body/80 hover:border-brand-200 hover:text-ink'}`}
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            {s.sections.map((sec) => (
              <section key={sec.h2} className="border-b border-gray-100 py-10 first:pt-0 last:border-0" aria-labelledby={slugify(sec.h2)}>
                <h2 id={slugify(sec.h2)} {...reveal(0)} className="mb-6 text-2xl leading-tight md:text-[2rem]">{sec.h2}</h2>
                {sec.text && <div {...reveal(1)} className="prose-bayana text-[17px] leading-relaxed">{verifyText(sec.text)}</div>}
                {sec.bullets && (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {sec.bullets.map((b, i) => (
                      <li key={b} {...reveal(i % 6, true, 60)} className="group flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition duration-300 hover:border-brand-200 hover:bg-brand-50/50">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-[15px] font-medium text-ink/90">{verifyText(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.defs && (
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {sec.defs.map(([t, d], i) => (
                      <div key={t} {...reveal(i % 4)} className="card card-hover spotlight">
                        <dt className="mb-2 flex items-center gap-3 font-display text-lg font-bold text-ink">
                          <span className="h-2 w-2 rounded-full bg-brand-500" />{t}
                        </dt>
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

            {/* 4. How it works — vertical timeline */}
            {s.steps && (
              <section className="mt-6 rounded-[2rem] bg-gradient-to-br from-brand-950 to-brand-900 p-6 text-white md:p-10" aria-labelledby={slugify(s.steps.h2)}>
                <h2 id={slugify(s.steps.h2)} {...reveal(0)} className="mb-8 text-2xl text-white md:text-[2rem]">{s.steps.h2}</h2>
                <ol className="relative grid gap-x-8 gap-y-5 md:grid-cols-2">
                  {s.steps.items.map((step, i) => (
                    <li key={step} {...reveal(i, 'left', 90)} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/10">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 font-display font-bold text-brand-950">{i + 1}</span>
                      <span className="font-medium">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* 5–6. Who it's for + Why Bayana */}
            <section className="pt-14" aria-labelledby="who-it-is-for">
              <h2 id="who-it-is-for" {...reveal(0)} className="mb-4 text-2xl md:text-[2rem]">Who It Is For</h2>
              <p {...reveal(1)} className="mb-12 text-[17px] leading-relaxed">{s.audience}</p>
              <h2 {...reveal(0)} className="mb-6 text-2xl md:text-[2rem]">Why Bayana</h2>
              <WhyChooseUs />
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
        <FinalCTA service={s.short} />
      </main>
      <Footer />
    </div>
  )
}

export default ServiceLayout

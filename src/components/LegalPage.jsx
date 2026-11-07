import Navbar from './Navbar'
import Footer from './Footer'
import SEO from './SEO'
import PageHero from './PageHero'
import { breadcrumbSchema } from '../schema'

// Shared layout for the Privacy Policy and Terms of Use.
// sections = [{ id, title, body }] → numbered headings + "On this page" list
export default function LegalPage({ title, path, description, updated, intro, sections }) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: title, path }]
  return (
    <div className="App">
      <SEO title={`${title} | Bayana Global Limited`} description={description} path={path} schema={breadcrumbSchema(crumbs)} />
      <Navbar />
      <main id="main">
        <PageHero title={title}>
          <p className="!text-center text-sm font-medium text-body/70">Last updated: {updated}</p>
        </PageHero>

        <div className="container grid max-w-6xl gap-10 py-10 md:py-14 lg:grid-cols-[240px_1fr] lg:gap-14">
          {/* On this page */}
          <aside aria-label="On this page" className="lg:block">
            <nav className="rounded-2xl border border-gray-200 bg-white p-5 lg:sticky lg:top-28">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-body/60">On this page</p>
              <ol className="space-y-1.5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-2 rounded-md py-0.5 text-body/80 transition hover:text-brand-800">
                      <span className="w-5 shrink-0 font-semibold text-brand-700">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0 max-w-3xl text-[16px] leading-relaxed text-body md:text-[17px] [&_a]:font-semibold [&_a]:text-brand-800 hover:[&_a]:text-brand-950 [&_li]:mb-1.5 [&_p]:mb-4 [&_strong]:text-ink [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:marker:text-brand-600">
            {intro && <div className="mb-10 rounded-2xl border-l-4 border-brand-600 bg-brand-50 px-6 py-5 text-ink [&_p:last-child]:mb-0">{intro}</div>}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-gray-100 pt-8 first-of-type:border-0 first-of-type:pt-0 [&+section]:mt-8">
                <h2 className="mb-4 text-xl font-extrabold text-ink md:text-2xl">
                  <span className="mr-2 text-brand-600">{i + 1}.</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

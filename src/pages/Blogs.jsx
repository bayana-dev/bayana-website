import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import FinalCTA from '../components/FinalCTA'
import { breadcrumbSchema } from '../schema'
import { SITE_URL, business } from '../siteConfig'
import { sortedPosts, formatDate, readTime } from '../blogPosts'

// Blog listing page (/blogs): centred hero + grid of article cards + closing CTA
export function PostCard({ p, i = 0 }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
      <Link to={`/blog/${p.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-brand-900" tabIndex={-1} aria-hidden="true">
        <img src={p.image} alt="" width="640" height="360" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-brand-800 shadow-sm">{p.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-body/60">
          <time dateTime={p.date}>{formatDate(p.date)}</time> · {readTime(p)} min read
        </p>
        <h2 className="mt-2 text-xl leading-snug transition group-hover:text-brand-800">
          <Link to={`/blog/${p.slug}`}>{p.title}</Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-body/90">{p.description}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-[11px] font-bold uppercase tracking-[.14em] text-body/60">By Bayana Global</span>
          <Link to={`/blog/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition hover:text-brand-900">
            Read More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function Blogs() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blogs' }]
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Bayana Blog',
    url: `${SITE_URL}/blogs`,
    publisher: { '@type': 'Organization', name: business.name, url: SITE_URL },
    blogPost: sortedPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  }

  return (
    <div className="App">
      <SEO
        title="ADGM Business Blog | Guides on Setup, Licences & Visas | Bayana"
        description="Practical guides on ADGM company formation, DED to ADGM licence conversion, renewals, visas and office space on Al Reem Island, Abu Dhabi."
        path="/blogs"
        schema={[blogSchema, breadcrumbSchema(crumbs)]}
      />
      <Navbar />
      <main id="main">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-brand-100/70 bg-gradient-to-b from-brand-50 via-white to-white">
          <div className="container py-12 text-center md:py-16">
            <h1 className="text-[1.9rem] font-extrabold uppercase leading-tight tracking-normal text-ink sm:text-4xl lg:text-[2.75rem]">The Bayana Blog</h1>
            <p className="mx-auto mt-4 max-w-2xl !text-center text-[15px] font-medium leading-relaxed text-brand-800 md:text-base">
              Practical guides on ADGM company formation, licensing, visas and compliance — written by the team that handles them every day on Al Reem Island.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-10 md:py-14" aria-label="Articles">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
            </div>
          </div>
        </section>

        <FinalCTA page="home" />
      </main>
      <Footer />
    </div>
  )
}

export default Blogs

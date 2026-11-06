import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import FinalCTA from '../components/FinalCTA'
import { breadcrumbSchema } from '../schema'
import { SITE_URL, business } from '../siteConfig'
import { usePostList, formatDate } from '../blog/blogData'

// Shows the WHOLE image (nothing cut off). Empty space around non-square images
// is filled with a soft blurred copy of the same picture.
export function Cover({ src, alt = '', className = '', eager = false }) {
  return (
    <div className={`relative overflow-hidden bg-brand-900 ${className}`}>
      <img src={src} alt="" aria-hidden="true" loading={eager ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl" />
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" className="relative h-full w-full object-contain" />
    </div>
  )
}

// One article card (also used for "Related Posts" on the article page)
export function PostCard({ p }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
      <Link to={`/blog/${p.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <Cover src={p.image} className="aspect-square transition duration-700 group-hover:opacity-95" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-body/60">
          <span className="font-bold uppercase tracking-[.08em] text-brand-700">{p.category}</span> · <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readMinutes} min read
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

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white" aria-hidden="true">
      <div className="aspect-square animate-pulse bg-gray-100" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

function Blogs() {
  const { list, loading } = usePostList()
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blogs' }]
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Bayana Blog',
    url: `${SITE_URL}/blogs`,
    publisher: { '@type': 'Organization', name: business.name, url: SITE_URL },
    blogPost: list.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.date })),
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
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <CardSkeleton /><CardSkeleton /><CardSkeleton />
              </div>
            ) : list.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => <PostCard key={p.slug} p={p} />)}
              </div>
            ) : (
              <p className="py-10 text-center text-body/70">New articles are on the way. Please check back soon.</p>
            )}
          </div>
        </section>

        <FinalCTA page="home" />
      </main>
      <Footer />
    </div>
  )
}

export default Blogs

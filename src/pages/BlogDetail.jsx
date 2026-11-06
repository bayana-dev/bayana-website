import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Clock, Info, Link2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import { PostCard } from './Blogs'
import NotFound from './NotFound'
import { breadcrumbSchema, faqSchema } from '../schema'
import { SITE_URL, business } from '../siteConfig'
import { postBySlug, sortedPosts, formatDate, readTime } from '../blogPosts'

// Turns "[text](/url)" into links and "**text**" into bold inside article text
function Inline({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      return href.startsWith('/')
        ? <Link key={i} to={href} className="font-bold text-brand-800 transition hover:text-brand-900">{label}</Link>
        : <a key={i} href={href} target="_blank" rel="noopener" className="font-bold text-brand-800 transition hover:text-brand-900">{label}</a>
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) return <strong key={i} className="font-semibold text-ink">{bold[1]}</strong>
    return part
  })
}

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Renders one body block from blogPosts.js
function Block({ b }) {
  if (b.h2) return <h2 id={slugify(b.h2)} className="mb-4 mt-10 scroll-mt-28 text-2xl leading-tight md:text-[1.75rem]">{b.h2}</h2>
  if (b.h3) return <h3 className="mb-3 mt-7 text-xl">{b.h3}</h3>
  if (b.p) return <p className="mb-5 text-[17px] leading-relaxed text-body"><Inline text={b.p} /></p>
  if (b.ul) return (
    <ul className="mb-6 space-y-3">
      {b.ul.map((t) => (
        <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-body">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"><Check className="h-3 w-3" strokeWidth={3} /></span>
          <span><Inline text={t} /></span>
        </li>
      ))}
    </ul>
  )
  if (b.ol) return (
    <ol className="mb-6 space-y-3">
      {b.ol.map((t, i) => (
        <li key={t} className="flex gap-4 text-[16px] leading-relaxed text-body">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-white">{i + 1}</span>
          <span className="pt-0.5"><Inline text={t} /></span>
        </li>
      ))}
    </ol>
  )
  if (b.note) return (
    <div className="mb-6 flex gap-3 rounded-2xl border border-brand-200 bg-brand-50/70 p-5 text-[15px] leading-relaxed text-brand-900">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
      <p className="!text-left"><Inline text={b.note} /></p>
    </div>
  )
  if (b.table) return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full min-w-[480px] overflow-hidden rounded-2xl text-left text-[15px] shadow-sm ring-1 ring-gray-100">
        <thead><tr>{b.table.head.map((h) => <th key={h} scope="col" className="bg-brand-900 p-4 font-semibold text-white">{h}</th>)}</tr></thead>
        <tbody>
          {b.table.rows.map((r, i) => (
            <tr key={i} className="bg-white even:bg-brand-50/40">
              {r.map((c, j) => j === 0
                ? <th key={j} scope="row" className="border-t border-gray-100 p-4 font-semibold text-ink"><Inline text={c} /></th>
                : <td key={j} className="border-t border-gray-100 p-4"><Inline text={c} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  if (b.img) return (
    <figure className="mb-6">
      <img src={b.img} alt={b.alt || ''} loading="lazy" decoding="async" className="w-full rounded-2xl object-cover" />
      {b.caption && <figcaption className="mt-2 text-center text-sm text-body/70">{b.caption}</figcaption>}
    </figure>
  )
  return null
}

// Share buttons (WhatsApp, LinkedIn, X, copy link)
function Share({ url, title }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url), t = encodeURIComponent(title)
  const btn = 'inline-flex h-10 items-center justify-center rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-400 hover:text-brand-800'
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-body/70">Share this insight:</span>
      <a className={btn} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener">WhatsApp</a>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener">LinkedIn</a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener">X</a>
      <button type="button" className={btn} onClick={() => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
        <Link2 className="mr-1.5 h-4 w-4" />{copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}

function BlogDetail() {
  const { slug } = useParams()
  const p = postBySlug[slug]
  if (!p) return <NotFound />

  const url = `${SITE_URL}/blog/${p.slug}`
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blogs' }, { name: p.title, path: `/blog/${p.slug}` }]
  const related = sortedPosts.filter((x) => x.slug !== p.slug).slice(0, 2)
  const toc = p.body.filter((b) => b.h2).map((b) => b.h2)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    image: SITE_URL + p.image,
    datePublished: p.date,
    dateModified: p.updated || p.date,
    author: { '@type': 'Organization', name: business.name, url: SITE_URL },
    publisher: { '@type': 'Organization', name: business.name, url: SITE_URL },
    mainEntityOfPage: url,
    articleSection: p.category,
  }

  return (
    <div className="App">
      <SEO
        title={`${p.title} | Bayana`}
        description={p.description}
        path={`/blog/${p.slug}`}
        image={p.image}
        schema={[articleSchema, breadcrumbSchema(crumbs), p.faqs?.length ? faqSchema(p.faqs) : null]}
      />
      <Navbar />
      <main id="main">
        {/* Header */}
        <article>
          <header className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
            <div className="container max-w-4xl pb-8 pt-10 text-center md:pt-14">
              <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:text-brand-900">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <p className="mt-6"><span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-brand-800">{p.category}</span></p>
              <h1 className="mt-4 text-[1.9rem] font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">{p.title}</h1>
              <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-body/70">
                <span className="font-semibold text-ink">Bayana Global</span>
                <span aria-hidden="true">·</span>
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {readTime(p)} min read</span>
              </p>
            </div>
            <figure className="container max-w-5xl">
              <img src={p.image} alt={p.imageAlt || p.title} width="1280" height="640" fetchPriority="high" decoding="async" className="aspect-[2/1] w-full rounded-[2rem] object-cover shadow-xl" />
              {p.caption && <figcaption className="mt-3 text-center text-sm text-body/70">{p.caption}</figcaption>}
            </figure>
          </header>

          {/* Body */}
          <div className="container grid max-w-6xl gap-10 py-10 md:py-14 lg:grid-cols-[220px_1fr] lg:gap-14">
            {toc.length > 1 && (
              <aside className="hidden lg:block" aria-label="In this article">
                <nav className="sticky top-28">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-body/60">In this article</p>
                  <ul className="space-y-2 border-l border-gray-200">
                    {toc.map((h) => (
                      <li key={h}><a href={`#${slugify(h)}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm text-body/80 transition hover:border-brand-500 hover:text-ink">{h}</a></li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
            <div className={`min-w-0 ${toc.length > 1 ? '' : 'lg:col-span-2 mx-auto max-w-3xl'}`}>
              {p.standfirst && <p className="mb-8 border-l-4 border-brand-500 pl-5 text-lg font-medium leading-relaxed text-ink/90 md:text-xl">{p.standfirst}</p>}
              {p.body.map((b, i) => <Block key={i} b={b} />)}
              <div className="mt-10 border-t border-gray-100 pt-6"><Share url={url} title={p.title} /></div>
            </div>
          </div>
        </article>

        {p.faqs?.length > 0 && <FAQ faqs={p.faqs} />}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-10 md:py-14" aria-labelledby="related-posts">
            <div className="container">
              <h2 id="related-posts" className="mb-7 text-center text-2xl md:text-[2rem]">Related Posts</h2>
              <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
                {related.map((r, i) => <PostCard key={r.slug} p={r} i={i} />)}
              </div>
            </div>
          </section>
        )}

        <FinalCTA page="home" />
      </main>
      <Footer />
    </div>
  )
}

export default BlogDetail

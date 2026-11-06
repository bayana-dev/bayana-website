import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Link2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import { PostCard } from './Blogs'
import NotFound from './NotFound'
import { breadcrumbSchema, faqSchema } from '../schema'
import { SITE_URL, business } from '../siteConfig'
import { usePost, usePostList, formatDate, headingsFromHtml, absoluteUrl } from '../blog/blogData'

// Share buttons (WhatsApp, LinkedIn, X, copy link)
function Share({ url, title }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const btn = 'inline-flex h-10 items-center justify-center rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-ink transition hover:border-brand-400 hover:text-brand-800'
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-body/70">Share this insight:</span>
      <a className={btn} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener">WhatsApp</a>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener">LinkedIn</a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener">X</a>
      <button
        type="button"
        className={btn}
        onClick={() => {
          navigator.clipboard?.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        <Link2 className="mr-1.5 h-4 w-4" />
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}

function Loading() {
  return (
    <div className="App">
      <Navbar />
      <main id="main" className="container max-w-3xl py-16" aria-busy="true">
        <div className="mx-auto h-4 w-32 animate-pulse rounded bg-gray-100" />
        <div className="mx-auto mt-6 h-10 w-4/5 animate-pulse rounded bg-gray-100" />
        <div className="mt-10 aspect-[2/1] animate-pulse rounded-[2rem] bg-gray-100" />
        <div className="mt-10 space-y-3">
          <div className="h-4 animate-pulse rounded bg-gray-100" />
          <div className="h-4 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const p = usePost(slug)
  const { list } = usePostList()

  if (p === undefined) return <Loading />
  if (p === null) return <NotFound />

  const url = `${SITE_URL}/blog/${p.slug}`
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blogs' }, { name: p.title, path: `/blog/${p.slug}` }]
  const others = list.filter((x) => x.slug !== p.slug)
  const related = [...others.filter((x) => x.category === p.category), ...others.filter((x) => x.category !== p.category)].slice(0, 2)
  const toc = headingsFromHtml(p.content)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    image: absoluteUrl(SITE_URL, p.image),
    datePublished: p.date,
    dateModified: p.updated || p.date,
    author: { '@type': 'Organization', name: business.name, url: SITE_URL },
    publisher: { '@type': 'Organization', name: business.name, url: SITE_URL },
    mainEntityOfPage: url,
    articleSection: p.category,
  }

  // Links inside the article to our own pages open without a full page reload
  const onContentClick = (e) => {
    const a = e.target.closest('a')
    const href = a?.getAttribute('href')
    if (!href || !href.startsWith('/') || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    navigate(href)
  }

  return (
    <div className="App">
      <SEO
        title={`${p.title} | Bayana`}
        description={p.description}
        path={`/blog/${p.slug}`}
        image={p.image}
        noindex={!p.published}
        schema={[articleSchema, breadcrumbSchema(crumbs), p.faqs.length ? faqSchema(p.faqs) : null]}
      />
      <Navbar />
      <main id="main">
        {!p.published && (
          <p className="bg-amber-100 py-2 text-center text-sm font-semibold text-amber-900">Draft preview — only you can see this page until it is published.</p>
        )}
        <article>
          {/* Header */}
          <header className="bg-gradient-to-b from-brand-50 via-white to-white">
            <div className="container max-w-4xl pb-8 pt-10 text-center md:pt-14">
              <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:text-brand-900">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <p className="mt-6">
                <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-brand-800">{p.category}</span>
              </p>
              <h1 className="mt-4 text-[1.9rem] font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">{p.title}</h1>
              <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-body/70">
                <span className="font-semibold text-ink">Bayana Global</span>
                <span aria-hidden="true">·</span>
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.readMinutes} min read</span>
              </p>
            </div>
            <figure className="container max-w-5xl">
              <img src={p.image} alt={p.imageAlt} width="1280" height="640" fetchPriority="high" decoding="async" className="aspect-[2/1] w-full rounded-[2rem] object-cover shadow-xl" />
              {p.caption && <figcaption className="mt-3 text-center text-sm text-body/70">{p.caption}</figcaption>}
            </figure>
          </header>

          {/* Body */}
          <div className={`container grid max-w-6xl gap-10 py-10 md:py-14 ${toc.length > 1 ? 'lg:grid-cols-[220px_1fr] lg:gap-14' : ''}`}>
            {toc.length > 1 && (
              <aside className="hidden lg:block" aria-label="In this article">
                <nav className="sticky top-28">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-body/60">In this article</p>
                  <ul className="space-y-2 border-l border-gray-200">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm text-body/80 transition hover:border-brand-500 hover:text-ink">{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
            <div className={`min-w-0 ${toc.length > 1 ? '' : 'mx-auto w-full max-w-3xl'}`}>
              {p.standfirst && <p className="mb-8 border-l-4 border-brand-500 pl-5 text-lg font-medium leading-relaxed text-ink/90 md:text-xl">{p.standfirst}</p>}
              {/* Article body written in the admin editor (cleaned before saving) */}
              <div className="blog-content" onClick={onContentClick} dangerouslySetInnerHTML={{ __html: p.content }} />
              <div className="mt-10 border-t border-gray-100 pt-6"><Share url={url} title={p.title} /></div>
            </div>
          </div>
        </article>

        {p.faqs.length > 0 && <FAQ faqs={p.faqs} />}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-10 md:py-14" aria-labelledby="related-posts">
            <div className="container">
              <h2 id="related-posts" className="mb-7 text-center text-2xl md:text-[2rem]">Related Posts</h2>
              <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
                {related.map((r) => <PostCard key={r.slug} p={r} />)}
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

import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import NotFound from './NotFound'
import { Cover } from './Blogs'
import { breadcrumbSchema, faqSchema } from '../schema'
import { SITE_URL, business } from '../siteConfig'
import { usePost, usePostList, absoluteUrl } from '../blog/blogData'

// Blog article page — same layout as the Aegis blog:
// back link · category · title · meta · image · summary box · article · CTA box · share · related posts

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const longDate = (d) => {
  if (!d) return ''
  const [y, m, day] = String(d).slice(0, 10).split('-')
  return `${day} ${MONTHS[Number(m) - 1]} ${y}`
}

const Dot = () => <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-body/40" aria-hidden="true" />

function ShareButton({ title, text, url }) {
  const [copied, setCopied] = useState(false)
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch {
        /* user closed the share sheet */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="mt-10 flex items-center gap-3.5 border-y border-gray-200 py-6">
      <span className="text-xs font-bold uppercase tracking-[.05em] text-body/50">Share this insight:</span>
      <button
        type="button"
        onClick={share}
        aria-label="Share this post"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-body/70 transition hover:-translate-y-0.5 hover:border-brand-600 hover:text-brand-700"
      >
        <Share2 className="h-4 w-4" />
      </button>
      {copied && <span className="text-[13px] font-semibold text-brand-700">Link copied!</span>}
    </div>
  )
}

function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const p = usePost(slug)
  const { list } = usePostList()

  if (p === undefined) {
    return (
      <div className="App">
        <Navbar />
        <main id="main" className="mx-auto max-w-[800px] px-5 pb-24 pt-10 md:pt-14">
          <p className="text-body/60">Loading post…</p>
        </main>
        <Footer />
      </div>
    )
  }
  if (p === null) return <NotFound />

  const url = `${SITE_URL}/blog/${p.slug}`
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blogs' }, { name: p.title, path: `/blog/${p.slug}` }]
  const others = list.filter((x) => x.slug !== p.slug)
  const related = [...others.filter((x) => x.category === p.category), ...others.filter((x) => x.category !== p.category)].slice(0, 3)

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
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
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
        type="article"
        noindex={!p.published}
        schema={[articleSchema, breadcrumbSchema(crumbs), p.faqs.length ? faqSchema(p.faqs) : null]}
      />
      <Navbar />
      <main id="main">
        {!p.published && (
          <p className="bg-amber-100 py-2 text-center text-sm font-semibold text-amber-900">Draft preview — only you can see this page until it is published.</p>
        )}

        <article className="pb-20 pt-10 md:pb-24 md:pt-14">
          <div className="mx-auto max-w-[800px] px-5">
          {/* Header — same layout as the Aegis blog */}
          <header>
            <Link to="/blogs" className="mb-7 inline-block text-sm font-semibold text-brand-700 hover:text-brand-900">← Back to Blog</Link>

            <h1 className="mb-4 ![text-wrap:wrap] text-[26px] font-extrabold leading-[1.2] tracking-tight text-ink sm:text-[32px] md:text-[38px]">{p.title}</h1>

            <div className="mb-8 flex flex-wrap items-center gap-2.5 text-[13.5px] text-body/60">
              <span className="font-bold text-ink">Bayana Global Limited</span>
              <Dot />
              <time dateTime={p.date}>{longDate(p.date)}</time>
              <Dot />
              <span>{p.readMinutes} min read</span>
            </div>
          </header>

          <figure className="mb-10">
            <Cover src={p.image} alt={p.imageAlt} eager className="aspect-square w-full rounded-2xl shadow-md sm:aspect-[4/3]" />
            {p.caption && <figcaption className="mt-2.5 text-center text-sm text-body/60">{p.caption}</figcaption>}
          </figure>

          {p.standfirst && (
            <p className="mb-9 rounded-lg border-l-4 border-brand-600 bg-brand-50 px-[22px] py-[18px] text-[17px] font-medium leading-[1.65] text-ink md:text-lg">{p.standfirst}</p>
          )}

          {/* Article body written in the admin editor (cleaned before saving) */}
          <div className="blog-content" onClick={onContentClick} dangerouslySetInnerHTML={{ __html: p.content }} />

          {/* FAQs — same look as the article headings */}
          {p.faqs.length > 0 && (
            <section className="blog-content mt-2" aria-labelledby="faq-title">
              <h2 id="faq-title">Frequently Asked Questions</h2>
              {p.faqs.map((f) => (
                <div key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>
          )}

          {/* CTA box */}
          <div className="mb-10 mt-14 rounded-lg border-l-4 border-brand-600 bg-gray-50 px-5 py-[22px] md:px-8 md:py-7">
            <h2 className="mb-2.5 text-xl font-extrabold uppercase tracking-[.02em] text-ink">Start Your ADGM Business With Confidence</h2>
            <p className="mb-5 text-[14.5px] text-body/70">Company setup, licences, visas and office space — handled by one team on Al Reem Island.</p>
            <Link to="/contact" className="btn-primary !min-h-0 !px-6 !py-2.5 !text-[13px] font-bold uppercase tracking-[.12em]">Book a consultation</Link>
          </div>

          <ShareButton title={p.title} text={p.description} url={url} />

          {/* Related posts */}
          {related.length > 0 && (
            <section className="pt-10" aria-labelledby="related-posts">
              <h2 id="related-posts" className="mb-7 text-2xl font-extrabold uppercase tracking-[.02em] text-ink">Related Posts</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-brand-600 hover:shadow-lg">
                    <Cover src={r.image} alt={r.imageAlt} className="aspect-square" />
                    <div className="px-[18px] py-4">
                      <h3 className="mb-2 text-[14.5px] font-extrabold uppercase leading-[1.35] text-ink">{r.title}</h3>
                      <p className="line-clamp-2 text-[12.5px] leading-[1.55] text-body/70">{r.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default BlogDetail

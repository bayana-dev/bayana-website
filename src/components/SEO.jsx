import { Helmet } from 'react-helmet-async'
import { SITE_URL, business } from '../siteConfig'

/**
 * Per-page SEO: title, meta description, robots, canonical, hreflang, Open Graph, Twitter, JSON-LD.
 * Pages are pre-rendered (scripts/prerender.mjs), so all of this is in the HTML Google downloads.
 */
function SEO({ title, description, path = '/', schema = [], noindex = false, image, imageAlt, type = 'website' }) {
  const url = SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, ''))
  const img = SITE_URL + (image || business.ogImage)
  const blocks = (Array.isArray(schema) ? schema : [schema]).filter(Boolean)
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      <link rel="canonical" href={url} />
      {!noindex && <link rel="alternate" hrefLang="en-AE" href={url} />}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || `${business.name} — ADGM corporate services, Al Reem Island, Abu Dhabi`} />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  )
}

export default SEO

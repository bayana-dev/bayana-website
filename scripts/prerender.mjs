// Runs after `vite build` (see package.json "build").
// Renders every route to static HTML so Google sees titles, meta, schema and text
// without running JavaScript. Blog posts are loaded from Supabase here.
// Also writes sitemap.xml and 404.html.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

// Values from Vercel environment variables, or from .env when building locally
const envFile = path.join(rootDir, '.env')
const envText = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : ''
const readEnv = (key) => (process.env[key] || envText.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1] || '').trim().replace(/^["']|["']$/g, '')

const SITE_URL = (readEnv('VITE_SITE_URL') || 'https://www.bayana.ae').replace(/\/$/, '')
const SUPABASE_URL = readEnv('VITE_SUPABASE_URL').replace(/\/$/, '')
const SUPABASE_KEY = readEnv('VITE_SUPABASE_ANON_KEY')

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { render, fromRow, STATIC_ROUTES, NOINDEX_ROUTES } = await import(path.join(distDir, 'server/entry-server.js'))

// ---- Published blog posts from Supabase ----
async function loadPosts() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('⚠  Supabase keys missing — blog articles are not prerendered.')
    return []
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=*&published=eq.true&order=published_at.desc,created_at.desc`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
    return (await res.json()).map(fromRow)
  } catch (err) {
    console.warn(`⚠  Could not load blog posts from Supabase: ${err.message}`)
    return []
  }
}
const posts = await loadPosts()
const list = posts.map(({ content, faqs, standfirst, caption, ...card }) => card)

// Data each blog page needs, embedded as window.__BLOG__ so the browser starts with the same content
function blogDataFor(route) {
  if (route === '/blogs') return { list }
  if (route.startsWith('/blog/')) {
    const p = posts.find((x) => `/blog/${x.slug}` === route)
    return { list, posts: { [p.slug]: p } }
  }
  return null
}

function writePage(route, html, helmet, blogData) {
  const headTags = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()]
  if (blogData) headTags.push(`<script>window.__BLOG__=${JSON.stringify(blogData).replace(/</g, '\\u003c')}</script>`)

  const page = template
    .replace('</head>', `${headTags.join('\n')}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const outPath =
    route === '/'
      ? path.join(distDir, 'index.html')
      : route === '/404'
        ? path.join(distDir, '404.html')
        : path.join(distDir, route.slice(1), 'index.html')

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, page)
  console.log(`Prerendered ${route}`)
}

const BLOG_ROUTES = posts.map((p) => `/blog/${p.slug}`)
const ALL_ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES, ...NOINDEX_ROUTES]
for (const route of ALL_ROUTES) {
  const data = blogDataFor(route)
  const { html, helmet } = render(route, data || {})
  writePage(route, html, helmet, data)
}

// Real 404 page (Vercel serves dist/404.html for unknown URLs)
{
  const { html, helmet } = render('/this-path-does-not-exist-404-check', {})
  writePage('/404', html, helmet, null)
}
console.log(`\nPrerendering complete: ${ALL_ROUTES.length} routes (${posts.length} blog posts) + 404 page.`)

// ---- sitemap.xml: indexable pages + published blog posts ----
const PRIORITY = { '/': '1.0', '/adgm-company-formation': '0.9', '/ded-to-adgm-licence-conversion': '0.9', '/blogs': '0.7', '/contact': '0.6', '/privacy-policy': '0.3', '/terms': '0.3' }
const today = new Date().toISOString().split('T')[0]
const entries = [
  ...STATIC_ROUTES.map((r) => ({ loc: r, lastmod: today, priority: PRIORITY[r] || '0.8' })),
  ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.updated || p.date || today, priority: '0.6' })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>\n    <loc>${SITE_URL}${e.loc === '/' ? '/' : e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <priority>${e.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemap)
console.log(`sitemap.xml written with ${entries.length} URLs`)

// Remove the server bundle from the deploy folder
fs.rmSync(path.join(distDir, 'server'), { recursive: true, force: true })

// Runs after `vite build` (see package.json "build").
// Renders every route to static HTML so Google sees titles, meta, schema and text
// without running JavaScript. Also writes sitemap.xml and 404.html.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

// Site URL from .env (VITE_SITE_URL) or default
const envFile = path.join(rootDir, '.env')
const env = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf8') : ''
const SITE_URL = (process.env.VITE_SITE_URL || env.match(/^VITE_SITE_URL=(.+)$/m)?.[1] || 'https://www.bayana.ae')
  .trim()
  .replace(/\/$/, '')

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { render, STATIC_ROUTES, NOINDEX_ROUTES } = await import(path.join(distDir, 'server/entry-server.js'))

function writePage(route, html, helmet) {
  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('\n')

  const page = template
    .replace('</head>', `${headTags}\n</head>`)
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

const ALL_ROUTES = [...STATIC_ROUTES, ...NOINDEX_ROUTES]
for (const route of ALL_ROUTES) {
  const { html, helmet } = render(route)
  writePage(route, html, helmet)
}

// Real 404 page (Vercel serves dist/404.html for unknown URLs)
{
  const { html, helmet } = render('/this-path-does-not-exist-404-check')
  writePage('/404', html, helmet)
}
console.log(`\nPrerendering complete: ${ALL_ROUTES.length} routes + 404 page.`)

// ---- sitemap.xml: every indexable page ----
const PRIORITY = { '/': '1.0', '/adgm-company-formation': '0.9', '/ded-to-adgm-licence-conversion': '0.9', '/contact': '0.6', '/privacy-policy': '0.3', '/terms': '0.3' }
const today = new Date().toISOString().split('T')[0]
const entries = STATIC_ROUTES.map((r) => ({ loc: r, lastmod: today, priority: PRIORITY[r] || '0.8' }))
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

// Reminder for unchecked facts
const pagesDir = path.join(rootDir, 'src', 'pages')
const verify = fs.readdirSync(pagesDir).reduce((n, f) => n + (fs.readFileSync(path.join(pagesDir, f), 'utf8').match(/\(VERIFY/g) || []).length, 0)
if (verify) console.warn(`⚠  ${verify} "(VERIFY)" facts still to check on adgm.com in src/pages/ (hidden on the live site)`)

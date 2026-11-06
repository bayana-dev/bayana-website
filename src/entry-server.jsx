import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { services } from './siteConfig.js'
import { primeBlog } from './blog/blogData.js'

export { fromRow } from './blog/blogData.js'

// Used by scripts/prerender.mjs to turn every route into static HTML.
// blogData = the Supabase blog posts this page needs (empty for non-blog pages).
export function render(url, blogData = {}) {
  primeBlog(blogData)
  const helmetContext = {}
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  )
  return { html, helmet: helmetContext.helmet }
}

// Route lists live here so the prerender script and the app never disagree.
// Blog article routes come from Supabase in scripts/prerender.mjs.
export const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/blogs',
  ...services.map((s) => `/${s.slug}`),
  '/privacy-policy',
  '/terms',
]
   export const NOINDEX_ROUTES = ['/thank-you', '/admin', '/admin/blog']

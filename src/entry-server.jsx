import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { services } from './siteConfig.js'

// Used by scripts/prerender.mjs to turn every route into static HTML
export function render(url) {
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

// Route lists live here so the prerender script and the app never disagree
export const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  ...services.map((s) => `/${s.slug}`),
  '/privacy-policy',
  '/terms',
]
export const NOINDEX_ROUTES = ['/thank-you', '/admin']

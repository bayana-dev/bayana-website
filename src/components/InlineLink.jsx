import { Link } from 'react-router-dom'

// Internal link inside page text — use the target page's keyword as anchor text
export const L = ({ to, children }) => (
  <Link
    to={to.startsWith('/') ? to : `/${to}`}
    className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
  >
    {children}
  </Link>
)

// External link (adgm.com, aegiscoworking.ae …)
export const Ext = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
  >
    {children}
  </a>
)

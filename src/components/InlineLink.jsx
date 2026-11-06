import { Link } from 'react-router-dom'

// Internal link inside page text — use the target page's keyword as anchor text
export const L = ({ to, children }) => (
  <Link
    to={to.startsWith('/') ? to : `/${to}`}
      className="font-bold text-brand-800 transition hover:text-brand-950"
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
        className="font-bold text-brand-800 transition hover:text-brand-950"
  >
    {children}
  </a>
)

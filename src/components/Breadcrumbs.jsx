import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-body/70">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-brand-300" />}
            {i < items.length - 1 ? (
              <Link to={it.path} className="flex items-center gap-1 transition hover:text-brand-700">
                {i === 0 && <Home className="h-3.5 w-3.5" />}{it.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-brand-800">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

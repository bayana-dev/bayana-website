import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { business, services, whatsappLink } from '../siteConfig'
import logo from '../assets/bayana-logo.png'
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons'

// Compact footer. Still links every page on the site (internal-linking rule: no page more than 3 clicks from home)
const byGroup = (...groups) => services.filter((s) => groups.includes(s.group)).map((s) => ({ to: `/${s.slug}`, label: s.short }))
const columns = [
  { title: 'Company Setup', links: [...byGroup('Company Setup'), { to: '/uae-free-zone-company-setup', label: 'Other UAE Free Zones' }] },
  { title: 'Corporate & Legal', links: [...byGroup('Corporate Services'), ...byGroup('Legal & Documents')] },
  {
    title: 'Visa, Office & Company',
    links: [...byGroup('Visa & Office'), { to: '/about', label: 'About Bayana' }, { to: '/contact', label: 'Contact Us' }],
  },
]

function Footer() {
  const socials = [
    [business.social.linkedin, LinkedInIcon, 'LinkedIn'],
    [business.social.instagram, InstagramIcon, 'Instagram'],
    [business.social.facebook, FacebookIcon, 'Facebook'],
  ]
  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-[13px] text-brand-50/75">
      <div className="bg-grid-light mask-fade absolute inset-0 -z-10 opacity-50" />

      <div className="container grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8">
        {/* Brand + NAP — must match Google Business Profile exactly */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link to="/" className="inline-block rounded-xl bg-white px-2.5 py-1.5">
            <img src={logo} alt="Bayana Global Limited logo" width="290" height="64" className="h-7 w-auto" loading="lazy" />
          </Link>
          <address className="mt-4 space-y-2 not-italic">
            <p className="flex gap-2.5"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" /><span><span className="font-semibold text-white">{business.name}</span>, {business.addressLine}</span></p>
            <p className="flex items-center gap-2.5">
              {/* Desktop/tablet: number opens WhatsApp · Phone: number starts a call */}
              <a href={whatsappLink()} target="_blank" rel="noopener" className="hidden items-center gap-2.5 font-semibold text-white hover:text-brand-300 md:inline-flex" data-track="whatsapp">
                <WhatsAppIcon className="h-3.5 w-3.5 text-whatsapp" />{business.phone}
              </a>
              <a href={business.phoneHref} className="inline-flex items-center gap-2.5 font-semibold text-white md:hidden" data-track="call">
                <Phone className="h-3.5 w-3.5 text-brand-400" />{business.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 shrink-0 text-brand-400" /><a href={`mailto:${business.email}`} className="hover:text-white">{business.email}</a></p>
            <p className="flex items-center gap-2.5"><Clock className="h-3.5 w-3.5 shrink-0 text-brand-400" />Mon–Thu 8–17 · Fri 8–11:30 · Sat–Sun closed</p>
          </address>
          <div className="mt-4 flex gap-2">
            {socials.map(([href, Icon, label]) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={`Bayana on ${label}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-600">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col, i) => (
          <div key={col.title} className={i === 2 ? 'col-span-2 md:col-span-1' : ''}>
            <h2 className="mb-3 font-display text-[11px] font-bold uppercase tracking-[.14em] text-white">{col.title}</h2>
            <ul className={`space-y-1.5 ${i === 2 ? 'grid grid-cols-2 items-start gap-x-6 space-y-0 gap-y-1.5 md:block md:space-y-1.5' : ''}`}>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar (extra bottom space on phones so the sticky WhatsApp/Call bar doesn't cover it) */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-4 pb-24 text-xs text-brand-50/60 md:flex-row md:items-center md:justify-between md:pb-4">
          <p>
            © {new Date().getFullYear()} {business.name}. Registered in Abu Dhabi Global Market (ADGM)
            {business.licenceNumber ? ` · Licence No. ${business.licenceNumber}` : ''}.
          </p>
          <p className="flex gap-4">
            <Link to="/terms" className="hover:text-white">Terms of Use</Link>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Menu, Phone, X } from 'lucide-react'
import { business, nav, serviceBySlug, whatsappLink } from '../siteConfig'
import logo from '../assets/bayana-logo.png'
import { WhatsAppIcon } from './Icons'
import ServiceIcon from './ServiceIcon'

// "Other Free Zones" sits inside the Company Setup dropdown (and the mobile menu) to keep the bar uncluttered
const HIDDEN = ['Other Free Zones']
// Desktop bar: the logo links home, so "Home" only appears in the mobile menu (leaves room for the number)
const menu = nav.filter((n) => !HIDDEN.includes(n.label))
const itemsOf = (group) =>
  group.children.map((slug) => ({ slug, to: `/${slug}`, label: serviceBySlug[slug].short, text: serviceBySlug[slug].cardText }))

function Navbar() {
  const [open, setOpen] = useState(false) // mobile drawer
  const [expanded, setExpanded] = useState(null) // mobile accordion
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false); setExpanded(null) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const groupActive = (item) => item.children?.some((slug) => pathname === `/${slug}`)

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-gray-200/70 bg-white/85 shadow-[0_8px_30px_-12px_rgba(3,79,50,.18)] backdrop-blur-xl' : 'border-b border-transparent bg-white'}`}
      >
        <div className={`container flex items-center justify-between gap-4 transition-all duration-500 ${scrolled ? 'h-[68px]' : 'h-[72px] lg:h-[84px]'}`}>
          <Link to="/" className="shrink-0" aria-label="Bayana Global – home">
            <img src={logo} alt="Bayana Global Limited – ADGM corporate services" width="290" height="64" className={`w-auto transition-all duration-500 ${scrolled ? 'h-8 sm:h-10' : 'h-8 sm:h-10 2xl:h-12'}`} />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {menu.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button
                    className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2.5 text-[15px] font-medium transition hover:text-brand-700 group-hover:bg-brand-50 group-hover:text-brand-700 group-focus-within:bg-brand-50 ${groupActive(item) ? 'text-brand-700' : 'text-ink'}`}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                  {/* Dropdown panel */}
                  <div
                    className={`invisible absolute top-full z-50 pt-3 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${item.children.length > 4 ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
                  >
                    <div className={`translate-y-2 rounded-3xl border border-gray-100 bg-white p-3 shadow-lift transition duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0 ${item.children.length > 4 ? 'grid w-[640px] grid-cols-2 gap-1' : 'w-[360px]'}`}>
                      {itemsOf(item).map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className={({ isActive }) => `group/item flex gap-3 rounded-2xl p-3 transition hover:bg-brand-50 ${isActive ? 'bg-brand-50' : ''}`}
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition group-hover/item:bg-brand-600 group-hover/item:text-white">
                            <ServiceIcon slug={c.slug} />
                          </span>
                          <span>
                            <span className="block text-[15px] font-semibold text-ink group-hover/item:text-brand-800">{c.label}</span>
                            <span className="line-clamp-2 text-[13px] leading-snug text-body/80">{c.text}</span>
                          </span>
                        </NavLink>
                      ))}
                      {item.label === 'Company Setup' && (
                        <Link to="/uae-free-zone-company-setup" className="col-span-2 mt-1 flex items-center justify-between rounded-2xl bg-brand-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-900">
                          <span>Need mainland, Meydan, Dubai South or Ajman? <span className="text-brand-300">Other UAE free zones</span></span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end
                  className={({ isActive }) => `relative whitespace-nowrap rounded-full px-3 py-2.5 text-[15px] font-medium transition hover:bg-brand-50 hover:text-brand-700 ${isActive ? 'text-brand-700' : 'text-ink'}`}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Plain number — desktop/tablet: opens WhatsApp · phone: starts a call */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="hidden whitespace-nowrap px-2 text-[15px] font-semibold tracking-wide text-ink transition hover:text-brand-700 md:inline"
              aria-label={`WhatsApp Bayana on ${business.phone}`}
              data-track="whatsapp"
            >
              {business.phone}
            </a>
            <a
              href={business.phoneHref}
              className="whitespace-nowrap px-1 text-[13px] font-semibold tracking-wide text-ink md:hidden"
              aria-label={`Call Bayana on ${business.phone}`}
              data-track="call"
            >
              {business.phone}
            </a>
            <Link to="/contact" className="btn-primary hidden !min-h-[44px] !px-5 sm:inline-flex">
              Contact <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-950 text-white transition hover:bg-brand-900 xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      {open && (
        <div className="fixed inset-0 z-[70] xl:hidden" id="mobile-menu">
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 animate-fade-in bg-brand-950/50 backdrop-blur-sm" />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-[420px] animate-slide-in flex-col bg-white shadow-2xl">
            <div className="flex h-[72px] items-center justify-between border-b border-gray-100 px-5">
              <img src={logo} alt="" width="290" height="64" className="h-9 w-auto" />
              <button onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-ink" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-3" aria-label="Mobile">
              {nav.map((item, i) =>
                item.children ? (
                  <div key={item.label} className="animate-fade-up border-b border-gray-100" style={{ animationDelay: `${60 + i * 45}ms` }}>
                    <button
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-4 text-left font-display text-[17px] font-semibold text-ink"
                      aria-expanded={expanded === item.label}
                    >
                      {item.label}
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full transition ${expanded === item.label ? 'rotate-180 bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'}`}>
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    <div className="faq-item" data-open={expanded === item.label}>
                      <div className="faq-panel">
                        <div>
                          <div className="space-y-1 pb-4">
                            {itemsOf(item).map((c) => (
                              <NavLink key={c.to} to={c.to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-2.5 ${isActive ? 'bg-brand-50 font-semibold text-brand-800' : 'text-body'}`}>
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><ServiceIcon slug={c.slug} className="h-4 w-4" /></span>
                                {c.label}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end
                    style={{ animationDelay: `${60 + i * 45}ms` }}
                    className={({ isActive }) => `flex animate-fade-up items-center justify-between border-b border-gray-100 py-4 font-display text-[17px] font-semibold ${isActive ? 'text-brand-700' : 'text-ink'}`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-brand-600" />
                  </NavLink>
                )
              )}
              <NavLink to="/contact" className="flex animate-fade-up items-center justify-between border-b border-gray-100 py-4 font-display text-[17px] font-semibold text-ink" style={{ animationDelay: '480ms' }}>
                Contact <ArrowRight className="h-4 w-4 text-brand-600" />
              </NavLink>
            </nav>
            <div className="grid gap-3 border-t border-gray-100 bg-brand-50/60 p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whatsapp w-full" data-track="whatsapp"><WhatsAppIcon /> WhatsApp {business.phone}</a>
              <a href={business.phoneHref} className="btn-dark w-full" data-track="call"><Phone className="h-4 w-4" /> Call now</a>
              <p className="flex items-start gap-2 pt-1 text-xs text-body/80"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" /> {business.addressLine}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar

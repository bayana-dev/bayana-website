import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import { WhatsAppIcon } from '../components/Icons'
import { reveal } from '../components/Reveal'
import { breadcrumbSchema, localBusinessSchema } from '../schema'
import { business, whatsappLink } from '../siteConfig'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]

function Contact() {
  const cards = [
    { icon: WhatsAppIcon, title: 'WhatsApp', value: business.phone, href: whatsappLink(), ext: true, track: 'whatsapp' },
    { icon: Phone, title: 'Call us', value: business.phone, href: business.phoneHref, track: 'call' },
    { icon: Mail, title: 'Email', value: business.email, href: `mailto:${business.email}` },
    { icon: Navigation, title: 'Directions', value: 'Addax Tower, Al Reem Island', href: business.mapLink, ext: true },
  ]
  return (
    <div className="App">
      <SEO
        title="Contact Bayana | Addax Tower, Al Reem Island"
        description="Visit Bayana Global at 3812 Addax Tower, Al Reem Island, Abu Dhabi, or WhatsApp +971 50 107 4414 for ADGM setup, visas and filings."
        path="/contact"
        schema={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Navbar />
      <main id="main">
        <PageHero crumbs={crumbs} eyebrow="Get in touch" title="Contact Bayana Global" aside={false}>
          <p className="lead max-w-2xl">Corporate services at Addax Tower, Al Reem Island. WhatsApp, call, send the form or visit us — we reply the same working day.</p>
        </PageHero>

        {/* Quick contact cards */}
        <section className="container -mt-2 pt-10 md:pt-14">
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {cards.map(({ icon: Icon, title, value, href, ext, track }, i) => (
              <a
                key={title}
                href={href}
                {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
                {...(track ? { 'data-track': track } : {})}
                {...reveal(i)}
                className="card card-hover spotlight group !p-5 md:!p-6"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white"><Icon className="h-5 w-5" /></span>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-body/60">{title}</p>
                <p className="mt-1 break-words text-sm font-semibold text-ink md:text-base">{value}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="section container grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-6 lg:col-span-2">
            <address {...reveal(0, 'left')} className="card space-y-4 not-italic">
              <h2 className="text-2xl">Our Office</h2>
              <p className="font-semibold text-ink">{business.name}</p>
              <p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{business.addressLine}</p>
              <p className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /><a href={business.phoneHref} className="font-semibold text-brand-700" data-track="call">{business.phone}</a></p>
              <p className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /><a href={`mailto:${business.email}`} className="text-brand-700">{business.email}</a></p>
              <div className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <table className="text-sm"><tbody>{business.hours.map((h) => <tr key={h.days}><th scope="row" className="pr-4 text-left font-medium text-ink">{h.days}</th><td>{h.time}</td></tr>)}</tbody></table>
              </div>
            </address>
            <div {...reveal(1, 'left')} className="rounded-3xl bg-brand-950 p-6 text-brand-50/80 md:p-7">
              <h2 className="mb-2 text-xl text-white">How to Find Us</h2>
              {/* TODO: add parking and entrance details */}
              <p>We are in Addax Tower on Al Reem Island, 38th floor, office 3812. Take the Addax Tower lifts to the 38th floor.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whatsapp" data-track="whatsapp"><WhatsAppIcon /> WhatsApp</a>
                <a href={business.phoneHref} className="btn-ghost-light" data-track="call"><Phone className="h-4 w-4" /> Call now</a>
              </div>
            </div>
          </div>
          <div {...reveal(1, 'right')} className="lg:col-span-3">
            <div className="rounded-[2rem] bg-gradient-to-br from-brand-100 via-brand-50 to-white p-2 md:p-3"><ContactForm /></div>
          </div>
        </section>

        <section className="container pb-16 md:pb-24">
          <div {...reveal(0, 'zoom')} className="overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
            <iframe title="Map — Bayana Global, 3812 Addax Tower, Al Reem Island" src={business.mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="block h-80 w-full border-0 md:h-[440px]" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Contact

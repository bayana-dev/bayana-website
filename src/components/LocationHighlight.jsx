import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { business, whatsappLink } from '../siteConfig'
import { WhatsAppIcon } from './Icons'
import SectionHeader from './SectionHeader'
import { reveal } from './Reveal'

// Address + map band (Home). Map pin: Addax Tower 3812, Al Reem Island
function LocationHighlight() {
  return (
    <section className="section pt-4 md:pt-8" aria-labelledby="visit-us">
      <div className="container grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-8">
        <div {...reveal(0, 'left')} className="flex flex-col rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 md:p-10">
          <SectionHeader eyebrow="Visit us" title="Visit Us on Al Reem Island" id="visit-us" />
          <address className="-mt-4 space-y-4 not-italic">
            <p className="font-display text-lg font-bold text-ink">{business.name}</p>
            <p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{business.addressLine}</p>
            <p className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /><a href={business.phoneHref} className="font-semibold text-brand-700 hover:underline" data-track="call">{business.phone}</a></p>
            <p className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />Mon–Thu 8:00–17:00 · Fri 8:00–11:30 · Sat–Sun closed</p>
          </address>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-8">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whatsapp" data-track="whatsapp"><WhatsAppIcon /> Chat on WhatsApp</a>
            <a href={business.mapLink} target="_blank" rel="noopener" className="btn-outline"><Navigation className="h-4 w-4" /> Get directions</a>
          </div>
        </div>
        <div {...reveal(1, 'right')} className="relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
          <iframe
            title="Bayana Global on Google Maps — 3812 Addax Tower, Al Reem Island"
            src={business.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
          />
        </div>
      </div>
    </section>
  )
}

export default LocationHighlight

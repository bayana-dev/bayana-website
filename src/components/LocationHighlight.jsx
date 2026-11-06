import { Clock, MapPin, Phone } from 'lucide-react'
import { business } from '../siteConfig'
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
            <p className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />Mon–Fri 9:00 AM – 5:00 PM · Sat–Sun closed</p>
          </address>
         
        </div>
        <div {...reveal(1, 'right')} className="relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-black/5">
          <iframe
            title="Bayana Global on Google Maps — 3812 Addax Tower, Al Reem Island"
            src={business.mapEmbed}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
            className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
          />
        </div>
      </div>
    </section>
  )
}

export default LocationHighlight

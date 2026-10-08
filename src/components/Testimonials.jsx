import { ArrowUpRight, Quote, Star } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { reveal } from './Reveal'
import { business } from '../siteConfig'

// Real Google reviews of BAYANA GLOBAL LIMITED (copied word for word from the Google Business Profile).
// To add one: copy the reviewer's name, the review text and the star rating into this list.
const reviews = [
  { name: 'Vassilis Damianos', text: 'Great support from the company, even greater support from Mohammed Swalih!', rating: 5, featured: true },
  { name: 'Learnlever', text: 'Good services', rating: 5 },
  { name: 'Shakir P', text: 'Good 👍', rating: 5 },
  { name: 'Ansar M A Palapetty', text: 'Good 👍', rating: 5 },
]

const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
const COLORS = ['bg-brand-700', 'bg-brand-900', 'bg-brand-600', 'bg-[#b8892d]']

function Stars({ n = 5, size = 'h-4 w-4' }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} ${i < n ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-gray-300'} transition duration-300 group-hover:scale-110`} style={{ transitionDelay: `${i * 40}ms` }} />
      ))}
    </span>
  )
}

function Person({ name, i, light }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white ${COLORS[i % COLORS.length]} ring-4 ${light ? 'ring-white/10' : 'ring-brand-50'}`}>
        {initials(name)}
      </span>
      <span>
        <span className={`block font-semibold ${light ? 'text-white' : 'text-ink'}`}>{name}</span>
        <span className={`text-xs ${light ? 'text-brand-50/60' : 'text-body/60'}`}>Google review</span>
      </span>
    </div>
  )
}

export default function Testimonials() {
  const featured = reviews.find((r) => r.featured)
  const others = reviews.filter((r) => !r.featured)
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section className="section relative overflow-hidden" aria-labelledby="testimonials">
      <div className="bg-grid mask-fade absolute inset-0 -z-10 opacity-60" />
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div className="-mb-10 md:-mb-14">
            <SectionHeader eyebrow="Client reviews" title="What Our Clients Say" id="testimonials" intro="Real reviews from clients on our Google Business Profile." />
          </div>
          {/* Rating summary */}
          <a
            href={business.mapLink}
            target="_blank"
            rel="noopener"
            {...reveal(2, 'right')}
            className="group flex items-center gap-4 rounded-3xl border border-gray-200 bg-white px-5 py-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="font-display text-4xl font-extrabold text-ink">{avg}</span>
            <span>
              <Stars n={5} />
              <span className="mt-1 flex items-center gap-1 text-sm text-body/80">
                Rated on Google <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </span>
          </a>
        </div>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-[1.15fr_.85fr]">
          {/* Featured review */}
          {featured && (
            <figure
              {...reveal(0, 'left')}
              className="noise group relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] bg-brand-950 p-7 text-white md:p-10"
            >
              <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
              <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 animate-drift rounded-full bg-brand-600/40 blur-[90px]" />
              <Quote className="absolute right-6 top-6 h-20 w-20 animate-float text-brand-500/20 md:h-28 md:w-28" />
              <div>
                <Stars n={featured.rating} size="h-5 w-5" />
                <blockquote className="mt-6 font-display text-2xl font-bold leading-snug md:text-[2rem]">
                  “{featured.text}”
                </blockquote>
              </div>
              <figcaption className="mt-10"><Person name={featured.name} i={0} light /></figcaption>
            </figure>
          )}

          {/* Other reviews */}
          <div className="grid gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-1">
            {others.map((r, i) => (
              <figure
                key={r.name}
                {...reveal(i + 1, 'right', 120)}
                className="card card-hover spotlight group flex flex-col justify-between gap-5 !p-6 lg:flex-row lg:items-center"
              >
                <div className="lg:order-2 lg:text-right">
                  <Stars n={r.rating} />
                  <blockquote className="mt-2 text-lg font-semibold text-ink">“{r.text}”</blockquote>
                </div>
                <figcaption className="lg:order-1"><Person name={r.name} i={i + 1} /></figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div {...reveal(1)} className="mt-8 flex justify-center">
          <a href={business.mapLink} target="_blank" rel="noopener" className="btn-outline">
            Read all reviews on Google <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

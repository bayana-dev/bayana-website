import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { business } from '../siteConfig'
import { reveal } from './Reveal'

// Closing contact band (no form): go to the Contact page or call
export default function FinalCTA({ service = '' }) {
  return (
    <section className="section" id="contact-form" aria-labelledby="cta-title">
      <div className="container">
        <div className="noise relative isolate overflow-hidden rounded-[2rem] bg-brand-950 px-5 py-12 text-center text-white sm:px-8 md:rounded-[2.5rem] md:py-16">
          <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
          <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 animate-drift rounded-full bg-brand-600/40 blur-[100px]" />
          <div className="absolute -bottom-32 right-10 -z-10 h-96 w-96 animate-drift rounded-full bg-brand-500/20 blur-[110px] [animation-delay:-7s]" />

          <p {...reveal(0)} className="eyebrow-dark"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" /> Let’s get started</p>
          <h2 id="cta-title" {...reveal(1)} className="section-title text-white">Ready to Start Your ADGM Business?</h2>
          <p {...reveal(2)} className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-brand-50/80 md:text-lg">
            Tell us what you need{service ? ` with ${service}` : ''} and our ADGM specialists will guide you through every step — from setup to ongoing support.
          </p>

          <div {...reveal(3)} className="mx-auto mt-8 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/contact" className="btn-primary" data-track="contact">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  )
}

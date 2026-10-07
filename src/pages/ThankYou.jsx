import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { business, whatsappLink } from '../siteConfig'
import { WhatsAppIcon } from '../components/Icons'

// Shown after the contact form is sent (noindex — not in sitemap)
function ThankYou() {
  return (
    <div className="App">
      <SEO title="Thank You | Bayana Global" description="Thank you for contacting Bayana Global." path="/thank-you" noindex />
      <Navbar />
      <main id="main">
        <section className="relative isolate overflow-hidden">
          <div className="bg-grid mask-fade absolute inset-0 -z-10" />
          <div className="container max-w-2xl py-20 text-center md:py-28">
            <span className="relative mx-auto flex h-24 w-24 animate-fade-up items-center justify-center rounded-full bg-brand-50">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-200" />
              <CheckCircle2 className="relative h-14 w-14 text-brand-600" />
            </span>
            <h1 className="mt-8 animate-fade-up text-4xl [animation-delay:100ms] md:text-5xl">Thank you!</h1>
            <p className="mt-4 animate-fade-up text-lg [animation-delay:180ms]">We have received your enquiry and will reply within one working day. For anything urgent, WhatsApp or call {business.phone}.</p>
            <div className="mt-9 flex animate-fade-up flex-col justify-center gap-3 [animation-delay:260ms] sm:flex-row">
              <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whatsapp" data-track="whatsapp"><WhatsAppIcon /> WhatsApp</a>
              <Link to="/" className="btn-outline">Back to home</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ThankYou

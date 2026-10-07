import { Link } from 'react-router-dom'
import { ArrowRight, Globe2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import Services from '../components/Services'
import HowWeWork from '../components/HowWeWork'
import SectorsWeServe from '../components/SectorsWeServe'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import LocationHighlight from '../components/LocationHighlight'
import { L } from '../components/InlineLink'
import { reveal } from '../components/Reveal'
import { faqSchema, localBusinessSchema } from '../schema'
import { business } from '../siteConfig'

const faqs = [
  { q: 'What does Bayana do in ADGM?', a: 'Bayana handles ADGM company formation, licensing, DED-to-ADGM conversions, visas, corporate filings, office space, notary and document services for financial, non-financial and retail businesses.' },
  { q: 'Can a foreigner own 100% of an ADGM company?', a: 'Yes, foreign investors can own 100% of an ADGM company, subject to applicable requirements.' },
  { q: 'Do I need an office to set up in ADGM?', a: <>A suitable registered office arrangement is required. See <L to="/adgm-office-space-lease">ADGM office space on Al Reem Island</L>.</> },
  { q: 'Can Bayana convert my Abu Dhabi DED licence to ADGM?', a: <>Yes — we have assisted with 500+ conversions and related cases. See <L to="/ded-to-adgm-licence-conversion">DED to ADGM licence conversion</L>.</> },
  { q: 'Do you handle visas after the licence is issued?', a: <>Yes — establishment card, e-channel, director, employee and dependent visas. See <L to="/adgm-visa-work-permit">ADGM visa services</L>.</> },
]

function Home() {
  return (
    <div className="App">
      <SEO
        title="ADGM Corporate Services Abu Dhabi | Bayana Global"
        description="ADGM company formation, licence conversion, visas, filings and office space from one team at Addax Tower, Al Reem Island. Talk to Bayana on WhatsApp."
        path="/"
        schema={[localBusinessSchema(), faqSchema(faqs)]}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />

        <Services
          id="company-setup"
          eyebrow="Company setup"
          title="ADGM Company Setup Services"
          intro={<>From <L to="/adgm-company-formation">ADGM company formation</L> to special structures, we set up the right entity for your business — financial, non-financial or retail.</>}
          slugs={['adgm-company-formation', 'adgm-financial-services-company-setup', 'adgm-non-financial-company-setup', 'adgm-retail-licence', 'ded-to-adgm-licence-conversion', 'adgm-spv-setup', 'adgm-foundation-setup']}
          cols="lg:grid-cols-4"
        />
        <Services
          tint
          id="corporate-services"
          eyebrow="After registration"
          title="Corporate Services After Registration"
          intro={<>Stay compliant every year with <L to="/adgm-annual-filings-licence-renewal">ADGM licence renewal</L> and filings, make changes as your business grows, or close properly.</>}
          slugs={['adgm-csp-registered-office', 'adgm-annual-filings-licence-renewal', 'adgm-company-closure', 'adgm-aml-dnfbp-compliance']}
          cols="lg:grid-cols-4"
        />
        <Services
          id="visas-office"
          eyebrow="Visas & office"
          title="Visas and Office Space in ADGM"
          intro={<>Office facilities are available through our sister company{' '}
            <a href={business.partner.url} target="_blank" rel="noopener" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600">{business.partner.name}</a> at Addax Tower — so your licence, lease and visa quota line up from day one.</>}
          slugs={['adgm-visa-work-permit', 'adgm-office-space-lease']}
          cols="lg:grid-cols-2"
        />
        <Services
          tint
          id="legal-documents"
          eyebrow="Legal & documents"
          title="Legal and Document Services"
          intro={<>Notarisation at ADGM Courts, <L to="/adgm-non-muslim-will-registration">non-Muslim will registration</L>, translation and attestation.</>}
          slugs={['adgm-courts-notary', 'adgm-non-muslim-will-registration', 'legal-translation-attestation-abu-dhabi']}
        />

        <HowWeWork />
        <SectorsWeServe />

        {/* Other UAE jurisdictions */}
        <section className="section pb-0" aria-labelledby="other-jurisdictions">
          <div className="container">
            <div {...reveal(0, 'zoom')} className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-brand-50 p-7 md:flex-row md:items-center md:p-10">
              <div className="bg-grid mask-fade absolute inset-0" />
              <div className="relative flex items-start gap-5">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow transition duration-700 group-hover:rotate-[360deg] sm:flex">
                  <Globe2 className="h-7 w-7" />
                </span>
                <div>
                  <h2 id="other-jurisdictions" className="mb-2 text-2xl md:text-3xl">Other UAE Jurisdictions</h2>
                  <p className="max-w-2xl">ADGM is our focus, but we also coordinate Abu Dhabi mainland, Meydan, Dubai South and Ajman setups with trusted partners.</p>
                </div>
              </div>
              <Link to="/uae-free-zone-company-setup" className="btn-primary relative shrink-0">UAE free zone company setup <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <FAQ faqs={faqs} />
        <LocationHighlight />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default Home

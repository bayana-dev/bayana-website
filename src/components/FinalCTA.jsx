// import { Link } from 'react-router-dom'
// import { ArrowRight, Phone } from 'lucide-react'
// import { business } from '../siteConfig'
// import { reveal } from './Reveal'

// // Closing contact band (no form): go to the Contact page or call
// export default function FinalCTA({ service = '' }) {
//   return (
//     <section className="section" id="contact-form" aria-labelledby="cta-title">
//       <div className="container">
//         <div className="noise relative isolate overflow-hidden rounded-[2rem] bg-brand-950 px-5 py-12 text-center text-white sm:px-8 md:rounded-[2.5rem] md:py-16">
//           <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
//           <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 animate-drift rounded-full bg-brand-600/40 blur-[100px]" />
//           <div className="absolute -bottom-32 right-10 -z-10 h-96 w-96 animate-drift rounded-full bg-brand-500/20 blur-[110px] [animation-delay:-7s]" />

//           <p {...reveal(0)} className="eyebrow-dark"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" /> Let’s get started</p>
//           <h2 id="cta-title" {...reveal(1)} className="section-title text-white">Ready to Start Your ADGM Business?</h2>
//           <p {...reveal(2)} className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-brand-50/80 md:text-lg">
//             Tell us what you need{service ? ` with ${service}` : ''} and our ADGM specialists will guide you through every step — from setup to ongoing support.
//           </p>

//           <div {...reveal(3)} className="mx-auto mt-8 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
//             <Link to="/contact" className="btn-primary" data-track="contact">
//               Contact us <ArrowRight className="h-4 w-4" />
//             </Link>
            
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }













import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { reveal } from './Reveal'

// Unique heading + line for each page's closing section (no repeated text across pages).
const COPY = {
  home: ['Ready to Start Your ADGM Business?', 'Tell us what you need and our ADGM specialists will guide you through every step — from setup to ongoing support.'],
  about: ['Work With a Team That Keeps It Clear', 'Talk to Bayana about your plans in ADGM and get straightforward guidance from people who handle these processes every day.'],
  'adgm-company-formation': ['Ready to Register Your ADGM Company?', 'Share your business idea and we will recommend the right structure, prepare your documents and handle the Registration Authority filing.'],
  'adgm-financial-services-company-setup': ['Planning a Financial Services Firm in ADGM?', 'Tell us about your regulated activity and we will coordinate the corporate setup with our channel partners and your FSRA adviser.'],
  'adgm-non-financial-company-setup': ['Set Up Your Non-Financial Company in ADGM', 'Consultancy, technology, holding or trading — tell us your activities and we will map out the licence and steps for you.'],
  'adgm-retail-licence': ['Opening a Shop, Café or Salon on Al Reem Island?', 'Let us handle your ADGM retail licence, lease registration and visas so you can focus on opening your doors.'],
  'ded-to-adgm-licence-conversion': ['Moving Your Licence From DED to ADGM?', 'With 1,000+ conversions and related cases handled, we can take you through the licence, lease, establishment card and visa transfer.'],
  'adgm-spv-setup': ['Need an SPV to Hold Your Assets?', 'Tell us what the SPV will hold and we will arrange the incorporation, registered address and filings through our channel partners.'],
  'adgm-foundation-setup': ['Protect Your Assets With an ADGM Foundation', 'Discuss your succession or asset-protection goals with us and we will guide you through setting up the right foundation.'],
  'adgm-csp-registered-office': ['Need a Registered Office in ADGM?', 'We arrange registered office, registered agent and statutory filing support through our channel partners.'],
  'adgm-annual-filings-licence-renewal': ['Keep Your ADGM Company Compliant', 'Hand over your renewals, confirmation statements and amendments to us and never miss an ADGM deadline.'],
  'adgm-company-closure': ['Closing Your ADGM Company?', 'We manage visa cancellations, final filings and strike-off so your company closes cleanly and correctly.'],
  'adgm-visa-work-permit': ['Get Your Team’s ADGM Visas Moving', 'From establishment card to employee and dependent visas, tell us who needs a visa and we will handle the process.'],
  'adgm-office-space-lease': ['Looking for Office Space in ADGM?', 'Desks and offices at Addax Tower with AccessRP lease registration — tell us your team size and we will find the right fit.'],
  'adgm-courts-notary': ['Need a Document Notarised at ADGM Courts?', 'Send us your document and we will prepare it, book the ADGM Courts appointment and follow up until it is certified.'],
  'adgm-non-muslim-will-registration': ['Secure Your Family’s Future With a Registered Will', 'Talk to us about registering your non-Muslim will at ADGM Courts, covering your UAE assets and guardianship wishes.'],
  'legal-translation-attestation-abu-dhabi': ['Need Documents Translated or Attested?', 'Share your documents and we will arrange certified legal translation and attestation in Abu Dhabi.'],
  'adgm-aml-dnfbp-compliance': ['Get Your AML Compliance in Order', 'We help you put MLRO support, AML and KYC policies and goAML registration in place through our partners.'],
  'uae-free-zone-company-setup': ['Considering Another UAE Jurisdiction?', 'Tell us where you want to set up — Abu Dhabi mainland, Meydan, Dubai South or Ajman — and we will connect you with the right partner.'],
}

// Closing contact band. Each service group gets its own look (variant = service group name).
// Home and About use the default dark-green design.
export default function FinalCTA({ page = 'home', variant = 'default' }) {
  const [title, text] = COPY[page] || COPY.home

  // Corporate Services: clean white panel, text left and button right
  if (variant === 'Corporate Services') return (
    <section className="pb-16 pt-6 md:pb-20 md:pt-8" id="contact-form" aria-labelledby="cta-title">
      <div className="container">
        <div {...reveal(0)} className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-7 shadow-lift md:p-12">
          <span className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-brand-500 to-brand-800" />
          <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-[.2em] text-brand-700">Let’s get started</p>
              <h2 id="cta-title" className="section-title">{title}</h2>
              <p className="mt-4 text-[17px] leading-relaxed">{text}</p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0 !px-8" data-track="contact">Contact us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  )

  // Visa & Office: bright green gradient with a large faint circle pattern
  if (variant === 'Visa & Office') return (
    <section className="section" id="contact-form" aria-labelledby="cta-title">
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-12 text-white md:rounded-[2.5rem] md:px-14 md:py-16">
          <span className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border-[40px] border-white/10" />
          <span className="absolute -bottom-32 left-10 -z-10 h-72 w-72 rounded-full border-[30px] border-white/5" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_.7fr]">
            <div>
              <p {...reveal(0)} className="eyebrow-dark !border-white/25 !bg-white/10 !text-white"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Let’s get started</p>
              <h2 id="cta-title" {...reveal(1)} className="section-title text-white">{title}</h2>
              <p {...reveal(2)} className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/85">{text}</p>
            </div>
            <div {...reveal(3)} className="flex flex-col gap-3 lg:items-end">
              <Link to="/contact" className="btn bg-white !px-8 text-brand-900 hover:-translate-y-0.5 hover:bg-brand-50" data-track="contact">Contact us <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // Legal & Documents: warm paper background with gold accents
  if (variant === 'Legal & Documents') return (
    <section className="section" id="contact-form" aria-labelledby="cta-title">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#b8892d]/25 bg-[#faf7f0] px-6 py-12 text-center md:rounded-[2.5rem] md:py-16">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#b8892d] to-transparent" />
          <span className="mx-auto mb-5 flex h-12 w-12 rotate-45 items-center justify-center rounded-xl border border-[#b8892d]/40 bg-white" aria-hidden="true">
            <span className="h-3 w-3 -rotate-45 rounded-full bg-[#b8892d]" />
          </span>
          <p {...reveal(0)} className="mb-3 font-display text-xs font-bold uppercase tracking-[.2em] text-[#8a6620]">Let’s get started</p>
          <h2 id="cta-title" {...reveal(1)} className="section-title">{title}</h2>
          <p {...reveal(2)} className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed">{text}</p>
          <div {...reveal(3)} className="mx-auto mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn bg-brand-900 text-white hover:-translate-y-0.5 hover:bg-brand-950" data-track="contact">Contact us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  )

  // Other UAE free zones: soft green tint, split layout
  if (variant === 'Other') return (
    <section className="section" id="contact-form" aria-labelledby="cta-title">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-brand-100/60 p-7 ring-1 ring-brand-100 md:rounded-[2.5rem] md:p-12">
          <div className="bg-grid mask-fade absolute inset-0" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-brand-600" /> Let’s get started</p>
              <h2 id="cta-title" {...reveal(0)} className="section-title">{title}</h2>
              <p {...reveal(1)} className="mt-4 max-w-2xl text-[17px] leading-relaxed">{text}</p>
            </div>
            <Link to="/contact" {...reveal(2)} className="btn-primary !px-8" data-track="contact">Contact us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  )

  // Default (Home, About, Company Setup): dark green band
  return (
    <section className="section" id="contact-form" aria-labelledby="cta-title">
      <div className="container">
        <div className="noise relative isolate overflow-hidden rounded-[2rem] bg-brand-950 px-5 py-12 text-center text-white sm:px-8 md:rounded-[2.5rem] md:py-16">
          <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
          <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 animate-drift rounded-full bg-brand-600/40 blur-[100px]" />
          <div className="absolute -bottom-32 right-10 -z-10 h-96 w-96 animate-drift rounded-full bg-brand-500/20 blur-[110px] [animation-delay:-7s]" />

          <p {...reveal(0)} className="eyebrow-dark"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" /> Let’s get started</p>
          <h2 id="cta-title" {...reveal(1)} className="section-title text-white">{title}</h2>
          <p {...reveal(2)} className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-brand-50/80 md:text-lg">{text}</p>

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

import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, Compass, Eye, Handshake, Landmark, MapPin, Network, ShieldCheck, Target } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'
import FinalCTA from '../components/FinalCTA'
import { reveal } from '../components/Reveal'
import { breadcrumbSchema } from '../schema'
import { WhatsAppIcon } from '../components/Icons'
import { business, CSP_LICENCE_CONFIRMED, SITE_URL, services, whatsappLink } from '../siteConfig'
import directorPhoto from '../assets/mohammed-swalih-kalippadath-director-bayana-720.webp'

const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]

// TODO (issues #3 and #4): confirm director name spelling, experience figure and photo
const director = {
  name: business.director,
  role: 'Director',
  experience: '', // e.g. 'X years of experience in ADGM registration, corporate services and government procedures'
  linkedin: '',
  photo: directorPhoto, // src/assets/mohammed-swalih-kalippadath-director-bayana-720.webp (WebP)
}

// Areas the director leads (from the Bayana Website Doc)
const expertise = ['ADGM registration', 'Corporate services', 'Government procedures', 'Immigration & visas', 'DED-to-ADGM conversions']

const stats = [
  ['500+', 'DED-to-ADGM conversions & related cases'],
  ['3', 'sectors: financial, non-financial, retail'],
  [String(services.length), 'corporate services under one roof'],
]

const focus = [
  { icon: Landmark, title: 'Financial', text: 'Corporate setup alongside your FSRA adviser.', to: '/adgm-financial-services-company-setup' },
  { icon: Building2, title: 'Non-financial', text: 'Consultancy, tech, holding, trading and professional firms.', to: '/adgm-non-financial-company-setup' },
  { icon: Compass, title: 'Retail', text: 'Shops, restaurants, cafés and salons on Al Reem Island.', to: '/adgm-retail-licence' },
]

const values = [
  { icon: Eye, title: 'Clarity', text: 'Clear steps, clear fees and clear communication at every stage.' },
  { icon: ShieldCheck, title: 'Accuracy', text: 'Documents prepared right the first time, checked against ADGM requirements.' },
  { icon: Handshake, title: 'One point of contact', text: 'Licence, visas, office and filings coordinated by one team.' },
]

function About() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: director.name,
    jobTitle: director.role,
    image: SITE_URL + director.photo,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    ...(director.linkedin ? { sameAs: [director.linkedin] } : {}),
  }
  const aboutPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/about`,
    name: 'About Bayana Global Limited',
    about: { '@id': `${SITE_URL}/#organization` },
  }
  return (
    <div className="App">
      <SEO
        title="About Bayana Global | ADGM Corporate Services"
        description="Bayana Global Limited is an ADGM-registered corporate services firm on Al Reem Island, supporting financial, non-financial and retail businesses."
        path="/about"
        schema={[aboutPage, personSchema, breadcrumbSchema(crumbs)]}
      />
      <Navbar />
      <main id="main">
                <PageHero crumbs={crumbs} eyebrow="About us" title="About Bayana Global Limited" aside={false}>
          <p className="lead max-w-2xl">
            An ADGM-registered corporate services firm on Al Reem Island, giving corporate and business support to
            companies, entrepreneurs and investors.
          </p>
        </PageHero>

        {/* Key numbers */}
        <section className="container -mt-px pt-10 md:pt-14" aria-label="Bayana in numbers">
          <ul className="grid gap-3 sm:grid-cols-3 md:gap-4">
            {stats.map(([n, t], i) => (
              <li key={t} {...reveal(i)} className="card flex items-center gap-4 !p-5 md:!p-6">
                <span className="font-display text-4xl font-extrabold text-gradient md:text-5xl">{n}</span>
                <span className="text-sm leading-snug text-body/90">{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who we are + meaning */}
        <section className="section" aria-labelledby="who-we-are">
          <div className="container grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div>
              <SectionHeader eyebrow="Who we are" title="Who We Are" id="who-we-are" />
              <div {...reveal(1)} className="prose-bayana -mt-4 text-[17px]">
                <p>
                  {business.name} is a company registered in Abu Dhabi Global Market (ADGM), providing corporate and
                  business support services to companies, entrepreneurs and investors operating in the UAE. Our office is
                  at {business.addressLine}.
                </p>
                <p>
                  We focus primarily on ADGM — company incorporation, documentation, post-registration services,
                  government procedures, immigration, compliance coordination and company cancellation formalities.
                </p>
              </div>
            </div>
            <div {...reveal(1, 'right')} className="noise relative isolate overflow-hidden rounded-[2rem] bg-brand-950 p-8 text-white md:p-10">
              <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
              <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-brand-600/40 blur-[90px]" />
              <h2 className="text-xl text-white">What “Bayana” Means</h2>
              <p lang="ar" className="my-6 font-display text-6xl font-bold text-brand-300 md:text-7xl">بيانة</p>
              <p className="text-brand-50/80">Bayana stands for clarity and transparency. That is how we work: clear steps, clear fees and clear communication.</p>
            </div>
          </div>
        </section>

        {/* ADGM focus */}
        <section className="section bg-gradient-to-b from-brand-50/70 to-white" aria-labelledby="our-focus">
          <div className="container">
            <SectionHeader eyebrow="Our ADGM focus" title="Our ADGM Focus" id="our-focus" intro={<>We support financial, non-financial and retail businesses — start with <Link to="/adgm-company-formation" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4">ADGM company formation</Link> or choose your sector.</>} />
            <div className="grid gap-4 md:grid-cols-3">
              {focus.map(({ icon: Icon, title, text, to }, i) => (
                <Link key={title} to={to} {...reveal(i)} className="card card-hover spotlight group">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white"><Icon className="h-6 w-6" /></span>
                  <h3 className="mb-2 text-xl">{title}</h3>
                  <p className="mb-4">{text}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
            {CSP_LICENCE_CONFIRMED && (
              <div {...reveal(0)} className="mt-10 rounded-3xl border border-brand-200 bg-white p-6">
                <h2 className="mb-2 text-2xl">CSP Licence (Activity 7025)</h2>
                <p>Bayana holds an ADGM company service provider licence (activity 7025). {/* TODO: add licence details */}</p>
              </div>
            )}
          </div>
        </section>

        {/* Leadership — director profile */}
        <section className="section relative overflow-hidden" aria-labelledby="leadership">
          <div className="container grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
            {/* Portrait */}
            <div {...reveal(0, 'left')} className="relative mx-auto w-full max-w-[420px]">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-500/30 via-brand-200/30 to-transparent blur-2xl" />
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border-2 border-brand-200" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-50 to-white shadow-lift ring-1 ring-black/5">
                <img
                  src={director.photo}
                  alt={`${director.name}, ${director.role} of Bayana Global Limited, ADGM corporate services on Al Reem Island`}
                  width="720"
                  height="823"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[720/823] w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-transparent p-5 pt-16 text-white">
                  <p className="font-display text-lg font-bold">{director.name}</p>
                  <p className="text-sm text-brand-200">{director.role}, {business.name}</p>
                </div>
              </div>
              <span className="glass absolute -left-3 top-6 flex animate-float items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-brand-800 shadow-lift backdrop-blur md:-left-6">
                <BadgeCheck className="h-4 w-4 text-brand-600" /> Registered in ADGM
              </span>
            </div>

            {/* Bio */}
            <div>
              <SectionHeader eyebrow="Leadership" title="Meet Our Director" id="leadership" />
              <div {...reveal(1)} className="prose-bayana -mt-4 text-[17px]">
                <p>
                  Bayana Global Limited is led by its Director, <strong className="text-ink">{director.name}</strong>, who
                  oversees ADGM registration, corporate services and government-related procedures for our clients.
                </p>
                {director.experience && <p>{director.experience}</p>}
                <p>
                  Bayana has assisted with more than 500 licence conversions and related cases moving
                  Al Reem Island businesses from Abu Dhabi DED licensing to ADGM — and supports financial, non-financial and
                  retail companies from incorporation to visas, office and ongoing filings.
                </p>
              </div>
              <ul {...reveal(2)} className="mt-6 flex flex-wrap gap-2">
                {expertise.map((e) => (
                  <li key={e} className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-800">{e}</li>
                ))}
              </ul>
              <div {...reveal(3)} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappLink('Hello Bayana, I would like to speak with your team.')} target="_blank" rel="noopener" className="btn-whatsapp" data-track="whatsapp"><WhatsAppIcon /> Speak to our team</a>
                {director.linkedin && <a href={director.linkedin} target="_blank" rel="noopener" className="btn-outline">LinkedIn profile</a>}
                <Link to="/contact" className="btn-outline">Visit our office <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Network */}
        <section className="pb-16 md:pb-24" aria-labelledby="network">
          <div className="container">
            <div {...reveal(0, 'zoom')} className="noise relative isolate grid gap-8 overflow-hidden rounded-[2rem] bg-brand-950 p-7 text-white md:grid-cols-[auto_1fr] md:items-center md:p-10">
              <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
              <div className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-brand-600/40 blur-[100px]" />
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-brand-950 shadow-glow"><Network className="h-8 w-8" /></span>
              <div>
                <h2 id="network" className="mb-3 text-2xl text-white md:text-3xl">Our Network</h2>
                <p className="text-[17px] leading-relaxed text-brand-50/80">
                  Office space is provided through our sister company{' '}
                  <a href={business.partner.url} target="_blank" rel="noopener" className="font-semibold text-brand-300 underline decoration-brand-500/50 underline-offset-4 hover:text-white">{business.partner.name}</a>{' '}
                  at Addax Tower. We also work with strategic partners for AML compliance, legal translation and attestation.
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-brand-50/70"><MapPin className="h-4 w-4 text-brand-400" /> {business.addressLine}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission + values */}
        <section className="section pt-0" aria-labelledby="mission">
          <div className="container">
            <div {...reveal(0, 'zoom')} className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 text-center md:p-14">
              <Target className="mx-auto mb-4 h-10 w-10 text-brand-600" />
              <h2 id="mission" className="mb-4 text-sm font-bold uppercase tracking-[.16em] text-brand-700">Mission</h2>
              <p className="mx-auto max-w-3xl font-display text-2xl font-bold leading-snug text-ink md:text-4xl">
                “Simplify business operations with <span className="text-gradient">accuracy and transparency</span>.”
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {values.map(({ icon: Icon, title, text }, i) => (
                <div key={title} {...reveal(i)} className="card card-hover">
                  <Icon className="mb-4 h-7 w-7 text-brand-600" />
                  <h3 className="mb-1 text-lg">{title}</h3>
                  <p className="text-[15px]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default About

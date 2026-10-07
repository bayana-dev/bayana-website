import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import ThankYou from './pages/ThankYou'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
// Service pages (one file each, blueprint pages 6–22)
import CompanyFormation from './pages/CompanyFormation'
import FinancialSetup from './pages/FinancialSetup'
import NonFinancialSetup from './pages/NonFinancialSetup'
import RetailLicence from './pages/RetailLicence'
import DedToAdgmConversion from './pages/DedToAdgmConversion'
import SpvSetup from './pages/SpvSetup'
import FoundationSetup from './pages/FoundationSetup'
import CspRegisteredOffice from './pages/CspRegisteredOffice'
import FilingsRenewal from './pages/FilingsRenewal'
import CompanyClosure from './pages/CompanyClosure'
import VisaWorkPermit from './pages/VisaWorkPermit'
import OfficeSpaceLease from './pages/OfficeSpaceLease'
import CourtsNotary from './pages/CourtsNotary'
import NonMuslimWills from './pages/NonMuslimWills'
import TranslationAttestation from './pages/TranslationAttestation'
import AmlCompliance from './pages/AmlCompliance'
import OtherFreeZones from './pages/OtherFreeZones'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import MobileActionBar from './components/MobileActionBar'
import ScrollProgress from './components/ScrollProgress'
import { useReveal } from './components/Reveal'
import { organizationSchema, websiteSchema } from './schema'
import './App.css'

function App() {
  const { pathname } = useLocation()
  useReveal(pathname) // scroll-in animations site-wide
  const isAdmin = pathname.startsWith('/admin')

  // Google Analytics (if the gtag snippet is added to index.html):
  // page views + clicks on WhatsApp / Call buttons (elements with data-track)
  useEffect(() => {
    if (window.gtag) window.gtag('event', 'page_view', { page_path: pathname })
  }, [pathname])
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest('[data-track]')
      if (el && window.gtag) window.gtag('event', 'contact_click', { method: el.dataset.track, page_path: window.location.pathname })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {/* Sitewide schema: Organization + WebSite */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema())}</script>
      </Helmet>
      <ScrollToTop />
      {/* Public-site extras are hidden on the admin page */}
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <MobileActionBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/adgm-company-formation" element={<CompanyFormation />} />
        <Route path="/adgm-financial-services-company-setup" element={<FinancialSetup />} />
        <Route path="/adgm-non-financial-company-setup" element={<NonFinancialSetup />} />
        <Route path="/adgm-retail-licence" element={<RetailLicence />} />
        <Route path="/ded-to-adgm-licence-conversion" element={<DedToAdgmConversion />} />
        <Route path="/adgm-spv-setup" element={<SpvSetup />} />
        <Route path="/adgm-foundation-setup" element={<FoundationSetup />} />
        <Route path="/adgm-csp-registered-office" element={<CspRegisteredOffice />} />
        <Route path="/adgm-annual-filings-licence-renewal" element={<FilingsRenewal />} />
        <Route path="/adgm-company-closure" element={<CompanyClosure />} />
        <Route path="/adgm-visa-work-permit" element={<VisaWorkPermit />} />
        <Route path="/adgm-office-space-lease" element={<OfficeSpaceLease />} />
        <Route path="/adgm-courts-notary" element={<CourtsNotary />} />
        <Route path="/adgm-non-muslim-will-registration" element={<NonMuslimWills />} />
        <Route path="/legal-translation-attestation-abu-dhabi" element={<TranslationAttestation />} />
        <Route path="/adgm-aml-dnfbp-compliance" element={<AmlCompliance />} />
        <Route path="/uae-free-zone-company-setup" element={<OtherFreeZones />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

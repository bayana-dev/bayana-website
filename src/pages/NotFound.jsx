import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { CardGrid } from '../components/ServiceCard'

function NotFound() {
  return (
    <div className="App">
      <SEO title="Page Not Found | Bayana Global" description="The page you are looking for does not exist." path="/404" noindex />
      <Navbar />
      <main id="main">
        <section className="relative isolate overflow-hidden">
          <div className="bg-grid mask-fade absolute inset-0 -z-10" />
          <div className="container py-16 text-center md:py-24">
            <p className="text-gradient animate-fade-up font-display text-8xl font-extrabold md:text-9xl">404</p>
            <h1 className="mt-4 animate-fade-up text-3xl [animation-delay:100ms] md:text-4xl">Page not found</h1>
            <p className="mt-3 animate-fade-up [animation-delay:180ms]">The page may have moved. Try one of our main services:</p>
            <div className="mt-12 text-left"><CardGrid slugs={['adgm-company-formation', 'ded-to-adgm-licence-conversion', 'adgm-visa-work-permit', 'adgm-office-space-lease', 'adgm-annual-filings-licence-renewal', 'adgm-courts-notary']} /></div>
            <Link to="/" className="btn-primary mt-12"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound

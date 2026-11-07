import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import { business, DISCLAIMER } from '../siteConfig'

function Terms() {
  const email = <a href={`mailto:${business.email}`}>{business.email}</a>

  const sections = [
    {
      id: 'about',
      title: 'About these terms',
      body: (
        <p>
          This website is operated by <strong>{business.name}</strong>, a company registered in Abu Dhabi Global Market (ADGM). By using this website, you agree
          to these terms.
        </p>
      ),
    },
    {
      id: 'general-information',
      title: 'General information only',
      body: (
        <p>
          The content on this website is general information. It is not legal, tax or financial advice. ADGM rules and requirements can change, so please contact
          us to confirm what applies to your case.
        </p>
      ),
    },
    {
      id: 'services',
      title: 'Our services',
      body: (
        <p>
          Some services, such as SPV setup, financial sector setup, CSP services and AML compliance, are provided through channel partners. Approvals for
          licences, visas and registrations are decided by the relevant authorities.
        </p>
      ),
    },
    {
      id: 'fees',
      title: 'Fees',
      body: <p>{DISCLAIMER}</p>,
    },
    {
      id: 'using-the-website',
      title: 'Using the website',
      body: <p>Please use this website lawfully and do not send false information through our forms or try to disrupt the website.</p>,
    },
    {
      id: 'content',
      title: 'Website content',
      body: <p>The Bayana name, logo and website content belong to {business.name} and may not be copied without our permission.</p>,
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: (
        <>
          <p>
            For any questions, email {email} or call <a href={business.phoneHref}>{business.phone}</a>.
          </p>
          <p>See also our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
        </>
      ),
    },
  ]

  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      description="Terms of use for the Bayana Global Limited website: general information only, services, fees and contact details."
      sections={sections}
    />
  )
}

export default Terms

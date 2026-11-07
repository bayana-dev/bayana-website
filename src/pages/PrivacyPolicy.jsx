import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import { business } from '../siteConfig'

function PrivacyPolicy() {
  const email = <a href={`mailto:${business.email}`}>{business.email}</a>

  const sections = [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: (
        <p>
          This website is operated by <strong>{business.name}</strong>, a company registered in Abu Dhabi Global Market (ADGM), with its office at{' '}
          {business.addressLine}.
        </p>
      ),
    },
    {
      id: 'what-we-collect',
      title: 'What we collect',
      body: (
        <>
          <p>We collect the details you share with us when you fill in our contact form, email us, call us or message us on WhatsApp, such as your name, phone number, email address and message.</p>
          <p>If you become a client, we also collect the documents and information needed to provide our services and to meet ADGM and other legal requirements.</p>
        </>
      ),
    },
    {
      id: 'how-we-use',
      title: 'How we use it',
      body: (
        <ul>
          <li>To reply to your enquiry.</li>
          <li>To provide the services you ask for.</li>
          <li>To meet our legal and regulatory obligations.</li>
        </ul>
      ),
    },
    {
      id: 'sharing',
      title: 'Who we share it with',
      body: (
        <>
          <p>We do not sell your personal data. We share it only when needed to provide our services or when the law requires it, for example with:</p>
          <ul>
            <li>ADGM authorities and UAE government bodies handling your applications;</li>
            <li>our channel partners, for services provided through them;</li>
            <li>service providers that help us run this website and our business.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'keeping-it-safe',
      title: 'Keeping it safe',
      body: <p>We take reasonable steps to protect your personal data and keep it only as long as needed for these purposes or as required by law.</p>,
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: (
        <p>
          Under the ADGM Data Protection Regulations 2021, you can ask to access, correct or delete your personal data. To make a request, email {email}.
        </p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: (
        <>
          <p>
            Email {email}, call <a href={business.phoneHref}>{business.phone}</a> or visit us at {business.addressLine}.
          </p>
          <p>See also our <Link to="/terms">Terms of Use</Link>.</p>
        </>
      ),
    },
  ]

  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      description="How Bayana Global Limited collects, uses and protects the personal data you share through this website."
      sections={sections}
    />
  )
}

export default PrivacyPolicy

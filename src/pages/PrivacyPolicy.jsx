import LegalPage from '../components/LegalPage'
import { business } from '../siteConfig'

// TODO: have this text reviewed before launch
function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" description="How Bayana Global Limited collects, uses and protects the personal data you share through this website.">
      <section>
        <h2>What we collect</h2>
        <p>{business.name} collects the details you send through our contact form or WhatsApp (name, phone, email and message) only to reply to your enquiry and provide our services.</p>
      </section>
      <section>
        <h2>How we use and keep it</h2>
        <p>We do not sell your data. We keep it only as long as needed for these purposes and applicable ADGM data protection rules.</p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>To access or delete your data, email <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
      </section>
    </LegalPage>
  )
}

export default PrivacyPolicy

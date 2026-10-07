import LegalPage from '../components/LegalPage'
import { business, DISCLAIMER } from '../siteConfig'

// TODO: have this text reviewed before launch
function Terms() {
  return (
    <LegalPage title="Terms of Use" path="/terms" description="Terms of use for the Bayana Global Limited website: general information only, fees and how to contact us about ADGM corporate services.">
      <section>
        <h2>General information only</h2>
        <p>Information on this website is general and is not legal, tax or financial advice.</p>
      </section>
      <section>
        <h2>Fees</h2>
        <p>{DISCLAIMER}</p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>Email <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
      </section>
    </LegalPage>
  )
}

export default Terms

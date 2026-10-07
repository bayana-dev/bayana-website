import ServiceLayout from '../components/ServiceLayout'
import { L, Ext } from '../components/InlineLink'

// Blueprint page 21 — /adgm-aml-dnfbp-compliance
// Main keyword: ADGM DNFBP compliance
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 21,
  slug: 'adgm-aml-dnfbp-compliance',
  keyword: 'ADGM DNFBP compliance',
  title: 'ADGM AML & DNFBP Compliance Support | Bayana',
  description:
    'Need an MLRO, AML policies or goAML registration for your ADGM business? Bayana coordinates compliance services through experienced UAE providers.',
  h1: 'AML and DNFBP Compliance Support for ADGM Businesses',
  intro: (
    <>
      <p>
        ADGM DNFBP compliance applies to some ADGM businesses under AML rules. Bayana coordinates the right compliance
        services through experienced providers and strategic partners.
      </p>
      <p>
        Compliance is often set up straight after <L to="adgm-company-formation">ADGM company formation</L>.
      </p>
    </>
  ),
  sections: [
    { h2: 'Who Is a DNFBP?', text: <p>Designated Non-Financial Businesses and Professions — for example real estate agents, dealers in precious metals and stones, and company service providers. See <Ext href="https://www.adgm.com">ADGM guidance</Ext>. (VERIFY list)</p> },
    { h2: 'Services We Coordinate', bullets: ['MLRO appointment', 'AML/KYC policies', 'goAML registration', 'Compliance reviews'] },
    { h2: 'For Financial Firms', text: <p>See <L to="adgm-financial-services-company-setup">ADGM financial services company setup</L>.</p> },
  ],
  steps: null,
  note: 'Services are coordinated through partners. Bayana does not act as MLRO.',
  audience: 'DNFBPs and regulated firms in ADGM.',
  faqs: [
    { q: 'Does my ADGM company need an MLRO?', a: 'DNFBPs and regulated firms generally do. (VERIFY)' },
    { q: 'What is goAML?', a: 'The UAE Financial Intelligence Unit’s platform for AML reporting.' },
    { q: 'Can you arrange AML policies?', a: 'Yes, through our compliance partners.' },
  ],
  related: ['adgm-financial-services-company-setup', 'adgm-annual-filings-licence-renewal', 'adgm-csp-registered-office'],
  disclaimer: true,
}

function AmlCompliance() {
  return <ServiceLayout service={service} />
}

export default AmlCompliance

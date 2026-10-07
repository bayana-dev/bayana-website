import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 20 — /legal-translation-attestation-abu-dhabi
// Main keyword: legal translation Abu Dhabi
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 20,
  slug: 'legal-translation-attestation-abu-dhabi',
  keyword: 'legal translation Abu Dhabi',
  title: 'Legal Translation & MOFA Attestation Abu Dhabi | Bayana',
  description:
    'Certified legal translation, MOFA legalisation, attestation, Arabic–English typing and ADGM corporate certificates from our office on Al Reem Island.',
  h1: 'Legal Translation, Attestation and Document Services',
  intro: (
    <>
      <p>
        Legal translation in Abu Dhabi, attestation and typing — arranged from our office on Al Reem Island, through
        strategic partners and sister companies where needed.
      </p>
      <p>
        Documents for <L to="adgm-company-formation">ADGM company registration</L> and court matters often need these
        services first.
      </p>
    </>
  ),
  sections: [
    { h2: 'Translation', bullets: ['Document translation', 'Certified legal translation', 'Arabic–English'] },
    { h2: 'Attestation and Legalisation', bullets: ['Attestation', 'MOFA legalisation', 'Corporate document certification'] },
    { h2: 'ADGM Corporate Certificates', bullets: ['Certificate of good standing', 'Certificate of incumbency'] },
    { h2: 'Typing and Document Services', text: <p>Letters, forms, contracts and applications in Arabic and English.</p> },
    { h2: 'Court-Related Documents', text: <p>See <L to="adgm-courts-notary">notarise a power of attorney</L>.</p> },
  ],
  steps: null,
  audience: 'Companies and individuals who need documents translated, attested or certified.',
  faqs: [
    { q: 'How long does MOFA attestation take?', a: 'It depends on the document and issuing country. (VERIFY)' },
    { q: 'Is your translation certified?', a: 'Certified legal translation is arranged through our partners.' },
    { q: 'Can I get a certificate of good standing for my ADGM company?', a: 'Yes, we request it from the Registration Authority.' },
    { q: 'Do you type Arabic documents?', a: 'Yes, in Arabic and English.' },
  ],
  related: ['adgm-courts-notary', 'adgm-annual-filings-licence-renewal', 'adgm-non-muslim-will-registration'],
  disclaimer: true,
}

function TranslationAttestation() {
  return <ServiceLayout service={service} />
}

export default TranslationAttestation

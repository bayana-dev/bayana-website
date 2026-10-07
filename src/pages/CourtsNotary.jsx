import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 18 — /adgm-courts-notary
// Main keyword: ADGM notary public
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 18,
  slug: 'adgm-courts-notary',
  keyword: 'ADGM notary public',
  title: 'ADGM Notary Public Services: POA & Resolutions | Bayana',
  description:
    'Notarise powers of attorney, board resolutions, declarations and contracts at the ADGM Courts Notary Public. Preparation, translation and eCourts booking.',
  h1: 'ADGM Courts Notary Public Assistance',
  intro: (
    <>
      <p>
        The ADGM notary public at ADGM Courts notarises documents for companies and individuals. Bayana prepares and
        coordinates your documents for notarisation.
      </p>
      <p>
        Many clients use this alongside <L to="adgm-company-formation">ADGM company formation</L> and{' '}
        <L to="legal-translation-attestation-abu-dhabi">legal translation in Abu Dhabi</L>.
      </p>
    </>
  ),
  sections: [
    { h2: 'Documents We Prepare for Notarisation', bullets: ['Powers of attorney', 'Board resolutions', 'Memoranda of association', 'Declarations', 'Contracts', 'Specimen signatures', 'Other documents'] },
    { h2: 'What the ADGM Notary Public Does', bullets: ['Notarisation required by law or requested by clients', 'Specimen signature verification', 'Document date verification', 'Declarations and affirmations'] },
    { h2: 'How We Help', bullets: ['Document preparation', 'Arabic–English translation', 'Certified legal translation', 'Submission on the ADGM eCourts platform', 'Appointment booking', 'In-person or video-call appointments'] },
    { h2: 'Signing for a Company', text: <p>Directors may need evidence of authority to sign, such as a board resolution.</p> },
  ],
  steps: null,
  note: 'Notarisation is performed by the ADGM Courts Notary Public.',
  audience: 'Companies and individuals who need documents notarised for use in the UAE or abroad.',
  faqs: [
    { q: 'Can I notarise a power of attorney at ADGM Courts?', a: 'Yes, powers of attorney are among the documents the ADGM Courts Notary Public handles.' },
    { q: 'Can the notary appointment be by video call?', a: 'Yes, in-person and video-call appointments are available.' },
    { q: 'What does a director need to sign for a company?', a: 'Usually evidence of authority, such as a board resolution.' },
    { q: 'Is translation needed?', a: 'It depends on the document and where it will be used. We arrange certified translation where needed.' },
    { q: 'What is the ADGM Court and what does it handle?', a: 'ADGM Courts handle civil, commercial, employment and property disputes, small claims and e-filing, and provide notary and wills services.' },
  ],
  related: ['legal-translation-attestation-abu-dhabi', 'adgm-non-muslim-will-registration', 'adgm-annual-filings-licence-renewal'],
  disclaimer: true,
}

function CourtsNotary() {
  return <ServiceLayout service={service} />
}

export default CourtsNotary

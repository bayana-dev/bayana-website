import ServiceLayout from '../components/ServiceLayout'
import { L, Ext } from '../components/InlineLink'

// Blueprint page 19 — /adgm-non-muslim-will-registration
// Main keyword: non-Muslim will Abu Dhabi
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 19,
  slug: 'adgm-non-muslim-will-registration',
  keyword: 'non-Muslim will Abu Dhabi',
  title: 'Non-Muslim Will Registration in Abu Dhabi (ADGM) | Bayana',
  description:
    'Register a non-Muslim will at ADGM Courts covering UAE assets and guardianship of children. Preparation, bilingual translation and appointment support.',
  h1: 'Non-Muslim Will Registration at ADGM Courts',
  intro: (
    <>
      <p>
        A non-Muslim will in Abu Dhabi can be registered through the ADGM Courts wills service, available to eligible
        non-Muslims aged 21 and over who own assets in the UAE.
      </p>
      <p>
        Bayana coordinates the process; where drafting is needed, we work with your lawyer. See also{' '}
        <L to="adgm-courts-notary">ADGM notary public</L>.
      </p>
    </>
  ),
  sections: [
    { h2: 'Who Can Register', text: <p>Eligible non-Muslims aged 21 and over with UAE assets. Check current rules on <Ext href="https://www.adgm.com/adgm-courts">ADGM Courts</Ext>.</p> },
    { h2: 'What a Will Can Cover', bullets: ['UAE assets', 'Guardianship of minor children'] },
    { h2: 'How Bayana Helps', bullets: ['Coordination', 'Preparation and documents', 'Bilingual translation', 'Appointment booking', 'ADGM Courts submission'] },
    { h2: 'Registration vs Probate', text: <p>ADGM Courts register the will; probate after death follows the judicial process.</p> },
    { h2: 'Will or Foundation?', text: <p>A will directs assets after death; a foundation holds them during life and after. See <L to="adgm-foundation-setup">foundation in ADGM</L>.</p> },
  ],
  steps: null,
  note: 'Bayana coordinates will registration; it does not give legal advice.',
  audience: 'Expatriate families and individuals with property, savings or children in the UAE.',
  faqs: [
    { q: 'Who can register a will at ADGM?', a: 'Eligible non-Muslims aged 21 and over with assets in the UAE.' },
    { q: 'Does a will cover property in Dubai?', a: 'A will can cover UAE assets; confirm specifics with your lawyer. (VERIFY)' },
    { q: 'Can I appoint a guardian for my children?', a: 'Yes, a will can cover guardianship of minor children.' },
    { q: 'Do I need to attend in person?', a: 'Appointment options depend on ADGM Courts rules at the time. (VERIFY)' },
    { q: 'What happens after death?', a: 'Probate follows the judicial process at ADGM Courts.' },
  ],
  related: ['adgm-courts-notary', 'adgm-foundation-setup', 'legal-translation-attestation-abu-dhabi'],
  disclaimer: true,
}

function NonMuslimWills() {
  return <ServiceLayout service={service} />
}

export default NonMuslimWills

import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 15 — /adgm-company-closure
// Main keyword: ADGM company strike off
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 15,
  slug: 'adgm-company-closure',
  keyword: 'ADGM company strike off',
  title: 'Close an ADGM Company: Strike-Off & Cancellation | Bayana',
  description:
    'Closing your ADGM company? Bayana handles licence cancellation, visa cancellations, final filings and strike-off with the Registration Authority.',
  h1: 'ADGM Company Closure and Strike-Off',
  intro: (
    <>
      <p>
        ADGM company strike off needs to be done in the right order so no fines or open visas remain. Bayana closes
        ADGM entities properly.
      </p>
      <p>
        If you formed your company with us through <L to="adgm-company-formation">ADGM company formation</L>, we
        already hold your records.
      </p>
    </>
  ),
  sections: [
    { h2: 'What Closure Involves', bullets: ['Visa cancellations first', 'Lease closure on AccessRP', 'Final filings', 'Licence cancellation', 'Strike-off / deregistration'] },
    { h2: 'Mistakes to Avoid', bullets: ['Leaving employee visas open', 'Unpaid licence renewals', 'Unfiled accounts'] },
  ],
  steps: { h2: 'Closure Steps', items: ['Review company status and outstanding filings', 'Cancel employee and director visas', 'Close the lease on AccessRP', 'File final documents', 'Cancel the licence', 'Strike-off with the Registration Authority'] },
  audience: 'ADGM companies that have stopped trading or are restructuring.',
  faqs: [
    { q: 'How do I close an ADGM company?', a: 'Follow the steps above; we manage each one for you.' },
    { q: 'What happens to employee visas?', a: 'They must be cancelled before the licence is cancelled.' },
    { q: 'Do I need to file final accounts?', a: 'Usually yes. (VERIFY on adgm.com)' },
    { q: 'How long does strike-off take?', a: 'It depends on outstanding filings and visa cancellations. (VERIFY)' },
  ],
  related: ['adgm-annual-filings-licence-renewal', 'adgm-visa-work-permit', 'adgm-office-space-lease'],
  disclaimer: true,
}

function CompanyClosure() {
  return <ServiceLayout service={service} />
}

export default CompanyClosure

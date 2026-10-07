import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 10 — /ded-to-adgm-licence-conversion
// Main keyword: Al Reem Island ADGM licence conversion
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 10,
  slug: 'ded-to-adgm-licence-conversion',
  keyword: 'Al Reem Island ADGM licence conversion',
  title: 'DED to ADGM Licence Conversion, Al Reem | Bayana',
  description:
    'Bayana has handled 500+ DED-to-ADGM licence conversions for Al Reem Island businesses. Licence, lease, AccessRP, establishment card and visa transfer.',
  h1: 'DED to ADGM Licence Conversion on Al Reem Island',
  intro: (
    <>
      <p>
        Al Reem Island ADGM licence conversion is now required because Al Reem Island falls under ADGM. Businesses
        previously licensed by Abu Dhabi DED need ADGM licensing — and Bayana has handled 500+ conversions and related
        cases.
      </p>
      <p>
        Conversion is a specialised form of <L to="adgm-company-formation">ADGM company registration</L>; we map your
        existing activities and move your lease and visas across.
      </p>
    </>
  ),
  sections: [
    { h2: 'Who Needs to Convert', text: <p>Retail outlets, service businesses and offices on Al Reem Island that hold an Abu Dhabi DED licence.</p> },
    {
      h2: 'Our Conversion Services',
      bullets: [
        'Activity mapping from DED to ADGM activities',
        'ADGM application',
        'Lease registration on AccessRP',
        'Licence amendments',
        'Establishment card',
        'Visa transfers and updates',
        'Renewals',
      ],
    },
    {
      h2: '500+ Cases Handled',
      // TODO: add 2–3 anonymised case examples (a café, a salon, a consultancy) and Google review snippets
      text: (
        <p>
          Bayana has assisted with more than 500 licence conversions and related cases moving Al Reem Island businesses
          from Abu Dhabi DED licensing to ADGM requirements — cafés, restaurants, salons, shops, service outlets and
          offices. That experience means we know which activities need mapping, which leases need registering on
          AccessRP and how to move visas without gaps.
        </p>
      ),
    },
    {
      h2: 'Common Problems We Solve',
      bullets: [
        'Activities that do not map directly to an ADGM activity (VERIFY examples)',
        'Leases not registered on AccessRP',
        'Visas still tied to the old DED licence',
      ],
    },
  ],
  steps: {
    h2: 'Conversion Steps',
    items: ['Review your DED licence and activities', 'Map activities to ADGM', 'Register the lease on AccessRP', 'Submit the ADGM application', 'Licence and establishment card issued', 'Transfer and update visas'],
  },
  audience: 'Owners of shops, restaurants, salons, service businesses and offices on Al Reem Island with a DED licence.',
  faqs: [
    { q: 'Do Al Reem Island businesses have to move to ADGM?', a: 'Yes. Al Reem Island is under ADGM, so businesses there need ADGM licensing. Check adgm.com for current deadlines. (VERIFY)' },
    { q: 'What happens to my existing visas?', a: 'Visas linked to the old licence need to be transferred or updated. We handle this as part of the conversion.' },
    { q: 'Is my DED activity available in ADGM?', a: 'Most activities have an ADGM equivalent, but some do not map directly. We check yours before applying.' },
    { q: 'How long does conversion take?', a: 'It depends on the activity and whether the lease is already registered. (VERIFY typical timeline)' },
    { q: 'What documents do I need?', a: 'Your current DED licence, tenancy contract, owner passport and visa copies, and Emirates ID. We send a full checklist. (VERIFY)' },
  ],
  related: ['adgm-retail-licence', 'adgm-non-financial-company-setup', 'adgm-office-space-lease'],
  disclaimer: true,
}

function DedToAdgmConversion() {
  return <ServiceLayout service={service} />
}

export default DedToAdgmConversion

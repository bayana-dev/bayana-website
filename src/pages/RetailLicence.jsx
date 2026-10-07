import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 9 — /adgm-retail-licence
// Main keyword: ADGM retail licence
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 9,
  slug: 'adgm-retail-licence',
  keyword: 'ADGM retail licence',
  title: 'ADGM Retail Licence for Shops & Restaurants | Bayana',
  description:
    'Retail licence support for shops, restaurants, cafés and salons on Al Reem Island: ADGM application, lease registration, AccessRP, visas and renewals.',
  h1: 'ADGM Retail Licence for Shops, Restaurants, Cafés and Salons',
  intro: (
    <>
      <p>
        An ADGM retail licence is required for shops, restaurants, cafés, salons and other service outlets in ADGM
        areas. Bayana has handled 500+ licence conversions and related cases.
      </p>
      <p>
        It is part of our wider <L to="adgm-company-formation">ADGM company setup</L> service, with lease
        registration and visas handled by the same team.
      </p>
    </>
  ),
  sections: [
    {
      h2: 'Retail Businesses We License',
      defs: [
        ['Shops', 'Retail stores and outlets in Al Reem Island towers and malls.'],
        ['Restaurants', 'Dine-in and delivery restaurants.'],
        ['Cafés', 'Coffee shops and cafés.'],
        ['Salons', 'Beauty and grooming salons.'],
        ['Other service outlets', 'Other permitted retail and service outlets — we check your activity first.'],
      ],
    },
    {
      h2: 'What We Handle',
      bullets: [
        'Retail licence applications',
        'DED-to-ADGM conversion',
        'Licence amendments',
        'Lease registration',
        'AccessRP procedures',
        'Government approvals',
        'Establishment card',
        'Visas',
        'Renewals',
        'Post-registration procedures',
        'Other licence-related government processes',
      ],
    },
    {
      h2: 'Already Have a DED Licence?',
      text: (
        <p>
          If your shop was licensed by Abu Dhabi DED, you need to move to ADGM. See{' '}
          <L to="ded-to-adgm-licence-conversion">DED to ADGM licence conversion</L>.
        </p>
      ),
    },
  ],
  steps: {
    h2: 'Retail Licence Steps',
    items: ['Activity check', 'Lease registration on AccessRP', 'ADGM application', 'Approvals', 'Licence issued', 'Establishment card and staff visas'],
  },
  audience: 'Shop, restaurant, café and salon owners on Al Reem Island.',
  faqs: [
    { q: 'Do shops on Al Reem Island need an ADGM licence?', a: 'Yes. Al Reem Island falls under ADGM, so businesses operating there need ADGM licensing.' },
    { q: 'How long does a retail licence take?', a: 'It depends on the activity and approvals needed. We give you a timeline after the activity check. (VERIFY)' },
    { q: 'Do I need to register my shop lease on AccessRP?', a: 'Yes, lease registration on AccessRP is part of the process, and we handle it for you.' },
    { q: 'Can staff visas be issued under a retail licence?', a: <>Yes, once the establishment card is issued. See <L to="adgm-visa-work-permit">ADGM visa services</L>.</> },
  ],
  related: ['ded-to-adgm-licence-conversion', 'adgm-office-space-lease', 'adgm-visa-work-permit'],
  disclaimer: true,
}

function RetailLicence() {
  return <ServiceLayout service={service} />
}

export default RetailLicence

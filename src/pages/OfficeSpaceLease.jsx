import ServiceLayout from '../components/ServiceLayout'
import { L, Ext } from '../components/InlineLink'

// Blueprint page 17 — /adgm-office-space-lease
// Main keyword: ADGM office space Al Reem Island
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 17,
  slug: 'adgm-office-space-lease',
  keyword: 'ADGM office space Al Reem Island',
  title: 'ADGM Office Space & Lease Upgrade, Al Reem | Bayana',
  description:
    'Coworking desks, dedicated desks and private offices at Addax Tower via Aegis Coworking, plus AccessRP lease registration and visa-quota upgrades.',
  h1: 'ADGM Office Space and Lease Upgrades on Al Reem Island',
  intro: (
    <>
      <p>
        ADGM office space on Al Reem Island decides more than where you work: the number of visas an ADGM company can
        hold depends on its registered office arrangement.
      </p>
      <p>
        A registered office is a required part of <L to="adgm-company-formation">ADGM company formation</L>.
      </p>
    </>
  ),
  sections: [
    {
      h2: 'Office Options at Addax Tower',
      text: (
        <p>
          Coworking desks, dedicated desks and private offices through our sister company{' '}
          <Ext href="https://aegiscoworking.ae">Aegis Coworking Business Center</Ext>, 3812 Addax Tower — plus
          registered office arrangements (subject to applicable ADGM requirements), office upgrades and relocation
          support.
        </p>
      ),
    },
    { h2: 'Visa Quota by Office Type', text: <p>Desk and private office arrangements carry different visa quotas; a private office quota depends on its size and configuration. {/* TODO: add real numbers only after confirming current ADGM rules */}</p> },
    { h2: 'Lease Upgrades', bullets: ['Hot desk → dedicated desk', 'Desk → private office', 'Office → larger office'] },
    { h2: 'What We Handle in an Upgrade', bullets: ['New lease', 'AccessRP registration', 'Lease procedures', 'Licence updates', 'Establishment card updates', 'Extra visa coordination'] },
    { h2: 'Relocating Between Al Maryah and Al Reem', text: <p>We handle the lease, licence address and establishment card updates when you move between ADGM islands.</p> },
    { h2: 'Using Your Own Premises', text: <p>You may choose other ADGM premises — Bayana still handles the procedures.</p> },
  ],
  steps: null,
  audience: 'New ADGM companies, growing teams that need more visas, and businesses relocating within ADGM.',
  faqs: [
    { q: 'Do I need an office for an ADGM licence?', a: 'A suitable registered office arrangement is required for operating companies.' },
    { q: 'How many visas does a flexi desk give?', a: 'It depends on the desk type, your business activity and current ADGM rules. We confirm the exact quota before you sign. (VERIFY numbers)' },
    { q: 'How do I register a lease on AccessRP?', a: 'We register it for you on the ADGM AccessRP portal.' },
    { q: 'Can I move my company from Al Maryah to Al Reem?', a: 'Yes, with a new lease and address update. We handle both.' },
    { q: 'Can I upgrade from a hot desk to a private office?', a: 'Yes — see Lease Upgrades above.' },
    { q: 'What is ADGM AccessRP?', a: 'ADGM’s real property portal for tenancy contracts, cancellations and unit valuation certificates.' },
  ],
  related: ['adgm-visa-work-permit', 'adgm-company-formation', 'ded-to-adgm-licence-conversion'],
  disclaimer: true,
}

function OfficeSpaceLease() {
  return <ServiceLayout service={service} />
}

export default OfficeSpaceLease

import ServiceLayout from '../components/ServiceLayout'
import { L } from '../components/InlineLink'

// Blueprint page 22 — /uae-free-zone-company-setup
// Main keyword: UAE free zone company setup
// Edit this page's text, FAQs and links in the object below. Layout is in components/ServiceLayout.jsx.
const service = {
  id: 22,
  slug: 'uae-free-zone-company-setup',
  keyword: 'UAE free zone company setup',
  title: 'UAE Free Zone & Mainland Company Setup | Bayana',
  description:
    'Beyond ADGM, Bayana coordinates company setup in Abu Dhabi mainland, Meydan, Dubai South, Ajman and other UAE free zones with trusted partners.',
  h1: 'Company Setup in Other UAE Free Zones and Mainland',
  intro: (
    <>
      <p>
        UAE free zone company setup outside ADGM is something many of our clients need. ADGM is our main focus, but we
        coordinate broader UAE setup and immigration support with trusted partners.
      </p>
      <p>
        Not sure which to choose? Start with <L to="adgm-company-formation">ADGM company formation</L> and ask us for a side-by-side comparison for your activity.
      </p>
    </>
  ),
  sections: [
    {
      h2: 'Jurisdictions We Cover',
      defs: [
        ['Abu Dhabi Mainland / DED', 'Mainland licences for trading across the UAE.'],
        ['Meydan Free Zone', 'Dubai free zone popular with small businesses.'],
        ['Dubai South', 'Free zone near Al Maktoum airport.'],
        ['Ajman Free Zone', 'Cost-conscious free zone option.'],
        ['Other free zones', 'Ask us about other jurisdictions.'],
      ],
    },
    {
      h2: 'ADGM or Another Free Zone?',
      table: {
        head: ['', 'ADGM', 'Mainland & other free zones'],
        rows: [
          ['Legal system', 'English common law', 'UAE civil law (mostly)'],
          ['Registrar / regulator', 'ADGM Registration Authority; FSRA for financial services', 'Abu Dhabi DED or the relevant free zone authority'],
          ['Best for', 'Holding, financial, professional and Al Reem Island businesses', 'Trading, start-ups and mainland market access'],
        ],
      },
    },
  ],
  steps: null,
  audience: 'Businesses comparing UAE jurisdictions.',
  faqs: [
    { q: 'Which UAE free zone is cheapest?', a: 'It depends on activity and visa needs. We compare options for you. (VERIFY)' },
    { q: 'Should I choose ADGM or a Dubai free zone?', a: <>It depends on your activity, visa needs and whether you want English common law. Start with <L to="adgm-company-formation">ADGM company formation</L> or ask us for a comparison.</> },
    { q: 'Can you handle mainland Abu Dhabi licences?', a: 'Yes, through our partners.' },
  ],
  related: ['adgm-company-formation', 'ded-to-adgm-licence-conversion', 'adgm-visa-work-permit'],
  disclaimer: true,
}

function OtherFreeZones() {
  return <ServiceLayout service={service} />
}

export default OtherFreeZones

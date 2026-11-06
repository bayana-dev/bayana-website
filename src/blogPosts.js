import heroImg from './assets/adgm-corporate-services-al-reem-island.webp'

// ─────────────────────────────────────────────────────────────────────────────
// Blog posts. Newest first is handled automatically (sorted by `date`).
//
// To add a post: copy one object below, change the fields, and push.
// The listing page, the article page, the sitemap and Google schema update by themselves.
//
// Body blocks you can use (in any order):
//   { h2: 'Heading' }                 { h3: 'Smaller heading' }
//   { p: 'Paragraph text' }           { note: 'Highlighted tip box' }
//   { ul: ['point', 'point'] }        { ol: ['step 1', 'step 2'] }
//   { table: { head: ['A', 'B'], rows: [['1', '2']] } }
//   { img: importedImage, alt: 'Alt text', caption: 'Caption' }
// Inside any text: [link text](/page-url) makes a link, **text** makes it bold.
// ─────────────────────────────────────────────────────────────────────────────

export const posts = [
  {
    slug: 'ded-to-adgm-licence-conversion-guide',
    title: 'DED to ADGM Licence Conversion: A Guide for Al Reem Island Businesses',
    description: 'Why Al Reem Island businesses are moving from Abu Dhabi DED to ADGM licences, what changes, and the steps to convert your licence, lease and visas.',
    category: 'ADGM Licence Conversion',
    date: '2026-11-06',
    image: heroImg,
    imageAlt: 'Al Reem Island skyline in Abu Dhabi Global Market',
    caption: 'Al Reem Island, now part of the ADGM jurisdiction.',
    standfirst: 'Al Reem Island falls under Abu Dhabi Global Market, so businesses there that hold an Abu Dhabi DED licence need to move to ADGM licensing. Here is what the conversion involves.',
    body: [
      { h2: 'Why Al Reem Island businesses need an ADGM licence' },
      { p: 'ADGM’s jurisdiction covers Al Maryah Island and Al Reem Island. Businesses operating on Al Reem Island under an Abu Dhabi DED licence are expected to move to the ADGM framework, which has its own Registration Authority, rules and licence types.' },
      { p: 'The move is not a brand-new company setup in every case. It is a structured conversion: your existing activities are mapped to ADGM activities, and your lease and visas are moved across. See our [DED to ADGM licence conversion](/ded-to-adgm-licence-conversion) service for the full scope.' },
      { h2: 'What changes when you convert' },
      { ul: [
        '**Licence:** your DED trade licence is replaced by an ADGM commercial licence.',
        '**Registry:** company records are held with the ADGM Registration Authority.',
        '**Lease:** your office lease is registered on AccessRP, ADGM’s property system.',
        '**Establishment card and visas:** these move to the ADGM company file.',
        '**Annual filings:** you follow ADGM’s yearly filing and renewal cycle.',
      ] },
      { h2: 'The conversion steps' },
      { ol: [
        'Review your current DED licence, activities, shareholders and lease.',
        'Map your activities to the matching ADGM licence activities.',
        'Prepare documents and KYC for the ADGM Registration Authority.',
        'Register the lease on AccessRP and obtain the ADGM licence.',
        'Transfer the establishment card and staff visas.',
      ] },
      { note: 'Every case is different. Activities, shareholder structure and the lease all affect the route, so start with a review of your current documents.' },
      { h2: 'How Bayana helps' },
      { p: 'Bayana has handled 1,000+ conversions and related cases for Al Reem Island businesses. One team manages the licence, lease, establishment card and visa transfer, so you have a single point of contact from review to completion. If you also need a compliant workspace, office space is available at Addax Tower through [our office space service](/adgm-office-space-lease).' },
    ],
    faqs: [
      { q: 'Do all Al Reem Island businesses need to move to ADGM?', a: 'Al Reem Island falls under ADGM’s jurisdiction, so businesses operating there are expected to hold ADGM licensing. Contact us to review your specific situation.' },
      { q: 'Will my visas be cancelled during conversion?', a: 'The aim is to transfer your establishment card and visas to the ADGM company file. We plan the steps so the transfer is handled in the right order.' },
      { q: 'Do I need a new office?', a: 'You need a lease registered on AccessRP. If your current premises are on Al Reem Island, the existing lease may be registered; otherwise a desk or office at Addax Tower is an option.' },
    ],
  },
  {
    slug: 'adgm-company-formation-step-by-step',
    title: 'ADGM Company Formation: A Step-by-Step Guide',
    description: 'How ADGM company formation works, from choosing a structure and licence category to Registration Authority filing, establishment card and visas.',
    category: 'ADGM Business Setup',
    date: '2026-11-04',
    image: heroImg,
    imageAlt: 'Abu Dhabi Global Market business district on Al Reem Island',
    caption: 'ADGM companies are registered with the ADGM Registration Authority.',
    standfirst: 'Setting up a company in Abu Dhabi Global Market follows a clear sequence. This guide walks through each stage so you know what to prepare.',
    body: [
      { h2: 'Step 1: Choose your structure and activities' },
      { p: 'Start by deciding what the company will do and who will own it. Your activities decide the licence type: financial, [non-financial](/adgm-non-financial-company-setup) or [retail](/adgm-retail-licence). Special structures such as an [SPV](/adgm-spv-setup) or a [foundation](/adgm-foundation-setup) suit holding assets.' },
      { h2: 'Step 2: Reserve a name and prepare documents' },
      { p: 'The company name is reserved with the Registration Authority. Shareholder and director documents are then prepared, together with KYC for everyone involved.' },
      { ul: [
        'Passport copies of shareholders and directors',
        'Proof of address',
        'Corporate documents if a shareholder is a company',
        'Details of the registered office',
      ] },
      { h2: 'Step 3: Secure a registered office' },
      { p: 'Every ADGM company needs a suitable registered office arrangement. The size of your workspace also affects how many visas the company can hold. Desks and offices are available at Addax Tower through [our office space service](/adgm-office-space-lease).' },
      { h2: 'Step 4: Registration and licence' },
      { p: 'The application is filed with the ADGM Registration Authority. Once approved, the commercial licence and certificate of incorporation are issued.' },
      { h2: 'Step 5: Establishment card and visas' },
      { p: 'After the licence, the company obtains its establishment card and e-channel registration, then applies for director, employee and dependent visas. See [ADGM visa services](/adgm-visa-work-permit).' },
      { note: 'Financial services firms may also need permission from the FSRA. That regulatory application runs alongside the corporate setup.' },
    ],
    faqs: [
      { q: 'Can a foreigner own 100% of an ADGM company?', a: 'Yes, foreign investors can own 100% of an ADGM company, subject to applicable requirements.' },
      { q: 'Do I need an office to register an ADGM company?', a: 'A suitable registered office arrangement is required, and it also affects your visa allocation.' },
      { q: 'What comes after the licence is issued?', a: 'The establishment card, e-channel registration and visas, followed by yearly renewals and filings.' },
    ],
  },
  {
    slug: 'adgm-licence-renewal-annual-filings-checklist',
    title: 'ADGM Licence Renewal and Annual Filings: A Checklist',
    description: 'The yearly ADGM filings every company should track, including licence renewal, confirmation statement, accounts and data protection, to avoid late penalties.',
    category: 'ADGM Compliance',
    date: '2026-11-02',
    image: heroImg,
    imageAlt: 'ADGM office towers on Al Reem Island, Abu Dhabi',
    caption: 'Staying compliant keeps your ADGM company in good standing.',
    standfirst: 'Every ADGM company has recurring filings as well as one-off changes to report. Missing them can lead to late-filing penalties, so it helps to keep a simple checklist.',
    body: [
      { h2: 'Yearly items to track' },
      { table: { head: ['Item', 'What it covers'], rows: [
        ['Licence renewal', 'Renewing the commercial licence before it expires'],
        ['Confirmation statement', 'Confirming company details held by the Registration Authority'],
        ['Accounts', 'Filing financial statements as required for your company type'],
        ['Data protection', 'Keeping data protection registration up to date'],
        ['Lease', 'Keeping your AccessRP lease registration current'],
      ] } },
      { h2: 'Changes you must report' },
      { p: 'Beyond the yearly cycle, changes to shareholders, directors, activities or address need to be filed with the Registration Authority. These are known as amendments.' },
      { ul: [
        'New or departing shareholders and directors',
        'Changes to licence activities',
        'Change of registered office',
        'Share capital changes',
      ] },
      { note: 'Keep one calendar with every expiry date: licence, lease, establishment card and visas. Most penalties come from dates that were simply missed.' },
      { h2: 'Let us track it for you' },
      { p: 'Bayana handles [ADGM licence renewal and annual filings](/adgm-annual-filings-licence-renewal) from your registration onwards, so deadlines are not missed. If you are winding down, see [ADGM company closure](/adgm-company-closure).' },
    ],
    faqs: [
      { q: 'What happens if I miss an ADGM filing?', a: 'Late filings can lead to penalties. It is best to keep every deadline in one calendar or let a service provider track them.' },
      { q: 'Do I file amendments separately from renewal?', a: 'Yes. Changes such as new directors or shareholders are filed when they happen, not only at renewal.' },
    ],
  },
]

// Helpers used by the blog pages
export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]))
export const formatDate = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
export const readTime = (p) => {
  const text = JSON.stringify(p.body) + (p.standfirst || '')
  return Math.max(1, Math.round(text.split(/\s+/).length / 220))
}

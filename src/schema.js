// JSON-LD (schema.org) builders used by components/SEO.jsx (blueprint: Organization sitewide, ProfessionalService on Home/Contact,
// Service + FAQPage on service pages, BreadcrumbList on inner pages)
import { isValidElement } from 'react'
import { SITE_URL, business, services } from './siteConfig'

const address = {
  '@type': 'PostalAddress',
  streetAddress: business.street,
  addressLocality: business.area,
  addressRegion: business.city,
  addressCountry: business.countryCode,
}

const knowsAbout = [
  'ADGM company formation', 'ADGM licence renewal', 'DED to ADGM licence conversion', 'ADGM retail licence',
  'ADGM visa services', 'ADGM work permits', 'AccessRP lease registration', 'ADGM Courts notary public',
  'Non-Muslim will registration', 'Legal translation and MOFA attestation', 'AML and DNFBP compliance coordination',
]

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: business.name,
  alternateName: 'Bayana',
  description: 'ADGM-registered corporate services firm on Al Reem Island, Abu Dhabi — company formation, licensing, visas, filings and office space for ADGM businesses.',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: SITE_URL + business.logo, width: 290, height: 64 },
  image: SITE_URL + business.ogImage,
  telephone: business.phone,
  email: business.email,
  address,
  areaServed: [{ '@type': 'City', name: 'Abu Dhabi' }, { '@type': 'Country', name: 'United Arab Emirates' }],
  knowsAbout,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: business.phone,
    contactType: 'customer service',
    areaServed: 'AE',
    availableLanguage: ['English', 'Arabic'],
  },
  sameAs: Object.values(business.social),
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Bayana Global',
  inLanguage: 'en-GB',
  publisher: { '@id': `${SITE_URL}/#organization` },
})

export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: business.name,
  url: SITE_URL,
  image: SITE_URL + business.ogImage,
  logo: SITE_URL + business.logo,
  telephone: business.phone,
  email: business.email,
  priceRange: '$$',
  address,
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.mapLink,
  openingHoursSpecification: business.openingHoursSpec.map((o) => ({ '@type': 'OpeningHoursSpecification', ...o })),
  areaServed: [{ '@type': 'Place', name: 'Al Reem Island' }, { '@type': 'City', name: 'Abu Dhabi' }],
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  knowsAbout,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'ADGM corporate services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.short, url: `${SITE_URL}/${s.slug}` },
    })),
  },
  sameAs: Object.values(business.social),
})

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: SITE_URL + (it.path === '/' ? '/' : it.path),
  })),
})

// Flatten a JSX answer (which may contain <Link>s) to plain text for schema
const toText = (node) => {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(toText).join('')
  if (isValidElement(node)) return toText(node.props.children)
  return ''
}

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: toText(f.a).replace(/\s*\(VERIFY[^)]*\)/g, '') },
  })),
})

export const serviceSchema = (s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/${s.slug}#service`,
  name: s.h1,
  serviceType: s.keyword,
  description: s.description,
  url: `${SITE_URL}/${s.slug}`,
  areaServed: [{ '@type': 'Place', name: 'Al Reem Island' }, { '@type': 'City', name: 'Abu Dhabi' }, { '@type': 'Country', name: 'United Arab Emirates' }],
  provider: {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: business.name,
    telephone: business.phone,
    address,
    image: SITE_URL + business.ogImage,
  },
})

import {
  Archive, ArrowLeftRight, BadgeCheck, Briefcase, Building2, FileCheck2, Gem, Globe2, Landmark, Languages, Layers,
  Plane, ScrollText, ShieldCheck, Stamp, Store,
} from 'lucide-react'

// One icon per service page (used on cards, menus and the footer)
const ICONS = {
  'adgm-company-formation': Building2,
  'adgm-financial-services-company-setup': Landmark,
  'adgm-non-financial-company-setup': Briefcase,
  'adgm-retail-licence': Store,
  'ded-to-adgm-licence-conversion': ArrowLeftRight,
  'adgm-spv-setup': Layers,
  'adgm-foundation-setup': Gem,
  'adgm-csp-registered-office': BadgeCheck,
  'adgm-annual-filings-licence-renewal': FileCheck2,
  'adgm-company-closure': Archive,
  'adgm-aml-dnfbp-compliance': ShieldCheck,
  'adgm-visa-work-permit': Plane,
  'adgm-office-space-lease': Building2,
  'adgm-courts-notary': Stamp,
  'adgm-non-muslim-will-registration': ScrollText,
  'legal-translation-attestation-abu-dhabi': Languages,
  'uae-free-zone-company-setup': Globe2,
}

export default function ServiceIcon({ slug, className = 'h-5 w-5' }) {
  const Icon = ICONS[slug] || Building2
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />
}

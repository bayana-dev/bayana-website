# Bayana Global website — Frontend

Same folder structure as the Aegis Coworking repo: React 19 + Vite 7 + React Router 7 +
react-helmet-async, with every page pre-rendered to static HTML by `scripts/prerender.mjs`.
Styling uses Tailwind CSS with Bayana's colours (`tailwind.config.js`) — headings in Plus Jakarta Sans,
body text in Noto Sans.

## Design & animations

- Scroll-in animations: add `data-reveal` (or spread `{...reveal(i)}` from `components/Reveal.js`) to any element.
  One IntersectionObserver in `App.jsx` handles the whole site — no animation library, so pages stay fast.
  Variants: `data-reveal="left" | "right" | "zoom" | "fade"`. Respects "reduce motion" settings.
- Without JavaScript nothing is hidden (the `js` class is added in `index.html`), so Google sees every word.
- Hero, page headers and the mobile menu animate with CSS keyframes defined in `tailwind.config.js`.
- On phones, service cards become a swipeable row and a sticky WhatsApp / Call bar appears after scrolling.

## Blog

The blog has been removed. `/blog` and `/blog/*` permanently redirect to the home page (`vercel.json`).

## Commands

```bash
cd Frontend
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run dev                 # http://localhost:5173
npm run build               # builds + pre-renders every page into dist/ + writes sitemap.xml
npm run preview             # check the built site
```

## Folder structure

```
Frontend/
├── index.html              HTML shell (add Google Analytics snippet here)
├── package.json            scripts: dev / build / preview
├── vite.config.js
├── tailwind.config.js      Bayana colours: brand green #16a34a, deep green #034f32, ink #111827
├── vercel.json             redirects (bayana.info → bayana.ae), security + cache headers
├── .env.example            VITE_SITE_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── public/                 robots.txt, sitemap.xml, llms.txt, site.webmanifest, logo.png, og-image.jpg
├── scripts/
│   └── prerender.mjs       renders every route to HTML, writes 404.html + sitemap.xml
└── src/
    ├── main.jsx            browser entry (hydrates pre-rendered HTML)
    ├── entry-server.jsx    server entry for prerender + list of routes
    ├── App.jsx             all routes + sitewide Organization schema + GA click tracking
    ├── App.css / index.css
    ├── siteConfig.js       ★ business info (NAP), header menu, list of all services
    ├── schema.js           JSON-LD builders (Organization, LocalBusiness, Service, FAQ, Breadcrumb)
    ├── supabaseClient.js   contact form → Supabase
    ├── assets/             logo, hero images
    ├── components/         Navbar, Footer, Hero, PageHero, Services, ServiceCard, ServiceLayout,
    │                       TrustStrip, HowWeWork, SectorsWeServe, WhyChooseUs, FAQ, ContactForm,
    │                       FinalCTA, LocationHighlight, WhatsAppButton, MobileActionBar, LegalPage,
    │                       Breadcrumbs, SEO, InlineLink, Icons, Verify, ScrollToTop,
    │                       Reveal (scroll animations), ScrollProgress, Counter, SectionHeader, ServiceIcon
    └── pages/              Home, About, Contact, PrivacyPolicy, Terms,
                            ThankYou, NotFound + one file per service (17):
                            CompanyFormation, FinancialSetup, NonFinancialSetup, RetailLicence,
                            DedToAdgmConversion, SpvSetup, FoundationSetup, CspRegisteredOffice,
                            FilingsRenewal, CompanyClosure, VisaWorkPermit, OfficeSpaceLease,
                            CourtsNotary, NonMuslimWills, TranslationAttestation, AmlCompliance,
                            OtherFreeZones
```

## Where to edit

| What | File |
|---|---|
| Phone, email, address, hours, socials, licence no., menu | `src/siteConfig.js` |
| A service page's text, FAQs, steps, related links, title/meta | `src/pages/<ServiceName>.jsx` |
| Service name/short text on cards, menu and footer | `services` list in `src/siteConfig.js` |
| Layout shared by all service pages | `src/components/ServiceLayout.jsx` |
| Header / footer | `src/components/Navbar.jsx`, `Footer.jsx` |

**Adding a new service page:** create `src/pages/NewPage.jsx` (copy an existing one), add it to
`services` in `siteConfig.js`, and add a `<Route>` in `App.jsx`. The prerender and sitemap pick it up automatically.

## Before launch

- [ ] `siteConfig.js`: confirm email, licence number, social links, Addax Tower map coordinates
- [ ] `siteConfig.js`: `CSP_LICENCE_CONFIRMED = true` only once the CSP licence is on the ADGM public register
- [ ] `pages/About.jsx`: director name, experience, photo, LinkedIn
- [ ] Check every `(VERIFY)` fact on adgm.com (yellow badges in `npm run dev`; the build prints how many remain)
- [ ] `siteConfig.js`: replace the approximate Addax Tower `geo` coordinates (also in `index.html` geo meta tags)

## Contact form → Supabase (optional)

Without keys, the form opens WhatsApp with the enquiry and goes to /thank-you. To save enquiries,
run this in the Supabase SQL editor, then add the URL and anon key to `.env` and to Vercel:

```sql
create table enquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text not null, phone text, email text, service text, message text, page text
);
alter table enquiries enable row level security;
create policy "public can insert" on enquiries for insert to anon with check (true);
```

## Deploy (Vercel)

Import the GitHub repo in Vercel → **Root Directory: `Frontend`** → Framework: Vite →
Build command `npm run build` → Output `dist`. Add the `.env` values under Environment Variables.

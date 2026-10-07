import Navbar from './Navbar'
import Footer from './Footer'
import SEO from './SEO'
import PageHero from './PageHero'
import { breadcrumbSchema } from '../schema'

// Shared layout for Privacy Policy and Terms of Use
export default function LegalPage({ title, path, description, updated, children }) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: title, path }]
  return (
    <div className="App">
      <SEO title={`${title} | Bayana Global`} description={description} path={path} schema={breadcrumbSchema(crumbs)} />
      <Navbar />
      <main id="main">
        <PageHero crumbs={crumbs} title={title} aside={false}>
          {updated && <p className="text-sm text-body/70">Last updated: {updated}</p>}
        </PageHero>
        <div className="container max-w-3xl py-12 md:py-16">
          <div className="prose-bayana space-y-8 text-[17px] [&_h2]:mb-3 [&_h2]:text-2xl [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import SectionHeader from './SectionHeader'
import { CardGrid } from './ServiceCard'

// A titled group of service cards (used 4× on the Home page)
function Services({ eyebrow, title, intro, slugs, cols = 'lg:grid-cols-3', tint = false, id }) {
  return (
    <section className={`section relative overflow-hidden ${tint ? 'bg-gradient-to-b from-brand-50/70 to-white' : ''}`} aria-labelledby={id}>
      {tint && <div className="bg-grid mask-fade absolute inset-0 -z-0 opacity-70" />}
      <div className="container relative">
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} id={id} />
        <CardGrid slugs={slugs} cols={cols} numbered />
      </div>
    </section>
  )
}

export default Services

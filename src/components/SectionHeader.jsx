import { reveal } from './Reveal'

// Eyebrow + H2 + intro, used to open most sections
export default function SectionHeader({ eyebrow, title, intro, dark = false, center = false, id, children }) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow && <p {...reveal(0)} className={dark ? 'eyebrow-dark' : 'eyebrow'}><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />{eyebrow}</p>}
      <h2 id={id} {...reveal(1)} className={`section-title ${dark ? 'text-white' : ''}`}>{title}</h2>
      {intro && <div {...reveal(2)} className={`mt-4 ${dark ? 'text-[17px] leading-relaxed text-brand-50/80 md:text-lg' : 'lead'}`}>{intro}</div>}
      {children}
    </div>
  )
}

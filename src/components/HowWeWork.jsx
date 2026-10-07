import { ClipboardList, FileSignature, MessagesSquare, Rocket } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { reveal } from './Reveal'

const steps = [
  [MessagesSquare, 'Free consultation', 'On your structure and business activity.'],
  [ClipboardList, 'Documents and KYC', 'We prepare and review everything.'],
  [FileSignature, 'Submission and follow-up', 'With the ADGM Registration Authority.'],
  [Rocket, 'Licence and beyond', 'Establishment card, visas and ongoing support.'],
]

function HowWeWork() {
  return (
    <section className="section" aria-labelledby="how-we-work">
      <div className="container">
        <SectionHeader center eyebrow="Our process" title="How We Work" id="how-we-work" intro="Four clear stages from first conversation to a fully operating ADGM company." />
        <div className="relative">
          {/* Connector line that draws itself (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-brand-100 lg:block">
            <div className="draw-line h-full bg-gradient-to-r from-brand-500 to-brand-900" />
          </div>
          <ol className="relative grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-8">
            {steps.map(([Icon, t, d], i) => (
              <li key={t} {...reveal(i, true, 140)} className="group relative rounded-3xl border border-gray-100 bg-white p-4 text-center sm:p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:hover:translate-y-0 lg:hover:shadow-none">
                <span className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-lift ring-1 ring-brand-100 transition duration-500 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-900 font-display text-xs font-bold text-white ring-4 ring-white">{i + 1}</span>
                </span>
                <h3 className="mb-2 text-[15px] sm:text-lg">{t}</h3>
                <p className="text-[13px] text-body/90 sm:text-[15px]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default HowWeWork

// import { useState } from 'react'
// import { Plus } from 'lucide-react'
// import { verifyText } from './Verify'
// import SectionHeader from './SectionHeader'


// // Animated accordion. Answers stay in the HTML (only visually collapsed) so Google reads them;
// // FAQPage schema is added by the page via faqSchema().
// export default function FAQ({ faqs, title = 'Frequently Asked Questions' }) {
//   const [open, setOpen] = useState(0)
//   return (
//     <section className="section relative overflow-hidden bg-gradient-to-b from-white via-brand-50/60 to-white" aria-labelledby="faq-title">
//       <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
//         <div className="lg:sticky lg:top-28 lg:self-start">
//           <SectionHeader eyebrow="FAQ" title={title} id="faq-title" intro="Short answers to the questions clients ask us most. Need more detail? Message us on WhatsApp." />
//         </div>
//         <div className="space-y-3">
//           {faqs.map((f, i) => {
//             const isOpen = open === i
//             return (
//               <div key={i} className={`faq-item rounded-2xl border bg-white transition duration-300 ${isOpen ? 'border-brand-200 shadow-lift' : 'border-gray-200/80 shadow-soft hover:border-brand-200'}`} data-open={isOpen}>
//                 <h3 className="text-base font-semibold md:text-[17px]">
//                   <button
//                     type="button"
//                     onClick={() => setOpen(isOpen ? -1 : i)}
//                     aria-expanded={isOpen}
//                     aria-controls={`faq-${i}`}
//                     id={`faq-q-${i}`}
//                     className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
//                   >
//                     <span>{f.q}</span>
//                     <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition duration-300 ${isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'}`}>
//                       <Plus className="h-4 w-4" />
//                     </span>
//                   </button>
//                 </h3>
//                 <div className="faq-panel" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
//                   <div>
//                     <div className="px-5 pb-6 leading-relaxed text-body md:px-6">{verifyText(f.a)}</div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }















import { useState } from 'react'
import { Plus } from 'lucide-react'
import { verifyText } from './Verify'

// Animated accordion. Answers stay in the HTML (only visually collapsed) so Google reads them;
// FAQPage schema is added by the page via faqSchema().
export default function FAQ({ faqs, title = 'Frequently Asked Questions' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/60 to-white py-10 md:py-14" aria-labelledby="faq-title">
      <div className="container">
        {/* Heading: centred, one line on tablet and desktop */}
        <div className="mx-auto mb-7 max-w-3xl text-center md:mb-8">
          <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />FAQ</p>
          <h2 id="faq-title" className="text-[1.75rem] leading-tight sm:text-4xl md:whitespace-nowrap md:text-[2.4rem]">{title}</h2>
        </div>

        {/* Questions */}
        <div className="mx-auto max-w-4xl space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={`faq-item rounded-xl border bg-white transition duration-300 ${isOpen ? 'border-brand-200 shadow-soft' : 'border-gray-200/80 hover:border-brand-200'}`} data-open={isOpen}>
                <h3 className="text-[15px] font-semibold md:text-base">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left md:px-5 md:py-3.5"
                  >
                    <span>{f.q}</span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition duration-300 ${isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'}`}>
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </h3>
                <div className="faq-panel" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <div className="px-4 pb-4 text-[15px] leading-relaxed text-body md:px-5">{verifyText(f.a)}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

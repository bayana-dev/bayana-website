import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import { services, whatsappLink } from '../siteConfig'

/**
 * Contact form: name, phone, email, service, message (blueprint page 3).
 * With Supabase keys in .env → saves to the `enquiries` table, then goes to /thank-you.
 * Without keys → opens WhatsApp with the enquiry pre-filled.
 */
function ContactForm({ defaultService = '' }) {
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: defaultService, message: '', website: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    if (form.website) return // honeypot: bots fill the hidden field
    if (window.gtag) window.gtag('event', 'generate_lead', { method: 'form', service: form.service })

    // Supabase is loaded only when the form is sent (keeps the first page load light)
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!hasSupabase) {
      const text = `Hello Bayana,\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service || '-'}\n\n${form.message}`
      window.open(whatsappLink(text), '_blank', 'noopener')
      navigate('/thank-you')
      return
    }
    setStatus('sending')
    const { supabase } = await import('../supabaseClient')
    const { error } = await supabase.from('enquiries').insert({
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: form.service,
      message: form.message,
      page: window.location.pathname,
    })
    if (error) {
      console.error(error)
      setStatus('error')
      return
    }
    navigate('/thank-you')
  }

  const field = 'grid gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-ink/70'
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:grid-cols-2 sm:p-7 md:p-8">
      <div className="sm:col-span-2">
        <p className="font-display text-xl font-bold text-ink">Send an enquiry</p>
        <p className="mt-1 text-sm text-body/80">Free consultation · No obligation · Replies within one working day</p>
      </div>
      <label className={field}>Full name *
        <input required className="input normal-case tracking-normal" value={form.name} onChange={set('name')} autoComplete="name" placeholder="Your name" />
      </label>
      <label className={field}>Phone / WhatsApp *
        <input required type="tel" className="input normal-case tracking-normal" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+971" />
      </label>
      <label className={`${field} sm:col-span-2`}>Email *
        <input required type="email" className="input normal-case tracking-normal" value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" />
      </label>
      <label className={`${field} sm:col-span-2`}>Service
        <select className="input normal-case tracking-normal" value={form.service} onChange={set('service')}>
          <option value="">Select a service</option>
          {services.map((s) => <option key={s.slug} value={s.short}>{s.short}</option>)}
          <option value="Other">Other</option>
        </select>
      </label>
      <label className={`${field} sm:col-span-2`}>Message *
        <textarea required rows="4" className="input resize-none normal-case tracking-normal" value={form.message} onChange={set('message')} placeholder="Tell us briefly what you need" />
      </label>
      <input type="text" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={set('website')} className="hidden" aria-hidden="true" />
      {status === 'error' && <p className="text-sm text-red-600 sm:col-span-2">Something went wrong. Please WhatsApp us instead.</p>}
      <button disabled={status === 'sending'} className="btn-primary w-full sm:col-span-2 disabled:opacity-60">
        <Send className="h-4 w-4" /> {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      <p className="text-center text-xs text-body/70 sm:col-span-2">By sending, you agree to our <a href="/privacy-policy" className="underline hover:text-brand-700">privacy policy</a>.</p>
    </form>
  )
}

export default ContactForm

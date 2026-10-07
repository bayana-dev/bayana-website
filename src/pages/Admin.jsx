import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Inbox, Lock, LogOut, Mail, Phone, RefreshCw, Search, Trash2, X } from 'lucide-react'
import SEO from '../components/SEO'
import { WhatsAppIcon } from '../components/Icons'
import logo from '../assets/bayana-logo.png'

/**
 * /admin — enquiries from the contact form (Supabase table `enquiries`).
 * Login uses Supabase Auth (email + password). The password is NEVER stored in this code:
 * the admin user is created in Supabase → Authentication → Users.
 * Only the email below can read or delete rows — enforced by RLS policies in Supabase, not just here.
 */
const ADMIN_EMAIL = 'info@bayana.ae'

// Supabase is loaded only on this page (keeps the public site light)
const getClient = async () => (await import('../supabaseClient')).supabase

const fmtDate = (d) =>
  new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const waNumber = (phone = '') => phone.replace(/[^\d]/g, '').replace(/^00/, '').replace(/^0(?=5)/, '971')

function toCSV(rows) {
  const cols = ['created_at', 'name', 'phone', 'email', 'service', 'message', 'page']
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
}

function Login({ onLogin, error, busy }) {
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-brand-950 px-5">
      <div className="bg-grid-light mask-fade absolute inset-0 -z-10" />
      <div className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-brand-600/30 blur-[110px]" />
      <form
        onSubmit={(e) => { e.preventDefault(); onLogin(email.trim(), password) }}
        className="w-full max-w-sm animate-fade-up rounded-3xl bg-white p-7 shadow-2xl sm:p-8"
      >
        <img src={logo} alt="Bayana Global Limited" width="290" height="64" className="mb-6 h-10 w-auto" />
        <h1 className="flex items-center gap-2 text-2xl"><Lock className="h-5 w-5 text-brand-600" /> Admin login</h1>
        <p className="mt-1 text-sm text-body/70">Website enquiries · Bayana Global</p>
        <label className="mt-6 grid gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-ink/70">Email
          <input type="email" required autoComplete="username" className="input normal-case tracking-normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="mt-4 grid gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-ink/70">Password
          <input type="password" required autoComplete="current-password" className="input normal-case tracking-normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
        <Link to="/" className="mt-4 block text-center text-sm text-body/70 hover:text-brand-700">← Back to website</Link>
      </form>
    </div>
  )
}

function Admin() {
  const [ready, setReady] = useState(false)
  const [configured, setConfigured] = useState(true)
  const [session, setSession] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [q, setQ] = useState('')
  const [service, setService] = useState('')
  const [open, setOpen] = useState(null)

  // Restore an existing login on page load
  useEffect(() => {
    let sub
    getClient().then((sb) => {
      if (!sb) { setConfigured(false); setReady(true); return }
      sb.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true) })
      sub = sb.auth.onAuthStateChange((_e, s) => setSession(s)).data.subscription
    })
    return () => sub?.unsubscribe()
  }, [])

  const isAdmin = session?.user?.email?.toLowerCase() === ADMIN_EMAIL

  async function load() {
    setLoading(true); setError('')
    const sb = await getClient()
    const { data, error } = await sb.from('enquiries').select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setRows(data || [])
    setLoading(false)
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin]) // eslint-disable-line react-hooks/exhaustive-deps

  async function login(email, password) {
    setBusy(true); setError('')
    const sb = await getClient()
    const { data, error } = await sb.auth.signInWithPassword({ email, password })
    if (error) setError('Wrong email or password.')
    else if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL) { await sb.auth.signOut(); setError('This account has no admin access.') }
    setBusy(false)
  }
  async function logout() { const sb = await getClient(); await sb.auth.signOut(); setRows([]) }

  async function remove(id) {
    if (!window.confirm('Delete this enquiry permanently?')) return
    const sb = await getClient()
    const { error } = await sb.from('enquiries').delete().eq('id', id)
    if (error) return setError(error.message)
    setRows((r) => r.filter((x) => x.id !== id)); setOpen(null)
  }

  function exportCSV() {
    const blob = new Blob(['﻿' + toCSV(filtered)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `bayana-enquiries-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const services = useMemo(() => [...new Set(rows.map((r) => r.service).filter(Boolean))].sort(), [rows])
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return rows.filter((r) =>
      (!service || r.service === service) &&
      (!s || [r.name, r.phone, r.email, r.service, r.message].some((v) => v?.toLowerCase().includes(s))))
  }, [rows, q, service])
  const today = rows.filter((r) => new Date(r.created_at).toDateString() === new Date().toDateString()).length
  const week = rows.filter((r) => Date.now() - new Date(r.created_at) < 7 * 864e5).length

  const seo = <SEO title="Admin | Bayana Global" description="Bayana Global admin area." path="/admin" noindex />

  if (!ready) return <>{seo}<div className="flex min-h-screen items-center justify-center bg-brand-950 text-brand-50/70">Loading…</div></>
  if (!configured) return <>{seo}<div className="flex min-h-screen items-center justify-center p-6 text-center">Supabase keys are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env (and to Vercel).</div></>
  if (!isAdmin) return <>{seo}<Login onLogin={login} error={error} busy={busy} /></>

  return (
    <div className="min-h-screen bg-gray-50">
      {seo}
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Bayana Global Limited" width="290" height="64" className="h-8 w-auto" />
            <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-body/70 md:inline">{session.user.email}</span>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 font-semibold text-ink hover:bg-gray-100"><LogOut className="h-4 w-4" /> Log out</button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl">Website enquiries</h1>
            <p className="text-sm text-body/70">From the contact form on bayana.ae, newest first.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-100"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh</button>
            <button onClick={exportCSV} disabled={!filtered.length} className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"><Download className="h-4 w-4" /> Export CSV</button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[['Total', rows.length], ['Last 7 days', week], ['Today', today]].map(([l, n]) => (
            <div key={l} className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-body/60">{l}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-brand-800 md:text-3xl">{n}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-body/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, email or message" className="input pl-11" />
          </label>
          <select value={service} onChange={(e) => setService(e.target.value)} className="input sm:w-64">
            <option value="">All services</option>
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {/* List */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-body/70">
            <Inbox className="mx-auto mb-3 h-8 w-8 text-brand-600" />
            {loading ? 'Loading enquiries…' : rows.length ? 'No enquiries match your search.' : 'No enquiries yet.'}
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
            <table className="hidden w-full text-left text-sm md:table">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-body/60">
                <tr><th className="p-4">Date</th><th className="p-4">Name</th><th className="p-4">Contact</th><th className="p-4">Service</th><th className="p-4">Message</th></tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} onClick={() => setOpen(r)} className="cursor-pointer border-t border-gray-100 hover:bg-brand-50/50">
                    <td className="whitespace-nowrap p-4 text-body/70">{fmtDate(r.created_at)}</td>
                    <td className="p-4 font-semibold text-ink">{r.name}</td>
                    <td className="p-4"><div>{r.phone}</div><div className="text-body/70">{r.email}</div></td>
                    <td className="p-4">{r.service || '—'}</td>
                    <td className="max-w-sm p-4"><p className="line-clamp-2 text-body/80">{r.message}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Phone layout */}
            <ul className="divide-y divide-gray-100 md:hidden">
              {filtered.map((r) => (
                <li key={r.id}>
                  <button onClick={() => setOpen(r)} className="w-full p-4 text-left">
                    <div className="flex items-center justify-between gap-3"><span className="font-semibold text-ink">{r.name}</span><span className="text-xs text-body/60">{fmtDate(r.created_at)}</span></div>
                    {r.service && <span className="mt-1 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-800">{r.service}</span>}
                    <p className="mt-1 line-clamp-2 text-sm text-body/80">{r.message}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Detail panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button aria-label="Close" onClick={() => setOpen(null)} className="absolute inset-0 animate-fade-in bg-black/40" />
          <aside className="relative flex h-full w-full max-w-md animate-slide-in flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div><p className="text-lg font-bold text-ink">{open.name}</p><p className="text-xs text-body/60">{fmtDate(open.created_at)}</p></div>
              <button onClick={() => setOpen(null)} className="rounded-full bg-gray-100 p-2" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto p-5 text-sm">
              {[['Phone / WhatsApp', open.phone], ['Email', open.email], ['Service', open.service], ['Sent from page', open.page]].map(([l, v]) => (
                <div key={l}><p className="text-xs font-semibold uppercase tracking-wide text-body/60">{l}</p><p className="mt-0.5 break-words text-ink">{v || '—'}</p></div>
              ))}
              <div><p className="text-xs font-semibold uppercase tracking-wide text-body/60">Message</p><p className="mt-1 whitespace-pre-wrap rounded-2xl bg-gray-50 p-4 leading-relaxed text-ink">{open.message}</p></div>
            </div>
            <div className="grid gap-2 border-t border-gray-100 p-5">
              {open.phone && <a href={`https://wa.me/${waNumber(open.phone)}?text=${encodeURIComponent(`Hello ${open.name}, thank you for contacting Bayana Global.`)}`} target="_blank" rel="noopener" className="btn-whatsapp"><WhatsAppIcon /> Reply on WhatsApp</a>}
              <div className="grid grid-cols-2 gap-2">
                {open.phone && <a href={`tel:${open.phone.replace(/\s/g, '')}`} className="btn-outline"><Phone className="h-4 w-4" /> Call</a>}
                {open.email && <a href={`mailto:${open.email}?subject=${encodeURIComponent('Your enquiry with Bayana Global')}`} className="btn-outline"><Mail className="h-4 w-4" /> Email</a>}
              </div>
              <button onClick={() => remove(open.id)} className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /> Delete enquiry</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Admin

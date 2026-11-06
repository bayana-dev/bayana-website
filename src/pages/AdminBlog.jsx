import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, ImagePlus, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react'
import SEO from '../components/SEO'
import logo from '../assets/bayana-logo.png'
import RichEditor, { cleanArticleHtml, loadPurifier } from '../blog/RichEditor'
import { DEFAULT_CATEGORIES, formatDate, readMinutes, slugify, stripTags } from '../blog/blogData'

// ─────────────────────────────────────────────────────────────────────────────
// Blog admin — www.bayana.ae/admin/blog
// Log in with the Supabase user you created (its email must be in blog_admins).
// ─────────────────────────────────────────────────────────────────────────────

const BUCKET = 'blog-images'
// Supabase is loaded when this page opens (keeps it out of the public pages' main file)
let supabase = null
const today = () => new Date().toISOString().slice(0, 10)
const EMPTY = { id: null, title: '', slug: '', category: DEFAULT_CATEGORIES[0], published_at: today(), description: '', cover_url: '', cover_alt: '', caption: '', standfirst: '', content: '', faqs: [], published: false }

const label = 'mb-1.5 block text-sm font-semibold text-ink'
const input = 'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-[15px] text-ink focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200'
const hint = 'mt-1 text-xs text-body/60'

// Resize to max 1600px wide and convert to WebP (smaller files = faster pages)
async function toWebp(file) {
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(1, 1600 / bmp.width)
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bmp.width * scale)
    canvas.height = Math.round(bmp.height * scale)
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/webp', 0.82))
    return blob && blob.type === 'image/webp' ? { blob, ext: 'webp', type: 'image/webp' } : { blob: file, ext: file.name.split('.').pop(), type: file.type }
  } catch {
    return { blob: file, ext: file.name.split('.').pop(), type: file.type }
  }
}

async function uploadImage(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Please use a JPG, PNG or WebP image.')
  const { blob, ext, type } = await toWebp(file)
  if (blob.size > 5 * 1024 * 1024) throw new Error('Image is larger than 5 MB. Please use a smaller image.')
  const name = `${new Date().toISOString().slice(0, 10)}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(name, blob, { contentType: type, cacheControl: '31536000', upsert: false })
  if (error) throw new Error(error.message)
  return supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl
}

// ── Login ────────────────────────────────────────────────────────────────────
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) setError(error.message === 'Invalid login credentials' ? 'Wrong email or password.' : error.message)
    setBusy(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50/60 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
        <img src={logo} alt="Bayana Global" className="mx-auto h-9 w-auto" />
        <h1 className="mt-6 text-center text-xl">Blog admin</h1>
        <label className={`${label} mt-6`} htmlFor="em">Email</label>
        <input id="em" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
        <label className={`${label} mt-4`} htmlFor="pw">Password</label>
        <input id="pw" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  )
}

// ── Post list ────────────────────────────────────────────────────────────────
function PostList({ onEdit, onNew }) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('blog_posts').select('id,slug,title,category,published,published_at,updated_at').order('published_at', { ascending: false }).order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setRows(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const remove = async (r) => {
    if (!window.confirm(`Delete "${r.title}"? This cannot be undone.`)) return
    const { error } = await supabase.from('blog_posts').delete().eq('id', r.id)
    if (error) window.alert(error.message)
    else load()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl">Blog posts</h1>
        <button type="button" onClick={onNew} className="btn-primary !min-h-0 !py-2.5 text-sm"><Plus className="mr-1.5 h-4 w-4" /> New post</button>
      </div>
      {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
      {!rows ? (
        <p className="mt-8 text-body/70">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-body/70">No posts yet. Click “New post” to write the first one.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {rows.map((r) => (
            <div key={r.id} className="flex flex-col gap-3 border-b border-gray-100 p-4 last:border-0 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{r.title}</p>
                <p className="mt-0.5 text-xs text-body/60">
                  <span className={`mr-2 rounded-full px-2 py-0.5 font-bold ${r.published ? 'bg-brand-100 text-brand-800' : 'bg-amber-100 text-amber-800'}`}>{r.published ? 'Published' : 'Draft'}</span>
                  {formatDate(r.published_at)} · {r.category}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <a href={`/blog/${r.slug}`} target="_blank" rel="noopener" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-ink hover:border-brand-400"><Eye className="h-4 w-4" /> View</a>
                <button type="button" onClick={() => onEdit(r.id)} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-ink hover:border-brand-400"><Pencil className="h-4 w-4" /> Edit</button>
                <button type="button" onClick={() => remove(r)} className="inline-flex h-9 items-center rounded-lg border border-gray-200 px-2.5 text-red-600 hover:border-red-300" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Editor ───────────────────────────────────────────────────────────────────
function PostEditor({ id, onDone }) {
  const [f, setF] = useState(id ? null : EMPTY)
  const [slugEdited, setSlugEdited] = useState(Boolean(id))
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [msg, setMsg] = useState(null)
  const [saving, setSaving] = useState(false)
  const [coverBusy, setCoverBusy] = useState(false)

  useEffect(() => {
    loadPurifier()
    supabase.from('blog_posts').select('category').then(({ data }) => {
      if (data) setCategories([...new Set([...DEFAULT_CATEGORIES, ...data.map((d) => d.category)])])
    })
    if (!id) return
    supabase.from('blog_posts').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error) setMsg({ type: 'error', text: error.message })
      else setF({ ...EMPTY, ...data, cover_url: data.cover_url || '', cover_alt: data.cover_alt || '', caption: data.caption || '', standfirst: data.standfirst || '', faqs: data.faqs || [] })
    })
  }, [id])

  if (!f) return <p className="text-body/70">Loading…</p>

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const setTitle = (e) => {
    const title = e.target.value
    setF((s) => ({ ...s, title, slug: slugEdited ? s.slug : slugify(title) }))
  }
  const setFaq = (i, k, v) => setF((s) => ({ ...s, faqs: s.faqs.map((q, j) => (j === i ? { ...q, [k]: v } : q)) }))

  const pickCover = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setCoverBusy(true)
    try {
      const url = await uploadImage(file)
      setF((s) => ({ ...s, cover_url: url }))
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    }
    setCoverBusy(false)
  }

  const save = async (publish) => {
    setMsg(null)
    const slug = slugify(f.slug)
    if (!f.title.trim() || !slug) return setMsg({ type: 'error', text: 'Please add a title.' })
    if (!f.description.trim()) return setMsg({ type: 'error', text: 'Please add a short summary (meta description).' })
    let content
    try {
      content = cleanArticleHtml(f.content)
    } catch (err) {
      return setMsg({ type: 'error', text: err.message })
    }
    if (!stripTags(content)) return setMsg({ type: 'error', text: 'The article text is empty.' })

    const faqs = f.faqs.map((q) => ({ q: q.q.trim(), a: q.a.trim() })).filter((q) => q.q && q.a)
    const payload = {
      title: f.title.trim(),
      slug,
      category: f.category.trim() || 'ADGM Guides',
      published_at: f.published_at || today(),
      description: f.description.trim(),
      cover_url: f.cover_url || null,
      cover_alt: f.cover_alt.trim() || null,
      caption: f.caption.trim() || null,
      standfirst: f.standfirst.trim() || null,
      content,
      faqs,
      read_minutes: readMinutes(`${f.standfirst} ${stripTags(content)}`),
      published: publish,
    }
    setSaving(true)
    const q = f.id ? supabase.from('blog_posts').update(payload).eq('id', f.id) : supabase.from('blog_posts').insert(payload)
    const { data, error } = await q.select().single()
    setSaving(false)
    if (error) {
      const text = error.code === '23505' ? 'Another post already uses this URL. Please change the URL slug.' : error.code === '42501' ? 'This account is not allowed to edit the blog.' : error.message
      return setMsg({ type: 'error', text })
    }
    setF((s) => ({ ...s, id: data.id, slug: data.slug, content: data.content, published: data.published }))
    setSlugEdited(true)
    setMsg({
      type: 'ok',
      text: publish ? 'Published! It shows on the blog now; Google sees the full page after the site rebuilds (about 2 minutes).' : 'Draft saved. Only you can see it.',
    })
  }

  const descLen = f.description.length

  return (
    <div>
      <button type="button" onClick={onDone} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"><ArrowLeft className="h-4 w-4" /> All posts</button>
      <h1 className="mt-3 text-2xl">{f.id ? 'Edit post' : 'New post'}</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="min-w-0 space-y-5">
          <div>
            <label className={label} htmlFor="t">Title (H1)</label>
            <input id="t" value={f.title} onChange={setTitle} className={`${input} text-lg font-semibold`} placeholder="e.g. ADGM Company Formation: Step-by-Step Guide" />
          </div>
          <div>
            <label className={label} htmlFor="sd">Intro paragraph <span className="font-normal text-body/60">(shown under the image)</span></label>
            <textarea id="sd" rows={3} value={f.standfirst} onChange={set('standfirst')} className={input} />
          </div>
          <div>
            <span className={label}>Article</span>
            <RichEditor value={f.content} onChange={(content) => setF((s) => ({ ...s, content }))} onUploadImage={uploadImage} />
            <p className={hint}>Use “Heading (H2)” for main sections — they also build the “In this article” list. You can paste from Word or Google Docs.</p>
          </div>

          {/* FAQs */}
          <div>
            <span className={label}>FAQs <span className="font-normal text-body/60">(optional — shown under the article and sent to Google)</span></span>
            <div className="space-y-3">
              {f.faqs.map((q, i) => (
                <div key={i} className="relative rounded-xl border border-gray-200 bg-white p-4 pr-12">
                  <input value={q.q} onChange={(e) => setFaq(i, 'q', e.target.value)} className={input} placeholder="Question" />
                  <textarea rows={2} value={q.a} onChange={(e) => setFaq(i, 'a', e.target.value)} className={`${input} mt-2`} placeholder="Answer" />
                  <button type="button" onClick={() => setF((s) => ({ ...s, faqs: s.faqs.filter((_, j) => j !== i) }))} className="absolute right-3 top-3 rounded-lg p-1.5 text-red-600 hover:bg-red-50" aria-label="Remove question"><X className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setF((s) => ({ ...s, faqs: [...s.faqs, { q: '', a: '' }] }))} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm font-semibold text-ink hover:border-brand-400"><Plus className="h-4 w-4" /> Add question</button>
          </div>
        </div>

        {/* Side column */}
        <aside className="space-y-5">
          <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 lg:sticky lg:top-4">
            <p className="text-sm">Status: <strong className={f.published ? 'text-brand-700' : 'text-amber-700'}>{f.published ? 'Published' : 'Draft'}</strong></p>
            <button type="button" disabled={saving} onClick={() => save(true)} className="btn-primary w-full !min-h-0 !py-2.5 text-sm disabled:opacity-60">{saving ? 'Saving…' : f.published ? 'Update post' : 'Publish'}</button>
            <button type="button" disabled={saving} onClick={() => save(false)} className="w-full rounded-full border border-gray-300 py-2.5 text-sm font-semibold text-ink hover:border-brand-400 disabled:opacity-60">{f.published ? 'Unpublish (make draft)' : 'Save draft'}</button>
            {f.id && <a href={`/blog/${f.slug}`} target="_blank" rel="noopener" className="block pt-1 text-center text-sm font-semibold text-brand-700 hover:text-brand-900">Preview page ↗</a>}
            {msg && <p className={`rounded-lg p-3 text-sm font-semibold ${msg.type === 'ok' ? 'bg-brand-50 text-brand-800' : 'bg-red-50 text-red-700'}`}>{msg.text}</p>}
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
            <div>
              <label className={label} htmlFor="sl">URL</label>
              <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 pl-3 text-xs text-body/60 focus-within:border-brand-600">
                /blog/
                <input id="sl" value={f.slug} onChange={(e) => { setSlugEdited(true); setF((s) => ({ ...s, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })) }} className="min-w-0 flex-1 rounded-r-lg bg-white px-2 py-2.5 text-sm text-ink focus:outline-none" />
              </div>
              {f.id && f.published && <p className={hint}>Changing the URL of a published post breaks old links.</p>}
            </div>
            <div>
              <label className={label} htmlFor="ct">Category</label>
              <input id="ct" list="cats" value={f.category} onChange={set('category')} className={input} />
              <datalist id="cats">{categories.map((c) => <option key={c} value={c} />)}</datalist>
            </div>
            <div>
              <label className={label} htmlFor="dt">Date</label>
              <input id="dt" type="date" value={f.published_at} onChange={set('published_at')} className={input} />
            </div>
            <div>
              <label className={label} htmlFor="ds">Summary / meta description</label>
              <textarea id="ds" rows={4} value={f.description} onChange={set('description')} className={input} />
              <p className={`${hint} ${descLen > 160 ? '!text-amber-700' : ''}`}>{descLen}/160 — shown on the blog card and in Google results.</p>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
            <span className={label}>Featured image</span>
            {f.cover_url ? (
              <div className="relative">
                <img src={f.cover_url} alt="" className="aspect-square w-full rounded-xl bg-gray-100 object-contain" />
                <button type="button" onClick={() => setF((s) => ({ ...s, cover_url: '' }))} className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-red-600 shadow" aria-label="Remove image"><X className="h-4 w-4" /></button>
              </div>
            ) : (
              <p className="text-xs text-body/60">No image — the default Bayana image is used.</p>
            )}
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2.5 text-sm font-semibold text-ink hover:border-brand-400">
              <ImagePlus className="h-4 w-4" /> {coverBusy ? 'Uploading…' : f.cover_url ? 'Change image' : 'Upload image'}
              <input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={pickCover} disabled={coverBusy} />
            </label>
            <p className={hint}>Best size 1200 × 1200 px (square). The whole image is shown on the blog. It is resized and converted to WebP automatically.</p>
            <div>
              <label className={label} htmlFor="ca">Image alt text</label>
              <input id="ca" value={f.cover_alt} onChange={set('cover_alt')} className={input} placeholder="Describe the image for Google" />
            </div>
            <div>
              <label className={label} htmlFor="cp">Caption <span className="font-normal text-body/60">(optional)</span></label>
              <input id="cp" value={f.caption} onChange={set('caption')} className={input} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
function AdminBlog() {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState(null)
  const [allowed, setAllowed] = useState(null)
  const [view, setView] = useState({ name: 'list' })

  useEffect(() => {
    let sub = null
    let live = true
    import('../supabaseClient').then((m) => {
      if (!live) return
      supabase = m.supabase
      if (!supabase) return setReady(true)
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session)
        setReady(true)
      })
      sub = supabase.auth.onAuthStateChange((_e, s) => setSession(s)).data.subscription
    })
    return () => {
      live = false
      sub?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session) return setAllowed(null)
    supabase.rpc('is_blog_admin').then(({ data }) => setAllowed(Boolean(data)))
  }, [session])

  const seo = <SEO title="Blog Admin | Bayana" description="Bayana blog admin" path="/admin/blog" noindex />

  if (!ready) return <>{seo}<p className="p-10 text-center text-body/70">Loading…</p></>
  if (!supabase) return <>{seo}<p className="p-10 text-center text-red-600">Supabase keys are missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).</p></>
  if (!session) return <>{seo}<Login /></>

  return (
    <div className="min-h-screen bg-gray-50">
      {seo}
      <header className="border-b border-gray-200 bg-white">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Bayana Global" className="h-7 w-auto" />
            <span className="hidden text-sm font-semibold text-body/60 sm:inline">Blog admin</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link to="/blogs" target="_blank" className="text-brand-700 hover:text-brand-900">View blog ↗</Link>
            <span className="hidden text-body/60 md:inline">{session.user.email}</span>
            <button type="button" onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1.5 text-ink hover:text-red-600"><LogOut className="h-4 w-4" /> Sign out</button>
          </div>
        </div>
      </header>
      <main className="container py-8">
        {allowed === false ? (
          <p className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">This account is not on the blog admin list. Add its email to the blog_admins table in Supabase.</p>
        ) : view.name === 'edit' ? (
          <PostEditor key={view.id || 'new'} id={view.id} onDone={() => setView({ name: 'list' })} />
        ) : (
          <PostList onEdit={(id) => setView({ name: 'edit', id })} onNew={() => setView({ name: 'edit', id: null })} />
        )}
      </main>
    </div>
  )
}

export default AdminBlog

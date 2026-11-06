import { useEffect, useState } from 'react'
import defaultCover from '../assets/adgm-corporate-services-al-reem-island.webp'

// ─────────────────────────────────────────────────────────────────────────────
// Blog data from Supabase (table: blog_posts).
// At build time scripts/prerender.mjs loads the published posts and puts them
// into each blog page's HTML (window.__BLOG__) so Google sees the full article.
// In the browser the pages then re-check Supabase, so a post published after
// the last deploy still shows up straight away.
// ─────────────────────────────────────────────────────────────────────────────

// Supabase is loaded only when needed, so it doesn't slow down the rest of the site
const getSupabase = () => import('../supabaseClient').then((m) => m.supabase)

export const LIST_COLS = 'slug,title,description,category,cover_url,cover_alt,published_at,read_minutes,published'
export const DEFAULT_CATEGORIES = ['ADGM Company Setup', 'ADGM Licence Conversion', 'ADGM Compliance', 'Visas & Office', 'Legal & Documents']

// Database row → the shape the pages use
export const fromRow = (r) =>
  r && {
    slug: r.slug,
    title: r.title,
    description: r.description || '',
    category: r.category || 'ADGM Guides',
    date: r.published_at,
    updated: r.updated_at ? String(r.updated_at).slice(0, 10) : r.published_at,
    image: r.cover_url || defaultCover,
    imageAlt: r.cover_alt || r.title,
    caption: r.caption || '',
    standfirst: r.standfirst || '',
    content: r.content || '',
    faqs: Array.isArray(r.faqs) ? r.faqs.filter((f) => f && f.q && f.a) : [],
    readMinutes: r.read_minutes || 1,
    published: r.published !== false,
  }

// Shared cache: filled by the prerender (server) or by window.__BLOG__ (browser)
const boot = typeof window !== 'undefined' ? window.__BLOG__ : null
let store = { list: boot?.list ?? null, posts: boot?.posts ?? {} }

export function primeBlog(data = {}) {
  store = { list: data.list ?? null, posts: data.posts ?? {} }
}

// All published posts (for the listing page and "Related Posts")
export function usePostList() {
  const [list, setList] = useState(store.list)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let live = true
    getSupabase()
      .then((supabase) =>
        supabase
          ? supabase
              .from('blog_posts')
              .select(LIST_COLS)
              .eq('published', true)
              .order('published_at', { ascending: false })
              .order('created_at', { ascending: false })
          : { error: true }
      )
      .then(({ data, error }) => {
        if (!live) return
        if (error) return setFailed(true)
        store.list = data.map(fromRow)
        setList(store.list)
      })
    return () => {
      live = false
    }
  }, [])

  return { list: list || [], loading: list === null && !failed }
}

// One post. undefined = loading, null = not found
export function usePost(slug) {
  const [post, setPost] = useState(store.posts[slug])

  useEffect(() => {
    setPost(store.posts[slug])
    let live = true
    // No "published" filter here: visitors only get published posts (Supabase rules),
    // a logged-in admin can also preview drafts.
    getSupabase()
      .then((supabase) => (supabase ? supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle() : { error: true }))
      .then(({ data, error }) => {
        if (!live) return
        if (error && store.posts[slug]) return
        const p = data ? fromRow(data) : null
        store.posts[slug] = p
        setPost(p)
      })
    return () => {
      live = false
    }
  }, [slug])

  return post
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export function formatDate(d) {
  if (!d) return ''
  const [y, m, day] = String(d).slice(0, 10).split('-')
  return `${day} ${MONTHS[Number(m) - 1]} ${y}`
}

export const slugify = (t = '') =>
  t
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 90)
    .replace(/-$/, '')

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')

export const stripTags = (html = '') => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

export const readMinutes = (text = '') => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220))

// H2 headings with ids → "In this article" list
export function headingsFromHtml(html = '') {
  const out = []
  const re = /<h2[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi
  let m
  while ((m = re.exec(html))) out.push({ id: m[1], text: stripTags(m[2]) })
  return out
}

// Works for both uploaded images (full https URL) and bundled ones (/assets/...)
export const absoluteUrl = (siteUrl, src) => (/^https?:\/\//.test(src) ? src : siteUrl + src)

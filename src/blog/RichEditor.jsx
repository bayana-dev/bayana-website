import { useEffect, useRef, useState } from 'react'
import { Bold, Heading2, Heading3, ImagePlus, Italic, Link as LinkIcon, List, ListOrdered, Pilcrow, Quote, RemoveFormatting, Table, Unlink } from 'lucide-react'
import { slugify } from './blogData'

// ─────────────────────────────────────────────────────────────────────────────
// Simple Word-style editor for blog articles.
// You can also paste from Word / Google Docs: headings, bold, lists, links and
// tables are kept, fonts/colours/sizes are removed so the article matches the site.
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_TAGS = ['h2', 'h3', 'h4', 'p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'figure', 'figcaption', 'hr']
const ALLOWED_ATTR = ['href', 'target', 'rel', 'src', 'alt', 'id', 'colspan', 'rowspan']

let purify = null
export const loadPurifier = () => (purify ? Promise.resolve(purify) : import('dompurify').then((m) => (purify = m.default)))

// Turn pasted Word / Google Docs formatting into clean tags
function normalize(html) {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html')
  const body = doc.body
  const rename = (el, tag) => {
    const n = doc.createElement(tag)
    while (el.firstChild) n.appendChild(el.firstChild)
    el.replaceWith(n)
    return n
  }
  // Google Docs wraps everything in <b style="font-weight:normal">
  body.querySelectorAll('b[id^="docs-internal-guid"]').forEach((b) => b.replaceWith(...b.childNodes))
  body.querySelectorAll('h1').forEach((h) => rename(h, 'h2'))
  body.querySelectorAll('h5,h6').forEach((h) => rename(h, 'h4'))
  body.querySelectorAll('b').forEach((b) => rename(b, 'strong'))
  body.querySelectorAll('i').forEach((i) => rename(i, 'em'))
  body.querySelectorAll('span').forEach((s) => {
    const st = s.getAttribute('style') || ''
    const w = st.match(/font-weight:\s*(\d+|bold)/i)?.[1]
    if (w && (w === 'bold' || Number(w) >= 600)) s = rename(s, 'strong')
    else if (/font-style:\s*italic/i.test(st)) s = rename(s, 'em')
  })
  body.querySelectorAll('div').forEach((d) => {
    if (!d.querySelector('p,h2,h3,h4,ul,ol,table,blockquote,figure')) rename(d, 'p')
  })
  return body.innerHTML
}

// Final clean-up before saving: safe tags only, heading ids, external links open in a new tab
export function cleanArticleHtml(html) {
  if (!purify) throw new Error('Editor is still loading. Please try again in a second.')
  const safe = purify.sanitize(normalize(html), { ALLOWED_TAGS, ALLOWED_ATTR })
  const doc = new DOMParser().parseFromString(`<body>${safe}</body>`, 'text/html')
  const used = new Set()
  doc.body.querySelectorAll('h2').forEach((h) => {
    let id = slugify(h.textContent) || 'section'
    let n = id
    for (let i = 2; used.has(n); i++) n = `${id}-${i}`
    used.add(n)
    h.id = n
  })
  doc.body.querySelectorAll('h3,h4').forEach((h) => h.removeAttribute('id'))
  doc.body.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href') || ''
    if (/^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?bayana\.ae/i.test(href)) {
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener')
    } else {
      a.removeAttribute('target')
      a.removeAttribute('rel')
      if (/^https?:\/\/(www\.)?bayana\.ae/i.test(href)) a.setAttribute('href', href.replace(/^https?:\/\/(www\.)?bayana\.ae/i, '') || '/')
    }
  })
  // drop empty paragraphs
  doc.body.querySelectorAll('p').forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('img')) p.remove()
  })
  return doc.body.innerHTML.trim()
}

const TOOLS = [
  { icon: Pilcrow, label: 'Normal text', run: (x) => x('formatBlock', '<p>') },
  { icon: Heading2, label: 'Heading (H2)', run: (x) => x('formatBlock', '<h2>') },
  { icon: Heading3, label: 'Sub-heading (H3)', run: (x) => x('formatBlock', '<h3>') },
  { sep: true },
  { icon: Bold, label: 'Bold', run: (x) => x('bold') },
  { icon: Italic, label: 'Italic', run: (x) => x('italic') },
  { sep: true },
  { icon: List, label: 'Bullet list', run: (x) => x('insertUnorderedList') },
  { icon: ListOrdered, label: 'Numbered list', run: (x) => x('insertOrderedList') },
  { icon: Quote, label: 'Highlight box', run: (x) => x('formatBlock', '<blockquote>') },
  { sep: true },
  {
    icon: LinkIcon,
    label: 'Add link',
    run: (x) => {
      const url = window.prompt('Link address — e.g. /adgm-company-formation or https://www.adgm.com')
      if (url) x('createLink', url.trim())
    },
  },
  { icon: Unlink, label: 'Remove link', run: (x) => x('unlink') },
  {
    icon: Table,
    label: 'Insert table',
    run: (x) =>
      x('insertHTML', '<table><thead><tr><th>Heading</th><th>Heading</th></tr></thead><tbody><tr><td>Text</td><td>Text</td></tr><tr><td>Text</td><td>Text</td></tr></tbody></table><p><br></p>'),
  },
  { image: true, icon: ImagePlus, label: 'Insert image' },
  { sep: true },
  { icon: RemoveFormatting, label: 'Clear formatting', run: (x) => x('removeFormat') },
]

export default function RichEditor({ value, onChange, onUploadImage }) {
  const ref = useRef(null)
  const fileRef = useRef(null)
  const savedRange = useRef(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    loadPurifier()
    document.execCommand('defaultParagraphSeparator', false, 'p') // Enter makes a new paragraph
  }, [])

  // Load content when a different post is opened (not while typing)
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value || ''
  }, [value])

  const emit = () => onChange(ref.current.innerHTML)
  const exec = (cmd, arg = null) => {
    ref.current.focus()
    document.execCommand(cmd, false, arg)
    emit()
  }

  const keepSelection = () => {
    const sel = window.getSelection()
    if (sel.rangeCount && ref.current.contains(sel.anchorNode)) savedRange.current = sel.getRangeAt(0)
  }
  const restoreSelection = () => {
    ref.current.focus()
    if (savedRange.current) {
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(savedRange.current)
    }
  }

  const onPaste = (e) => {
    const html = e.clipboardData.getData('text/html')
    if (!html || !purify) return // plain text paste is fine as it is
    e.preventDefault()
    const clean = purify.sanitize(normalize(html), { ALLOWED_TAGS, ALLOWED_ATTR })
    document.execCommand('insertHTML', false, clean)
    emit()
  }

  const onPickImage = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const alt = window.prompt('Describe the image for Google (alt text):', '') || ''
    setBusy(true)
    try {
      const url = await onUploadImage(file)
      restoreSelection()
      const safeAlt = alt.replace(/"/g, '&quot;').replace(/</g, '&lt;')
      document.execCommand('insertHTML', false, `<img src="${url}" alt="${safeAlt}"><p><br></p>`)
      emit()
    } catch (err) {
      window.alert(err.message || 'Image upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-200">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 p-1.5">
        {TOOLS.map((t, i) =>
          t.sep ? (
            <span key={i} className="mx-1 h-5 w-px bg-gray-300" />
          ) : (
            <button
              key={i}
              type="button"
              title={t.label}
              aria-label={t.label}
              disabled={t.image && busy}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (t.image) {
                  keepSelection()
                  fileRef.current.click()
                } else t.run(exec)
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition hover:bg-white hover:text-brand-700 disabled:opacity-40"
            >
              <t.icon className="h-4 w-4" />
            </button>
          )
        )}
        {busy && <span className="ml-2 text-xs font-semibold text-brand-700">Uploading image…</span>}
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={onPickImage} />
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        onKeyUp={keepSelection}
        onMouseUp={keepSelection}
        onPaste={onPaste}
        className="blog-content blog-editor min-h-[420px] px-5 py-4 outline-none"
      />
    </div>
  )
}

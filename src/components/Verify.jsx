import { Children, cloneElement, isValidElement } from 'react'

// "(VERIFY ...)" markers flag facts that must be checked on adgm.com before launch.
// In `npm run dev` they show as yellow badges; in the production build they are removed.
const RX = /\s*\(VERIFY[^)]*\)/g
const DEV = import.meta.env.DEV

export function verifyText(node) {
  if (typeof node === 'string') {
    if (!RX.test(node)) return node
    RX.lastIndex = 0
    if (!DEV) return node.replace(RX, '')
    const parts = node.split(/(\s*\(VERIFY[^)]*\))/g)
    return parts.map((p, i) =>
      /\(VERIFY/.test(p) ? (
        <mark key={i} className="ml-1 rounded bg-yellow-200 px-1 text-xs font-semibold text-yellow-900">{p.trim()}</mark>
      ) : (
        p
      )
    )
  }
  if (Array.isArray(node)) return node.map((n, i) => <span key={i}>{verifyText(n)}</span>)
  if (isValidElement(node) && node.props.children) {
    return cloneElement(node, {}, Children.map(node.props.children, verifyText))
  }
  return node
}

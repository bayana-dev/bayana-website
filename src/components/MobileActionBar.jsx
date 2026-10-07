import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { business, whatsappLink } from '../siteConfig'
import { WhatsAppIcon } from './Icons'

// Sticky WhatsApp + Call bar at the bottom of the screen on phones (slides up after a little scrolling)
function MobileActionBar() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 transition-transform duration-500 md:hidden ${show ? 'translate-y-0' : 'translate-y-[120%]'}`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-2 gap-2 rounded-full border border-white/60 bg-white/85 p-1.5 shadow-[0_10px_40px_-10px_rgba(3,79,50,.45)] backdrop-blur-xl">
        <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-whatsapp !min-h-[46px] !py-2" data-track="whatsapp">
          <WhatsAppIcon /> WhatsApp
        </a>
        <a href={business.phoneHref} className="btn-dark !min-h-[46px] !py-2" data-track="call">
          <Phone className="h-[18px] w-[18px]" /> Call now
        </a>
      </div>
    </div>
  )
}

export default MobileActionBar

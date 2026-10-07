import { whatsappLink } from '../siteConfig'
import { WhatsAppIcon } from './Icons'

// Floating WhatsApp bubble with a soft pulse (tablet / desktop). Phones use MobileActionBar instead.
function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat with Bayana on WhatsApp"
      data-track="whatsapp"
      className="group fixed bottom-6 right-6 z-40 hidden items-center md:flex"
    >
      <span className="mr-3 translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-lift transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Chat with us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.8)] transition duration-300 group-hover:scale-110">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  )
}

export default WhatsAppButton

import { Mail, Phone, MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '../lib/emailjs'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 pb-12 md:px-20 text-center">
      <div className="w-full mx-auto px-6">
        <div className="flex flex-wrap justify-around gap-6 mb-7">
          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-text-muted mb-2.5 flex items-center gap-1.5">
              <Mail size={12} /> Contact
            </h4>
            <a
              href="mailto:smartkti@vifscale.ighreenatech.com"
              className="block text-sm text-text-light hover:text-gold-soft mb-1 transition-colors"
            >
              smartkti@vifscale.ighreenatech.com
            </a>
            <a
              href="mailto:support@vifscale.ighreenatech.com"
              className="block text-sm text-text-light hover:text-gold-soft transition-colors"
            >
              support@vifscale.ighreenatech.com
            </a>
          </div>

          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-text-muted mb-2.5 flex items-center gap-1.5">
              <Phone size={12} /> Phone
            </h4>
            <a
              href="tel:+2347040888017"
              className="block text-sm text-text-light hover:text-gold-soft mb-1 transition-colors"
            >
              +234 704 088 8017
            </a>
            <a
              href="tel:+2349162742199"
              className="block text-sm text-text-light hover:text-gold-soft transition-colors"
            >
              +234 916 274 2199
            </a>
          </div>

          <div>
            <h4 className="text-[11px] tracking-widest uppercase text-text-muted mb-2.5 flex items-center gap-1.5">
              <MessageCircle size={12} /> WhatsApp
            </h4>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-text-light hover:text-gold-soft transition-colors"
            >
              Message us directly →
            </a>
          </div>
        </div>

        <div className="text-[12.5px] text-text-muted">
          &copy; 2026 Vifscale · Powered by Ighreena Technologies
        </div>
      </div>
    </footer>
  )
}

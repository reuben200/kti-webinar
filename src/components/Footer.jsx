import { Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react'
import { buildWhatsAppLink } from '../lib/emailjs'

export default function Footer() {
  return (
    <footer className="border-t border-line py-16 bg-ink-soft/30">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        
        {/* Brand/Support Section */}
        <div className="mb-12">
          <h3 className="font-display text-lg text-text-light mb-4">Questions?</h3>
          <p className="text-text-muted text-sm mb-8 leading-relaxed max-w-[400px] mx-auto">
            Need clarity on the K.T.I Method or assistance with your registration? Our team is ready to help.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold text-ink font-bold px-6 py-3 rounded-sm hover:bg-gold-soft transition-all"
            >
              <MessageCircle size={18} />
              Message us on WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Details Stack */}
        <div className="space-y-6 pt-8 border-t border-line/50">
          <div className="space-y-2">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Email</h4>
            <a href="mailto:smartkti@vifscale.ighreenatech.com" className="block text-sm text-text-light hover:text-gold-soft transition-colors">smartkti@vifscale.ighreenatech.com</a>
            <a href="mailto:support@vifscale.ighreenatech.com" className="block text-sm text-text-light hover:text-gold-soft transition-colors">support@vifscale.ighreenatech.com</a>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">Phone</h4>
            <a href="tel:+2347040888017" className="block text-sm text-text-light hover:text-gold-soft transition-colors">+234 704 088 8017</a>
            <a href="tel:+2349162742199" className="block text-sm text-text-light hover:text-gold-soft transition-colors">+234 916 274 2199</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 text-[11px] text-text-muted uppercase tracking-widest">
          &copy; 2026 Vifscale · Ighreena Technologies
        </div>
      </div>
    </footer>
  )
}

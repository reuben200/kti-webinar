import { useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { sendRegistrationEmail } from '../lib/emailjs'
import { supabase } from '../lib/supabaseClient'

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function RegistrationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [source, setSource] = useState('')
  const [status, setStatus] = useState(STATUS.IDLE)

  const isSending = status === STATUS.SENDING

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setStatus(STATUS.SENDING)
    
    try {
      // 1. PRE-CHECK: See if email already exists
      const { data: existingUser } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', email.trim())
        .maybeSingle()

      if (existingUser) {
        alert("It looks like this email is already registered!")
        setStatus(STATUS.IDLE)
        return
      }

      // 2. SAVE: Insert into Supabase
      const { error: dbError } = await supabase
        .from('registrations')
        .insert([{ 
          name: name.trim(), 
          email: email.trim(),
          location: location.trim(),
          referral_source: source
        }])

      if (dbError) throw dbError

      // 3. SEND EMAIL: Trigger EmailJS
      await sendRegistrationEmail({ name: name.trim(), email: email.trim() })
      
      setStatus(STATUS.SUCCESS)
      setName('')
      setEmail('')
      setLocation('')
      setSource('')
    } catch (err) {
      console.error('Registration error:', err)
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section className="py-14 pb-16">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="ledger">
          <span>Reserve Your Seat</span>
        </div>

        <div className="bg-ink-soft border border-line rounded-md md:rounded-lg p-7 sm:p-9">
          <h2 className="font-display font-medium text-2xl text-text-light mb-2.5">
            Save your spot
          </h2>
          <p className="text-[14px] text-text-muted leading-relaxed mb-7">
            Enter your details below. We&rsquo;ll email you instantly with a button to
            confirm your seat on WhatsApp — that&rsquo;s where all event updates happen.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-xs font-semibold tracking-wide uppercase text-text-muted mb-2">Full name</label>
              <input
                type="text"
                placeholder="e.g. Ada Obi"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-text-light/[0.04] border border-line rounded-sm px-4 py-3.5 font-body text-[15px] text-text-light placeholder:text-[#6B7286] focus:outline-none focus:border-gold focus:bg-text-light/[0.07] transition-colors"
              />
            </div>

            {/* Email Address */}
            <div className="mb-4">
              <label className="block text-xs font-semibold tracking-wide uppercase text-text-muted mb-2">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-text-light/[0.04] border border-line rounded-sm px-4 py-3.5 font-body text-[15px] text-text-light placeholder:text-[#6B7286] focus:outline-none focus:border-gold focus:bg-text-light/[0.07] transition-colors"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-xs font-semibold tracking-wide uppercase text-text-muted mb-2">Location</label>
              <input
                type="text"
                placeholder="e.g. Abuja"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-text-light/[0.04] border border-line rounded-sm px-4 py-3.5 font-body text-[15px] text-text-light placeholder:text-[#6B7286] focus:outline-none focus:border-gold focus:bg-text-light/[0.07] transition-colors"
              />
            </div>

            {/* Referral Source */}
            <div className="mb-4">
  <label className="block text-xs font-semibold tracking-wide uppercase text-text-muted mb-2">
    How did you hear about us?
  </label>
  <select
    value={source}
    onChange={(e) => setSource(e.target.value)}
    className={`w-full bg-text-light/[0.04] border border-line rounded-sm px-4 py-3.5 font-body text-[15px] focus:outline-none focus:border-gold focus:bg-text-light/[0.07] transition-colors appearance-none ${
      source === "" ? "text-[#6B7286]" : "text-text-light"
    }`}
  >
    <option value="" disabled className="bg-ink-soft text-[#6B7286]">
      Select an option
    </option>
    <option value="facebook" className="bg-ink-soft text-text-light">Facebook</option>
    <option value="referral" className="bg-ink-soft text-text-light">Friends/Referral</option>
    <option value="instagram" className="bg-ink-soft text-text-light">Instagram</option>
    <option value="pinterest" className="bg-ink-soft text-text-light">Pinterest</option>
    <option value="tiktok" className="bg-ink-soft text-text-light">TikTok</option>
    <option value="whatsapp" className="bg-ink-soft text-text-light">WhatsApp Status</option>
    <option value="other" className="bg-ink-soft text-text-light">Other</option>
  </select>
</div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-gold hover:bg-gold-soft disabled:opacity-60 disabled:cursor-not-allowed text-ink font-body font-bold text-[15px] rounded-sm px-5 py-4 mt-1.5 transition-colors active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-soft focus-visible:outline-offset-2 flex items-center justify-center gap-2"
            >
              {isSending && <Loader2 size={16} className="animate-spin" />}
              {isSending ? 'Sending...' : 'Send Me My Confirmation'}
            </button>

            {status === STATUS.SUCCESS && (
              <div className="flex items-start gap-2.5 bg-gold/[0.12] border border-gold/40 text-gold-soft rounded-sm px-4 py-3.5 text-sm leading-relaxed mt-4">
                <CheckCircle2 size={18} className="flex-none mt-0.5" />
                <span>Check your inbox or promotions — your confirmation email is on its way.</span>
              </div>
            )}

            {status === STATUS.ERROR && (
              <div className="flex items-start gap-2.5 bg-[#C14444]/[0.12] border border-[#C14444]/40 text-[#E89090] rounded-sm px-4 py-3.5 text-sm leading-relaxed mt-4">
                <AlertCircle size={18} className="flex-none mt-0.5" />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
import emailjs from '@emailjs/browser'

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER
const WHATSAPP_PREFILL = import.meta.env.VITE_WHATSAPP_PREFILL

let initialized = false

function ensureInitialized() {
  if (!initialized) {
    if (!PUBLIC_KEY) {
      console.warn(
        '[EmailJS] VITE_EMAILJS_PUBLIC_KEY is missing. Check your .env file.'
      )
    }
    emailjs.init({ publicKey: PUBLIC_KEY })
    initialized = true
  }
}

/**
 * Builds the pre-filled wa.me link sent inside the confirmation email.
 */
export function buildWhatsAppLink() {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!WHATSAPP_PREFILL) return base
  return `${base}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`
}

/**
 * Sends the registration confirmation email via EmailJS.
 * @param {{ name: string, email: string }} params
 * @returns {Promise<import('@emailjs/browser').EmailJSResponseStatus>}
 */
export async function sendRegistrationEmail({ name, email }) {
  ensureInitialized()

  if (!SERVICE_ID || !TEMPLATE_ID) {
    throw new Error(
      'EmailJS is not configured. Check VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID in your .env file.'
    )
  }

  const templateParams = {
    fullName: name,  
    to_email: email,
    whatsapp_link: buildWhatsAppLink(),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
}
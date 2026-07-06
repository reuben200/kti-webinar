# Vifscale — Smart K.T.I Landing Page

React + Vite + Tailwind CSS + lucide-react rebuild of the Smart K.T.I Masterclass
landing page, with EmailJS wired through environment variables.

## Stack
- React 18 + Vite 5
- Tailwind CSS 3
- lucide-react (icons)
- @emailjs/browser (registration email)

## Setup

```bash
npm install
cp .env.example .env
```

Then open `.env` and fill in your real EmailJS values:

```
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_WHATSAPP_NUMBER=2348152510693
VITE_WHATSAPP_PREFILL=Hi! I just signed up for the Smart K.T.I Masterclass 🎓 — please add me to the group!
```

### Getting your EmailJS values
1. Sign up / log in at https://www.emailjs.com
2. **Email Services** → Add New Service → copy the **Service ID**
3. **Email Templates** → Create Template → copy the **Template ID**
   - Your template must use these variables: `{{to_name}}`, `{{to_email}}`, `{{whatsapp_link}}`
   - Put a visible button/link in the template body pointing to `{{whatsapp_link}}`
   - Set the template's "To" field to `{{to_email}}`
4. **Account** → **General** → copy your **Public Key**

## Run locally

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Deploy the contents of `dist/` to
`https://vifscale.ighreenatech.com/kti`.

## Project structure

```
src/
  components/
    Topbar.jsx           Brand header
    Hero.jsx              Headline + event meta (date/time/cost)
    Reframe.jsx            "Person A vs Person B" section
    WhatToExpect.jsx       3-item list of session takeaways
    RegistrationForm.jsx   Name + Email form -> EmailJS -> success/error states
    Footer.jsx              Contact emails, phone numbers, WhatsApp link
  lib/
    emailjs.js              EmailJS init + send logic, reads from import.meta.env
  App.jsx                   Assembles all sections
  main.jsx                  React root
  index.css                 Tailwind directives + custom "ledger" utility classes
```

## Notes
- `.env` is gitignored — never commit real keys. Use `.env.example` as the template
  for teammates or CI.
- The WhatsApp link sent in the confirmation email is built automatically from
  `VITE_WHATSAPP_NUMBER` + `VITE_WHATSAPP_PREFILL` — update those two variables any
  time the number or pre-filled message changes, no code edits needed.

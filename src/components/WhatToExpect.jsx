import { Clock, Compass, DollarSign, MessagesSquare } from 'lucide-react'

const items = [
  {
    num: '01',
    icon: Compass,
    title: 'The Vifscale Strategy™: Your K.T.I Blueprint',
    text: 'A proprietary, step-by-step framework to strip away the fluff and turn your existing knowledge into a high-demand offer.',
  },
  {
    num: '02',
    icon: DollarSign,
    title: 'Transparent Revenue Modeling',
    text: "We’ll pull back the curtain on real dollar figures. No 'get-rich-quick' hype—just clear, achievable income math.",
  },
  {
    num: '03',
    icon: MessagesSquare,
    title: 'Interactive Hot-Seat Coaching',
    text: 'This isn’t a passive webinar. We engage in live polls, direct Q&A, and real-time feedback to solve your specific bottlenecks.',
  },
  {
    num: '04',
    icon: Clock,
    title: 'Proven Velocity Systems',
    text: 'Learn the exact systems that have saved me hundreds of hours. Stop guessing, start executing with a repeatable process.',
  },
]

export default function WhatToExpect() {
  return (
    <section className="py-20 bg-ink-soft">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="ledger ledger-dark inline-block mb-4">
            <span>What You Will Walk Away With</span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-text-light">
            A masterclass designed for <span className="text-gold-soft italic">results</span>, not theory.
          </h2>
        </div>

        <ul className="space-y-6">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <li
                key={item.num}
                className="flex gap-5 p-6 bg-text-light/[0.03] border border-line hover:border-gold-soft/30 transition-all duration-300 group rounded-lg"
              >
                <div className="flex-none">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold-soft mb-2">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-medium text-[18px] text-text-light mb-1.5 group-hover:text-gold-soft transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-text-muted leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Micro-CTA for those who reach this point */}
        <div className="mt-12 text-center">
          <p className="text-text-muted text-sm mb-4">Ready to build your offer?</p>
          <a 
            href="#registration" 
            className="inline-block bg-gold hover:bg-gold-soft text-ink font-bold px-8 py-3 rounded-sm transition-all"
          >
            Secure Your Free Seat
          </a>
        </div>
      </div>
    </section>
  )
}

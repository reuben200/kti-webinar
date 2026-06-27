import { Clock, Compass, DollarSign, MessagesSquare } from 'lucide-react'

const items = [
  {
    num: '01',
    icon: Compass,
    title: 'The K.T.I Method™: Your Blueprint',
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
    <section className="py-12">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="ledger">
          <span>What To Expect</span>
        </div>

        <ul className="mt-2">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <li
                key={item.num}
                className={`flex gap-4 py-4 border-b border-line ${
                  i === 0 ? 'border-t' : ''
                }`}
              >
                <span className="font-display text-sm text-gold-soft flex-none w-6 pt-0.5">
                  {item.num}
                </span>
                <Icon
                  className="flex-none text-gold-soft mt-0.5"
                  size={18}
                  strokeWidth={1.75}
                />
                <div>
                  <h3 className="font-display font-medium text-[17px] text-text-light mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] text-text-muted leading-snug">
                    {item.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

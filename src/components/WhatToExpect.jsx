import { Clock, Compass, DollarSign, MessagesSquare } from 'lucide-react'

const items = [
  {
    num: '01',
    icon: Compass,
    title: 'The K.T.I Method™, explained simply',
    text: 'A step-by-step framework for turning what you know into a real, sellable offer — no fluff, no hype.',
  },
  {
    num: '02',
    icon: DollarSign,
    title: 'Real numbers, in USD',
    text: "Worst case, best case, and what's realistically achievable — worked through live, on screen.",
  },
  {
    num: '03',
    icon: MessagesSquare,
    title: 'A live, interactive room',
    text: 'Polls, a hot seat, and real answers to real questions — not a one-way lecture.',
  },
  {
    num: '04',
    icon: Clock,
    title: 'Know what works, No guessing',
    text: 'Learn the exact method that I have developed over the years. And how much time it is saving me.',
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

import { Target, Layers, Compass, MessagesSquare } from 'lucide-react'

const items = [
  {
    num: '01',
    icon: Target,
    title: 'The Economic Pain Hook',
    text: 'Learn how to name the specific, costly problem your knowledge solves, so buyers see the price as obvious instead of something to negotiate.',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Micro-Asset Leverage',
    text: "You don't need a massive course. See the exact anatomy of a 5 to 10 page asset that proves your value fast and captures leads on its own.",
  },
  {
    num: '03',
    icon: Compass,
    title: 'Profitable Micro-Niche Mapping',
    text: 'A simple scoring method to find buyers who have urgent problems and the budget to solve them now, so you stop guessing who to sell to.',
  },
  {
    num: '04',
    icon: MessagesSquare,
    title: 'Live Q&A and Feedback',
    text: "This isn't a passive webinar. Live polls, direct Q&A, and real-time feedback on your specific offer.",
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

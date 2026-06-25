const meta = [
  { label: 'Date', value: 'Sat, 4 July 2026' },
  { label: 'Time', value: '7:00 – 9:00 PM (WAT)' },
  { label: 'Where', value: 'Live on Vifscale' },
  { label: 'Cost', value: 'Free' },
]

export default function Hero() {
  return (
    <section className="pt-16 pb-14">
      <div className="max-w-[960px] mx-auto px-6 text-center">
        <div
          className="text-[13px] font-semibold tracking-widest uppercase text-gold-soft mb-5 opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.05s' }}
        >
          Free Live Masterclass · Saturday, 27 June 2026
        </div>

        <h1
          className="font-display font-medium text-text-light leading-[1.08] tracking-tight mb-5 opacity-0 animate-fadeUp text-[44px] sm:text-[54px] md:text-[64px]"
          style={{ animationDelay: '0.15s' }}
        >
          The knowledge you call{' '}
          <span className="italic text-gold-soft">&ldquo;nothing&rdquo;</span> is worth
          more than you think.
        </h1>

        <p
          className="text-lg text-center leading-relaxed text-text-muted max-w-[840px] mb-9 opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.25s' }}
        >
          In one live session, we&rsquo;ll show you the exact gap between people who{' '}
          <em>have</em> knowledge and people who <em>get paid</em> for it — with real
          numbers, in real dollars.
        </p>

        <div
          className="flex flex-wrap gap-7 py-5 border-t border-b border-line mb-10 opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.35s' }}
        >
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 mx-auto">
              <span className="text-[11px] tracking-widest uppercase text-text-muted">
                {item.label}
              </span>
              <span className="font-display font-medium text-lg text-gold-soft">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

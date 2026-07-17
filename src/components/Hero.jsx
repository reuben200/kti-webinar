const meta = [
  { label: 'Date', value: 'Sat, 25 July 2026' },
  { label: 'Time', value: '7:00 – 8:00 PM (WAT)' },
  { label: 'Where', value: 'Live on Vifscale' },
  { label: 'Cost', value: 'Free' },
]

export default function Hero() {
  return (
<section 
  className="relative w-full min-h-[60vh] flex items-center justify-center" 
  style={{
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://cdn.pixabay.com/photo/2017/05/08/19/04/agenda-2296195_1280.jpg")', 
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
      <div className="w-full max-w-[900px] px-6 py-16 text-center">
        <div
          className="text-[13px] font-semibold tracking-widest uppercase text-gold-soft mb-5 opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.05s' }}
        >
          {`Free Live Masterclass · ${meta[0].value}`}
        </div>

        <h1
          className="font-display font-medium text-text-light leading-[1.08] tracking-tight mb-5 opacity-0 animate-fadeUp text-[44px] sm:text-[54px] md:text-[64px]"
          style={{ animationDelay: '0.15s' }}
        >
          Come let me show you how that knowledge you call{' '}
          <span className="italic text-gold-soft">&ldquo;nothing&rdquo;</span> can earn you extra dollars.
        </h1>

        <p
          className="text-lg leading-relaxed text-text-muted max-w-[840px] mx-auto mb-9 opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.25s' }}
        >
          In one live session, we&rsquo;ll show you the exact strategy to bridge the gap between people who{' '}
          <em>have</em> knowledge and people who actually <em className="text-yellow-400">get paid</em> for it.
        </p>

        <div
          className="flex flex-wrap gap-7 py-5 border-t border-b border-line mb-10 opacity-0 animate-fadeUp justify-center"
          style={{ animationDelay: '0.35s' }}
        >
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 px-4">
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

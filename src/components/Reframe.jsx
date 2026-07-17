export default function Reframe() {
  return (
    <section className="bg-parchment text-ink py-16">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <div className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#8A6A3A] mb-4">
          The Anatomy of a Choice
        </div>
        <h2 className="font-display font-medium text-ink leading-[1.1] mb-8 text-[32px] sm:text-[42px]">
          The gap between what you know and what you earn from it is <span className="italic">strategy</span>, not talent.
        </h2>
        <p className="text-[18px] leading-relaxed text-[#3A3528] mb-12 max-w-[700px] mx-auto">
          Every day, you hold knowledge someone else is actively searching for.
          Person A calls it a favor and gives it away for free.
          Person B calls it an <strong>offer</strong> and gets paid for it.
          The skill is the same. What changes is how it's packaged and positioned.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-8 border border-ink/[0.1] shadow-sm">
            <div className="font-display text-[15px] font-semibold text-red-800 mb-3">
              Giving It Away
            </div>
            <p className="text-[15px] text-[#4A4438]">
              Your expertise stays informal advice. It helps people, but it stays invisible to the market and earns you nothing.
            </p>
          </div>
          <div className="bg-ink text-white p-8 shadow-lg">
            <div className="font-display text-[15px] font-semibold text-gold-soft mb-3">
              The Monetized Path
            </div>
            <p className="text-[15px] text-white/90">
              The same skills, packaged as a clear offer and positioned for a real audience, can realistically earn $500 to $2,000 a month.
            </p>
          </div>
        </div>
        <p className="text-[12px] text-[#8A8270] mb-12">
          Illustrative figures based on real case examples. Results depend on effort, market, and execution, not guaranteed.
        </p>
        <div className="bg-[#EAE4D7] p-8 rounded-sm">
          <p className="text-[17px] font-medium mb-6">
            Join the live masterclass and learn the framework to turn what you know into a paid offer.
          </p>
          <a href="#registration" className="bg-ink text-white px-8 py-4 text-[10px] sm:text-[12px] md:text-[16px] font-semibold hover:bg-gold-soft transition-all uppercase tracking-widest">
            Reserve Your Free Seat Now
          </a>
        </div>
      </div>
    </section>
  )
}

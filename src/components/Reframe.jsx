export default function Reframe() {
  return (
    <section className="bg-parchment text-ink py-16">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        {/* Added a more provocative header */}
        <div className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#8A6A3A] mb-4">
          The Anatomy of a Choice
        </div>

        <h2 className="font-display font-medium text-ink leading-[1.1] mb-8 text-[32px] sm:text-[42px]">
          The only difference between your current reality and an extra $2,000/mo is <span className="italic">strategy</span>.
        </h2>

        <p className="text-[18px] leading-relaxed text-[#3A3528] mb-12 max-w-[700px] mx-auto">
          Every day, you possess knowledge that others are actively searching for. 
          Person A calls it "nothing" and gives it away. 
          Person B calls it a <strong>career</strong> and gets paid in dollars. 
          The skill is the same. The only thing different is the packaging.
        </p>

        {/* Improved Contrast in the Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-white p-8 border border-ink/[0.1] shadow-sm">
            <div className="font-display text-[15px] font-semibold text-red-800 mb-3">
              The "Nothing" Trap
            </div>
            <p className="text-[15px] text-[#4A4438]">
              You undervalue your expertise, stay invisible to the market, and leave your potential earnings at $0.
            </p>
          </div>
          <div className="bg-ink text-white p-8 shadow-lg">
            <div className="font-display text-[15px] font-semibold text-gold-soft mb-3">
              The Monetized Path
            </div>
            <p className="text-[15px] text-white/90">
              You package your exact same skills, position them for a global audience, and unlock $500–$2,000/month.
            </p>
          </div>
        </div>

        <div className="bg-[#EAE4D7] p-8 rounded-sm">
          <p className="text-[17px] font-medium mb-6">
            Stop being Person A. Join the live masterclass and learn the framework to become Person B.
          </p>
          <a href="#registration" className="bg-ink text-white px-8 py-4 text-[16px] font-semibold hover:bg-gold-soft transition-all uppercase tracking-widest">
            Reserve Your Free Seat Now
          </a>
        </div>
      </div>
    </section>
  )
}

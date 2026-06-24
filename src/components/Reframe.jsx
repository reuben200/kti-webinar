export default function Reframe() {
  return (
    <section className="bg-parchment text-ink py-12">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="ledger ledger-dark">
          <span>The Gap</span>
        </div>

        <h2 className="font-display font-medium text-ink leading-tight mb-5 text-[26px] sm:text-[32px] md:text-[36px]">
          Same knowledge. Two completely different incomes.
        </h2>

        <p className="text-[17px] leading-relaxed text-[#3A3528] mb-4 max-w-[960px]">
          Picture two people with the <strong className="text-ink font-semibold">exact same skill</strong>, same
          ability, same know-how. One of them gives it away for free without a second
          thought. The other has quietly turned it into $500 – $2,000+ a month, in US
          dollars, from anywhere in the world.
        </p>
        <p className="text-[17px] leading-relaxed text-[#3A3528] mb-4 max-w-[560px]">
          The difference was never the knowledge. It&rsquo;s what happens to it next.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/[0.14] border border-ink/[0.14] mt-8">
          <div className="bg-parchment p-6">
            <div className="font-display text-[15px] font-semibold tracking-wide mb-2.5 text-[#8A6A3A]">
              Person A
            </div>
            <p className="text-[14.5px] leading-relaxed text-[#4A4438]">
              Has the skill. Calls it &ldquo;nothing.&rdquo; Helps people for free
              because, why wouldn&rsquo;t they? Income from it: $0.
            </p>
          </div>
          <div className="bg-parchment p-6">
            <div className="font-display text-[15px] font-semibold tracking-wide mb-2.5 text-blue">
              Person B
            </div>
            <p className="text-[14.5px] leading-relaxed text-[#4A4438]">
              Same skill, packaged, positioned, and placed in front of the right
              audience. Income from it: $500 – $2,000/month.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

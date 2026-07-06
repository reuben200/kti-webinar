import React, { useState, useMemo, useEffect } from "react";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const DOMAINS = [
  "Cooking & food",
  "Fitness & movement",
  "Parenting & family life",
  "Personal finance & budgeting",
  "Writing & storytelling",
  "Visual design & art",
  "Technology & software",
  "Business & entrepreneurship",
  "Career skills & job hunting",
  "Mental wellness & mindfulness",
  "Relationships & communication",
  "Teaching a specific school subject",
  "Crafts & making things",
];

const SCALE_LABELS = {
  depth: ["Just curious", "Getting the hang of it", "Comfortable", "Very capable", "People call me the expert"],
  ask: ["Never", "Once in a while", "Fairly often", "Often", "Constantly"],
  enjoy: ["Not really", "It's fine", "I like it", "I really enjoy it", "I lose track of time doing it"],
};

const PROOF_OPTIONS = [
  { value: 3, label: "Yes, clearly", hint: "You or someone you helped got a real, visible result." },
  { value: 2, label: "Somewhat", hint: "Some progress or positive feedback, nothing dramatic." },
  { value: 1, label: "Not yet", hint: "You know the subject but haven't proven it in practice." },
];

const WHO_OPTIONS = [
  { value: "beginners", label: "People just starting out", hint: "You're good at explaining basics without overwhelm." },
  { value: "stuck", label: "People stuck at an intermediate level", hint: "You're good at unblocking specific sticking points." },
  { value: "advanced", label: "People chasing mastery", hint: "You go deep into nuance and edge cases." },
];

const FORMAT_OPTIONS = [
  { value: "write", label: "Writing things down", hint: "Guides, posts, templates people read on their own time." },
  { value: "teach", label: "Teaching it live", hint: "Workshops, calls, or courses where you explain in real time." },
  { value: "build", label: "Building tools", hint: "Templates, spreadsheets, trackers, checklists people use." },
  { value: "coach", label: "Working one-on-one", hint: "Direct coaching or done-for-you service work." },
];

const AUDIENCE_OPTIONS = [
  { value: "none", label: "No one yet", hint: "You'd be starting from zero." },
  { value: "some", label: "A few people", hint: "Friends, coworkers, or a small following already ask you things." },
  { value: "steady", label: "A real network", hint: "You have followers, past clients, or a list you could message today." },
];

const FORMAT_COPY = {
  write: "a written guide, checklist, or short course",
  teach: "a live workshop or small-group class",
  build: "a template or tool people can use right away",
  coach: "a one-on-one coaching or done-for-you offer",
};

const WHO_COPY = {
  beginners: "people just starting out",
  stuck: "people stuck at an intermediate level",
  advanced: "people chasing real mastery",
};

const MAX_DOMAIN_SCORE = 5 * 2 + 5 * 2 + 5 * 1.5 + 3 * 2;

function rawScore(d) {
  if (!d) return 0;
  const depth = d.depth ?? 0;
  const ask = d.ask ?? 0;
  const enjoy = d.enjoy ?? 0;
  const proof = d.proof ?? 0;
  return depth * 2 + ask * 2 + enjoy * 1.5 + proof * 2;
}

function toPercent(score) {
  return Math.max(4, Math.min(99, Math.round((score / MAX_DOMAIN_SCORE) * 100)));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const GOLD = "#C9A227";

const CARD =
  "relative w-full max-w-2xl bg-gray-800 rounded-sm px-8 py-9 sm:px-11 sm:py-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] before:content-[''] before:absolute before:inset-2.5 before:border before:border-white/10 before:rounded-sm before:pointer-events-none";

const BTN_PRIMARY =
  "bg-[#C9A227] text-yellow-100 border-none rounded-md px-6 py-2.5 text-sm font-semibold font-sans cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed";

const BTN_GHOST =
  "bg-transparent border-none text-gray-100/60 text-sm font-medium cursor-pointer px-2 py-2.5 hover:text-white transition-colors";

const INPUT =
  "w-full font-sans text-sm px-3 py-2.5 rounded-md border border-white/15 bg-gray-900/60 text-white placeholder-gray-100/40 focus:outline-none focus:border-[#C9A227]";

function StepShell({ entryNumber, totalEntries, title, subtitle, children, onBack, onNext, nextLabel, nextDisabled, hideBack }) {
  return (
    <div className={CARD}>
      <div className="mb-5">
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#C9A227] block mb-2.5">
          Entry {entryNumber} of {totalEntries}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalEntries }).map((_, i) => (
            <span
              key={i}
              className={`h-[3px] flex-1 rounded-sm ${i < entryNumber ? "bg-[#C9A227]" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>

      <h2 className="font-serif font-medium text-[26px] sm:text-[28px] leading-tight text-white mb-2">{title}</h2>
      {subtitle && <p className="text-sm leading-relaxed text-gray-100/60 mb-6">{subtitle}</p>}

      <div className="mb-2">{children}</div>

      <div className="flex justify-between items-center mt-7 pt-5 border-t border-white/10">
        {!hideBack ? (
          <button className={BTN_GHOST} onClick={onBack} type="button">Back</button>
        ) : <span />}
        <button className={BTN_PRIMARY} onClick={onNext} disabled={nextDisabled} type="button">
          {nextLabel || "Continue"}
        </button>
      </div>
    </div>
  );
}

function ScaleQuestion({ label, hint, value, onChange, labels }) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="text-[15px] font-semibold text-white mb-0.5">{label}</p>
      {hint && <p className="text-[13px] text-gray-100/60 mb-3">{hint}</p>}
      <div className="grid grid-cols-5 gap-1.5">
        {labels.map((text, i) => {
          const n = i + 1;
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              title={text}
              className={`flex flex-col items-center gap-1 text-center rounded-md border px-1 py-2.5 transition-colors ${
                active
                  ? "bg-[#C9A227] border-[#C9A227]"
                  : "bg-white/5 border-white/15 hover:border-[#C9A227]"
              }`}
            >
              <span className={`font-mono text-[13px] font-medium ${active ? "text-black" : "text-white"}`}>{n}</span>
              <span className={`text-[10px] leading-tight ${active ? "text-black/70" : "text-gray-100/60"}`}>{text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChoiceQuestion({ label, hint, options, value, onChange }) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="text-[15px] font-semibold text-white mb-0.5">{label}</p>
      {hint && <p className="text-[13px] text-gray-100/60 mb-3">{hint}</p>}
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`text-left rounded-md border px-3.5 py-3 flex flex-col gap-0.5 transition-colors ${
                active
                  ? "bg-[#C9A227] border-[#C9A227]"
                  : "bg-white/5 border-white/15 hover:border-[#C9A227]"
              }`}
            >
              <span className={`text-[14.5px] font-semibold ${active ? "text-black" : "text-white"}`}>{opt.label}</span>
              <span className={`text-[12.5px] ${active ? "text-black/70" : "text-gray-100/60"}`}>{opt.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function KnowledgeAudit() {
  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [selectedDomains, setSelectedDomains] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [otherChecked, setOtherChecked] = useState(false);
  const [domainData, setDomainData] = useState({});

  const [who, setWho] = useState(null);
  const [format, setFormat] = useState(null);
  const [audience, setAudience] = useState(null);

  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const effectiveDomains = useMemo(() => {
    const list = [...selectedDomains];
    if (otherChecked && otherText.trim()) list.push(otherText.trim());
    return list;
  }, [selectedDomains, otherChecked, otherText]);

  const N = effectiveDomains.length;
  const totalEntries = 4 + N;

  const updateDomainField = (domain, field, val) => {
    setDomainData((prev) => ({ ...prev, [domain]: { ...prev[domain], [field]: val } }));
  };

  const toggleDomain = (label) => {
    setSelectedDomains((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : prev.length >= 5 ? prev : [...prev, label]
    );
  };

  const ranked = useMemo(() => {
    return effectiveDomains
      .map((d) => {
        const data = domainData[d] || {};
        const score = rawScore(data);
        return { domain: d, data, score, percent: toPercent(score) };
      })
      .sort((a, b) => b.score - a.score);
  }, [effectiveDomains, domainData]);

  const top = ranked[0];

  const buildReasons = (entry) => {
    if (!entry) return [];
    const { data } = entry;
    const reasons = [];
    if ((data.depth ?? 0) >= 4) reasons.push("you already have real, hands-on depth here");
    if ((data.ask ?? 0) >= 4) reasons.push("people already come to you for help with this");
    if ((data.proof ?? 0) >= 3) reasons.push("you have a clear result to point to");
    if ((data.enjoy ?? 0) >= 4) reasons.push("you genuinely enjoy the work, which matters for sticking with it");
    if (reasons.length === 0) reasons.push("it scored highest overall among what you shared");
    return reasons;
  };

  const contactValid = name.trim().length > 1 && isValidEmail(email) && !!date;

  const isDomainStep = step >= 2 && step <= 1 + N;
  const currentDomain = isDomainStep ? effectiveDomains[step - 2] : null;
  const currentDomainEntry = currentDomain ? domainData[currentDomain] || {} : {};
  const domainStepComplete =
    currentDomainEntry.depth && currentDomainEntry.ask && currentDomainEntry.enjoy && currentDomainEntry.proof;

  const whoStepIndex = 2 + N;
  const formatStepIndex = 3 + N;
  const audienceStepIndex = 4 + N;
  const resultsStepIndex = 5 + N;

  const restart = () => {
    setStep(0);
    setName(""); setEmail(""); setDate(new Date().toISOString().slice(0, 10));
    setSelectedDomains([]); setOtherText(""); setOtherChecked(false); setDomainData({});
    setWho(null); setFormat(null); setAudience(null);
    setSubmitStatus("idle"); setSubmitMessage("");
  };

  useEffect(() => {
    if (step !== resultsStepIndex || !top || submitStatus !== "idle") return;

    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.indexOf("PASTE_YOUR") === 0) {
      setSubmitStatus("error");
      setSubmitMessage("No Apps Script URL configured yet.");
      return;
    }

    setSubmitStatus("sending");

    const payload = {
      name,
      email,
      date,
      who,
      whoLabel: who ? WHO_COPY[who] : "",
      format,
      audience,
      topDomain: top.domain,
      topPercent: top.percent,
      topAngle: (top.data && top.data.angle) || "",
      ranked: ranked.map((r) => ({
        domain: r.domain,
        percent: r.percent,
        angle: r.data.angle || "",
      })),
    };

    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.ok) {
          setSubmitStatus(data.updated ? "updated" : "sent");
        } else {
          setSubmitStatus("error");
          setSubmitMessage((data && data.error) || "The sheet did not confirm the save.");
        }
      })
      .catch((err) => {
        setSubmitStatus("error");
        setSubmitMessage(err.message || "Network error while saving.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div className="min-h-full bg-gray-900 bg-[radial-gradient(circle_at_15%_10%,rgba(201,162,39,0.10),transparent_45%)] flex justify-center px-5 py-12 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .font-sans { font-family: 'Inter', -apple-system, sans-serif; }
        .font-serif { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {step === 0 && (
        <div className={CARD}>
          <div className="w-[52px] h-[52px] rounded-full border-2 border-[#C9A227] flex items-center justify-center mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6" className="w-6 h-6">
              <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#C9A227] block mb-2.5">
            Knowledge audit
          </span>
          <h1 className="font-serif font-medium text-2xl sm:text-[28px] leading-tight text-white mb-2">
            Let's appraise what you already know
          </h1>
          <p className="text-sm leading-relaxed text-gray-100/60 mb-6">
            Most people already have knowledge worth building on. They just haven't had it appraised.
            This takes about five to eight minutes and ends with a percentage match for every area you
            share, plus one clear recommendation of where to start.
          </p>
          <div className="bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-md px-4 py-3 text-[13.5px] leading-relaxed text-gray-100 mb-6">
            There's no right or wrong answer anywhere in this audit. Answer sincerely, based on where
            you genuinely are today, not where you'd like to be, and not what sounds impressive.
            The more honest you are, the more useful the result.
          </div>

          <div className="flex flex-col gap-4 mb-2">
            <div>
              <p className="text-[15px] font-semibold text-white mb-0.5">Your name</p>
              <input className={INPUT} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-white mb-0.5">Your email</p>
              <input
                className={INPUT}
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email.length > 3 && !isValidEmail(email) && (
                <p className="text-xs text-red-400 mt-1.5">That doesn't look like a valid email yet.</p>
              )}
            </div>
            <div>
              <p className="text-[15px] font-semibold text-white mb-0.5">Today's date</p>
              <input className={INPUT} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-between items-center mt-7 pt-5 border-t border-white/10">
            <span />
            <button className={BTN_PRIMARY} type="button" disabled={!contactValid} onClick={() => setStep(1)}>
              Begin the audit
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <StepShell
          entryNumber={1}
          totalEntries={totalEntries}
          title="Where do you have real experience?"
          subtitle="Pick up to five. This can be from a job, a hobby, a hard season of life you got through, or something people already ask you about. No wrong picks here, just what's true for you."
          onBack={() => setStep(0)}
          onNext={() => setStep(2)}
          nextDisabled={effectiveDomains.length === 0}
          hideBack
        >
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((d) => {
              const active = selectedDomains.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDomain(d)}
                  className={`rounded-full px-4 py-2 text-[13.5px] font-medium border transition-colors ${
                    active
                      ? "bg-[#C9A227] border-[#C9A227] text-black"
                      : "bg-white/5 border-white/15 text-gray-100 hover:border-[#C9A227]"
                  }`}
                >
                  {d}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setOtherChecked((v) => !v)}
              className={`rounded-full px-4 py-2 text-[13.5px] font-medium border transition-colors ${
                otherChecked
                  ? "bg-[#C9A227] border-[#C9A227] text-black"
                  : "bg-white/5 border-white/15 text-gray-100 hover:border-[#C9A227]"
              }`}
            >
              Something else
            </button>
          </div>
          {otherChecked && (
            <div className="flex items-center gap-2 mt-3.5">
              <input
                className={INPUT}
                placeholder="Name the area, be specific if you can"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
              />
            </div>
          )}
          <p className="text-xs text-gray-100/60 mt-3">{effectiveDomains.length} of 5 selected</p>
        </StepShell>
      )}

      {isDomainStep && currentDomain && (
        <StepShell
          entryNumber={step}
          totalEntries={totalEntries}
          title={currentDomain}
          subtitle="Five quick questions about this one. Answer sincerely, there's no version of this that's wrong."
          onBack={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
          nextDisabled={!domainStepComplete}
        >
          <ScaleQuestion
            label="How deep is your knowledge here?"
            labels={SCALE_LABELS.depth}
            value={currentDomainEntry.depth}
            onChange={(v) => updateDomainField(currentDomain, "depth", v)}
          />
          <ScaleQuestion
            label="How often do people already come to you for help with this?"
            hint="This is a demand signal, a real one, since it already happened."
            labels={SCALE_LABELS.ask}
            value={currentDomainEntry.ask}
            onChange={(v) => updateDomainField(currentDomain, "ask", v)}
          />
          <ScaleQuestion
            label="How much do you enjoy this?"
            hint="Depth without enjoyment burns out fast."
            labels={SCALE_LABELS.enjoy}
            value={currentDomainEntry.enjoy}
            onChange={(v) => updateDomainField(currentDomain, "enjoy", v)}
          />
          <ChoiceQuestion
            label="Have you (or someone you helped) gotten a real result from this?"
            hint="A result is proof. Proof is what makes people trust you enough to pay."
            options={PROOF_OPTIONS}
            value={currentDomainEntry.proof}
            onChange={(v) => updateDomainField(currentDomain, "proof", v)}
          />
          <div className="mb-0">
            <p className="text-[15px] font-semibold text-white mb-0.5">What's the #1 thing people ask you for help with here?</p>
            <p className="text-[13px] text-gray-100/60 mb-3">One sentence, in your own words. This is what makes your recommendation specific instead of generic.</p>
            <input
              className={INPUT}
              placeholder="e.g. Quick, healthy dinners for busy parents"
              value={currentDomainEntry.angle || ""}
              onChange={(e) => updateDomainField(currentDomain, "angle", e.target.value)}
            />
            <p className="text-xs text-gray-100/60 mt-1.5">Optional, but strongly recommended. It sharpens your final result.</p>
          </div>
        </StepShell>
      )}

      {step === whoStepIndex && (
        <StepShell
          entryNumber={step}
          totalEntries={totalEntries}
          title="Who do you naturally help best?"
          subtitle="Think about who you've actually helped before, not who you'd ideally want to work with."
          onBack={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
          nextDisabled={!who}
        >
          <ChoiceQuestion label="Pick the one that fits best" options={WHO_OPTIONS} value={who} onChange={setWho} />
        </StepShell>
      )}

      {step === formatStepIndex && (
        <StepShell
          entryNumber={step}
          totalEntries={totalEntries}
          title="How do you naturally like to share what you know?"
          subtitle="This shapes the first thing you'd actually build, not the niche itself."
          onBack={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
          nextDisabled={!format}
        >
          <ChoiceQuestion label="Pick the one that fits best" options={FORMAT_OPTIONS} value={format} onChange={setFormat} />
        </StepShell>
      )}

      {step === audienceStepIndex && (
        <StepShell
          entryNumber={step}
          totalEntries={totalEntries}
          title="Does anyone already know you for this?"
          subtitle="Starting with an audience of zero is fine, it just changes what your first move should be."
          onBack={() => setStep(step - 1)}
          onNext={() => setStep(resultsStepIndex)}
          nextDisabled={!audience}
          nextLabel="See my results"
        >
          <ChoiceQuestion label="Pick the one that fits best" options={AUDIENCE_OPTIONS} value={audience} onChange={setAudience} />
        </StepShell>
      )}

      {step === resultsStepIndex && top && (
        <div className={CARD}>
          <div className="w-[84px] h-[84px] rounded-full bg-gray-900 border-[3px] border-[#C9A227] flex flex-col items-center justify-center mx-auto mb-5">
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#C9A227]">Assessed</span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#C9A227] text-center block mb-2.5">
            Start here
          </span>
          <h2 className="font-serif font-semibold text-[28px] text-center text-white mb-1">{top.domain}</h2>
          <span className="font-mono text-[15px] font-medium text-[#C9A227] text-center block mb-1.5">{top.percent}% match</span>
          {top.data.angle && <p className="text-sm italic text-center text-gray-100 mb-1">"{top.data.angle}"</p>}
          <p className="text-sm text-center text-gray-100/60 mb-6">
            {format && who
              ? `Build ${FORMAT_COPY[format]} for ${WHO_COPY[who]}.`
              : "This is your strongest starting point."}
          </p>

          <div className="bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-md px-5 py-4 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#C9A227] mb-2">Why this one, right now</p>
            <ul className="pl-4 list-disc">
              {buildReasons(top).map((r, i) => (
                <li key={i} className="text-[13.5px] text-gray-100 mb-1 leading-relaxed">
                  {r.charAt(0).toUpperCase() + r.slice(1)}.
                </li>
              ))}
            </ul>
            {audience === "none" && (
              <ul className="pl-4 list-disc mt-1.5">
                <li className="text-[13.5px] text-gray-100 leading-relaxed">
                  You're starting with no audience yet, so your first goal is simply getting this in front of five real people, not going viral.
                </li>
              </ul>
            )}
            {audience === "steady" && (
              <ul className="pl-4 list-disc mt-1.5">
                <li className="text-[13.5px] text-gray-100 leading-relaxed">
                  You already have people who'd pay attention. Tell them what you're building before it's finished.
                </li>
              </ul>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-100/60 mb-2.5">Your full match breakdown</p>
            {ranked.map((r, i) => (
              <div key={r.domain} className="flex items-center gap-3 py-2.5 border-t border-white/10 last:border-b text-[13.5px]">
                <span className="font-mono text-[#C9A227] w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-gray-100 flex-1">{r.domain}</span>
                <span className="w-[100px] h-[5px] bg-white/10 rounded-full overflow-hidden shrink-0">
                  <span className="block h-full bg-[#C9A227]" style={{ width: r.percent + "%" }} />
                </span>
                <span className="font-mono text-xs text-gray-100/60 w-[34px] text-right shrink-0">{r.percent}%</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-100/60 mt-5">
            {submitStatus === "sending" && "Saving your results…"}
            {submitStatus === "sent" && "Your results have been saved."}
            {submitStatus === "updated" && "You'd already submitted this audit, so your existing entry was updated with these new answers."}
            {submitStatus === "error" &&
              `Couldn't save your results automatically${submitMessage ? ` (${submitMessage})` : ""}. You can still screenshot this page.`}
          </p>

          <button
            className="block mx-auto mt-4 bg-transparent border border-white/20 text-gray-100/60 rounded-md px-5 py-2.5 text-[13px] cursor-pointer hover:text-white hover:border-white/40 transition-colors"
            type="button"
            onClick={restart}
          >
            Start a new audit
          </button>
        </div>
      )}
    </div>
  );
}
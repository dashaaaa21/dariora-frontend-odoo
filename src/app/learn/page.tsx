"use client";

import Link from "next/link";
import Image from "next/image";

export default function Learn() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center border-b border-white/10">
        {/* Shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative mx-auto max-w-[1360px] px-10 text-center">
          <div className="tech-label mb-6 text-[var(--neon-red)]">
            LEARNING PATH
          </div>
          <h1 className="headline-large max-w-[900px] mx-auto mb-6">
            YOUR JOURNEY TO
            <br />
            <span className="text-[var(--neon-red)]">AI MASTERY</span>
          </h1>
          <p className="body-text max-w-[600px] mx-auto text-[var(--steel-gray)]">
            Follow a structured path from beginner to expert. Each step builds on the last, 
            taking you from discovery to mastery.
          </p>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* LEARNING PATH */}
      <section className="border-t border-white/10 px-10 py-[150px] transition-all duration-700">

        <div className="mx-auto max-w-[1360px]">

          <span className="tech-label">
            04 / LEARNING PATH
          </span>

          <h2 className="headline-large mt-16 max-w-[1000px]">
            YOUR PATH
            <br />
            STARTS HERE.
          </h2>

          <div className="relative mt-32">

            <div className="absolute left-[23px] top-0 h-full w-px bg-[var(--neon-red)]/40" />

            {[
              "DISCOVER",
              "LEARN",
              "BUILD",
              "AUTOMATE",
              "CREATE",
              "MASTER",
            ].map((step, index) => (

              <div
                key={step}
                className="group relative flex min-h-[110px] items-center border-t border-white/10 transition-all duration-300 hover:bg-[var(--deep-charcoal)]/50"
              >

                <div className="relative z-10 flex h-12 w-12 items-center justify-center bg-[var(--obsidian-black)] text-[12px] text-[var(--neon-red)] neon-glow">
                  0{index + 1}
                </div>

                <div className="ml-16 headline-small text-[var(--steel-gray)] transition-colors duration-300 group-hover:text-[var(--pure-white)]">
                  {step}
                </div>

              </div>

            ))}

            <div className="border-t border-white/10" />

          </div>

        </div>

      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* BENEFITS SECTION */}
      <section className="relative min-h-[700px] border-t border-white/10 px-10 py-[120px] transition-all duration-700">
        <div className="pointer-events-none absolute left-0 top-[20%] h-[600px] w-[600px] bg-[var(--neon-red)]/5 blur-[140px]" />
        
        <div className="mx-auto max-w-[1360px] relative z-10">
          <span className="tech-label">
            WHY LEARN WITH US
          </span>

          <h2 className="headline-large mt-16 mb-20">
            STRUCTURED FOR
            <br />
            <span className="text-[var(--neon-red)]">SUCCESS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {[
              { title: "Self-Paced", desc: "Learn at your own speed, whenever you want" },
              { title: "Hands-On Projects", desc: "Build real projects with AI tools" },
              { title: "Expert Content", desc: "Curated courses from industry professionals" },
              { title: "Community Support", desc: "Connect with fellow learners worldwide" },
              { title: "Certificates", desc: "Earn recognized certificates upon completion" },
              { title: "Lifetime Access", desc: "Keep access to all course materials forever" },
            ].map((benefit, idx) => (
              <div key={idx} className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300">
                <h3 className="headline-small mb-4 group-hover:text-[var(--neon-red)] transition-colors">
                  {benefit.title}
                </h3>
                <p className="body-text">
                  {benefit.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* CTA SECTION */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden border-t border-white/10 px-10 py-[100px] transition-all duration-700">
        <div className="pointer-events-none absolute right-[10%] top-0 h-[500px] w-[500px] rounded-full bg-[var(--neon-red)]/10 blur-[150px]" />

        <div className="relative mx-auto w-full max-w-[1360px] text-center">
          <h2 className="headline-large mb-8 max-w-[900px] mx-auto">
            READY TO
            <br />
            <span className="text-[var(--neon-red)]">START YOUR PATH?</span>
          </h2>

          <p className="body-text max-w-[600px] mx-auto mb-16 text-[var(--steel-gray)]">
            Pick a course and begin your AI learning journey today.
          </p>

          <div className="hero-actions justify-center">
            <Link href="/courses">
              <button className="btn-primary">
                <span className="btn-primary__label">Explore Courses</span>
                <span className="btn-primary__icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7H17V17" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

    </main>
  );
}

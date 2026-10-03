"use client";

import Link from "next/link";
import Image from "next/image";

export default function AITools() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center border-b border-white/10">
        {/* Shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative mx-auto max-w-[1360px] px-10 text-center">
          <div className="tech-label mb-6 text-[var(--neon-red)]">
            AI TOOLKIT
          </div>
          <h1 className="headline-large max-w-[900px] mx-auto mb-6">
            MASTER THE
            <br />
            <span className="text-[var(--neon-red)]">AI TOOLS</span>
          </h1>
          <p className="body-text max-w-[600px] mx-auto text-[var(--steel-gray)]">
            Learn to use the most powerful AI tools available today. 
            From content creation to automation, we cover it all.
          </p>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* AI TOOLKIT */}
      <section className="relative overflow-hidden border-t border-white/10 px-10 py-[170px] transition-all duration-700">

        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] bg-[var(--neon-red)]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-[1360px]">

          <span className="tech-label">
            02 / AI TOOLKIT
          </span>

          <h2 className="headline-large mt-20">
            THE
            <br />
            <span className="text-[var(--neon-red)]">
              AI
            </span>{" "}
            TOOLKIT.
          </h2>

          <div className="mt-28 grid grid-cols-2 border-t border-white/10 md:grid-cols-3">

            {[
              "CHATGPT",
              "CLAUDE",
              "MIDJOURNEY",
              "GEMINI",
              "RUNWAY",
              "PERPLEXITY",
              "ELEVENLABS",
              "OPENAI",
              "ANTHROPIC",
            ].map((tool) => (

              <div
                key={tool}
                className="glass border-b border-white/10 py-8 px-6 text-[22px] tracking-[-0.03em] text-[var(--steel-gray)] transition-all duration-300 hover:text-[var(--neon-red)] hover:border-[var(--neon-red)]/50 neon-glow"
              >
                {tool}
              </div>

            ))}

          </div>

        </div>

      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* TOOLS BREAKDOWN SECTION */}
      <section className="relative min-h-[800px] border-t border-white/10 px-10 py-[120px] transition-all duration-700">
        <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] bg-[var(--neon-red)]/5 blur-[140px]" />
        
        <div className="mx-auto max-w-[1360px] relative z-10">
          <span className="tech-label">
            TOOL CATEGORIES
          </span>

          <h2 className="headline-large mt-16 mb-20">
            EVERY TOOL
            <br />
            <span className="text-[var(--neon-red)]">FOR EVERY NEED</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {[
              { cat: "Text & Conversation", tools: "ChatGPT, Claude, Gemini", desc: "Advanced language models for writing, analysis, and creative work" },
              { cat: "Image & Design", tools: "Midjourney, DALL-E, Runway", desc: "Generate stunning visuals and design assets with AI" },
              { cat: "Audio & Voice", tools: "ElevenLabs, Descript", desc: "Create and edit audio content, speech synthesis, and voice-overs" },
              { cat: "Research & Analysis", tools: "Perplexity, Claude", desc: "Research, analyze data, and get insights in seconds" },
            ].map((category, idx) => (
              <div key={idx} className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300">
                <h3 className="headline-small mb-2 group-hover:text-[var(--neon-red)] transition-colors">
                  {category.cat}
                </h3>
                <p className="tech-label text-[var(--neon-red)] mb-4">
                  {category.tools}
                </p>
                <p className="body-text">
                  {category.desc}
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
            READY TO MASTER
            <br />
            <span className="text-[var(--neon-red)]">THESE TOOLS?</span>
          </h2>

          <p className="body-text max-w-[600px] mx-auto mb-16 text-[var(--steel-gray)]">
            Choose your tool and start learning from our expert instructors today.
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

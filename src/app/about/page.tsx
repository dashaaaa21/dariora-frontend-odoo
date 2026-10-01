"use client";

import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center border-b border-white/10">
        <Image
          src="/globe.svg"
          alt="DARIORA About"
          fill
          className="object-cover"
          priority
        />
        {/* Shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative mx-auto max-w-[1360px] px-10 text-center">
          <div className="tech-label mb-6 text-[var(--neon-red)]">
            ABOUT DARIORA
          </div>
          <h1 className="headline-large max-w-[900px] mx-auto mb-6">
            REVOLUTIONIZING
            <br />
            <span className="text-[var(--neon-red)]">AI EDUCATION</span>
            <br />
            FOR EVERYONE
          </h1>
          <p className="body-text max-w-[600px] mx-auto text-[var(--steel-gray)]">
            We believe AI isn't just for tech experts. It's for creators, marketers, 
            designers, and builders of all levels.
          </p>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* OUR STORY */}
      <section className="relative min-h-[800px] border-b border-white/10 px-10 py-[120px] transition-all duration-700">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Text */}
            <div>
              <div className="tech-label mb-8 text-[var(--neon-red)]">
                OUR STORY
              </div>
              
              <h2 className="headline-large mb-12">
                FOUNDED ON
                <br />
                A MISSION
              </h2>

              <div className="space-y-8">
                <p className="body-text max-w-[500px]">
                  DARIORA was born from a simple observation: AI tools are advancing at an unprecedented pace, 
                  but education hasn't kept up. Most people don't understand the systems they use daily.
                </p>

                <p className="body-text max-w-[500px]">
                  We created DARIORA to bridge that gap. Our platform provides hands-on, practical training 
                  that transforms curiosity into real-world skills.
                </p>

                <p className="body-text max-w-[500px]">
                  Whether you're starting from scratch or looking to master advanced techniques, 
                  DARIORA helps you understand, create, and automate with AI.
                </p>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <div className="tech-label mb-4 text-[var(--steel-gray)]">
                  SINCE 2026
                </div>
                <p className="text-sm text-[var(--steel-gray)]">
                  Building the future of AI education, one student at a time.
                </p>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div className="glass p-8 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300">
                <div className="text-5xl font-bold text-[var(--neon-red)] mb-4 group-hover:text-[var(--electric-orange)] transition-colors">
                  500+
                </div>
                <div className="tech-label text-[var(--steel-gray)]">
                  Active Students
                </div>
              </div>

              <div className="glass p-8 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300">
                <div className="text-5xl font-bold text-[var(--neon-red)] mb-4 group-hover:text-[var(--electric-orange)] transition-colors">
                  15+
                </div>
                <div className="tech-label text-[var(--steel-gray)]">
                  Courses Available
                </div>
              </div>

              <div className="glass p-8 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300">
                <div className="text-5xl font-bold text-[var(--neon-red)] mb-4 group-hover:text-[var(--electric-orange)] transition-colors">
                  50+
                </div>
                <div className="tech-label text-[var(--steel-gray)]">
                  AI Tools Covered
                </div>
              </div>

              <div className="glass p-8 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300">
                <div className="text-5xl font-bold text-[var(--neon-red)] mb-4 group-hover:text-[var(--electric-orange)] transition-colors">
                  12k+
                </div>
                <div className="tech-label text-[var(--steel-gray)]">
                  Learning Hours
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* VALUES */}
      <section className="relative min-h-[900px] border-b border-white/10 px-10 py-[120px] transition-all duration-700">
        <div className="pointer-events-none absolute left-0 top-[20%] h-[600px] w-[600px] bg-[var(--neon-red)]/5 blur-[140px]" />
        
        <div className="mx-auto max-w-[1360px] relative z-10">
          <div className="tech-label mb-8 text-[var(--neon-red)]">
            OUR VALUES
          </div>

          <h2 className="headline-large mb-20">
            WHAT DRIVES
            <br />
            US FORWARD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300 min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="headline-small mb-6 group-hover:text-[var(--neon-red)] transition-colors">
                  Practical First
                </h3>
                <p className="body-text">
                  No fluff, no theory without application. Everything you learn 
                  can be used immediately in real projects.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300 min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="headline-small mb-6 group-hover:text-[var(--neon-red)] transition-colors">
                  Always Updated
                </h3>
                <p className="body-text">
                  AI moves fast. Our curriculum evolves with the industry, 
                  keeping you ahead of the curve.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300 min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="headline-small mb-6 group-hover:text-[var(--neon-red)] transition-colors">
                  Community Driven
                </h3>
                <p className="body-text">
                  Learn from peers, share projects, and grow together. 
                  Our community is at the heart of everything.
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300 min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="headline-small mb-6 group-hover:text-[var(--neon-red)] transition-colors">
                  Expert Instructors
                </h3>
                <p className="body-text">
                  Learn from industry professionals who live and breathe AI. 
                  Real experience, real insights.
                </p>
              </div>
            </div>

            {/* Value 5 */}
            <div className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300 min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="headline-small mb-6 group-hover:text-[var(--neon-red)] transition-colors">
                  Affordable Access
                </h3>
                <p className="body-text">
                  Premium AI education shouldn't break the bank. 
                  We make learning accessible to everyone.
                </p>
              </div>
            </div>

            {/* Value 6 */}
            <div className="glass p-10 rounded-lg group hover:bg-[var(--deep-charcoal)]/80 transition-all duration-300 min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="headline-small mb-6 group-hover:text-[var(--neon-red)] transition-colors">
                  Global Impact
                </h3>
                <p className="body-text">
                  Based in Kyiv with students worldwide. 
                  Building a global community of AI learners.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* CTA SECTION */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden border-b border-white/10 px-10 py-[100px] transition-all duration-700">
        <div className="pointer-events-none absolute left-[20%] top-0 h-[500px] w-[500px] rounded-full bg-[var(--neon-red)]/10 blur-[150px]" />

        <div className="relative mx-auto w-full max-w-[1360px] text-center">
          <div className="tech-label mb-8 text-[var(--neon-red)]">
            READY TO START?
          </div>

          <h2 className="headline-large mb-8 max-w-[900px] mx-auto">
            BEGIN YOUR
            <br />
            <span className="text-[var(--neon-red)]">AI JOURNEY</span>
          </h2>

          <p className="body-text max-w-[600px] mx-auto mb-16 text-[var(--steel-gray)]">
            Join hundreds of students already learning AI with DARIORA. 
            Start with any course and progress at your own pace.
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
            
            <button className="btn-secondary">
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

    </main>
  );
}

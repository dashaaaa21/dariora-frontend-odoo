"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Course = {
  id: number;
  name: string;
  description: string;
  price: number;
  is_published: boolean;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await apiFetch("/api/courses");
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <main className="min-h-screen p-8">

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src="/picture.png"
          alt="DARIORA AI Education Platform"
          fill
          className="object-cover"
          priority
        />
        {/* Shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/55" />
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="DARIORA Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>
      </section>


      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* STATEMENT */}
      <section className="relative min-h-[850px] px-10 py-[180px] transition-all duration-700">

        <div className="mx-auto max-w-[1360px]">

          <div className="tech-label mb-20">
            00 / PHILOSOPHY
          </div>

          <h2 className="headline-large max-w-[1250px]">
            LEARN
            <br />
            WHAT&apos;S{" "}
            <span className="text-[var(--neon-red)]">
              NEXT.
            </span>
          </h2>

          <div className="mt-24 ml-auto max-w-[360px]">

            <p className="body-text">
              AI is changing how we work, create and
              think. Dariora is built to help you understand
              the technology behind that change.
            </p>

          </div>

        </div>

      </section>


      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* COURSES */}
      <section className="border-t border-white/10 px-10 py-[150px] transition-all duration-700">

        <div className="mx-auto max-w-[1360px]">

          <div className="flex items-center justify-between">

            <span className="tech-label">
              01 / COURSES
            </span>

            <span className="tech-label">
              SELECT YOUR PATH
            </span>

          </div>

          <h2 className="headline-large mt-16">
            BUILD REAL
            <br />
            <span className="text-[var(--neon-red)]">
              AI SKILLS.
            </span>
          </h2>


          <div className="mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              { num: "01", title: "AI FUNDAMENTALS" },
              { num: "02", title: "PROMPT ENGINEERING" },
              { num: "03", title: "AI AUTOMATION" },
              { num: "04", title: "AI FOR DESIGN" },
              { num: "05", title: "AI FOR MARKETING" },
              { num: "06", title: "AI CONTENT CREATION" },
            ].map((course) => (

              <Link
                href="/courses"
                key={course.num}
                className="group glass neon-glow p-6 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:bg-[var(--deep-charcoal)]/80"
              >

                <div>
                  <div className="tech-label text-[var(--neon-red)] mb-4">
                    {course.num}
                  </div>

                  <h3 className="headline-small mb-4 group-hover:text-[var(--neon-red)] transition-colors duration-300">
                    {course.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-[var(--steel-gray)] group-hover:text-[var(--neon-red)] transition-colors duration-300">
                  <span className="text-sm uppercase tracking-widest">Explore</span>
                  <span className="text-lg">→</span>
                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* AI TOOLKIT */}
      <section id="ai-toolkit" className="relative overflow-hidden border-t border-white/10 px-10 py-[170px] transition-all duration-700">

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

      {/* PHILOSOPHY */}
      <section className="relative min-h-[900px] border-t border-white/10 px-10 py-[180px] transition-all duration-700">

        <div className="mx-auto max-w-[1360px]">

          <span className="tech-label">
            03 / APPROACH
          </span>

          <h2 className="headline-large mt-24">
            DON&apos;T JUST
            <br />
            USE AI.
            <br />
            <span className="text-[var(--neon-red)]">
              UNDERSTAND IT.
            </span>
          </h2>

          <div className="mt-24 ml-auto max-w-[340px]">

            <p className="body-text">
              Learn the systems. Understand the tools.
              Build things that actually work.
            </p>

          </div>

        </div>

      </section>


      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* LEARNING PATH */}
      <section id="learning-path" className="border-t border-white/10 px-10 py-[150px] transition-all duration-700">

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

      {/* FINAL CTA */}
      <section className="relative flex min-h-[850px] items-center overflow-hidden border-t border-white/10 px-10 transition-all duration-700">

        <div className="pointer-events-none absolute left-[25%] top-[30%] h-[500px] w-[500px] rounded-full bg-[var(--neon-red)]/10 blur-[150px]" />

        <div className="relative mx-auto w-full max-w-[1360px]">

          <span className="tech-label">
            05 / START
          </span>

          <h2 className="headline-large mt-16 max-w-[1100px]">
            READY TO
            <br />
            BUILD
            <br />
            <span className="text-[var(--neon-red)]">
              WITH AI?
            </span>
          </h2>

          <div className="hero-actions mt-16">
            <button className="btn-primary">
              <span className="btn-primary__label">Start a Project</span>
              <span className="btn-primary__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7H17V17" />
                </svg>
              </span>
            </button>
            
            <button className="btn-secondary">
              <span>View Our Work</span>
            </button>
          </div>

        </div>

      </section>



      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* CONTACT US */}
      <section className="relative min-h-screen px-10 py-[150px] transition-all duration-700">

        <div className="mx-auto max-w-[1360px]">

          <span className="tech-label">
            06 / CONTACT
          </span>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left Side - Text & Info */}
            <div>
              <h2 className="headline-large mb-16">
                <span className="text-[var(--neon-red)]">CONTACT</span>
                <br />
                US
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="tech-label mb-2">Contact</div>
                  <a href="tel:+380963142018" className="text-lg hover:text-[var(--neon-red)] transition-colors">
                    +380 96 314 20 18
                  </a>
                </div>

                <div>
                  <div className="tech-label mb-2">Email</div>
                  <a href="mailto:kontourstud@gmail.com" className="text-lg hover:text-[var(--neon-red)] transition-colors">
                    kontourstud@gmail.com
                  </a>
                </div>

                <div>
                  <div className="tech-label mb-2">Location</div>
                  <p className="text-lg">Kyiv, Ukraine</p>
                </div>

                <div>
                  <div className="tech-label mb-4">Social</div>
                  <div className="flex gap-6">
                    <a href="#" className="hover:text-[var(--neon-red)] transition-colors underline">
                      Telegram
                    </a>
                    <a href="#" className="hover:text-[var(--neon-red)] transition-colors underline">
                      Instagram
                    </a>
                    <a href="#" className="hover:text-[var(--neon-red)] transition-colors underline">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="glass p-8 rounded-lg">
              <h3 className="headline-small mb-8">
                Send us a Message
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="tech-label block mb-2">Your Name*</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full bg-[var(--deep-charcoal)] border border-white/10 text-[var(--pure-white)] placeholder-[var(--steel-gray)] px-4 py-3 rounded transition-all focus:outline-none focus:border-[var(--neon-red)] focus:box-shadow"
                    />
                  </div>

                  <div>
                    <label className="tech-label block mb-2">Phone Number*</label>
                    <input
                      type="tel"
                      placeholder="Number"
                      className="w-full bg-[var(--deep-charcoal)] border border-white/10 text-[var(--pure-white)] placeholder-[var(--steel-gray)] px-4 py-3 rounded transition-all focus:outline-none focus:border-[var(--neon-red)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="tech-label block mb-2">Your Email*</label>
                    <input
                      type="email"
                      placeholder="kontourstud@gmail.com"
                      className="w-full bg-[var(--deep-charcoal)] border border-white/10 text-[var(--pure-white)] placeholder-[var(--steel-gray)] px-4 py-3 rounded transition-all focus:outline-none focus:border-[var(--neon-red)]"
                    />
                  </div>

                  <div>
                    <label className="tech-label block mb-2">WhatsApp / LinkedIn / Instagram</label>
                    <input
                      type="text"
                      placeholder="Your link / username"
                      className="w-full bg-[var(--deep-charcoal)] border border-white/10 text-[var(--pure-white)] placeholder-[var(--steel-gray)] px-4 py-3 rounded transition-all focus:outline-none focus:border-[var(--neon-red)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="tech-label block mb-2">Message</label>
                  <textarea
                    placeholder="Tell us what you want..."
                    rows={5}
                    className="w-full bg-[var(--deep-charcoal)] border border-white/10 text-[var(--pure-white)] placeholder-[var(--steel-gray)] px-4 py-3 rounded transition-all focus:outline-none focus:border-[var(--neon-red)] resize-none"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="submit" className="btn-primary">
                    <span className="btn-primary__label">Start a Project</span>
                    <span className="btn-primary__icon">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7H17V17" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </section>

      {/* RED LINE DIVIDER */}
      <div className="red-line" />

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-10 pb-10 pt-20 transition-all duration-700">

        <div className="mx-auto max-w-[1360px]">

          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="DARIORA Logo"
              className="h-96 w-96 object-contain"
            />
          </div>

          <div className="mt-8 flex flex-col justify-between gap-12 border-t border-white/10 pt-8 md:flex-row">

            <div>
              <div className="tech-label text-[var(--steel-gray)]">
                AI EDUCATION PLATFORM
              </div>

              <div className="mt-3 tech-label text-[var(--steel-gray)]/60">
                EST. 2026
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-[11px] uppercase tracking-[0.1em] text-[var(--steel-gray)] md:grid-cols-3 transition-all duration-300">

              <Link href="/courses" className="hover:text-[var(--neon-red)] transition-colors duration-300">
                Courses
              </Link>

              <a href="#ai-toolkit" className="hover:text-[var(--neon-red)] transition-colors duration-300">
                AI Tools
              </a>

              <Link href="/about" className="hover:text-[var(--neon-red)] transition-colors duration-300">
                About
              </Link>

              <Link href="/" className="hover:text-[var(--neon-red)] transition-colors duration-300">
                Contact
              </Link>

              <Link href="/" className="hover:text-[var(--neon-red)] transition-colors duration-300">
                Instagram
              </Link>

              <Link href="/" className="hover:text-[var(--neon-red)] transition-colors duration-300">
                YouTube
              </Link>

            </div>

          </div>

          <div className="mt-16 flex justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.1em] text-[var(--steel-gray)]/50">

            <span>
              © 2026 DARIORA
            </span>

            <div className="flex gap-6">
              <span>Privacy</span>
              <span>Terms</span>
            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}

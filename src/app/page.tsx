"use client";

import Link from "next/link";
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
      <section className="relative min-h-[950px] overflow-hidden border-b border-white/10">

        {/* Red atmospheric light */}
        <div className="pointer-events-none absolute right-[8%] top-[15%] h-[650px] w-[500px] rounded-full bg-[#8f0e08]/20 blur-[160px]" />

        <div className="relative mx-auto max-w-[1360px] px-10">

          {/* Editorial metadata */}
          <div className="flex items-center justify-between pt-[120px]">

            <div className="editorial-label text-[#a6a3a0]">
              AI EDUCATION PLATFORM
            </div>

            <div className="editorial-label text-[#a6a3a0]">
              DARIORA / 2026
            </div>

          </div>

          {/* Main composition */}
          <div className="relative mt-[95px] grid grid-cols-12">

            {/* LEFT */}
            <div className="relative z-20 col-span-8">

              <h1 className="display text-[clamp(80px,9.5vw,150px)]">
                <span className="block">
                  ALL AI COURSES.
                </span>

                <span className="block text-[#ff3b16]">
                  ONE PLATFORM.
                </span>
              </h1>

              <div className="mt-12 max-w-[470px]">

                <p className="text-[19px] leading-[1.45] text-[#a6a3a0]">
                  Learn AI, automation, design, marketing,
                  and more. Build real skills. Create your
                  future with AI.
                </p>

                <Link
                  href="/courses"
                  className="group mt-9 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.12em]"
                >
                  <span className="border-b border-[#f5f3f1] pb-1 transition-colors group-hover:border-[#ff3b16] group-hover:text-[#ff3b16]">
                    Explore courses
                  </span>

                  <span className="text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>

              </div>
            </div>

            {/* RIGHT VISUAL AREA */}
            <div className="absolute right-[-40px] top-[-80px] h-[720px] w-[470px] overflow-hidden">

              {/* Temporary cinematic placeholder */}
              <div className="absolute inset-0 bg-[#0b0b0b]">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(255,59,22,0.35),transparent_38%)]" />

                <div className="absolute right-[12%] top-[8%] h-[85%] w-[55%] border-l border-[#ff3b16]/30" />

                <div className="absolute right-[18%] top-[18%] h-[65%] w-[38%] bg-[#151515]" />

              </div>

              <div className="absolute bottom-8 left-8">
                <div className="editorial-label text-[#a6a3a0]">
                  VISUAL SYSTEM
                </div>

                <div className="mt-2 text-[12px] uppercase tracking-[0.1em] text-[#ff3b16]">
                  01 / AI FUTURE
                </div>
              </div>

            </div>
          </div>

          {/* HERO WORDMARK */}
          <div className="pointer-events-none absolute bottom-[-15px] left-0 w-full overflow-hidden">

            <div className="display whitespace-nowrap text-[clamp(130px,16vw,230px)] text-[#f5f3f1]">
              DARIORA
            </div>

          </div>

        </div>

        {/* tiny bottom metadata */}
        <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between border-t border-white/10 pt-4">

          <span className="editorial-label text-[#66635f]">
            AI LEARNING SYSTEM
          </span>

          <span className="editorial-label text-[#66635f]">
            EST. 2026
          </span>

        </div>

      </section>


      {/* STATEMENT */}
      <section className="relative min-h-[850px] px-10 py-[180px]">

        <div className="mx-auto max-w-[1360px]">

          <div className="editorial-label mb-20 text-[#66635f]">
            00 / PHILOSOPHY
          </div>

          <h2 className="display max-w-[1250px] text-[clamp(75px,9vw,140px)]">
            LEARN
            <br />
            WHAT&apos;S{" "}
            <span className="text-[#ff3b16]">
              NEXT.
            </span>
          </h2>

          <div className="mt-24 ml-auto max-w-[360px]">

            <p className="text-[16px] leading-[1.6] text-[#a6a3a0]">
              AI is changing how we work, create and
              think. Dariora is built to help you understand
              the technology behind that change.
            </p>

          </div>

        </div>

      </section>


      {/* COURSES */}
      <section className="border-t border-white/10 px-10 py-[150px]">

        <div className="mx-auto max-w-[1360px]">

          <div className="flex items-center justify-between">

            <span className="editorial-label text-[#66635f]">
              01 / COURSES
            </span>

            <span className="editorial-label text-[#66635f]">
              SELECT YOUR PATH
            </span>

          </div>

          <h2 className="display mt-16 text-[clamp(70px,8vw,125px)]">
            BUILD REAL
            <br />
            <span className="text-[#ff3b16]">
              AI SKILLS.
            </span>
          </h2>


          <div className="mt-28">

            {[
              "AI FUNDAMENTALS",
              "PROMPT ENGINEERING",
              "AI AUTOMATION",
              "AI FOR DESIGN",
              "AI FOR MARKETING",
              "AI CONTENT CREATION",
            ].map((course, index) => (

              <Link
                href="/courses"
                key={course}
                className="group flex min-h-[105px] items-center border-t border-white/10 transition-all duration-500 hover:bg-[#0b0b0b]"
              >

                <span className="w-[100px] text-[12px] text-[#66635f]">
                  0{index + 1}
                </span>

                <span className="flex-1 text-[clamp(25px,3vw,45px)] font-medium tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-3">
                  {course}
                </span>

                <span className="pr-4 text-[22px] text-[#66635f] transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#ff3b16]">
                  →
                </span>

              </Link>

            ))}

            <div className="border-t border-white/10" />

          </div>

        </div>

      </section>


      {/* AI TOOLKIT */}
      <section className="relative overflow-hidden border-t border-white/10 px-10 py-[170px]">

        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] bg-[#8f0e08]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-[1360px]">

          <span className="editorial-label text-[#66635f]">
            02 / AI TOOLKIT
          </span>

          <h2 className="display mt-20 text-[clamp(90px,12vw,180px)]">
            THE
            <br />
            <span className="text-[#ff3b16]">
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
                className="border-b border-white/10 py-8 text-[22px] tracking-[-0.03em] text-[#a6a3a0] transition-colors hover:text-[#ff3b16]"
              >
                {tool}
              </div>

            ))}

          </div>

        </div>

      </section>


      {/* PHILOSOPHY */}
      <section className="relative min-h-[900px] border-t border-white/10 px-10 py-[180px]">

        <div className="mx-auto max-w-[1360px]">

          <span className="editorial-label text-[#66635f]">
            03 / APPROACH
          </span>

          <h2 className="display mt-24 text-[clamp(75px,10vw,150px)]">
            DON&apos;T JUST
            <br />
            USE AI.
            <br />
            <span className="text-[#ff3b16]">
              UNDERSTAND IT.
            </span>
          </h2>

          <div className="mt-24 ml-auto max-w-[340px]">

            <p className="text-[16px] leading-[1.6] text-[#a6a3a0]">
              Learn the systems. Understand the tools.
              Build things that actually work.
            </p>

          </div>

        </div>

      </section>


      {/* LEARNING PATH */}
      <section className="border-t border-white/10 px-10 py-[150px]">

        <div className="mx-auto max-w-[1360px]">

          <span className="editorial-label text-[#66635f]">
            04 / LEARNING PATH
          </span>

          <h2 className="display mt-16 max-w-[1000px] text-[clamp(70px,8vw,125px)]">
            YOUR PATH
            <br />
            STARTS HERE.
          </h2>

          <div className="relative mt-32">

            <div className="absolute left-[23px] top-0 h-full w-px bg-[#ff3b16]/40" />

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
                className="group relative flex min-h-[110px] items-center border-t border-white/10"
              >

                <div className="relative z-10 flex h-12 w-12 items-center justify-center bg-[#050505] text-[12px] text-[#ff3b16]">
                  0{index + 1}
                </div>

                <div className="ml-16 text-[clamp(28px,4vw,55px)] tracking-[-0.04em] text-[#a6a3a0] transition-colors group-hover:text-[#f5f3f1]">
                  {step}
                </div>

              </div>

            ))}

            <div className="border-t border-white/10" />

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="relative flex min-h-[850px] items-center overflow-hidden border-t border-white/10 px-10">

        <div className="pointer-events-none absolute left-[25%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#ff1600]/10 blur-[150px]" />

        <div className="relative mx-auto w-full max-w-[1360px]">

          <span className="editorial-label text-[#66635f]">
            05 / START
          </span>

          <h2 className="display mt-16 max-w-[1100px] text-[clamp(80px,11vw,165px)]">
            READY TO
            <br />
            BUILD
            <br />
            <span className="text-[#ff3b16]">
              WITH AI?
            </span>
          </h2>

          <Link
            href="/courses"
            className="group mt-16 inline-flex items-center gap-4 text-[13px] uppercase tracking-[0.12em]"
          >
            <span className="border-b border-[#f5f3f1] pb-2 transition-colors group-hover:border-[#ff3b16] group-hover:text-[#ff3b16]">
              Start learning
            </span>

            <span className="text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 px-10 pb-10 pt-20">

        <div className="mx-auto max-w-[1360px]">

          <div className="display text-[clamp(100px,15vw,220px)]">
            DARIORA
          </div>

          <div className="mt-8 flex flex-col justify-between gap-12 border-t border-white/10 pt-8 md:flex-row">

            <div>
              <div className="editorial-label text-[#a6a3a0]">
                AI EDUCATION PLATFORM
              </div>

              <div className="mt-3 editorial-label text-[#66635f]">
                EST. 2026
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-[11px] uppercase tracking-[0.1em] text-[#a6a3a0] md:grid-cols-3">

              <Link href="/courses" className="hover:text-[#ff3b16]">
                Courses
              </Link>

              <Link href="/" className="hover:text-[#ff3b16]">
                AI Tools
              </Link>

              <Link href="/" className="hover:text-[#ff3b16]">
                About
              </Link>

              <Link href="/" className="hover:text-[#ff3b16]">
                Contact
              </Link>

              <Link href="/" className="hover:text-[#ff3b16]">
                Instagram
              </Link>

              <Link href="/" className="hover:text-[#ff3b16]">
                YouTube
              </Link>

            </div>

          </div>

          <div className="mt-16 flex justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.1em] text-[#66635f]">

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

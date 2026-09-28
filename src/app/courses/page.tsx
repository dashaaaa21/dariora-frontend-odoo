"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Course = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_published: boolean;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCourses() {
    try {
      setLoading(true);
      setError("");

      const data = await apiFetch("/api/courses");
      setCourses(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#050505] text-[#f5f3f1]">
      <div className="mx-auto max-w-[1360px] px-10 py-20">

        {/* Header */}
        <div className="border-b border-white/10 pb-10">
          <div className="editorial-label text-[#66635f]">
            DARIORA / COURSES
          </div>

          <div className="mt-8 flex items-end justify-between">
            <h1 className="display text-[clamp(70px,9vw,145px)]">
              COURSES
            </h1>

            <div className="pb-3 text-right">
              <div className="editorial-label text-[#66635f]">
                AVAILABLE
              </div>

              <div className="mt-2 text-[24px]">
                {courses.length.toString().padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 editorial-label text-[#66635f]">
            Loading / COURSES
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-10 border-l border-[#ff3b16] pl-4 text-[13px] text-[#ff8b78]">
            {error}
          </div>
        )}

        {/* Courses */}
        {!loading && !error && (
          <section className="mt-10">

            {courses.length === 0 ? (
              <div className="border-t border-white/10 py-20 text-[#66635f]">
                No courses available.
              </div>
            ) : (
              courses.map((course, index) => (
                <div
                  key={course.id}
                  className="group grid min-h-[150px] grid-cols-[100px_1fr_180px_40px] items-center border-t border-white/10"
                >
                  <span className="text-[12px] text-[#66635f]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="text-[clamp(32px,4vw,62px)] tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-2">
                      {course.name}
                    </h2>

                    {course.description && (
                      <p className="mt-3 max-w-[650px] text-[14px] leading-6 text-[#66635f]">
                        {course.description}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-[20px]">
                      €{course.price.toFixed(2)}
                    </div>

                    <div
                      className={`mt-2 editorial-label ${
                        course.is_published
                          ? "text-[#ff3b16]"
                          : "text-[#66635f]"
                      }`}
                    >
                      {course.is_published
                        ? "PUBLISHED"
                        : "DRAFT"}
                    </div>
                  </div>

                  <div className="text-right text-[24px] text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </div>
                </div>
              ))
            )}

            <div className="border-t border-white/10" />
          </section>
        )}

      </div>
    </main>
  );
}

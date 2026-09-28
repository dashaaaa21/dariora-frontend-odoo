"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

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

  const [showForm, setShowForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  function resetForm() {
    setName("");
    setDescription("");
    setPrice("");
    setIsPublished(false);
    setEditingCourseId(null);
    setShowForm(false);
  }

  function startEditing(course: Course) {
    setEditingCourseId(course.id);
    setName(course.name);
    setDescription(course.description || "");
    setPrice(String(course.price));
    setIsPublished(course.is_published);
    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const body = {
        name,
        description,
        price: Number(price),
        is_published: isPublished,
      };

      if (editingCourseId !== null) {
        await apiFetch(`/api/courses/${editingCourseId}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await apiFetch("/api/courses", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }

      resetForm();
      await loadCourses();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to save course.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(courseId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(courseId);
      setError("");

      await apiFetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });

      await loadCourses();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete course.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-[calc(100vh-88px)] bg-[#050505] text-[#f5f3f1]">
      <div className="mx-auto max-w-[1360px] px-10 py-20">

        {/* HEADER */}
        <div className="border-b border-white/10 pb-10">
          <div className="editorial-label text-[#66635f]">
            DARIORA / COURSES
          </div>

          <div className="mt-8 flex items-end justify-between">
            <h1 className="display text-[clamp(70px,9vw,145px)]">
              COURSES
            </h1>

            <button
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  setShowForm(true);
                  setError("");
                }
              }}
              className="mb-3 text-[12px] uppercase tracking-[0.12em] transition-colors hover:text-[#ff3b16]"
            >
              {showForm ? "Close ×" : "+ New Course"}
            </button>
          </div>
        </div>

        {/* FORM */}
        {showForm && (
          <section className="border-b border-white/10 py-16">
            <div className="editorial-label text-[#66635f]">
              {editingCourseId ? "EDIT / COURSE" : "CREATE / COURSE"}
            </div>

            <form onSubmit={handleSubmit} className="mt-10 max-w-[700px]">
              {/* NAME */}
              <div>
                <label
                  htmlFor="course-name"
                  className="editorial-label text-[#a6a3a0]"
                >
                  COURSE NAME
                </label>

                <input
                  id="course-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="AI for Beginners"
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mt-10">
                <label
                  htmlFor="course-description"
                  className="editorial-label text-[#a6a3a0]"
                >
                  DESCRIPTION
                </label>

                <textarea
                  id="course-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Introduction to Artificial Intelligence"
                  rows={4}
                  className="mt-3 w-full resize-none border-b border-white/20 bg-transparent px-0 py-4 text-[18px] leading-7 outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                />
              </div>

              {/* PRICE */}
              <div className="mt-10">
                <label
                  htmlFor="course-price"
                  className="editorial-label text-[#a6a3a0]"
                >
                  PRICE / EUR
                </label>

                <input
                  id="course-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="99"
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                />
              </div>

              {/* PUBLISHED */}
              <label className="mt-10 flex cursor-pointer items-center gap-4">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(event) => setIsPublished(event.target.checked)}
                  className="h-4 w-4 accent-[#ff3b16]"
                />

                <span className="editorial-label text-[#a6a3a0]">
                  PUBLISH COURSE
                </span>
              </label>

              {/* ERROR */}
              {error && (
                <div className="mt-8 border-l border-[#ff3b16] pl-4 text-[13px] leading-6 text-[#ff8b78]">
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={saving}
                className="group mt-12 flex items-center gap-4 text-[12px] uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="border-b border-[#f5f3f1] pb-2 transition-colors group-hover:border-[#ff3b16] group-hover:text-[#ff3b16]">
                  {saving
                    ? "Saving..."
                    : editingCourseId
                    ? "Save Changes"
                    : "Create Course"}
                </span>

                {!saving && (
                  <span className="text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                )}
              </button>
            </form>
          </section>
        )}

        {/* ERROR */}
        {!showForm && error && (
          <div className="mt-10 border-l border-[#ff3b16] pl-4 text-[13px] text-[#ff8b78]">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="py-20 editorial-label text-[#66635f]">
            Loading / COURSES
          </div>
        )}

        {/* LIST */}
        {!loading && (
          <section className="mt-10">
            {courses.length === 0 ? (
              <div className="border-t border-white/10 py-20 text-[#66635f]">
                No courses available.
              </div>
            ) : (
              courses.map((course, index) => (
                <div key={course.id} className="border-t border-white/10 py-8">
                  <div className="grid grid-cols-[80px_1fr_180px_220px] items-center gap-6">
                    {/* NUMBER */}
                    <span className="text-[12px] text-[#66635f]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>

                    {/* COURSE */}
                    <div>
                      <h2 className="text-[clamp(30px,4vw,58px)] tracking-[-0.05em]">
                        {course.name}
                      </h2>

                      {course.description && (
                        <p className="mt-3 max-w-[650px] text-[14px] leading-6 text-[#66635f]">
                          {course.description}
                        </p>
                      )}
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                      <div className="text-[20px]">
                        €{course.price.toFixed(2)}
                      </div>

                      <div
                        className={`mt-2 editorial-label ${
                          course.is_published ? "text-[#ff3b16]" : "text-[#66635f]"
                        }`}
                      >
                        {course.is_published ? "PUBLISHED" : "DRAFT"}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-6">
                      <Link
                        href={`/courses/${course.id}`}
                        className="text-[11px] uppercase tracking-[0.1em] text-[#77736f] transition-colors hover:text-[#ff3b16]"
                      >
                        View course →
                      </Link>

                      <button
                        onClick={() => startEditing(course)}
                        className="text-[11px] uppercase tracking-[0.1em] text-[#a6a3a0] transition-colors hover:text-[#ff3b16]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(course.id)}
                        disabled={deletingId === course.id}
                        className="text-[11px] uppercase tracking-[0.1em] text-[#66635f] transition-colors hover:text-[#ff3b16] disabled:opacity-40"
                      >
                        {deletingId === course.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="border-t border-white/10" />
          </section>
        )}
      </div>
    </main>
    </AuthGuard>
  );
}

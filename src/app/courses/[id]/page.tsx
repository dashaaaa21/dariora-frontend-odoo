"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";

import AuthGuard from "@/components/AuthGuard";
import { apiFetch } from "@/lib/api";

type Course = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_published: boolean;
};

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editIsPublished, setEditIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch(`/api/courses/${params.id}`);

        setCourse(data);
        setEditName(data.name);
        setEditDescription(data.description || "");
        setEditPrice(String(data.price));
        setEditIsPublished(data.is_published);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load course"
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadCourse();
    }
  }, [params.id]);

  async function handleDelete() {
    if (!course) return;

    const confirmed = window.confirm(
      `Delete "${course.name}"?`
    );

    if (!confirmed) return;

    try {
      await apiFetch(`/api/courses/${course.id}`, {
        method: "DELETE",
      });

      router.push("/courses");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete course"
      );
    }
  }

  async function handleSaveChanges(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!course) return;

    try {
      setSaving(true);
      setError("");

      const body = {
        name: editName,
        description: editDescription,
        price: Number(editPrice),
        is_published: editIsPublished,
      };

      await apiFetch(`/api/courses/${course.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      // Update local state
      setCourse({
        ...course,
        name: editName,
        description: editDescription,
        price: Number(editPrice),
        is_published: editIsPublished,
      });

      setIsEditing(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save course"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-[calc(100vh-88px)] bg-[#050505] px-6 md:px-10 pb-24 pt-[130px] text-[#f5f3f1]">
        <div className="mx-auto max-w-[1360px]">

          <Link
            href="/courses"
            className="editorial-label text-[#77736f] transition-colors hover:text-[#ff3b16]"
          >
            ← Back to courses
          </Link>

          {loading && (
            <div className="mt-20 text-sm uppercase tracking-[0.12em] text-[#66635f]">
              Loading course...
            </div>
          )}

          {error && (
            <div className="mt-20 border border-red-500/30 bg-red-500/5 p-6 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && course && (
            <section className="mt-16">

              {!isEditing ? (
                <>
                  {/* VIEW MODE */}
                  <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">

                    <div>
                      <div className="editorial-label mb-8 text-[#ff3b16]">
                        Course / {String(course.id).padStart(2, "0")}
                      </div>

                      <h1 className="display max-w-[900px] text-[clamp(64px,9vw,150px)]">
                        {course.name}
                      </h1>

                      <div className="mt-12 max-w-[720px]">
                        <p className="text-lg leading-8 text-[#a6a3a0]">
                          {course.description ||
                            "No description available for this course."}
                        </p>
                      </div>
                    </div>

                    <aside className="border-l border-white/10 pl-8">

                      <div className="mb-10">
                        <div className="editorial-label mb-3 text-[#66635f]">
                          Price
                        </div>

                        <div className="text-4xl tracking-[-0.04em]">
                          €{Number(course.price).toFixed(2)}
                        </div>
                      </div>

                      <div className="mb-10">
                        <div className="editorial-label mb-3 text-[#66635f]">
                          Status
                        </div>

                        <div
                          className={
                            course.is_published
                              ? "text-[#ff3b16]"
                              : "text-[#77736f]"
                          }
                        >
                          {course.is_published
                            ? "Published"
                            : "Draft"}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">

                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="border border-white/15 px-5 py-4 text-center text-xs uppercase tracking-[0.12em] transition-colors hover:border-[#ff3b16] hover:text-[#ff3b16]"
                        >
                          Edit course
                        </button>

                        <button
                          type="button"
                          onClick={handleDelete}
                          className="border border-red-500/30 px-5 py-4 text-xs uppercase tracking-[0.12em] text-red-400 transition-colors hover:bg-red-500/10"
                        >
                          Delete course
                        </button>

                      </div>
                    </aside>

                  </div>

                  <div className="mt-24 border-t border-white/10 pt-8">
                    <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.1em] text-[#66635f] md:flex-row md:justify-between">
                      <span>DARIORA ACADEMY</span>
                      <span>Course ID: {course.id}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* EDIT MODE */}
                  <div className="max-w-[700px]">
                    <div className="editorial-label mb-8 text-[#ff3b16]">
                      EDIT / COURSE
                    </div>

                    <form onSubmit={handleSaveChanges} className="space-y-10">

                      {/* NAME */}
                      <div>
                        <label
                          htmlFor="edit-name"
                          className="editorial-label text-[#a6a3a0]"
                        >
                          COURSE NAME
                        </label>

                        <input
                          id="edit-name"
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          required
                          className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                        />
                      </div>

                      {/* DESCRIPTION */}
                      <div>
                        <label
                          htmlFor="edit-description"
                          className="editorial-label text-[#a6a3a0]"
                        >
                          DESCRIPTION
                        </label>

                        <textarea
                          id="edit-description"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={4}
                          className="mt-3 w-full resize-none border-b border-white/20 bg-transparent px-0 py-4 text-[18px] leading-7 outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                        />
                      </div>

                      {/* PRICE */}
                      <div>
                        <label
                          htmlFor="edit-price"
                          className="editorial-label text-[#a6a3a0]"
                        >
                          PRICE / EUR
                        </label>

                        <input
                          id="edit-price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          required
                          className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                        />
                      </div>

                      {/* PUBLISHED */}
                      <label className="flex cursor-pointer items-center gap-4">
                        <input
                          type="checkbox"
                          checked={editIsPublished}
                          onChange={(e) => setEditIsPublished(e.target.checked)}
                          className="h-4 w-4 accent-[#ff3b16]"
                        />

                        <span className="editorial-label text-[#a6a3a0]">
                          PUBLISH COURSE
                        </span>
                      </label>

                      {/* ERROR */}
                      {error && (
                        <div className="border-l border-[#ff3b16] pl-4 text-[13px] leading-6 text-[#ff8b78]">
                          {error}
                        </div>
                      )}

                      {/* ACTIONS */}
                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={saving}
                          className="group flex items-center gap-4 text-[12px] uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <span className="border-b border-[#f5f3f1] pb-2 transition-colors group-hover:border-[#ff3b16] group-hover:text-[#ff3b16]">
                            {saving ? "Saving..." : "Save Changes"}
                          </span>

                          {!saving && (
                            <span className="text-[#ff3b16] transition-transform duration-300 group-hover:translate-x-2">
                              →
                            </span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="text-[12px] uppercase tracking-[0.12em] text-[#66635f] transition-colors hover:text-[#ff3b16]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}

            </section>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}

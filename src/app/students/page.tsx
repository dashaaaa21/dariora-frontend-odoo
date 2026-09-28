"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Student = {
  id: number;
  name: string;
  email: string;
  active?: boolean;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const data = await apiFetch("/api/students");
      setStudents(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function resetForm() {
    setName("");
    setEmail("");
    setActive(true);
    setEditingStudentId(null);
    setShowForm(false);
  }

  function startEditing(student: Student) {
    setEditingStudentId(student.id);
    setName(student.name);
    setEmail(student.email);
    setActive(student.active ?? true);
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
        email,
        active,
      };

      if (editingStudentId !== null) {
        await apiFetch(`/api/students/${editingStudentId}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await apiFetch("/api/students", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }

      resetForm();
      await loadStudents();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to save student.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(studentId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(studentId);
      setError("");

      await apiFetch(`/api/students/${studentId}`, {
        method: "DELETE",
      });

      await loadStudents();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete student.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#050505] text-[#f5f3f1]">
      <div className="mx-auto max-w-[1360px] px-10 py-20">

        {/* HEADER */}
        <div className="border-b border-white/10 pb-10">
          <div className="editorial-label text-[#66635f]">
            DARIORA / STUDENTS
          </div>

          <div className="mt-8 flex items-end justify-between">
            <h1 className="display text-[clamp(70px,9vw,145px)]">
              STUDENTS
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
              {showForm ? "Close ×" : "+ New Student"}
            </button>
          </div>
        </div>

        {/* FORM */}
        {showForm && (
          <section className="border-b border-white/10 py-16">
            <div className="editorial-label text-[#66635f]">
              {editingStudentId ? "EDIT / STUDENT" : "ADD / STUDENT"}
            </div>

            <form onSubmit={handleSubmit} className="mt-10 max-w-[700px]">
              {/* NAME */}
              <div>
                <label
                  htmlFor="student-name"
                  className="editorial-label text-[#a6a3a0]"
                >
                  FULL NAME
                </label>

                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                />
              </div>

              {/* EMAIL */}
              <div className="mt-10">
                <label
                  htmlFor="student-email"
                  className="editorial-label text-[#a6a3a0]"
                >
                  EMAIL
                </label>

                <input
                  id="student-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="john@example.com"
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors placeholder:text-[#44413e] focus:border-[#ff3b16]"
                />
              </div>

              {/* ACTIVE */}
              <label className="mt-10 flex cursor-pointer items-center gap-4">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                  className="h-4 w-4 accent-[#ff3b16]"
                />

                <span className="editorial-label text-[#a6a3a0]">
                  ACTIVE STUDENT
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
                    : editingStudentId
                    ? "Save Changes"
                    : "Add Student"}
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
            Loading / STUDENTS
          </div>
        )}

        {/* LIST */}
        {!loading && (
          <section className="mt-10">
            {students.length === 0 ? (
              <div className="border-t border-white/10 py-20 text-[#66635f]">
                No students available.
              </div>
            ) : (
              students.map((student, index) => (
                <div key={student.id} className="border-t border-white/10 py-8">
                  <div className="grid grid-cols-[80px_1fr_300px_150px_220px] items-center gap-6">
                    {/* NUMBER */}
                    <span className="text-[12px] text-[#66635f]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>

                    {/* NAME */}
                    <div>
                      <h2 className="text-[clamp(30px,4vw,58px)] tracking-[-0.05em]">
                        {student.name}
                      </h2>
                    </div>

                    {/* EMAIL */}
                    <div className="text-[#a6a3a0]">
                      <p className="text-[14px] break-all">{student.email}</p>
                    </div>

                    {/* STATUS */}
                    <div
                      className={`text-right editorial-label ${
                        student.active ? "text-[#ff3b16]" : "text-[#66635f]"
                      }`}
                    >
                      {student.active ? "ACTIVE" : "INACTIVE"}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-6">
                      <button
                        onClick={() => startEditing(student)}
                        className="text-[11px] uppercase tracking-[0.1em] text-[#a6a3a0] transition-colors hover:text-[#ff3b16]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
                        disabled={deletingId === student.id}
                        className="text-[11px] uppercase tracking-[0.1em] text-[#66635f] transition-colors hover:text-[#ff3b16] disabled:opacity-40"
                      >
                        {deletingId === student.id ? "Deleting..." : "Delete"}
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
  );
}

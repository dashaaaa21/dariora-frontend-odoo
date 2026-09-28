"use client";

import { useEffect, useState } from "react";

import AuthGuard from "@/components/AuthGuard";
import { apiFetch } from "@/lib/api";

type Student = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const data = await apiFetch("/api/students");

      setStudents(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load students"
      );
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
    setEditingStudent(null);
    setError("");
  }

  function startEditing(student: Student) {
    setEditingStudent(student);

    setName(student.name);
    setEmail(student.email);
    setActive(student.active);

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    resetForm();
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingStudent) {
        const updatedStudent = await apiFetch(
          `/api/students/${editingStudent.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              active,
            }),
          }
        );

        setStudents((currentStudents) =>
          currentStudents.map((student) =>
            student.id === updatedStudent.id
              ? updatedStudent
              : student
          )
        );

        setSuccess("Student updated successfully.");
      } else {
        const newStudent = await apiFetch(
          "/api/students",
          {
            method: "POST",
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              active,
            }),
          }
        );

        setStudents((currentStudents) => [
          ...currentStudents,
          newStudent,
        ]);

        setSuccess("Student created successfully.");
      }

      resetForm();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(student: Student) {
    const confirmed = window.confirm(
      `Delete "${student.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await apiFetch(
        `/api/students/${student.id}`,
        {
          method: "DELETE",
        }
      );

      setStudents((currentStudents) =>
        currentStudents.filter(
          (item) => item.id !== student.id
        )
      );

      if (editingStudent?.id === student.id) {
        resetForm();
      }

      setSuccess("Student deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete student"
      );
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-[calc(100vh-88px)] bg-[#050505] px-10 pb-24 pt-[130px] text-[#f5f3f1]">

        <div className="mx-auto max-w-[1360px]">

          {/* HEADER */}

          <div className="mb-16 border-b border-white/10 pb-8">

            <div className="editorial-label mb-6 text-[#ff3b16]">
              DARIORA / Students
            </div>

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <div>
                <h1 className="display text-[clamp(64px,9vw,140px)]">
                  Students
                </h1>

                <p className="mt-6 max-w-[600px] text-[#77736f]">
                  Manage students enrolled in Dariora Academy.
                </p>
              </div>

              <div className="text-right">

                <div className="editorial-label text-[#66635f]">
                  Total students
                </div>

                <div className="mt-2 text-4xl tracking-[-0.04em]">
                  {students.length}
                </div>

              </div>

            </div>
          </div>

          {/* MESSAGES */}

          {error && (
            <div className="mb-8 border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-8 border border-[#ff3b16]/30 bg-[#ff3b16]/5 p-5 text-sm text-[#ff3b16]">
              {success}
            </div>
          )}

          {/* FORM */}

          <section className="mb-20 max-w-[900px]">

            <div className="editorial-label mb-8 text-[#66635f]">
              {editingStudent
                ? "Edit student"
                : "Add student"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* NAME */}

              <div>
                <label className="editorial-label mb-3 block text-[#77736f]">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Student name"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-2xl outline-none transition-colors placeholder:text-[#333230] focus:border-[#ff3b16]"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="editorial-label mb-3 block text-[#77736f]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="student@example.com"
                  className="w-full border-b border-white/20 bg-transparent px-0 py-4 text-2xl outline-none transition-colors placeholder:text-[#333230] focus:border-[#ff3b16]"
                />
              </div>

              {/* ACTIVE */}

              <div>

                <label className="editorial-label mb-3 block text-[#77736f]">
                  Status
                </label>

                <button
                  type="button"
                  onClick={() => setActive(!active)}
                  className="flex w-full items-center justify-between border border-white/15 px-5 py-4 text-left transition-colors hover:border-[#ff3b16]"
                >

                  <span className="text-sm">
                    {active
                      ? "Active"
                      : "Inactive"}
                  </span>

                  <span
                    className={
                      active
                        ? "h-3 w-3 rounded-full bg-[#ff3b16]"
                        : "h-3 w-3 rounded-full border border-[#77736f]"
                    }
                  />

                </button>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#ff3b16] px-8 py-4 text-xs uppercase tracking-[0.12em] text-[#050505] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingStudent
                    ? "Save changes"
                    : "Create student"}
                </button>

                {editingStudent && (
                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={saving}
                    className="border border-white/15 px-8 py-4 text-xs uppercase tracking-[0.12em] transition-colors hover:border-white/40"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>
          </section>

          {/* STUDENTS LIST */}

          <section>

            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">

              <div className="editorial-label text-[#66635f]">
                Student directory
              </div>

              <div className="editorial-label text-[#66635f]">
                {students.length} records
              </div>

            </div>

            {loading ? (
              <div className="py-16 text-sm uppercase tracking-[0.12em] text-[#66635f]">
                Loading students...
              </div>
            ) : students.length === 0 ? (
              <div className="border border-white/10 py-20 text-center">

                <div className="editorial-label text-[#66635f]">
                  No students
                </div>

                <p className="mt-4 text-sm text-[#77736f]">
                  Create the first student above.
                </p>

              </div>
            ) : (
              <div className="divide-y divide-white/10">

                {students.map((student) => (
                  <article
                    key={student.id}
                    className="group grid grid-cols-1 gap-6 py-8 md:grid-cols-[80px_1fr_1fr_140px_180px] md:items-center"
                  >

                    {/* ID */}

                    <div className="editorial-label text-[#44423f]">
                      {String(student.id).padStart(2, "0")}
                    </div>

                    {/* NAME */}

                    <div>

                      <div className="text-xl tracking-[-0.02em]">
                        {student.name}
                      </div>

                    </div>

                    {/* EMAIL */}

                    <div className="text-sm text-[#77736f]">
                      {student.email}
                    </div>

                    {/* STATUS */}

                    <div>

                      <span
                        className={
                          student.active
                            ? "inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#ff3b16]"
                            : "inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#66635f]"
                        }
                      >

                        <span
                          className={
                            student.active
                              ? "h-1.5 w-1.5 rounded-full bg-[#ff3b16]"
                              : "h-1.5 w-1.5 rounded-full bg-[#55524f]"
                          }
                        />

                        {student.active
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex gap-4 md:justify-end">

                      <button
                        type="button"
                        onClick={() =>
                          startEditing(student)
                        }
                        className="text-xs uppercase tracking-[0.1em] text-[#77736f] transition-colors hover:text-[#f5f3f1]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(student)
                        }
                        className="text-xs uppercase tracking-[0.1em] text-red-400 transition-colors hover:text-red-300"
                      >
                        Delete
                      </button>

                    </div>

                  </article>
                ))}

              </div>
            )}

          </section>

        </div>
      </main>
    </AuthGuard>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

type Course = {
  id: number;
  name: string;
};

type Student = {
  id: number;
  name: string;
};

type Enrollment = {
  id: number;
  student_id: number;
  student_name: string;
  course_id: number;
  course_name: string;
  enrollment_date: string;
  status: string;
};

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState<number | null>(
    null
  );

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [status, setStatus] = useState("active");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [enrollmentsData, studentsData, coursesData] = await Promise.all([
        apiFetch("/api/enrollments"),
        apiFetch("/api/students"),
        apiFetch("/api/courses"),
      ]);

      setEnrollments(enrollmentsData);
      setStudents(studentsData);
      setCourses(coursesData);
    } catch (error) {
      console.error(error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setStudentId("");
    setCourseId("");
    setStatus("active");
    setEditingEnrollmentId(null);
    setShowForm(false);
  }

  function startEditing(enrollment: Enrollment) {
    setEditingEnrollmentId(enrollment.id);
    setStudentId(String(enrollment.student_id));
    setCourseId(String(enrollment.course_id));
    setStatus(enrollment.status);
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
        student_id: Number(studentId),
        course_id: Number(courseId),
        status,
      };

      if (editingEnrollmentId !== null) {
        await apiFetch(`/api/enrollments/${editingEnrollmentId}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await apiFetch("/api/enrollments", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }

      resetForm();
      await loadData();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to save enrollment.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(enrollmentId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enrollment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(enrollmentId);
      setError("");

      await apiFetch(`/api/enrollments/${enrollmentId}`, {
        method: "DELETE",
      });

      await loadData();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete enrollment.");
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
            DARIORA / ENROLLMENTS
          </div>

          <div className="mt-8 flex items-end justify-between">
            <h1 className="display text-[clamp(70px,9vw,145px)]">
              ENROLLMENTS
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
              {showForm ? "Close ×" : "+ New Enrollment"}
            </button>
          </div>
        </div>

        {/* FORM */}
        {showForm && (
          <section className="border-b border-white/10 py-16">
            <div className="editorial-label text-[#66635f]">
              {editingEnrollmentId
                ? "EDIT / ENROLLMENT"
                : "CREATE / ENROLLMENT"}
            </div>

            <form onSubmit={handleSubmit} className="mt-10 max-w-[700px]">
              {/* STUDENT */}
              <div>
                <label
                  htmlFor="enrollment-student"
                  className="editorial-label text-[#a6a3a0]"
                >
                  STUDENT
                </label>

                <select
                  id="enrollment-student"
                  value={studentId}
                  onChange={(event) => setStudentId(event.target.value)}
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors focus:border-[#ff3b16]"
                >
                  <option value="">-- Select Student --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* COURSE */}
              <div className="mt-10">
                <label
                  htmlFor="enrollment-course"
                  className="editorial-label text-[#a6a3a0]"
                >
                  COURSE
                </label>

                <select
                  id="enrollment-course"
                  value={courseId}
                  onChange={(event) => setCourseId(event.target.value)}
                  required
                  className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors focus:border-[#ff3b16]"
                >
                  <option value="">-- Select Course --</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}
              <div className="mt-10">
                <label
                  htmlFor="enrollment-status"
                  className="editorial-label text-[#a6a3a0]"
                >
                  STATUS
                </label>

                <select
                  id="enrollment-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="mt-3 w-full border-b border-white/20 bg-transparent px-0 py-4 text-[20px] outline-none transition-colors focus:border-[#ff3b16]"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

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
                    : editingEnrollmentId
                    ? "Save Changes"
                    : "Create Enrollment"}
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
            Loading / ENROLLMENTS
          </div>
        )}

        {/* LIST */}
        {!loading && (
          <section className="mt-10">
            {enrollments.length === 0 ? (
              <div className="border-t border-white/10 py-20 text-[#66635f]">
                No enrollments available.
              </div>
            ) : (
              enrollments.map((enrollment, index) => (
                <div
                  key={enrollment.id}
                  className="border-t border-white/10 py-8"
                >
                  <div className="grid grid-cols-[80px_1fr_1fr_200px_200px] items-center gap-6">
                    {/* NUMBER */}
                    <span className="text-[12px] text-[#66635f]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>

                    {/* STUDENT */}
                    <div>
                      <p className="text-[clamp(20px,3vw,36px)]">
                        {enrollment.student_name}
                      </p>
                    </div>

                    {/* COURSE */}
                    <div>
                      <p className="text-[clamp(20px,3vw,36px)] text-[#a6a3a0]">
                        {enrollment.course_name}
                      </p>
                    </div>

                    {/* DATE & STATUS */}
                    <div>
                      <p className="text-[12px] text-[#66635f]">
                        {new Date(enrollment.enrollment_date).toLocaleDateString()}
                      </p>
                      <p
                        className={`mt-2 editorial-label ${
                          enrollment.status === "completed"
                            ? "text-[#ff3b16]"
                            : "text-[#66635f]"
                        }`}
                      >
                        {enrollment.status}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-6">
                      <button
                        onClick={() => startEditing(enrollment)}
                        className="text-[11px] uppercase tracking-[0.1em] text-[#a6a3a0] transition-colors hover:text-[#ff3b16]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(enrollment.id)}
                        disabled={deletingId === enrollment.id}
                        className="text-[11px] uppercase tracking-[0.1em] text-[#66635f] transition-colors hover:text-[#ff3b16] disabled:opacity-40"
                      >
                        {deletingId === enrollment.id
                          ? "Deleting..."
                          : "Delete"}
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

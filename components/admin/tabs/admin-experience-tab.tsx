"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Edit2, Loader2, CheckCircle2, X, Briefcase } from "lucide-react";
import { toast } from "sonner";
import {
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
} from "@/app/admin/actions/crud";
import type { Experience } from "@/lib/types";

interface AdminExperienceTabProps {
  experiences: Experience[];
}

export function AdminExperienceTab({ experiences }: AdminExperienceTabProps) {
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        if (editingExp) {
          await updateExperienceAction(editingExp.id, formData);
          toast.success("Experience updated!");
          setEditingExp(null);
        } else {
          await createExperienceAction(formData);
          toast.success("New experience added!");
          setIsAddingNew(false);
        }
      } catch (err: any) {
        toast.error(err.message || "Operation failed");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this experience record?")) return;

    startTransition(async () => {
      try {
        await deleteExperienceAction(id);
        toast.success("Experience record deleted");
      } catch (err: any) {
        toast.error(err.message || "Failed to delete");
      }
    });
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Work Experience Manager</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Add, update, reorder and highlight your career timeline achievements.
          </p>
        </div>
        {!isAddingNew && !editingExp && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-4 py-2.5 text-sm font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Experience
          </button>
        )}
      </div>

      {/* Modal / Form for Add / Edit */}
      {(isAddingNew || editingExp) && (
        <div className="bento-card p-6 border-amber-500/30 shadow-2xs">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-200">
              {editingExp ? `Edit: ${editingExp.company} (${editingExp.role})` : "Add New Experience"}
            </h3>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingExp(null);
              }}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  defaultValue={editingExp?.company || ""}
                  required
                  placeholder="e.g. App in Snap"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Role Title</label>
                <input
                  type="text"
                  name="role"
                  defaultValue={editingExp?.role || ""}
                  required
                  placeholder="e.g. Sr. React Developer"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  defaultValue={editingExp?.startDate || ""}
                  required
                  placeholder="e.g. Aug 2023"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">End Date</label>
                <input
                  type="text"
                  name="endDate"
                  defaultValue={editingExp?.endDate || "Present"}
                  required
                  placeholder="e.g. Present or Aug 2023"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingExp?.location || "Islamabad, Pakistan"}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Short Summary</label>
              <input
                type="text"
                name="description"
                defaultValue={editingExp?.description || ""}
                placeholder="High-level mission / responsibilities"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">
                Accomplishments (One bullet per line)
              </label>
              <textarea
                name="achievements"
                rows={5}
                defaultValue={editingExp?.achievements ? editingExp.achievements.join("\n") : ""}
                placeholder="Architect and scale enterprise-grade banking application interfaces..."
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                name="techStack"
                defaultValue={editingExp?.techStack ? editingExp.techStack.join(", ") : ""}
                placeholder="React.js, Next.js, TypeScript, Tailwind CSS"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingExp?.order ?? 0}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Visibility</label>
                <select
                  name="visible"
                  defaultValue={editingExp?.visible ? "true" : "false"}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="true">Visible on Portfolio</option>
                  <option value="false">Hidden / Draft</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingExp(null);
                }}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-5 py-2 text-sm font-semibold shadow-xs disabled:opacity-50 cursor-pointer transition-colors"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                {editingExp ? "Save Changes" : "Create Record"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bento-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{exp.role}</h4>
                  <span className="text-zinc-500 dark:text-zinc-400">at</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">{exp.company}</span>
                  {!exp.visible && (
                    <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
                  {exp.startDate} – {exp.endDate} · {exp.location}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {exp.techStack.slice(0, 5).map((tech) => (
                    <span key={tech} className="tech-chip text-[11px] py-0">
                      {tech}
                    </span>
                  ))}
                  {exp.techStack.length > 5 && (
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 self-center">
                      +{exp.techStack.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => {
                  setEditingExp(exp);
                  setIsAddingNew(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                title="Edit Experience"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                disabled={isPending}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-600 dark:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Delete Experience"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

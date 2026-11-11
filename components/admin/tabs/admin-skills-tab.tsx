"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Edit2, Loader2, CheckCircle2, X, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  createSkillAction,
  updateSkillAction,
  deleteSkillAction,
} from "@/app/admin/actions/crud";
import type { Skill } from "@/lib/types";

interface AdminSkillsTabProps {
  skills: Skill[];
}

const CATEGORIES = [
  "Frontend",
  "Backend",
  "DevOps",
  "Mobile",
  "Architecture",
  "State Management",
];

export function AdminSkillsTab({ skills }: AdminSkillsTabProps) {
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        if (editingSkill) {
          await updateSkillAction(editingSkill.id, formData);
          toast.success("Skill updated!");
          setEditingSkill(null);
        } else {
          await createSkillAction(formData);
          toast.success("Skill added!");
          setIsAddingNew(false);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to save skill");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this skill?")) return;

    startTransition(async () => {
      try {
        await deleteSkillAction(id);
        toast.success("Skill removed");
      } catch (err: any) {
        toast.error(err.message || "Failed to delete");
      }
    });
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Skills & Tech Stack</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Categorized proficiency rankings, frameworks, and engineering methodologies.
          </p>
        </div>
        {!isAddingNew && !editingSkill && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-4 py-2.5 text-sm font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Skill
          </button>
        )}
      </div>

      {(isAddingNew || editingSkill) && (
        <div className="bento-card p-6 border-amber-500/30 shadow-2xs">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-200">
              {editingSkill ? `Edit: ${editingSkill.name}` : "Add New Skill"}
            </h3>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingSkill(null);
              }}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="skill-name" className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Skill / Tech Name</label>
                <input
                  id="skill-name"
                  type="text"
                  name="name"
                  defaultValue={editingSkill?.name || ""}
                  required
                  placeholder="e.g. Next.js, Redux Toolkit"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label htmlFor="skill-category" className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Category</label>
                <select
                  id="skill-category"
                  name="category"
                  defaultValue={editingSkill?.category || "Frontend"}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="skill-level" className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Proficiency Level (0-100%)</label>
                <input
                  id="skill-level"
                  type="number"
                  name="level"
                  min="1"
                  max="100"
                  defaultValue={editingSkill?.level ?? 90}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label htmlFor="skill-order" className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Sort Order</label>
                <input
                  id="skill-order"
                  type="number"
                  name="order"
                  defaultValue={editingSkill?.order ?? 0}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label htmlFor="skill-visible" className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Visibility</label>
                <select
                  id="skill-visible"
                  name="visible"
                  defaultValue={editingSkill?.visible !== false ? "true" : "false"}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="true">Visible on Portfolio</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingSkill(null);
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
                {editingSkill ? "Update Skill" : "Add Skill"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categorized Skills View */}
      <div className="space-y-6">
        {CATEGORIES.map((category) => {
          const catSkills = skills.filter((s) => s.category === category);
          if (catSkills.length === 0) return null;

          return (
            <div key={category} className="bento-card p-5 shadow-2xs">
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                {category} ({catSkills.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {catSkills.map((sk) => (
                  <div
                    key={sk.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/40 p-3 hover:border-amber-400 dark:hover:border-zinc-700 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{sk.name}</p>
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{sk.level}%</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingSkill(sk);
                          setIsAddingNew(false);
                        }}
                        className="p-1 rounded text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(sk.id)}
                        disabled={isPending}
                        className="p-1 rounded text-red-600 dark:text-red-400 hover:bg-red-500/10 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

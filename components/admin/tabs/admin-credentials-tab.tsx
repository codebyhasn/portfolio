"use client";

import { useState, useTransition } from "react";
import {
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  CheckCircle2,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import {
  createCredentialAction,
  updateCredentialAction,
  deleteCredentialAction,
  toggleCredentialVisibilityAction,
  reorderCredentialsAction,
} from "@/app/admin/actions/crud";
import type { Credential } from "@/lib/types";

interface AdminCredentialsTabProps {
  credentials: Credential[];
}

export function AdminCredentialsTab({ credentials: initialCredentials }: AdminCredentialsTabProps) {
  const [credentials, setCredentials] = useState<Credential[]>(initialCredentials);
  const [editingCred, setEditingCred] = useState<Credential | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Optimistic toggle visibility
  const handleToggleVisibility = (id: number, currentVisible: boolean) => {
    const nextStatus = !currentVisible;
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: nextStatus } : c))
    );

    startTransition(async () => {
      try {
        await toggleCredentialVisibilityAction(id);
        toast.success(nextStatus ? "Credential is now visible." : "Credential hidden from public view.");
      } catch (err: any) {
        toast.error(err.message || "Failed to update visibility");
        // rollback
        setCredentials((prev) =>
          prev.map((c) => (c.id === id ? { ...c, visible: currentVisible } : c))
        );
      }
    });
  };

  // Move up / down
  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= credentials.length) return;

    const reordered = [...credentials];
    const [movedItem] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, movedItem);

    const updatedWithOrder = reordered.map((item, i) => ({
      ...item,
      order: i,
    }));

    setCredentials(updatedWithOrder);

    startTransition(async () => {
      try {
        await reorderCredentialsAction(
          updatedWithOrder.map((item) => ({ id: item.id, order: item.order }))
        );
        toast.success("Order updated.");
      } catch (err: any) {
        toast.error("Failed to reorder credentials");
      }
    });
  };

  // Save add / edit form
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        if (editingCred) {
          await updateCredentialAction(editingCred.id, formData);
          toast.success("Credential updated successfully!");
          setEditingCred(null);
        } else {
          await createCredentialAction(formData);
          toast.success("New credential created!");
          setIsAddingNew(false);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to save credential");
      }
    });
  };

  // Delete
  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    startTransition(async () => {
      try {
        await deleteCredentialAction(id);
        setCredentials((prev) => prev.filter((c) => c.id !== id));
        toast.success("Credential deleted.");
      } catch (err: any) {
        toast.error(err.message || "Failed to delete credential");
      }
    });
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#111111]/12 dark:border-zinc-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#D9541E]" />
            <span>Credentials &amp; Education Manager</span>
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Edit university degrees, Coursera/industry certifications, issue dates, descriptions, and verification links.
          </p>
        </div>
        {!isAddingNew && !editingCred && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 rounded-xl bg-[#D9541E] hover:bg-[#bf4615] text-white px-4 py-2.5 text-sm font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Credential
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal Card */}
      {(isAddingNew || editingCred) && (
        <div className="bento-card p-6 border-l-4 border-l-[#D9541E] shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-[#D9541E]/10 text-[#D9541E]">
                {editingCred ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {editingCred ? `Edit: ${editingCred.title}` : "Add New Academic Degree or Certification"}
              </h3>
            </div>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingCred(null);
              }}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer p-1 rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cred-title" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Degree / Certification Title *
                </label>
                <input
                  id="cred-title"
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  defaultValue={editingCred?.title || ""}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>

              <div>
                <label htmlFor="cred-issuer" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Issuer / Institution *
                </label>
                <input
                  id="cred-issuer"
                  type="text"
                  name="issuer"
                  required
                  placeholder="e.g. COMSATS University Islamabad, Wah Campus"
                  defaultValue={editingCred?.issuer || ""}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>

              <div>
                <label htmlFor="cred-type" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Category Type *
                </label>
                <select
                  id="cred-type"
                  name="type"
                  defaultValue={editingCred?.type || "Education"}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                >
                  <option value="Education">Education (University Degree / Diploma)</option>
                  <option value="Certification">Certification (Coursera / Industry Badge)</option>
                  <option value="Specialization">Specialization</option>
                  <option value="Honor">Honor &amp; Award</option>
                </select>
              </div>

              <div>
                <label htmlFor="cred-period" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Period / Completion Date *
                </label>
                <input
                  id="cred-period"
                  type="text"
                  name="period"
                  required
                  placeholder="e.g. Feb 2015 — Jan 2019 or Verified Credential"
                  defaultValue={editingCred?.period || ""}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cred-url" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Verification / Certificate URL (Optional)
                </label>
                <input
                  id="cred-url"
                  type="url"
                  name="url"
                  placeholder="https://coursera.org/verify/..."
                  defaultValue={editingCred?.url || ""}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cred-description" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Description / Curriculum Highlights *
                </label>
                <textarea
                  id="cred-description"
                  name="description"
                  required
                  rows={3}
                  placeholder="Summary of coursework, specialization topics, technologies mastered, or honors received..."
                  defaultValue={editingCred?.description || ""}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>

              <div>
                <label htmlFor="cred-order" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Sort Order
                </label>
                <input
                  id="cred-order"
                  type="number"
                  name="order"
                  defaultValue={editingCred?.order ?? credentials.length}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#D9541E]"
                />
              </div>

              <div className="flex items-center pt-6">
                <label htmlFor="cred-visible" className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  <input
                    id="cred-visible"
                    type="checkbox"
                    name="visible"
                    value="true"
                    defaultChecked={editingCred ? editingCred.visible : true}
                    className="h-4 w-4 rounded text-[#D9541E] focus:ring-[#D9541E]"
                  />
                  <span>Visible on Public Portfolio</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingCred(null);
                }}
                className="px-4 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-[#D9541E] hover:bg-[#bf4615] text-white font-semibold cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{editingCred ? "Save Changes" : "Create Credential"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of Credentials */}
      <div className="space-y-4">
        {credentials.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8">
            <GraduationCap className="h-10 w-10 text-zinc-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">No credentials added yet</p>
            <p className="text-xs text-zinc-500 mt-1">Add your degree or certifications above to get started.</p>
          </div>
        ) : (
          credentials.map((cred, index) => (
            <div
              key={cred.id}
              className={`editorial-card p-5 border transition-all ${
                cred.visible
                  ? "border-[#111111]/12 dark:border-zinc-800 bg-white dark:bg-[#111319]"
                  : "border-dashed border-zinc-300 dark:border-zinc-800 opacity-60 bg-zinc-50/60 dark:bg-zinc-950/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 text-zinc-400 pt-1 shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, "up")}
                      className="hover:text-zinc-800 dark:hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                      title="Move Up"
                    >
                      <MoveUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === credentials.length - 1}
                      onClick={() => handleMove(index, "down")}
                      className="hover:text-zinc-800 dark:hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                      title="Move Down"
                    >
                      <MoveDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Icon badge */}
                  <div className="p-2.5 rounded-lg bg-[#ebe5d8]/80 dark:bg-zinc-800 text-[#D9541E] shrink-0 mt-0.5">
                    {cred.type === "Education" ? (
                      <GraduationCap className="h-5 w-5" />
                    ) : (
                      <Award className="h-5 w-5" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ebe5d8]/80 dark:bg-zinc-800 text-[#111111] dark:text-zinc-200">
                        {cred.type}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">
                        {cred.period}
                      </span>
                      {!cred.visible && (
                        <span className="font-mono text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          [ HIDDEN ]
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg text-zinc-950 dark:text-zinc-50 font-normal leading-snug">
                      {cred.title}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-[#D9541E] dark:text-[#E05D27]">
                      {cred.issuer}
                    </p>
                    <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 pt-1 leading-relaxed max-w-2xl">
                      {cred.description}
                    </p>

                    {cred.url && (
                      <div className="pt-1.5">
                        <a
                          href={cred.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[11px] text-[#D9541E] hover:underline"
                        >
                          <span>{cred.url}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-start shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(cred.id, cred.visible)}
                    className={`p-2 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                      cred.visible
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20"
                        : "border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                    title={cred.visible ? "Hide from public view" : "Show on public view"}
                  >
                    {cred.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingCred(cred);
                      setIsAddingNew(false);
                    }}
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                    title="Edit Credential"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(cred.id, cred.title)}
                    className="p-2 rounded-lg border border-red-200 dark:border-red-900/40 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer transition-colors"
                    title="Delete Credential"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


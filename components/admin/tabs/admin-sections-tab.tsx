"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Edit2,
  Trash2,
  Plus,
  Check,
  X,
  ExternalLink,
  Hash,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  toggleNavSectionAction,
  updateNavSectionAction,
  createNavSectionAction,
  deleteNavSectionAction,
  reorderNavSectionsAction,
} from "@/app/admin/actions/crud";
import type { NavSection } from "@/lib/types";

interface AdminSectionsTabProps {
  navSections: NavSection[];
}

export function AdminSectionsTab({ navSections }: AdminSectionsTabProps) {
  const [sections, setSections] = useState<NavSection[]>(navSections);
  const [editingSection, setEditingSection] = useState<NavSection | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activeCount = sections.filter((s) => s.isActive).length;
  const inactiveCount = sections.length - activeCount;

  // Toggle active/inactive with optimistic update
  const handleToggleActive = (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: newStatus } : s))
    );

    startTransition(async () => {
      try {
        await toggleNavSectionAction(id, newStatus);
        toast.success(
          newStatus
            ? "Section activated and visible on public site."
            : "Section deactivated and hidden from public site."
        );
      } catch {
        // Rollback on error
        setSections((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isActive: currentStatus } : s))
        );
        toast.error("Failed to update section visibility.");
      }
    });
  };

  // Move order up or down
  const handleMoveOrder = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);

    // Re-assign order numbers sequentially
    const updated = newSections.map((item, idx) => ({
      ...item,
      order: idx + 1,
      number: (idx + 1).toString().padStart(2, "0"),
    }));

    setSections(updated);

    startTransition(async () => {
      try {
        await reorderNavSectionsAction(
          updated.map((item) => ({
            id: item.id,
            order: item.order,
            number: item.number,
          }))
        );
        toast.success("Navigation order updated.");
      } catch {
        toast.error("Failed to reorder sections.");
      }
    });
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSection) return;

    const formData = new FormData(e.currentTarget);
    formData.append("id", editingSection.id);

    startTransition(async () => {
      try {
        await updateNavSectionAction(formData);
        toast.success("Section configuration saved.");
        setEditingSection(null);
      } catch {
        toast.error("Failed to save changes.");
      }
    });
  };

  // Handle Create Submit
  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("order", (sections.length + 1).toString());

    startTransition(async () => {
      try {
        await createNavSectionAction(formData);
        toast.success("New navigation section added.");
        setIsCreating(false);
      } catch {
        toast.error("Failed to add section.");
      }
    });
  };

  // Handle Delete
  const handleDelete = (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete the "${label}" section entry?`)) {
      return;
    }

    setSections((prev) => prev.filter((s) => s.id !== id));

    startTransition(async () => {
      try {
        await deleteNavSectionAction(id);
        toast.success(`"${label}" section deleted.`);
      } catch {
        toast.error("Failed to delete section.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Metric Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#111111]/12 dark:border-white/10 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-normal text-[#111111] dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#D9541E]" />
            <span>Navigation &amp; Section Visibility</span>
          </h2>
          <p className="font-mono text-xs text-[#555555] dark:text-zinc-400 mt-1">
            Control which sections appear on the public site and their display order in the navbar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#D9541E] hover:bg-[#bf4615] text-white px-3.5 py-2 text-xs font-mono font-medium shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Custom Section</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="rounded-xl border border-[#111111]/12 dark:border-white/10 bg-white dark:bg-[#14161c] p-4 shadow-2xs">
          <p className="text-[10px] text-[#555555] uppercase tracking-wider">Total Configured</p>
          <p className="text-2xl font-bold text-[#111111] dark:text-zinc-100 mt-1">
            {sections.length}
          </p>
          <p className="text-[11px] text-[#555555] mt-1 font-sans">
            Modular layout sections wired to database
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-2xs">
          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Active / Live on Site
          </p>
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-2">
            <span>{activeCount}</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </p>
          <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 mt-1 font-sans">
            Visible in masthead and rendered on page
          </p>
        </div>

        <div className="rounded-xl border border-[#111111]/12 dark:border-white/10 bg-[#ebe5d8]/40 dark:bg-[#1a1d24] p-4 shadow-2xs">
          <p className="text-[10px] text-[#555555] dark:text-zinc-400 uppercase tracking-wider">
            Inactive / Hidden
          </p>
          <p className="text-2xl font-bold text-[#555555] dark:text-zinc-300 mt-1">
            {inactiveCount}
          </p>
          <p className="text-[11px] text-[#555555] dark:text-zinc-400 mt-1 font-sans">
            Completely omitted from navbar &amp; public DOM
          </p>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {sections.map((section, index) => {
          const isFirst = index === 0;
          const isLast = index === sections.length - 1;

          return (
            <motion.div
              key={section.id}
              layout
              className={`rounded-xl border transition-all p-4 ${
                section.isActive
                  ? "border-[#111111]/12 dark:border-white/10 bg-white dark:bg-[#14161c] shadow-2xs"
                  : "border-dashed border-[#111111]/15 dark:border-white/10 bg-[#faf8f4]/60 dark:bg-[#111319]/60 opacity-75"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Reorder, Number & Label */}
                <div className="flex items-center gap-3">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      disabled={isFirst || isPending}
                      onClick={() => handleMoveOrder(index, "up")}
                      className="p-1 rounded text-[#555555] hover:text-[#111111] dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#ebe5d8] dark:hover:bg-zinc-800 transition-colors"
                      title="Move Up"
                    >
                      <MoveUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast || isPending}
                      onClick={() => handleMoveOrder(index, "down")}
                      className="p-1 rounded text-[#555555] hover:text-[#111111] dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#ebe5d8] dark:hover:bg-zinc-800 transition-colors"
                      title="Move Down"
                    >
                      <MoveDown className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Section Number Badge */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#111111]/12 dark:border-white/10 bg-[#ebe5d8]/80 dark:bg-zinc-800 font-mono text-xs font-bold text-[#111111] dark:text-zinc-200">
                    {section.number}
                  </span>

                  {/* Label & Technical Key */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-serif text-lg font-normal text-[#111111] dark:text-zinc-100">
                        {section.label}
                      </p>
                      {section.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">
                          <Eye className="h-3 w-3" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-[#ebe5d8] dark:bg-zinc-800 border border-[#111111]/10 dark:border-white/10 px-2 py-0.5 text-[10px] font-mono text-[#555555] dark:text-zinc-400 font-medium">
                          <EyeOff className="h-3 w-3" />
                          <span>HIDDEN</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#555555] dark:text-zinc-400 mt-0.5">
                      <span>key: <code className="text-[#D9541E] dark:text-[#E05D27]">{section.key}</code></span>
                      <span>•</span>
                      <span>anchor: <code>{section.targetId}</code></span>
                      <span>•</span>
                      <span>order: {section.order}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Toggle Switch & Actions */}
                <div className="flex items-center gap-3 self-end sm:self-center font-mono text-xs">
                  {/* Public Visibility Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(section.id, section.isActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      section.isActive ? "bg-[#D9541E]" : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                    role="switch"
                    aria-checked={section.isActive}
                    title={section.isActive ? "Click to Hide Section" : "Click to Show Section"}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        section.isActive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>

                  {/* Edit Config */}
                  <button
                    type="button"
                    onClick={() => setEditingSection(section)}
                    className="p-1.5 rounded-lg border border-[#111111]/12 dark:border-white/10 text-[#555555] hover:text-[#111111] dark:hover:text-zinc-100 hover:border-[#D9541E] transition-colors cursor-pointer"
                    title="Edit Section Details"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Delete (if non-core or custom) */}
                  <button
                    type="button"
                    onClick={() => handleDelete(section.id, section.label)}
                    className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Section"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Section Modal */}
      <AnimatePresence>
        {editingSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingSection(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-[#111111]/12 dark:border-white/10 bg-white dark:bg-[#14161c] p-6 shadow-xl font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#111111]/10 dark:border-white/10 pb-3 mb-5">
                <h3 className="font-serif text-xl font-normal text-[#111111] dark:text-zinc-100">
                  Edit Section: {editingSection.label}
                </h3>
                <button
                  onClick={() => setEditingSection(null)}
                  className="p-1 rounded text-[#555555] hover:text-[#111111] dark:hover:text-zinc-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                      Prefix Number
                    </label>
                    <input
                      name="number"
                      defaultValue={editingSection.number}
                      required
                      placeholder="01"
                      className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                      Display Order
                    </label>
                    <input
                      name="order"
                      type="number"
                      defaultValue={editingSection.order}
                      required
                      className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                    Navbar Label
                  </label>
                  <input
                    name="label"
                    defaultValue={editingSection.label}
                    required
                    placeholder="e.g. Architecture"
                    className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                      System Key
                    </label>
                    <input
                      name="key"
                      defaultValue={editingSection.key}
                      required
                      placeholder="architecture"
                      className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                      Target Anchor ID
                    </label>
                    <input
                      name="targetId"
                      defaultValue={editingSection.targetId}
                      required
                      placeholder="#architecture"
                      className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="editIsActive"
                    name="isActive"
                    value="true"
                    defaultChecked={editingSection.isActive}
                    className="h-4 w-4 rounded border-[#111111]/20 accent-[#D9541E]"
                  />
                  <label htmlFor="editIsActive" className="text-xs text-[#111111] dark:text-zinc-200 cursor-pointer">
                    Active / Displayed on public portfolio
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#111111]/10 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 rounded-lg border border-[#111111]/12 text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2 rounded-lg bg-[#D9541E] hover:bg-[#bf4615] text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Section Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreating(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-[#111111]/12 dark:border-white/10 bg-white dark:bg-[#14161c] p-6 shadow-xl font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#111111]/10 dark:border-white/10 pb-3 mb-5">
                <h3 className="font-serif text-xl font-normal text-[#111111] dark:text-zinc-100">
                  Add Custom Navigation Section
                </h3>
                <button
                  onClick={() => setIsCreating(false)}
                  className="p-1 rounded text-[#555555] hover:text-[#111111] dark:hover:text-zinc-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                      Prefix Number
                    </label>
                    <input
                      name="number"
                      defaultValue={(sections.length + 1).toString().padStart(2, "0")}
                      required
                      placeholder="07"
                      className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                      System Key
                    </label>
                    <input
                      name="key"
                      required
                      placeholder="e.g. blog or services"
                      className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                    Navbar Label
                  </label>
                  <input
                    name="label"
                    required
                    placeholder="e.g. Insights"
                    className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] dark:text-zinc-400 mb-1">
                    Target Anchor ID
                  </label>
                  <input
                    name="targetId"
                    required
                    placeholder="#insights"
                    className="w-full rounded-lg border border-[#111111]/15 dark:border-white/15 bg-[#faf8f4] dark:bg-[#1a1d24] px-3 py-2 text-sm text-[#111111] dark:text-zinc-100 outline-none focus:border-[#D9541E]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="createIsActive"
                    name="isActive"
                    value="true"
                    defaultChecked={true}
                    className="h-4 w-4 rounded border-[#111111]/20 accent-[#D9541E]"
                  />
                  <label htmlFor="createIsActive" className="text-xs text-[#111111] dark:text-zinc-200 cursor-pointer">
                    Set active immediately on creation
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#111111]/10 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 rounded-lg border border-[#111111]/12 text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2 rounded-lg bg-[#D9541E] hover:bg-[#bf4615] text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Add Section
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


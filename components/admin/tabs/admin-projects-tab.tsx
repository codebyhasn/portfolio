"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Loader2, CheckCircle2, X, FolderOpen, Star, Globe, Upload } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { toast } from "sonner";
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "@/app/admin/actions/crud";
import type { Project } from "@/lib/types";

interface AdminProjectsTabProps {
  projects: Project[];
}

export function AdminProjectsTab({ projects }: AdminProjectsTabProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        if (editingProject) {
          await updateProjectAction(editingProject.id, formData);
          toast.success("Project updated successfully!");
          setEditingProject(null);
        } else {
          await createProjectAction(formData);
          toast.success("Project created successfully!");
          setIsAddingNew(false);
        }
        setCoverPreview(null);
      } catch (err: any) {
        toast.error(err.message || "Failed to save project");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    startTransition(async () => {
      try {
        await deleteProjectAction(id);
        toast.success("Project deleted successfully");
      } catch (err: any) {
        toast.error(err.message || "Failed to delete");
      }
    });
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Project CMS</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Showcase enterprise systems, open-source work, and interactive demos.
          </p>
        </div>
        {!isAddingNew && !editingProject && (
          <button
            onClick={() => {
              setIsAddingNew(true);
              setCoverPreview(null);
            }}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-4 py-2.5 text-sm font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        )}
      </div>

      {/* Project Form Modal/Inline */}
      {(isAddingNew || editingProject) && (
        <div className="bento-card p-6 border-amber-500/30 shadow-2xs">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-200">
              {editingProject ? `Edit: ${editingProject.title}` : "Create New Project"}
            </h3>
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingProject(null);
                setCoverPreview(null);
              }}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Project Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingProject?.title || ""}
                  required
                  placeholder="e.g. Enterprise Banking Interface"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Slug / Identifier</label>
                <input
                  type="text"
                  name="slug"
                  defaultValue={editingProject?.slug || ""}
                  placeholder="auto-generated-if-empty"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={editingProject?.description || ""}
                required
                placeholder="High-level architecture, challenges solved, business value delivered..."
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">
                Tags / Technologies (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                defaultValue={editingProject?.tags ? editingProject.tags.join(", ") : ""}
                required
                placeholder="React, Next.js, TypeScript, Redux Toolkit, Laravel"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Live URL (optional)</label>
                <input
                  type="url"
                  name="liveUrl"
                  defaultValue={editingProject?.liveUrl || ""}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">GitHub / Code URL (optional)</label>
                <input
                  type="url"
                  name="githubUrl"
                  defaultValue={editingProject?.githubUrl || ""}
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 bg-zinc-50 dark:bg-zinc-900/40">
              <div className="relative h-20 w-32 bg-zinc-200 dark:bg-zinc-950 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-800 flex items-center justify-center flex-shrink-0">
                {coverPreview || editingProject?.coverImage ? (
                  <Image
                    src={coverPreview || editingProject?.coverImage || ""}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <FolderOpen className="h-6 w-6 text-zinc-400 dark:text-zinc-700" />
                )}
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <Upload className="h-3.5 w-3.5" />
                  Upload Project Cover
                  <input
                    type="file"
                    name="coverFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-zinc-500">Optional: 16:9 aspect ratio recommended</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Featured Project?</label>
                <select
                  name="featured"
                  defaultValue={editingProject?.featured ? "true" : "false"}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="true">⭐ Yes, Highlight in Featured</option>
                  <option value="false">Standard Project</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Visibility</label>
                <select
                  name="visible"
                  defaultValue={editingProject?.visible !== false ? "true" : "false"}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="true">Publicly Visible</option>
                  <option value="false">Hidden / Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">Sort Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingProject?.order ?? 0}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-200 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingProject(null);
                  setCoverPreview(null);
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
                {editingProject ? "Update Project" : "Publish Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bento-card p-5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{proj.title}</h4>
                  {proj.featured && (
                    <span className="flex items-center gap-1 rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      Featured
                    </span>
                  )}
                  {!proj.visible && (
                    <span className="rounded bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setIsAddingNew(false);
                      setCoverPreview(null);
                    }}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-600 dark:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2 line-clamp-2 leading-relaxed">{proj.description}</p>

              <div className="mt-3 flex flex-wrap gap-1">
                {proj.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tech-chip text-[11px] py-0">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              {proj.liveUrl && (
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                  <Globe className="h-3 w-3" /> Live Demo
                </span>
              )}
              {proj.githubUrl && (
                <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 font-medium">
                  <GithubIcon className="h-3 w-3" /> Source
                </span>
              )}
              {!proj.liveUrl && !proj.githubUrl && <span>Private Client Project</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

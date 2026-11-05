"use client";

import { useTransition } from "react";
import { Trash2, CheckCircle, Mail, Calendar, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { markMessageReadAction, deleteMessageAction } from "@/app/admin/actions/crud";
import type { ContactMessage } from "@/lib/types";

interface AdminMessagesTabProps {
  messages: ContactMessage[];
}

export function AdminMessagesTab({ messages }: AdminMessagesTabProps) {
  const [isPending, startTransition] = useTransition();

  const handleMarkRead = (id: number) => {
    startTransition(async () => {
      try {
        await markMessageReadAction(id);
        toast.success("Message marked as read");
      } catch (err: any) {
        toast.error("Failed to update status");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    startTransition(async () => {
      try {
        await deleteMessageAction(id);
        toast.success("Message deleted");
      } catch (err: any) {
        toast.error("Failed to delete message");
      }
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Contact Form Inquiries</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Messages and prospective project leads submitted directly from the portfolio.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bento-card p-12 text-center text-zinc-500">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30 text-zinc-400" />
          <p className="text-base font-medium text-zinc-700 dark:text-zinc-400">No contact inquiries yet</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-1">
            When visitors send messages through your contact form, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bento-card p-6 transition-all shadow-2xs ${
                !msg.read
                  ? "border-amber-500/40 bg-amber-50/20 dark:bg-zinc-900/80"
                  : "border-zinc-200 dark:border-zinc-800/60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      !msg.read ? "bg-amber-500 animate-pulse" : "bg-zinc-400 dark:bg-zinc-600"
                    }`}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{msg.subject}</h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                        {msg.name}
                      </span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        <Mail className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                        {msg.email}
                      </a>
                      <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      disabled={isPending}
                      className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 cursor-pointer transition-colors"
                    >
                      <CheckCircle className="h-3.5 w-3.5" /> Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-red-600 dark:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 p-4">
                <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

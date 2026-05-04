"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const QUESTIONS = ["q1", "q2", "q3", "q4", "q5", "q6"];

export default function FAQ() {
  const t = useTranslations("FAQ");
  const [open, setOpen] = useState<string | null>("q1");

  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface">
          {QUESTIONS.map((q) => {
            const isOpen = open === q;
            return (
              <div key={q}>
                <button
                  onClick={() => setOpen(isOpen ? null : q)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-elevated/30"
                >
                  <span className="font-medium text-text">{t(`items.${q}.q`)}</span>
                  <ChevronDown
                    size={18}
                    className={cn("shrink-0 text-muted transition", isOpen && "rotate-180")}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-muted animate-fade_in">
                    {t(`items.${q}.a`)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

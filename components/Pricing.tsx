"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { useAuthModal } from "@/lib/store";
import { cn } from "@/lib/cn";

const PLANS = [
  { key: "basic", featured: false },
  { key: "smart", featured: true },
  { key: "pro", featured: false },
];

export default function Pricing() {
  const t = useTranslations("Pricing");
  const { openModal } = useAuthModal();

  return (
    <section id="pricing" className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-text sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const feats = t.raw(`items.${plan.key}.feats`) as string[];
            return (
              <div
                key={plan.key}
                className={cn(
                  "relative rounded-2xl border bg-surface p-6 transition",
                  plan.featured
                    ? "border-accent/60 shadow-glow"
                    : "border-border hover:border-accent/30"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-bg">
                    {t(`items.${plan.key}.badge`)}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-text">
                  {t(`items.${plan.key}.title`)}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text">
                    {t(`items.${plan.key}.price`)}
                  </span>
                  <span className="text-muted">{t("month")}</span>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {feats.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-text"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openModal("signup")}
                  className={cn(
                    "mt-6 w-full rounded-lg px-4 py-2.5 font-medium transition",
                    plan.featured
                      ? "bg-accent text-bg hover:bg-accent/90"
                      : "border border-border bg-elevated text-text hover:border-accent/40"
                  )}
                >
                  {t(`items.${plan.key}.cta`)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Play, ShieldCheck, Activity, Wifi } from "lucide-react";
import { useAuthModal } from "@/lib/store";

export default function Hero() {
  const t = useTranslations("Hero");
  const { openModal } = useAuthModal();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse_dot" />
            {t("tag")}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openModal("login")}
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-bg transition hover:bg-accent/90"
            >
              {t("cta_primary")}
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => openModal("signup")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-elevated px-5 py-3 font-medium text-text transition hover:border-accent/40"
            >
              <Play size={14} />
              {t("cta_secondary")}
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <Stat icon={<ShieldCheck size={18} />} value="3 412" label={t("stats_users")} />
          <Stat icon={<Activity size={18} />} value="27 549" label={t("stats_cameras")} />
          <Stat icon={<Wifi size={18} />} value="99.97%" label={t("stats_uptime")} />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur">
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="text-2xl font-semibold text-text">{value}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

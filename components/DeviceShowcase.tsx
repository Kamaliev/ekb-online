"use client";

import { useTranslations } from "next-intl";
import { Lightbulb, Thermometer, Lock, Bell, type LucideIcon } from "lucide-react";
import { useAuthModal } from "@/lib/store";

const DEVICES: Array<{ key: string; Icon: LucideIcon; accent: string }> = [
  { key: "light", Icon: Lightbulb, accent: "from-yellow-400/20 to-yellow-500/5" },
  { key: "thermo", Icon: Thermometer, accent: "from-rose-400/20 to-rose-500/5" },
  { key: "lock", Icon: Lock, accent: "from-blue-400/20 to-blue-500/5" },
  { key: "sensor", Icon: Bell, accent: "from-purple-400/20 to-purple-500/5" },
];

export default function DeviceShowcase() {
  const t = useTranslations("Devices");
  const { openModal } = useAuthModal();

  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-text sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEVICES.map(({ key, Icon, accent }) => (
            <button
              key={key}
              onClick={() => openModal("login")}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 text-left transition hover:border-accent/40"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-elevated text-text">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-1 text-sm text-muted">{t(`items.${key}.desc`)}</p>
                <p className="mt-4 text-xs text-accent opacity-0 transition group-hover:opacity-100">
                  {t("control")} →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

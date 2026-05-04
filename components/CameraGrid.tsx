"use client";

import { useTranslations } from "next-intl";
import { Maximize2, Volume2 } from "lucide-react";
import { useAuthModal } from "@/lib/store";
import { cn } from "@/lib/cn";

const CAMERAS = [
  { key: "entrance", hue: 200, fps: 24 },
  { key: "parking", hue: 30, fps: 30 },
  { key: "playground", hue: 140, fps: 24 },
  { key: "lobby", hue: 280, fps: 30 },
  { key: "corridor", hue: 0, fps: 24 },
  { key: "kitchen", hue: 60, fps: 30 },
  { key: "garage", hue: 220, fps: 24 },
  { key: "garden", hue: 110, fps: 30 },
];

export default function CameraGrid({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Cameras");
  const { openModal } = useAuthModal();

  return (
    <section
      className={cn(
        "border-b border-border",
        compact ? "py-10" : "py-20"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {!compact && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-text sm:text-4xl">{t("title")}</h2>
            <p className="mt-3 text-muted">{t("subtitle")}</p>
          </div>
        )}

        <div
          className={cn(
            "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
            compact ? "mt-0" : "mt-10"
          )}
        >
          {CAMERAS.map((cam) => (
            <button
              key={cam.key}
              onClick={() => openModal("login")}
              className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-elevated text-left transition hover:border-accent/40"
            >
              <div
                className="absolute inset-0 transition group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, hsl(${cam.hue} 30% 20%) 0%, hsl(${cam.hue} 50% 8%) 100%)`,
                }}
              >
                <NoisePattern hue={cam.hue} />
              </div>

              <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-md bg-bg/80 px-2 py-0.5 text-[10px] font-bold text-danger backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse_dot" />
                {t("live_badge")}
              </div>

              <div className="absolute top-2 right-2 rounded-md bg-bg/80 px-1.5 py-0.5 text-[10px] text-muted backdrop-blur">
                {cam.fps} {t("fps")}
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg via-bg/60 to-transparent p-3">
                <span className="text-sm font-medium text-text">
                  {t(`items.${cam.key}`)}
                </span>
                <div className="flex gap-1.5 text-muted opacity-0 transition group-hover:opacity-100">
                  <Volume2 size={14} />
                  <Maximize2 size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoisePattern({ hue }: { hue: number }) {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
      <defs>
        <pattern id={`p-${hue}`} width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="1" height="1" fill={`hsl(${hue} 80% 70%)`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#p-${hue})`} />
    </svg>
  );
}

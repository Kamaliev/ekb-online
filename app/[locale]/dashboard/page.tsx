"use client";

import { useTranslations } from "next-intl";
import {
  Lightbulb,
  Thermometer,
  Lock,
  Bell,
  Tv,
  Wind,
  type LucideIcon,
} from "lucide-react";
import Footer from "@/components/Footer";
import { useAuthModal } from "@/lib/store";

type DeviceState = "on" | "off" | "armed";

const TILES: Array<{
  Icon: LucideIcon;
  name: string;
  room: string;
  state: DeviceState;
  detail: string;
}> = [
  { Icon: Lightbulb, name: "Yeelight Strip", room: "living", state: "on", detail: "65% • Тёплый белый" },
  { Icon: Lightbulb, name: "Aqara Bulb", room: "bedroom", state: "off", detail: "—" },
  { Icon: Thermometer, name: "Daikin AC", room: "living", state: "on", detail: "22°C • cool" },
  { Icon: Thermometer, name: "Терморегулятор", room: "bathroom", state: "on", detail: "28°C • тёплый пол" },
  { Icon: Lock, name: "Aqara N100", room: "bedroom", state: "armed", detail: "Закрыт" },
  { Icon: Bell, name: "Датчик дыма", room: "kitchen", state: "armed", detail: "Норма" },
  { Icon: Tv, name: "Samsung Frame", room: "living", state: "off", detail: "—" },
  { Icon: Wind, name: "Xiaomi Purifier", room: "bedroom", state: "on", detail: "PM2.5: 12 µg/m³" },
];

export default function DashboardPage() {
  const t = useTranslations("Pages.dashboard");
  const { openModal } = useAuthModal();

  return (
    <>
      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold text-text sm:text-4xl">{t("title")}</h1>
          <p className="mt-2 text-muted">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TILES.map((tile, i) => {
              const stateColor =
                tile.state === "on"
                  ? "bg-accent text-bg"
                  : tile.state === "armed"
                    ? "bg-blue-400 text-bg"
                    : "bg-elevated text-muted";
              return (
                <button
                  key={i}
                  onClick={() => openModal("login")}
                  className="rounded-xl border border-border bg-surface p-5 text-left transition hover:border-accent/40"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-elevated text-text">
                      <tile.Icon size={18} />
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${stateColor}`}
                    >
                      {t(`states.${tile.state}`)}
                    </span>
                  </div>
                  <h3 className="mt-4 font-medium text-text">{tile.name}</h3>
                  <p className="text-xs text-muted">{t(`rooms.${tile.room}`)}</p>
                  <p className="mt-3 text-sm text-muted">{tile.detail}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

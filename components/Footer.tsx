"use client";

import { useTranslations } from "next-intl";
import { Home, MapPin, Phone, Mail } from "lucide-react";
import { useAuthModal } from "@/lib/store";

const COLUMNS = {
  company: ["about", "careers", "blog", "press"],
  product: ["features", "integrations", "security", "changelog"],
  support: ["help", "contact", "status", "docs"],
} as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const { openModal } = useAuthModal();

  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-text">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-bg">
                <Home size={16} strokeWidth={2.5} />
              </span>
              EKB Online
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {t("address")}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                {t("phone")}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                {t("email")}
              </li>
            </ul>
          </div>

          {(Object.keys(COLUMNS) as Array<keyof typeof COLUMNS>).map((col) => (
            <div key={col}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-text">
                {t(`links.${col}`)}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {COLUMNS[col].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => openModal("login")}
                      className="text-sm text-muted transition hover:text-text"
                    >
                      {t(`links.${link}`)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} EKB Online. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}

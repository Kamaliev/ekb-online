"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Home } from "lucide-react";
import { useAuthModal } from "@/lib/store";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const { openModal } = useAuthModal();

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/cameras`, label: t("nav.cameras") },
    { href: `/${locale}/dashboard`, label: t("nav.dashboard") },
    { href: `/${locale}/tariffs`, label: t("nav.tariffs") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold text-text">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-bg">
            <Home size={16} strokeWidth={2.5} />
          </span>
          <span>{t("logo")}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <button
            onClick={() => openModal("login")}
            className="hidden rounded-lg px-3 py-2 text-sm text-muted transition hover:text-text sm:inline-block"
          >
            {t("login")}
          </button>
          <button
            onClick={() => openModal("signup")}
            className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-bg transition hover:bg-accent/90"
          >
            {t("signup")}
          </button>
        </div>
      </div>
    </header>
  );
}

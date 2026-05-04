"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n";
import { cn } from "@/lib/cn";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (target: Locale) => {
    if (target === locale) return;
    const segments = pathname.split("/");
    segments[1] = target;
    const newPath = segments.join("/") || `/${target}`;
    startTransition(() => router.replace(newPath));
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-elevated p-0.5">
      <Globe size={14} className="ml-1.5 text-muted" />
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          disabled={isPending}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium uppercase transition",
            l === locale
              ? "bg-accent text-bg"
              : "text-muted hover:text-text"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

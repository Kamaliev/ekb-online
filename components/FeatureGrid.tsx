import { useTranslations } from "next-intl";
import {
  Video,
  Mic,
  Workflow,
  Siren,
  Zap,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const FEATURES: Array<{ key: string; Icon: LucideIcon }> = [
  { key: "cameras", Icon: Video },
  { key: "voice", Icon: Mic },
  { key: "scenarios", Icon: Workflow },
  { key: "alarm", Icon: Siren },
  { key: "energy", Icon: Zap },
  { key: "mobile", Icon: Smartphone },
];

export default function FeatureGrid() {
  const t = useTranslations("Features");

  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-text sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ key, Icon }) => (
            <div
              key={key}
              className="group rounded-xl border border-border bg-surface p-6 transition hover:border-accent/40"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-bg">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{t(`items.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

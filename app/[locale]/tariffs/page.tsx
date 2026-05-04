import { useTranslations } from "next-intl";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function TariffsPage() {
  const t = useTranslations("Pages.tariffs");

  return (
    <>
      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-text sm:text-4xl">{t("title")}</h1>
          <p className="mt-2 text-muted">{t("subtitle")}</p>
        </div>
      </section>

      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}

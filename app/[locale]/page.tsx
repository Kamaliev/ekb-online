import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import CameraGrid from "@/components/CameraGrid";
import DeviceShowcase from "@/components/DeviceShowcase";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <CameraGrid />
      <DeviceShowcase />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}

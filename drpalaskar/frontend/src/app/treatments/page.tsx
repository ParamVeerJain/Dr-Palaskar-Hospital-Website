import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Treatments from "@/components/Treatments";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Treatments — Dr. Palaskar Hospital",
  description:
    "Explore orthopaedic treatments at Dr. Palaskar Hospital: joint replacement, spine surgery, arthroscopy, fracture & trauma care, sports medicine and more.",
};

export default function TreatmentsPage() {
  return (
    <main>
      <PageHero
        eyebrow="What we treat"
        title="Orthopaedic treatments & surgery"
        sub="From emergency trauma to planned reconstructive surgery — specialised, modern care for bones, joints, muscles and the spine. Tap any treatment for details."
        crumb="Treatments"
      />
      <Treatments />
      <CtaBand />
    </main>
  );
}

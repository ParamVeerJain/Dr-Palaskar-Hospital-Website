import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Updates from "@/components/Updates";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Updates & Insights — Dr. Palaskar Hospital",
  description: "Guidance and articles on bone, joint and spine health from the team at Dr. Palaskar Hospital.",
};

export default function UpdatesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Latest updates"
        title="Orthopaedic health insights"
        sub="Practical guidance on bone, joint and spine health — when to seek help, what treatments involve and how recovery works."
        crumb="Updates"
      />
      <Updates />
      <CtaBand />
    </main>
  );
}

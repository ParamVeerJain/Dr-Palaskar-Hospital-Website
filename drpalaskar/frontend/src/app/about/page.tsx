import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { About, Facilities, CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About — Dr. Palaskar Hospital",
  description:
    "A modern orthopaedic hospital in Vasai-Virar with digital diagnostics, laminar-flow theatres and a compassionate, patient-first team.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About the hospital"
        title="Modern orthopaedic care, built around you"
        sub="Experienced surgeons, digital diagnostics and well-equipped theatres — delivering safe, effective and affordable orthopaedic care for Vasai-Virar."
        crumb="About"
      />
      <About />
      <Facilities />
      <CtaBand />
    </main>
  );
}

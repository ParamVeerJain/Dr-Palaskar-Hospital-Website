import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { DoctorCard, CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Dr. Sameer Palaskar — Orthopaedic Surgeon",
  description:
    "Meet Dr. Sameer Palaskar (MBBS, D.Ortho, DNB) — orthopaedic surgeon with 27+ years of experience in trauma, joint replacement, arthroscopy and spine surgery.",
};

export default function DoctorPage() {
  return (
    <main>
      <PageHero
        eyebrow="Meet your surgeon"
        title="Dr. Sameer Palaskar"
        sub="MBBS · D.Ortho · DNB — orthopaedic surgeon with nearly three decades of experience and a patient-centred approach to care."
        crumb="Doctor"
      />
      <DoctorCard />
      <Testimonials />
      <CtaBand />
    </main>
  );
}

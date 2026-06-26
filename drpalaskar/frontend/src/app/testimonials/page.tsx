import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Patient Reviews — Dr. Palaskar Hospital",
  description: "Real experiences from patients treated at Dr. Palaskar Hospital across Vasai-Virar.",
};

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Patient stories"
        title="What our patients say"
        sub="Real experiences from people we've cared for — from fracture recovery to joint replacement and spine treatment."
        crumb="Reviews"
      />
      <Testimonials />
      <CtaBand />
    </main>
  );
}

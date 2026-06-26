import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — Dr. Palaskar Hospital",
  description:
    "Visit Dr. Palaskar Hospital in Vasai West, or call +91 80480 34862. 24×7 emergency orthopaedic care in Vasai-Virar.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Get in touch"
        title="Visit us or book a consultation"
        sub="Behind Saibaba Temple, Opposite McDonald's, Bhabola Naka, Vasai West — with 24×7 emergency access."
        crumb="Contact"
      />
      <Contact />
    </main>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Gallery — Dr. Palaskar Hospital",
  description: "A look around Dr. Palaskar Hospital — reception, consultation rooms, diagnostics and operating theatres.",
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our space"
        title="A look around the hospital"
        sub="Reception, consultation rooms, diagnostics and operating theatres. Tap any photo to enlarge."
        crumb="Gallery"
      />
      <Gallery />
      <CtaBand />
    </main>
  );
}

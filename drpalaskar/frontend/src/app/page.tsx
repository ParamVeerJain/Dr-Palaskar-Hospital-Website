import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Vitals from "@/components/Vitals";
import Treatments from "@/components/Treatments";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Updates from "@/components/Updates";
import Contact from "@/components/Contact";
import { About, Facilities, DoctorCard, CtaBand } from "@/components/Sections";

function EcgDivider() {
  return (
    <div className="container" aria-hidden="true">
      <svg className="ecg" viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path
          className="pulse"
          d="M0 30 H360 l18 -22 l20 44 l18 -34 l16 22 H760 l20 -16 l16 30 l14 -14 H1200"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Marquee />
      <Vitals />
      <Treatments />
      <EcgDivider />
      <About />
      <DoctorCard />
      <Facilities />
      <Gallery />
      <Testimonials />
      <Updates />
      <CtaBand />
      <Contact />
    </main>
  );
}

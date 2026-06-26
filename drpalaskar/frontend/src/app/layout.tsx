import type { Metadata, Viewport } from "next";
import { Sora, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

import ModalProvider from "@/components/ModalProvider";
import Cursor from "@/components/Cursor";
import RevealOnScroll from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fab from "@/components/Fab";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drpalaskarhospital.com"),
  title: "Dr. Palaskar Hospital — Best Orthopaedic Hospital in Vasai-Virar",
  description:
    "Dr. Palaskar Hospital is a leading orthopaedic hospital in Vasai-Virar led by Dr. Sameer Palaskar (27+ years). Joint replacement, spine surgery, arthroscopy, fracture & trauma care with 24×7 emergency support.",
  keywords: [
    "orthopaedic hospital Vasai-Virar",
    "orthopedic doctor Vasai",
    "joint replacement",
    "knee replacement",
    "spine surgery",
    "arthroscopy",
    "Dr. Sameer Palaskar",
    "fracture treatment",
    "trauma care",
  ],
  authors: [{ name: "Dr. Palaskar Hospital" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/assets/media/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/assets/media/logo-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/assets/media/logo-192.png",
  },
  openGraph: {
    title: "Dr. Palaskar Hospital — Best Orthopaedic Hospital in Vasai-Virar",
    description:
      "Expert orthopaedic care — joint replacement, spine surgery, arthroscopy & 24×7 trauma care in Vasai-Virar.",
    type: "website",
    url: "https://www.drpalaskarhospital.com/",
    siteName: "Dr. Palaskar Hospital",
    images: [{ url: "/assets/media/about-cover.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Palaskar Hospital — Best Orthopaedic Hospital in Vasai-Virar",
    description:
      "Expert orthopaedic care — joint replacement, spine surgery, arthroscopy & 24×7 trauma care in Vasai-Virar.",
    images: ["/assets/media/about-cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F2A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "Hospital"],
  name: "Dr. Palaskar Hospital",
  description:
    "Leading orthopaedic hospital in Vasai-Virar offering joint replacement, spine surgery, arthroscopy and 24×7 trauma care.",
  url: "https://www.drpalaskarhospital.com/",
  telephone: "+918048034862",
  email: "palaskarhospital@gmail.com",
  medicalSpecialty: "Orthopedic",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Behind Saibaba Temple, Opposite McDonald's, Bhabola Naka, Vasai West",
    addressLocality: "Vasai-Virar",
    addressRegion: "Maharashtra",
    postalCode: "401201",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 19.3669568, longitude: 72.8169703 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  image: "https://www.drpalaskarhospital.com/assets/media/about-cover.jpg",
  logo: "https://www.drpalaskarhospital.com/assets/media/logo.png",
  sameAs: [
    "https://www.instagram.com/drpalaskarhospital/",
    "https://www.facebook.com/profile.php?id=61579410280550",
  ],
  employee: {
    "@type": "Physician",
    name: "Dr. Sameer Palaskar",
    medicalSpecialty: "Orthopedic",
    description: "Orthopaedic Surgeon (MBBS, D.Ortho, DNB) with 27+ years of experience.",
    image: "https://www.drpalaskarhospital.com/assets/media/doctor.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable} ${spaceMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ModalProvider>
          <Cursor />
          <RevealOnScroll />
          <Navbar />
          {children}
          <Footer />
          <Fab />
        </ModalProvider>
      </body>
    </html>
  );
}

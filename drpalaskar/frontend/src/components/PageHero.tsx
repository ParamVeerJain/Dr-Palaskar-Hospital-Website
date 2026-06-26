import Link from "next/link";
import BackButton from "./BackButton";

export default function PageHero({
  eyebrow,
  title,
  sub,
  crumb,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  crumb: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <BackButton />
        <div className="crumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{crumb}</span>
        </div>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h1" style={{ marginTop: 10 }}>
          {title}
        </h1>
        {sub && (
          <p className="lead" style={{ marginTop: 16, maxWidth: 720 }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

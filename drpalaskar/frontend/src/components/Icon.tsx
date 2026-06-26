import { icons } from "@/lib/icons";

export default function Icon({ name, className }: { name: string; className?: string }) {
  const svg = icons[name] ?? icons.heart ?? "";
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{ display: "inline-flex" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

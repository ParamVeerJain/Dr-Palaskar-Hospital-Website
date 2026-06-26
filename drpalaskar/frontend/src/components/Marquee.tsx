const ITEMS = [
  "Joint Replacement",
  "Spine Surgery",
  "Arthroscopy",
  "Fracture Care",
  "Sports Medicine",
  "Trauma Care",
  "Foot & Ankle",
  "Shoulder & Elbow",
  "Paediatric Ortho",
];

export default function Marquee() {
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {all.map((it, i) => (
          <span key={i}>{it}</span>
        ))}
      </div>
    </div>
  );
}

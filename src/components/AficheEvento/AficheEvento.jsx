import "./AficheEvento.css";
export default function AficheEvento({ afiche, className = "" }) {
  return (
    <div
      className={`arte-evento patron-${afiche?.patron ?? "liso"} ${className}`}
      style={
        afiche
          ? {
              backgroundImage: `linear-gradient(135deg, ${afiche.color1}, ${afiche.color2})`,
            }
          : undefined
      }
      aria-hidden="true"
    />
  );
}

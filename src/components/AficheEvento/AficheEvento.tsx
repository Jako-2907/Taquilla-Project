import "./AficheEvento.css";
import type { Afiche } from "../../types/api";

export default function AficheEvento({ afiche, className = "" }: { afiche?: Afiche | null; className?: string }) {
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

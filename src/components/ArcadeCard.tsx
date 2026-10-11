import styles from "./ArcadeCard.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  width?: number; // largeur maximale desktop en px, bordures comprises (par défaut 640)
  ring?: number; // épaisseur de l'anneau violet desktop en px (par défaut 6)
};

// Carte centrale : fond bleu, bordure claire, anneau violet.
export default function ArcadeCard({
  children,
  className = "",
  width,
  ring,
}: Props) {
  const style = {
    ...(width ? { "--card-w": `${width}px` } : {}),
    ...(ring ? { "--ring-w": `${ring}px` } : {}),
  } as React.CSSProperties;
  return (
    <section className={`${styles.card} ${className}`} style={style}>
      {children}
    </section>
  );
}

import styles from "./ArcadeCard.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

// Carte centrale : fond bleu, bordure claire, anneau violet.
export default function ArcadeCard({ children, className = "" }: Props) {
  return <section className={`${styles.card} ${className}`}>{children}</section>;
}

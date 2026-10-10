import styles from "./ArcadeBackground.module.css";

// Chaque image est une tuile complète (fond noir inclus). Une ligne = une image,
// dans cet ordre, qui se répète (comme sur les maquettes).
const TILES = ["mappy.png", "digdug.png", "mspacman.png", "sonic.png"];
const ROWS = 14; // largement assez pour couvrir un grand écran
const COLS = 30;

export default function ArcadeBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      {Array.from({ length: ROWS }, (_, row) => {
        const src = "/images/background/" + TILES[row % TILES.length];
        return (
          <div className={styles.row} key={row}>
            {Array.from({ length: COLS }, (_, col) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={col} src={src} alt="" className={styles.tile} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

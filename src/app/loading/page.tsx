"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArcadeCard from "@/components/ArcadeCard";
import { characters } from "@/data/characters";
import { TRAITS } from "@/data/traits";
import styles from "./page.module.css";

const BLOCKS = 20; // nombre de cases de la barre
const STEP_MS = 650; // durée d'affichage de chaque trait
const TICK_MS = 50;
const TOTAL_MS = TRAITS.length * STEP_MS;

export default function LoadingPage() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed((e) => Math.min(e + TICK_MS, TOTAL_MS));
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const done = elapsed >= TOTAL_MS;

  // Animation terminée : on passe à l'écran résultat.
  // (Plus tard, c'est ici qu'on attendra aussi la réponse du backend.)
  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => router.push("/result"), 400);
    return () => clearTimeout(id);
  }, [done, router]);

  const step = Math.min(TRAITS.length - 1, Math.floor(elapsed / STEP_MS));
  const filled = Math.round((elapsed / TOTAL_MS) * BLOCKS);

  return (
    <ArcadeCard width={592} ring={10} className={styles.loading}>
      <h1 className={styles.title}>
        Searching {characters.length} legends…
      </h1>

      <div
        className={styles.track}
        role="progressbar"
        aria-label="Searching legends"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round((filled / BLOCKS) * 100)}
      >
        {Array.from({ length: BLOCKS }, (_, i) => (
          <span
            key={i}
            className={`${styles.block} ${i < filled ? styles.on : ""}`}
          />
        ))}
      </div>

      <p className={styles.measuring} role="status">
        Measuring {TRAITS[step]}…
      </p>

      <ul className={styles.traits}>
        {TRAITS.map((trait, i) => (
          <li
            key={trait}
            className={`${styles.item} ${i === step ? styles.active : ""}`}
          >
            <span className={styles.marker} aria-hidden="true" />
            <span className={styles.label}>{trait}</span>
          </li>
        ))}
      </ul>
    </ArcadeCard>
  );
}

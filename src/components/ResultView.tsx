"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArcadeCard from "@/components/ArcadeCard";
import PixelButton from "@/components/PixelButton";
import { useQuiz } from "@/context/QuizProvider";
import type { Character } from "@/data/types";
import styles from "./ResultView.module.css";

type Props = {
  // Le personnage à afficher. null = pas de résultat disponible (état vide).
  character: Character | null;
};

// Contenu de la carte (partagé entre l'écran et l'image à télécharger).
function CardBody({ character }: { character: Character }) {
  return (
    <>
      <p className={styles.you}>You are…</p>

      <div className={styles.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={`/images/characters/${encodeURIComponent(character.image)}`}
          alt={character.name}
        />
      </div>

      <h1 className={styles.title}>{character.uniqueTitle}</h1>
      <p className={styles.meta}>
        {character.game} · {character.publisher} · {character.year}
      </p>
      <p className={styles.description}>{character.description}</p>

      <p className={styles.pill}>
        SIGNATURE ABILITY: {character.signatureAbility}
      </p>
    </>
  );
}

// Écran résultat (maquettes resultat.png / resultat_phone.png).
export default function ResultView({ character }: Props) {
  const router = useRouter();
  const { reset } = useQuiz();
  // Mode « partage » : la carte seule, sans boutons, pour faire une capture d'écran.
  const [shareMode, setShareMode] = useState(false);

  // Échap pour revenir à l'écran résultat
  useEffect(() => {
    if (!shareMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShareMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shareMode]);

  function playAgain() {
    reset(); // on efface les réponses puis retour à l'accueil
    router.push("/");
  }

  if (!character) {
    return (
      <ArcadeCard width={584} className={`${styles.result} ${styles.empty}`}>
        <h1 className={styles.you}>No result yet</h1>
        <p className={styles.description}>
          We could not load your legend. Take the quiz again to meet your
          match.
        </p>
        <div className={styles.buttons}>
          <PixelButton className={styles.btn} onClick={playAgain}>
            PLAY AGAIN
          </PixelButton>
        </div>
      </ArcadeCard>
    );
  }

  if (shareMode) {
    return (
      <>
        {/* Un clic / toucher en dehors de la carte revient au résultat */}
        <button
          type="button"
          className={styles.backdrop}
          onClick={() => setShareMode(false)}
          aria-label="Back to result"
        />
        <ArcadeCard width={584} className={styles.result}>
          <CardBody character={character} />
        </ArcadeCard>
      </>
    );
  }

  return (
    <ArcadeCard width={584} className={styles.result}>
      <CardBody character={character} />

      <div className={styles.buttons}>
        <PixelButton className={styles.btn} onClick={() => setShareMode(true)}>
          SHARE
        </PixelButton>
        <PixelButton
          variant="outline"
          className={styles.btn}
          onClick={playAgain}
        >
          PLAY AGAIN
        </PixelButton>
      </div>
    </ArcadeCard>
  );
}

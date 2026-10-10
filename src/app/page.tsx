"use client";

import { useRouter } from "next/navigation";
import ArcadeCard from "@/components/ArcadeCard";
import PixelButton from "@/components/PixelButton";
import MuteButton from "@/components/MuteButton";
import { useAudio } from "@/context/AudioProvider";
import { characters } from "@/data/characters";
import { questions } from "@/data/questions";
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();
  const { start } = useAudio();

  function handleStart() {
    start(); // le clic autorise le navigateur à lancer la musique
    router.push("/quiz");
  }

  return (
    <ArcadeCard className={styles.home}>
      <MuteButton />
      <h1 className={styles.title}>
        Which game
        <br />
        character
        <br />
        are you?
      </h1>
      <p className={styles.subtitle}>
        {questions.length} questions. {characters.length} arcade legends. One
        match.
      </p>
      <div className={styles.buttonWrap}>
        <PixelButton onClick={handleStart}>PRESS START</PixelButton>
      </div>
      <p className={styles.hint}>About 3 minutes · No wrong answers</p>
    </ArcadeCard>
  );
}

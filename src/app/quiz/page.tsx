"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ArcadeCard from "@/components/ArcadeCard";
import AnswerOption from "@/components/AnswerOption";
import MuteButton from "@/components/MuteButton";
import ProgressBar from "@/components/ProgressBar";
import { useQuiz } from "@/context/QuizProvider";
import { questions } from "@/data/questions";
import type { AnswerKey } from "@/data/types";
import styles from "./page.module.css";

const ADVANCE_DELAY_MS = 280; // le temps de voir la réponse choisie

export default function QuizPage() {
  const router = useRouter();
  const { setAnswer } = useQuiz();
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<AnswerKey | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = questions.length;
  const question = questions[index];

  function choose(key: AnswerKey) {
    if (chosen) return; // un seul choix par question
    setChosen(key);
    setAnswer(question.id, key);
    timer.current = setTimeout(() => {
      if (index === total - 1) {
        router.push("/loading");
      } else {
        setIndex((i) => i + 1);
        setChosen(null);
      }
    }, ADVANCE_DELAY_MS);
  }

  // Raccourcis clavier : A B C D ou 1 2 3 4
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const map: Record<string, AnswerKey> = {
        a: "A", b: "B", c: "C", d: "D", "1": "A", "2": "B", "3": "C", "4": "D",
      };
      const key = map[e.key.toLowerCase()];
      if (key) choose(key);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <ArcadeCard width={728} className={styles.quiz}>
      <div className={styles.header}>
        <span className={styles.level}>
          LEVEL {index + 1} <span className={styles.slash}>/</span> {total}
        </span>
        <MuteButton inline />
      </div>

      <div className={styles.progress}>
        <ProgressBar
          value={(index + 1) / total}
          label={`Question ${index + 1} sur ${total}`}
        />
      </div>

      <h1 className={styles.question}>{question.text}</h1>

      <div className={styles.answers}>
        {question.answers.map((a) => (
          <AnswerOption
            key={a.key}
            letter={a.key}
            text={a.text}
            selected={chosen === a.key}
            disabled={chosen !== null}
            onSelect={() => choose(a.key)}
          />
        ))}
      </div>
    </ArcadeCard>
  );
}

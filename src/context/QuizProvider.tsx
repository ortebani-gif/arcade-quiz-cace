"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { AnswerKey } from "@/data/types";

type QuizContextValue = {
  // Réponses choisies : { Q01: "A", Q02: "C", ... }
  answers: Record<string, AnswerKey>;
  setAnswer: (questionId: string, key: AnswerKey) => void;
  reset: () => void;
};

const QuizCtx = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, AnswerKey>>({});

  const setAnswer = useCallback((questionId: string, key: AnswerKey) => {
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
  }, []);

  const reset = useCallback(() => setAnswers({}), []);

  return (
    <QuizCtx.Provider value={{ answers, setAnswer, reset }}>
      {children}
    </QuizCtx.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useQuiz doit être utilisé dans <QuizProvider>");
  return ctx;
}

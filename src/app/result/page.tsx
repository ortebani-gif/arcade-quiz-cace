"use client";

import ResultView from "@/components/ResultView";
import type { Character } from "@/data/types";

export default function ResultPage() {
  // Backend pas encore branché : aucun résultat n'est inventé en local.
  // Phase 7 : ici, on récupérera le personnage renvoyé par l'API
  // (en retrouvant l'objet dans characters[] via son ID).
  const character: Character | null = null;

  return <ResultView character={character} />;
}

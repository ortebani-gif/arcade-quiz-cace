import type { Trait } from "./traits";

export type Character = {
  id: string; // ex. "C01" (les IDs ne sont pas continus : toujours utiliser l'ID comme clé)
  name: string;
  game: string;
  publisher: string;
  year: number;
  provenance: string;
  uniqueTitle: string;
  signatureAbility: string;
  description: string;
  image: string; // nom exact du fichier dans public/images/characters/
  // Référence uniquement (viennent du sheet). Le front ne calcule aucun score.
  traits: Record<Trait, number>;
};

export type AnswerKey = "A" | "B" | "C" | "D";

export type Answer = {
  key: AnswerKey;
  text: string;
  // Référence uniquement (vient du sheet). Le calcul reste côté backend.
  scoring: Partial<Record<Trait, number>>;
};

export type Question = {
  id: string; // ex. "Q01"
  text: string;
  answers: Answer[];
};

// Les 8 traits, dans l'ordre affiché sur l'écran de chargement.
export const TRAITS = [
  "Boldness",
  "Tactics",
  "Chaos",
  "Precision",
  "Grit",
  "Curiosity",
  "Social",
  "Flair",
] as const;

export type Trait = (typeof TRAITS)[number];

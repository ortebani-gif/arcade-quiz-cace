import { notFound } from "next/navigation";
import DevResultPreview from "./DevResultPreview";

// PAGE TEMPORAIRE (DEV) : aperçu de l'écran résultat avec n'importe quel personnage.
// Désactivée automatiquement en production. À SUPPRIMER avant le lancement
// (dossier src/app/dev/).
export default function DevResultPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <DevResultPreview />;
}

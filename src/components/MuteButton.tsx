"use client";

import { useAudio } from "@/context/AudioProvider";
import styles from "./MuteButton.module.css";

export default function MuteButton() {
  const { isPlaying, toggle } = useAudio();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-label={isPlaying ? "Mute music" : "Play music"}
      aria-pressed={isPlaying}
    >
      {isPlaying ? (
        // Icône « son activé » provisoire, en attendant ton image
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 9v6h4l5 5V4L7 9H3z" stroke="none" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" fill="none" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" fill="none" />
        </svg>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/ui/no_sound.png" alt="" />
      )}
    </button>
  );
}

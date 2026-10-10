"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Le fichier audio garde le nom exact présent dans public/audio/
const MUSIC_SRC = "/audio/" + encodeURIComponent("Background sound.mp3");

type AudioContextValue = {
  isPlaying: boolean;
  start: () => void; // à appeler depuis un clic (autoplay bloqué sinon)
  toggle: () => void;
};

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Une seule instance audio pour toute l'app (le layout ne se recharge pas
  // quand on change d'écran : la musique ne repart donc pas de zéro).
  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false)); // navigateur qui refuse : on reste en muet
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (audioRef.current?.paused) play();
  }, [play]);

  const toggle = useCallback(() => {
    if (audioRef.current?.paused) play();
    else pause();
  }, [play, pause]);

  return (
    <AudioCtx.Provider value={{ isPlaying, start, toggle }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio doit être utilisé dans <AudioProvider>");
  return ctx;
}

"use client";

import { useState } from "react";
import ResultView from "@/components/ResultView";
import { characters } from "@/data/characters";

export default function DevResultPreview() {
  const [index, setIndex] = useState(0);
  const character = characters[index];

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          position: "fixed",
          top: 8,
          left: 8,
          zIndex: 10,
          display: "flex",
          gap: 6,
          alignItems: "center",
          background: "#000c",
          color: "#fff",
          padding: "6px 8px",
          borderRadius: 6,
          fontSize: 12,
        }}
      >
        <strong style={{ color: "#ef476f" }}>DEV</strong>
        <button onClick={() => setIndex((i) => (i - 1 + characters.length) % characters.length)}>
          ◀
        </button>
        <select value={index} onChange={(e) => setIndex(Number(e.target.value))}>
          {characters.map((c, i) => (
            <option key={c.id} value={i}>
              {c.id} · {c.name}
            </option>
          ))}
        </select>
        <button onClick={() => setIndex((i) => (i + 1) % characters.length)}>▶</button>
        <span>
          {index + 1}/{characters.length}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResultView key={character.id} character={character} />
      </div>
    </div>
  );
}

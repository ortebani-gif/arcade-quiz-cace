import type { AnswerKey } from "@/data/types";
import styles from "./AnswerOption.module.css";

type Props = {
  letter: AnswerKey;
  text: string;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
};

export default function AnswerOption({
  letter,
  text,
  selected,
  disabled,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      className={`${styles.option} ${selected ? styles.selected : ""}`}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className={`${styles.badge} ${styles["badge" + letter]}`}>
        {letter}
      </span>
      <span className={styles.text}>{text}</span>
    </button>
  );
}

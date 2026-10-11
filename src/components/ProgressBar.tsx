import styles from "./ProgressBar.module.css";

type Props = {
  value: number; // 0 à 1
  label: string;
};

export default function ProgressBar({ value, label }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      <div className={styles.fill} style={{ width: `${pct}%` }} />
    </div>
  );
}

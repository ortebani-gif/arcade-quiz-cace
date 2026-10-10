import styles from "./PixelButton.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export default function PixelButton({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

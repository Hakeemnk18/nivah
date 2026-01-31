import { Link } from "react-router-dom";

type LogoProps = {
  variant?: "text" | "image";
  className?: string;
};

export default function Logo({
  variant = "text",
  className = "",
}: LogoProps) {
  if (variant === "image") {
    return (
      <Link to="/" className={className}>
        <img
          src="/logo.svg"
          alt="NIVAH"
          className="h-8 w-auto"
        />
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className={`text-xl font-semibold tracking-widest text-[var(--accent)] ${className}`}
    >
      NIVAH
    </Link>
  );
}
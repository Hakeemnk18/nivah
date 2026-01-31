import { useEffect, useState } from "react";
export type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const userRoot = document.querySelector(".user-theme");
    userRoot?.classList.toggle("dark", theme === "dark");
   
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((prev) => (prev === "dark" ? "light" : "dark")),
  };
};
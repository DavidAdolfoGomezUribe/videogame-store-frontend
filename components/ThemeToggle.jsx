"use client";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button className="btn" onClick={toggle} title="Cambiar tema">
      {theme === "dark" ? "🌙 Oscuro" : "☀️ Claro"}
    </button>
  );
}

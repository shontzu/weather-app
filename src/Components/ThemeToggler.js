import React from "react";

const ThemeToggler = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? "🌙 Go Dark" : "🌞 Go Light"}
    </button>
  );
};

export default ThemeToggler;

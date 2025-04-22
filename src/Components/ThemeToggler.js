import React from "react";

const ThemeToggler = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? "🌙 Switch to Dark Mode" : "🌞 Switch to Light Mode"}
    </button>
  );
};

export default ThemeToggler;

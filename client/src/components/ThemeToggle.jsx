import { useState, useEffect } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [theme2, setTheme2] = useState(theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme2;
    localStorage.setItem("theme", theme);
  }, [theme, theme2]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setTheme2((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="transition duration-1000 ease-in-out text-3xl "
    >
      {theme === "light" ? (
        <IoMoon className="text-[#4169e1] active:rotate-180 transition ease-in-out duration-300 " />
      ) : (
        <IoSunnyOutline className="text-[#4169e1] hover:rotate-45 active:rotate-90 transition ease-in duration-300  " />
      )}
    </button>
  );
};

export default ThemeToggle;

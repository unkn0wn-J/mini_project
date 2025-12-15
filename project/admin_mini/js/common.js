// common.js
document.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkMode") === "on";

  if (isDark) {
    document.body.classList.add("dark");
  }
});

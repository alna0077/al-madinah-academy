(() => {
  const storageKey = "almadinah-theme";
  let preference = "system";

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") preference = saved;
  } catch (error) {
    preference = "system";
  }

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const activeTheme = preference === "system" ? systemTheme : preference;
  document.documentElement.dataset.theme = activeTheme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = activeTheme;
})();

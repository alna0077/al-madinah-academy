(() => {
  const storageKey = "almadinah-theme";
  let preference = "system";

  try {
    const savedPreference = localStorage.getItem(storageKey);
    if (["light", "dark"].includes(savedPreference)) preference = savedPreference;
  } catch (error) {
    preference = "system";
  }

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const activeTheme = preference === "system" ? systemTheme : preference;

  document.documentElement.dataset.theme = activeTheme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = activeTheme;
})();

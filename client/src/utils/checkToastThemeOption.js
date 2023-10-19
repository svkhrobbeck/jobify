const checkToastThemeOption = () => {
  const isDarkTheme = localStorage.getItem("dark-theme") === "true";
  const option = { theme: isDarkTheme ? "dark" : "light" };
  return option;
};

export default checkToastThemeOption;

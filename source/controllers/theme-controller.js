export default class ThemeController {
  themeToggleId = "theme-toggle";

  constructor() {
    this.themeToggle = document.querySelector(`#${this.themeToggleId}`);
    this.initTheme();
  }

  registerThemeToggle() {
    this.themeToggle.addEventListener("click", () => {
      const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"))
      localStorage.setItem("isDarkMode", !isDarkMode);
      document.body.classList.toggle("dark-theme");
    });
  }
  initTheme() {
    const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
    }
  }

  headerShadow() {
    const header = document.querySelector("header");
    const toggleDiv = document.createElement("div");
    header.before(toggleDiv);

    // as soon as the header element moves over the div a class gets set
    const intersection$ = new IntersectionObserver(([entry]) => {
      header.classList.toggle("active", !entry.isIntersecting);
    });

    intersection$.observe(toggleDiv);
  }
}

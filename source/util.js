
export function registerThemeToggle(id) {
  const themeButton = document.getElementById(id);
  themeButton.addEventListener("click", () => {
    const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"))
    localStorage.setItem("isDarkMode", !isDarkMode);
    document.body.classList.toggle("dark-theme");
  });
}

export function initTheme() {
  const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
  if (isDarkMode) {
    document.body.classList.add("dark-theme");
  }
}

export function dateNow() {
  const today = new Date(Date.now());
  const todayStr = `Today is: ${today.toLocaleDateString()}`;
  document.querySelector("#todaysDate").innerHTML = todayStr;
}

export function sortByString(a, b, prop) {
  const upperA = a[prop].toUpperCase();
  const upperB = b[prop].toUpperCase();
  if (upperA < upperB) {
    return -1;
  }
  if (upperA > upperB) {
    return 1;
  }
  return 0;
};

export function sortByDate(a, b, prop) {
  return new Date(a[prop]) - new Date(b[prop]);
}

export function sortByNumber(a, b, prop) {
  return a[prop] - b[prop]
}


export function headerShadow() {
  const header = document.querySelector("header");
  // create empty div an place before header
  const toggleDiv = document.createElement("div");
  header.before(toggleDiv);

  // as soon as the header element moves over the div a class gets set
  const intersection$ = new IntersectionObserver(([entry]) => {
    header.classList.toggle("active", !entry.isIntersecting);
  });

  intersection$.observe(toggleDiv);
}
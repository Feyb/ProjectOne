
function registerThemeToggle(id) {
  const themeButton = document.getElementById(id);
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });
}

function dateNow() {
  const now = Date.now();
  const today = new Date(now);
  const todayStr = `Today is: ${today.toLocaleDateString()}`;
  document.querySelector("#todaysDate").innerHTML = todayStr;
}

// function registerEvent(id, event, func) {
//   const element = document.querySelector(`#${id}`);
//   element.addEventListener(event, func);
// }

function sortByAsc(a, b, prop) {
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

function sortByDesc(a, b, prop) {
  const upperA = a[prop].toUpperCase();
  const upperB = b[prop].toUpperCase();
  if (upperA > upperB) {
    return -1;
  }
  if (upperA < upperB) {
    return 1;
  }
  return 0;
};

export { registerThemeToggle, dateNow, sortByAsc, sortByDesc };

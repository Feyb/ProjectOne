
export function dateNow() {
  const today = new Date(Date.now());
  const todayStr = `Today is: ${today.toLocaleDateString()}`;
  document.querySelector("#todaysDate").innerHTML = todayStr;
}

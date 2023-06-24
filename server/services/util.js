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




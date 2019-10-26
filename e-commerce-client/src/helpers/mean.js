export function mean(array = []) {
  return array.reduce((acc, current) => acc + current) / array.length;
}

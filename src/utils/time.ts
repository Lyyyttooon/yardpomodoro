export function formatToTime(s: number) {
  if (s < 10) {
    return `0${s}`
  }
  return s
}

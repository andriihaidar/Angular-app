export const convertMinutes = (minutes: number) => {
  const hours = Math.ceil(minutes / 60);
  if (hours > 0) {
    const remainderMinutes = Math.ceil(minutes % 60);
    return `${hours}h ${remainderMinutes} m`
  }
  return `${Math.ceil(minutes)}m`
}

export const timerConverter = (minutes: number) => {
  if (minutes <= 0) {
    return '00:00'
  }
  const fullHours = Math.floor(minutes / 60)
  const remainderMinutes = Math.floor(minutes % 60);
  const fullMinutes = remainderMinutes > 9 ? remainderMinutes : `0${remainderMinutes}`;;
  if (fullHours > 0) {
    const hours = fullHours > 9 ? fullHours : `0${fullHours}`;
    return `${hours}h ${fullMinutes}m`
  }
  return `00:${fullMinutes}`;
}

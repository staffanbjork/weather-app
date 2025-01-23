
const getLastSundayOfMonth = (year: number, month: number) => {
  const date = new Date(year, month, 0);
  date.setDate(date.getDate() - date.getDay());
  date.setHours(3);
  return date
}

const parseTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

const roundToNearestHour = (hour: number, minute: number, offset: number) => {
  let roundedHour = hour + offset;
  if (minute >= 30) roundedHour += 1;
  return (roundedHour + 24) % 24;
}

function getTimezoneOffset(date: Date) {
  const dstStart = getLastSundayOfMonth(date.getFullYear(), 3);
  const dstEnd = getLastSundayOfMonth(date.getFullYear(), 10);
  return date >= dstStart && date < dstEnd ? 2 : 1;
}

export default function isTwilight(currentTime: boolean, validHourString: string, validDateString: string, sunriseTime: string, sunsetTime: string) {

  const validDate = new Date(validDateString);
  const timezoneOffset = getTimezoneOffset(validDate);
  const now = new Date();
  const validHour = validHourString.startsWith("0") ? Number(validHourString[1]) : Number(validHourString);
  const sunrise = parseTime(sunriseTime);
  const sunset = parseTime(sunsetTime);
  const dawnStart = roundToNearestHour(sunrise.hour, sunrise.minute, -1);
  const duskEnd = roundToNearestHour(sunset.hour, sunset.minute, 1);

  const localHour = currentTime ? now.getHours() : (validHour + timezoneOffset) % 24;

  const timeOfDay =
    (localHour >= dawnStart && localHour < sunrise.hour) ||
      (localHour >= sunset.hour && localHour < duskEnd) ? "twilight" : (localHour < dawnStart || localHour > duskEnd) ? "night" : "day";
  // return localHour >= dawnStart && localHour < sunrise.hour || localHour >= sunset.hour && localHour < duskEnd;
  return timeOfDay

}
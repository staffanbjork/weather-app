import { TimeSerie, DayWeatherData } from "../types/types";
import { WEATHER_CATEGORY } from "../assets/weatherCategoryIcons";

const DAY_DEFAULT = {
  dayAndDate: "",
  day: 0,
  month: 0,
  highestTemp: 0,
  lowestTemp: 0,
  windSpeed: 0,
  gust: 0,
  weatherSymbol: "",
};

const DAY_NAMES = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"];

export const getWeatherCatDayIcon = (ws: number, iconType: string) => {
  const { icon } = WEATHER_CATEGORY[ws];
  return `/images/${iconType}/svg/${icon.day}.svg?url`;
};

export const parseTenDays = (timeSeries: TimeSerie[]) => {
  const dayData: DayWeatherData[] = [];
  const daysArr: TimeSerie[][] = [];
  let dayArr: TimeSerie[] = [];
  timeSeries.forEach((day) => {
    if (
      dayArr.length === 0 ||
      day.validDateTime.day === dayArr[dayArr.length - 1].validDateTime.day
    ) {
      dayArr.push(day);
    } else {
      daysArr.push(dayArr);
      dayArr = [];
      dayArr.push(day);
    }
  });
  daysArr.forEach((day) => {
    let highestTemp = -Infinity;
    let lowestTemp = Infinity;
    day.forEach((hour) => {
      if (hour.temp > highestTemp) {
        highestTemp = hour.temp;
      }
      if (hour.temp < lowestTemp) {
        lowestTemp = hour.temp;
      }
    });
    const newDay = {
      ...DAY_DEFAULT,
      day: day[0].validDateTime.day,
      month: day[0].validDateTime.month,
      highestTemp: highestTemp,
      lowestTemp: lowestTemp,
    };

    let data = day.find((time) => time.validDateTime.hour === 15);
    if (!data) {
      data = day[(day.length - (day.length % 2)) / 2];
    }
    const date = new Date(data.validDate);
    newDay.weatherSymbol = getWeatherCatDayIcon(data.weatherSymbol, "shadows");
    newDay.windSpeed = data.windSpeed;
    newDay.gust = data.gust;
    newDay.dayAndDate = `${DAY_NAMES[date.getUTCDay()]} ${
      data.validDateTime.day
    }/${data.validDateTime.month}`;

    dayData.push(newDay);
  });
  return dayData;
};

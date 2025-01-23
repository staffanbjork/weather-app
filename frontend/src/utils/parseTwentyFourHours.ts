import { TimeSerie, TwentyFourHour } from "../types/types";
import { WEATHER_CATEGORY } from "../assets/weatherCategoryIcons";
import isTwilight from "./isTwilight";

const TWENTYFOUR_HOUR_DEFAULT: TwentyFourHour = {
  validHour: "",
  validDate: "",
  validDateTime: {
    day: 0,
    month: 0,
    hour: 0,
  },
  temp: {
    unit: "°",
    value: 0,
  },
  rain: {
    unit: "mm/h",
    value: 0,
  },
  wind: {
    unit: "m/s",
    windSpeedValue: 0,
    gustValue: 0,
    windDirection: 0,
  },
  weatherSymbol: "",
};

const getWeatherCatIcon = (ts: TimeSerie) => {
  const timeOfDay = isTwilight(
    false,
    ts.validHour,
    ts.validDate,
    ts.sunrise,
    ts.sunset
  );
  const { icon } = WEATHER_CATEGORY[ts.weatherSymbol];
  return `/images/shadows/svg/${
    timeOfDay === "day"
      ? icon.day
      : timeOfDay === "night"
      ? icon.night
      : icon.midnightSun
  }.svg?url`;
};

// Forecast data wind direction comes as the direction the wind comes from.
// This converts the wind direction to the direction it is blowing towards.
export const getOppositeWindDirection = (windDirection: number) => {
  return (windDirection + 180) % 360;
};

// Parse weather data for the 24-hour forecast
export const parseTwentyFourHour = (timeSeries: TimeSerie[]) => {
  return timeSeries.reduce(
    (arr, ts, i) => (
      i < 24 &&
        arr.push({
          ...TWENTYFOUR_HOUR_DEFAULT,
          validHour: ts.validHour,
          validDate: ts.validDate,
          validDateTime: {
            month: ts.validDateTime.month,
            day: ts.validDateTime.day,
            hour: ts.validDateTime.hour,
          },
          temp: {
            ...TWENTYFOUR_HOUR_DEFAULT.temp,
            value: ts.temp,
          },
          rain: {
            ...TWENTYFOUR_HOUR_DEFAULT.rain,
            value: ts.rain,
          },
          wind: {
            ...TWENTYFOUR_HOUR_DEFAULT.wind,
            windSpeedValue: ts.windSpeed,
            gustValue: ts.gust,
            windDirection: getOppositeWindDirection(ts.windDirection),
          },
          weatherSymbol: getWeatherCatIcon(ts),
        }),
      arr
    ),
    [] as TwentyFourHour[]
  );
};

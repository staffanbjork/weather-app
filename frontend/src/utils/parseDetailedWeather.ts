import {  WIND_DEFAULTS, WEATHER_DEFAULTS, PRESSURE_DEFAULTS, HUMIDITY_DEFAULTS, ICON_PROPS, PRECIPITATION_CATEGORY } from "../assets/detailedWeather";
import { WeatherProps, TimeSerie, WeatherState } from "../types/types";
import { WEATHER_CATEGORY } from "../assets/weatherCategoryIcons";
import isTwilight from "./isTwilight";




// Get hour from specific TimeSerie object
export const getHour = (timeSeries: TimeSerie[], index: number) => {
  if (index >= 0 && index < timeSeries.length) {
    return timeSeries[index].validDateTime.hour.toString().padStart(2, "0");
  } else {
    return null;
  }
};


// Convert wind direction in degrees to a describing string in swedish.
export const getWindDirectionName = (degrees: number): string => {
  if ((degrees > 0 && degrees < 22.5) || (degrees >= 337.5 && degrees <= 360)) {
    return "Nordlig vind";
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return "Nordostlig vind";
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return "Ostlig vind";
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return "Sydostlig vind";
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return "Sydlig vind";
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return "Sydvästlig vind";
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return "Västlig vind";
  } else if (degrees >= 292.5 && degrees < 337.5) {
    return "Nordvästlig vind";
  } else if (degrees === 0) {
    return "Ingen vind";
  } else {
    return "";
  }
};



// Wind direction data comes in the format of direction the wind comes from
// Returns the opposite direction to be able to present the direction the wind blows to.
export const getOppositeWindDirection = (windDirection: number) => {
  return (windDirection + 180) % 360;
};



// Returns bootstrap icon code for property, with correct variation when available.
export const getIcon = (type: string, value: number) => {
  if (type === "temp") {
    if (value < 0) {
      return ICON_PROPS.tempOne;
    } else if (value >= 0 && value < 20) {
      return ICON_PROPS.tempTwo;
    } else if (value >= 20 && value < 30) {
      return ICON_PROPS.tempThree;
    } else if (value >= 30) {
      return ICON_PROPS.tempFour;
    }
  }
  if (type === "cloudiness") {
    return value < 5 ? ICON_PROPS.cloudinessOne : ICON_PROPS.cloudinessTwo;
  }
  return ICON_PROPS[type];
}

const getIconsAndCategories = (ts: TimeSerie, currentTime: boolean, iconType: string) => {
  const timeOfDay = isTwilight(currentTime, ts.validHour, ts.validDate, ts.sunrise, ts.sunset) === "night" ? "night" : "day";

  const wsCat = WEATHER_CATEGORY[ts.weatherSymbol].cat;
  const weatherIcon = WEATHER_CATEGORY[ts.weatherSymbol].icon[timeOfDay]

  return {
    wsCat, wsIcon: `/images/${iconType}/svg/${weatherIcon}.svg?url`,
  }
}



// Humidity props for the detailed forecast
const getHumidityProps = (humidity: number) => {
  return {
    ...HUMIDITY_DEFAULTS,
      value: humidity,
  };
};

// Air pressure props for the detailed forecast
const getPressureProps = (pressure: number) => {
  return {
    ...PRESSURE_DEFAULTS,
      value: pressure,
  };
};

// Props for the wind widget of the detailed forecast
const getWindProps = (ws: number, wd: number, g: number) => {
  return {
    ...WIND_DEFAULTS,
      windSpeed: { ...WIND_DEFAULTS.windSpeed, value: ws },
      windDirection: {
        ...WIND_DEFAULTS.windDirection,
        value: getOppositeWindDirection(wd), title: getWindDirectionName(wd),
          icon: ICON_PROPS.windDirection,
      },
      gust: { ...WIND_DEFAULTS.gust, value: g }
  };
}


// Props for the detailed weather forecast, currentWeather
const getWeatherProps = (ts: TimeSerie, currentTime: boolean) => {

  const { wsCat, wsIcon } = getIconsAndCategories(ts, currentTime, "shadows");

  const weather: WeatherProps = {
    validDate: ts.validDate,
    validHour: ts.validHour,
    weatherSymbol: {
      icon: wsIcon,
      category: wsCat,
    },
    temp: {
      ...WEATHER_DEFAULTS.temp,
      value: ts.temp,
      icon: getIcon("temp", ts.temp),
    },
    sunrise: {
      ...WEATHER_DEFAULTS.sunrise,
      value: ts.sunrise,
    },
    sunset: {
      ...WEATHER_DEFAULTS.sunset,
      value: ts.sunset,
    },
    solarNoon: {
      value: ts.solarNoon,
    },
    thunder: {
      ...WEATHER_DEFAULTS.thunder,
      value: ts.thunder,
    },
    precipitationCategory: {
      ...WEATHER_DEFAULTS.precipitationCategory,
      value: PRECIPITATION_CATEGORY[ts.precipitationCategory].cat,
      icon: PRECIPITATION_CATEGORY[ts.precipitationCategory].icon,
    },
    rain: {
      ...WEATHER_DEFAULTS.rain,
      value: ts.rain,
    },
    cloudiness: {
      ...WEATHER_DEFAULTS.cloudiness,
      value: `${ts.cloudiness} oktas / ${ts.cloudiness * 12.5} %`,
      icon: getIcon("cloudiness", ts.cloudiness),
    },
    visibility: {
      ...WEATHER_DEFAULTS.visibility,
      value: ts.visibility,
    }
  }
  return weather;
}

// Parse weather data for the detailed forecast
export const parseWeatherState = (ts: TimeSerie, index: number, prevHour: string | null, nextHour: string | null): WeatherState => {
  return {
    index: index,
    validHour: ts.validHour,
    prevHour: prevHour,
    nextHour: nextHour,
    validDate: ts.validDate,
    weather: getWeatherProps(ts, index === 0 ? true : false),
    wind: getWindProps(ts.windSpeed, ts.windDirection, ts.gust),
    pressure: getPressureProps(ts.pressure),
    humidity: getHumidityProps(ts.humidity),
  };
};



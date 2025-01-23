import axios from "axios";
import { WeatherApiResponse, TimeSerieParamsEnum, NewSerie } from "../types/types.js";
import SunCalc from "./SunCalc.js";
import ParseLocalTime from "./ParseLocalTime.js";


export default class WeatherService {
  longitude: string;
  latitude: string;
  parse: ParseLocalTime;
  sunCalc: SunCalc;
  #urlSegments: string[] = [
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/",
    "/lat/",
    "/data.json",
  ];

  constructor(longitude: string, latitude: string) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.parse = new ParseLocalTime();
    this.sunCalc = new SunCalc(this.longitude, this.latitude);
  }


  get urlQueryString() {
    return `${this.#urlSegments[0]}${this.longitude}${this.#urlSegments[1]}${
      this.latitude
    }${this.#urlSegments[2]}`;
  }

  /**
   * Fetch weather forecast data from SMHI, then parse data and calculate
   * solar times etc.
   * @returns 
   */
  async getWeatherData() {
    try {
      const { data } = await axios.get(this.urlQueryString);
      return this.#parseWeatherData(data);
    } catch (error) {
      console.error("error: " + error);
      return null;
    }
  }


  /**
   * Get times for sunrise, sunset and solar noon for the given date
   * at the given location, parsed in local time.
   * @param validDate 
   * @returns Strings with the solar times parsed in HH:MM format.
   */
  #getParsedSolarTimes(validDate: string) {
   
    const { sunriseUTC, sunsetUTC, solarNoonUTC } = this.sunCalc.sunCalc(validDate, this.parse.timeZoneOffset)

    return { sunriseString: this.parse.parseSolarTimeToString(sunriseUTC), sunsetString: this.parse.parseSolarTimeToString(sunsetUTC), solarNoonString: this.parse.parseSolarTimeToString(solarNoonUTC)}
  }

  /**
   * Parse the fetched forecast data and calculate times for sunrise,
   * sunset and solar noon, parse UTC times to local time.
   * @param data 
   * @returns Parsed object of fetched data.
   */
  #parseWeatherData(data: WeatherApiResponse) {
    const { referenceTime, timeSeries: timeSeriesData } = data;
    let timeSeries = [];
    let date = "";
    let sunrise = "";
    let sunset = "";
    let solarNoon = "";
    for (const serie of timeSeriesData) {

      const newSerie: NewSerie = {};
      newSerie["validHour"] = serie.validTime.slice(11, 13);
      const validDate = serie.validTime.slice(0, 10);
      newSerie["validDate"] = validDate;
      newSerie["validDateTime"] = this.parse.parseLocalDateTime(serie.validTime);

      if (date === "" || date !== validDate) {
        date = validDate;
        const { sunriseString, sunsetString, solarNoonString } = this.#getParsedSolarTimes(validDate);
        sunrise = sunriseString as string;
        sunset = sunsetString as string;
        solarNoon = solarNoonString as string;
      }
      newSerie.sunrise = sunrise;
      newSerie.sunset = sunset;
      newSerie.solarNoon = solarNoon;
      for (const p of serie.parameters) {
        if (TimeSerieParamsEnum[p.name as keyof typeof TimeSerieParamsEnum]) {
          newSerie[
            TimeSerieParamsEnum[p.name as keyof typeof TimeSerieParamsEnum]
          ] = p.values[0];
        }
      }

      timeSeries.push(newSerie);
    }
    return { referenceTime, timeSeries };
  }
}  
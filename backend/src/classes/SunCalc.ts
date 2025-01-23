import SolarTimesCalcs from "./SolarTimesCalcs.js";
import JulianCalcs from "./JulianCalcs.js";


export default class SunCalc {
  longitude: number;
  latitude: number;
  timeZone: number; // Defaults to 1 (CET), 2 for DST
  solar: SolarTimesCalcs;

  constructor(longitude: string, latitude: string) {
    this.longitude = parseFloat(longitude);
    this.latitude = parseFloat(latitude);
    this.timeZone = 1;
    this.solar = new SolarTimesCalcs();
  }


  get lon() {
    return this.longitude;
  }
  get lat() {
    return this.latitude;
  }

  // Check if value is int or float
  #isNumber(value: number) {
    return /^(?:[0-9]+|[0-9]+.[0-9]+)$/.test(value.toString()) ? true : false;
  }



  /**
   * Calculate local time of sunrise, sunset and solar noon for a given
   * location and date.
   * @param dateString 
   * @param timeZoneOffset 
   * @returns Solar times in UTC.
   */
  sunCalc(dateString: string, timeZoneOffset: number) {
    this.timeZone = timeZoneOffset;
    const date = new Date(dateString);
    
    const julianDay = JulianCalcs.getJulianDay(date);
    const solarNoonUTC = this.#calcSolNoon(julianDay);
    const sunriseUTC = this.#calcSunriseSet(true, julianDay);
    const sunsetUTC = this.#calcSunriseSet(false, julianDay);

    return {solarNoonUTC, sunriseUTC, sunsetUTC}
  }


  /**
   * Calculate solar noon for the given date.
   * @param julianDay 
   * @returns Solar noon in minutes.
   */
  #calcSolNoon(julianDay: number) {
    const tNoon = JulianCalcs.calcTimeJulianCent(julianDay - this.lon / 360.0);
    let eqTime = this.solar.calcEquationOfTime(tNoon);
    const solNoonOffset = 720.0 - this.lon * 4 - eqTime; // in minutes
    const newt = JulianCalcs.calcTimeJulianCent(
      julianDay - 0.5 + solNoonOffset / 1440.0
    );
    eqTime = this.solar.calcEquationOfTime(newt);
    let solNoonLocal = 720 - this.lon * 4 - eqTime + this.timeZone * 60.0; // in minutes
    while (solNoonLocal < 0.0) {
      solNoonLocal += 1440.0;
    }
    while (solNoonLocal >= 1440.0) {
      solNoonLocal -= 1440.0;
    }
    return solNoonLocal;
  }

  
  /**
   * Calculate UTC time of sunrise/sunset for the given date and location.
   * @param sunRise 
   * @param julianDay 
   * @returns Local UTC time in minutes.
   */
  #calcSunriseSetUTC(sunRise: boolean, julianDay: number) {
    const julianCents = JulianCalcs.calcTimeJulianCent(julianDay);
    const eqTime = this.solar.calcEquationOfTime(julianCents);
    const solarDecclination = this.solar.calcSunDeclination(julianCents);
    let hourAngle = this.solar.calcHourAngleSunrise(
      this.lat,
      solarDecclination
    );
    if (!sunRise) hourAngle = -hourAngle;
    const delta = this.lon + this.solar.radToDeg(hourAngle);
    const timeUTC = 720 - 4.0 * delta - eqTime; // in minutes
    return timeUTC;
  }


  /**
   * Calculate local time of sunrise/sunset, sunRise = true for sunrise,
   * false for sunset.
   * @param sunRise 
   * @param julianDay 
   * @returns Local time in minutes or 0.0 for midnight sun.
   */
  #calcSunriseSet(sunRise: boolean, julianDay: number) {
    const timeUTC = this.#calcSunriseSetUTC(sunRise, julianDay);
    const newTimeUTC = this.#calcSunriseSetUTC(
      sunRise,
      julianDay + timeUTC / 1440.0
    );
    let timeLocal: number;
    if (this.#isNumber(newTimeUTC)) {
      timeLocal = newTimeUTC + this.timeZone * 60.0;
      if (timeLocal < 0.0 || timeLocal >= 1440.0) {
        const increment = timeLocal < 0 ? 1 : -1;
        while (timeLocal < 0.0 || timeLocal >= 1440.0) {
          timeLocal += increment * 1440.0;
        }
      }
    } else {
      // no sunrise/set found
      timeLocal = 0.0;
    }
    return timeLocal;
  }
}



export default class JulianCalcs {
 
  /**
   * Covert Julian day to centuries since J2000.0
   * @param julianDay
   * @returns Centuries since J2000.0
   */
  static calcTimeJulianCent(julianDay: number) {
    const T = (julianDay - 2451545.0) / 36525.0;
    return T;
  }



  /**
   * Calculate the Julian day number for given date,
   * used for astronimical calculations.
   * @param date
   * @returns Julian day.
   */
  static getJulianDay(date: Date) {
    const a = Math.floor((14 - (date.getMonth() + 1.0)) / 12);
    const y = date.getFullYear() + 4800 - a;
    const m = date.getMonth() + 1 + 12 * a - 3;
    const julianDay =
      date.getDate() +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;
    return julianDay;
  }
}


export default class SolarTimesCalcs {

  /**
   * Convert an angle in radians to degrees.
   * @param radians 
   * @returns Number of degrees.
   */
  radToDeg(radians: number) {
    return (180.0 * radians) / Math.PI;
  }

 
  /**
   * Convert an angle in degrees to radians.
   * @param degrees 
   * @returns Number of radians.
   */
  #degToRad(degrees: number) {
    return (Math.PI * degrees) / 180.0;
  }


  /**
   * Get geometric mean longitude of the sun.
   * @param julianCents
   * @returns Mean longitude in degrees.
   */
  #calcGeomMeanLongSun(julianCents: number) {
    let meanLongitude =
      280.46646 + julianCents * (36000.76983 + julianCents * 0.0003032);
    while (meanLongitude > 360.0) {
      meanLongitude -= 360.0;
    }
    while (meanLongitude < 0.0) {
      meanLongitude += 360.0;
    }
    return meanLongitude; 
  }


  /**
   * Calculate geometric mean anomaly of the sun.
   * @param julianCents
   * @returns Mean anomaly in degrees.
   */
  #calcGeomMeanAnomalySun(julianCents: number) {
    const M = 357.52911 + julianCents * (35999.05029 - 0.0001537 * julianCents);
    return M;
  }


  /**
   * Calculate eccentricity of earths orbit.
   * @param julianCents
   * @returns Unitless eccentricity.
   */
  #calcEccentricityEarthOrbit(julianCents: number) {
    const e =
      0.016708634 - julianCents * (0.000042037 + 0.0000001267 * julianCents);
    return e;
  }


  /**
   * Calculate the equation of center for the sun.
   * @param julianCents
   * @returns Equation of center in  degrees.
   */
  #calcSunEqOfCenter(julianCents: number) {
    // Julian cent. since J.2000.0
    const m = this.#calcGeomMeanAnomalySun(julianCents);
    const mrad = this.#degToRad(m);
    const sinm = Math.sin(mrad);
    const sin2m = Math.sin(mrad + mrad);
    const sin3m = Math.sin(mrad + mrad + mrad);
    const C =
      sinm * (1.914602 - julianCents * (0.004817 + 0.000014 * julianCents)) +
      sin2m * (0.019993 - 0.000101 * julianCents) +
      sin3m * 0.000289;
    return C; // in degrees
  }


  /**
   * Calculate true longitude of the sun.
   * @param julianCents
   * @returns True longitude in degrees.
   */
  #calcSunTrueLong(julianCents: number) {
    const meanLong = this.#calcGeomMeanLongSun(julianCents);
    const c = this.#calcSunEqOfCenter(julianCents);
    const O = meanLong + c;
    return O;
  }
  
  
  /**
   * Calculate apparent longitude of the sun.
   * @param julianCents
   * @returns Apparent longitude in degrees.
   */
  #calcSunApparentLong(julianCents: number) {
    const trueLong = this.#calcSunTrueLong(julianCents);
    const omega = 125.04 - 1934.136 * julianCents;
    const lambda =
      trueLong - 0.00569 - 0.00478 * Math.sin(this.#degToRad(omega));
    return lambda;
  }


  /**
   * Calculate mean obliquity of the ecliptic.
   * @param julianCents
   * @returns Obliquity in degrees.
   */
  #calcMeanObliquityOfEcliptic(julianCents: number) {
    const seconds =
      21.448 -
      julianCents * (46.815 + julianCents * (0.00059 - julianCents * 0.001813));
    const eclipticObliquity = 23.0 + (26.0 + seconds / 60.0) / 60.0;
    return eclipticObliquity;
  }


  /**
   * Calculate the corrected obliquity of the ecliptic.
   * @param julianCents
   * @returns Obliquity in degrees.
   */
  #calcObliquityCorrection(julianCents: number) {
    const eclipticObliquity = this.#calcMeanObliquityOfEcliptic(julianCents);
    const omega = 125.04 - 1934.136 * julianCents;
    const correctedEO =
      eclipticObliquity + 0.00256 * Math.cos(this.#degToRad(omega));
    return correctedEO;
  }


  /**
   * Calculate the declination of the sun.
   * @param julianCents
   * @returns Declination in degrees.
   */
  calcSunDeclination(julianCents: number) {
    const eclipticObliquity = this.#calcObliquityCorrection(julianCents);
    const apparentLong = this.#calcSunApparentLong(julianCents);
    const sint =
      Math.sin(this.#degToRad(eclipticObliquity)) *
      Math.sin(this.#degToRad(apparentLong));
    const theta = this.radToDeg(Math.asin(sint));
    return theta;
  }


  /**
   * Calculate difference between true solar time and mean solar time.
   * @param julianCents
   * @returns The difference in minutes of time.
   */
  calcEquationOfTime(julianCents: number) {
    const eclipticObliquity = this.#calcObliquityCorrection(julianCents);
    const meanLong = this.#calcGeomMeanLongSun(julianCents);
    const eccentricity = this.#calcEccentricityEarthOrbit(julianCents);
    const meanAnomaly = this.#calcGeomMeanAnomalySun(julianCents);

    let y = Math.tan(this.#degToRad(eclipticObliquity) / 2.0);
    y *= y;

    const sin2l0 = Math.sin(2.0 * this.#degToRad(meanLong));
    const sinm = Math.sin(this.#degToRad(meanAnomaly));
    const cos2l0 = Math.cos(2.0 * this.#degToRad(meanLong));
    const sin4l0 = Math.sin(4.0 * this.#degToRad(meanLong));
    const sin2m = Math.sin(2.0 * this.#degToRad(meanAnomaly));

    const equationOfTime =
      y * sin2l0 -
      2.0 * eccentricity * sinm +
      4.0 * eccentricity * y * sinm * cos2l0 -
      0.5 * y * y * sin4l0 -
      1.25 * eccentricity * eccentricity * sin2m;
    return this.radToDeg(equationOfTime) * 4.0;
  }


  /**
   * Calculate the hour angle of the sun at sunrise for this latitude.
   * @param latitudeOfObserver
   * @param solarDeclinationAngle
   * @returns HA(Hour Angle) in radians.
   */
  calcHourAngleSunrise(
    latitudeOfObserver: number,
    solarDeclinationAngle: number
  ) {
    const latitudeInRadians = this.#degToRad(latitudeOfObserver);
    const solarDeclinationInRadians = this.#degToRad(solarDeclinationAngle);
    const hourAngleArgs =
      Math.cos(this.#degToRad(90.833)) /
        (Math.cos(latitudeInRadians) * Math.cos(solarDeclinationInRadians)) -
      Math.tan(latitudeInRadians) * Math.tan(solarDeclinationInRadians);
    const HA = Math.acos(hourAngleArgs);
    return HA;
  }
}
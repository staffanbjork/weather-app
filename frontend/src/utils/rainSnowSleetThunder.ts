



export const rainSnowSleetThunder = {
  rain: [
    { codes: [8, 12, 18, 22], setting: 100 }, // Light rain
    { codes: [9, 11, 13, 19, 23], setting: 150 }, // Rain
    { codes: [10, 14, 20, 24], setting: 270 }, // Heavy rain
  ],
  snow: [
    { codes: [12, 15, 22, 25], setting: 25 }, // Light snow
    { codes: [13, 16, 23, 26], setting: 50 }, // Snow
    { codes: [14, 17, 24, 27], setting: 100 }, // Heavy snow
  ],
  sleet: [{ codes: [12, 13, 14, 22, 23, 24], setting: 1 }],
  thunder: [{ codes: [11, 21], setting: 1 }],
  weatherSetting(
    ws: number,
    weatherType: { codes: number[]; setting: number }[]
  ) {
    for (const type of weatherType) {
      if (type.codes.includes(ws)) {
        return type.setting;
      }
    }
    return 0;
  },
  getSettings(ws: number) {
    const isThunder = this.weatherSetting(ws, this.thunder) > 0 ? true : false;
    const isSleet = this.weatherSetting(ws, this.sleet) > 0 ? true : false;
    const rain = this.weatherSetting(ws, this.rain);
    const snow = this.weatherSetting(ws, this.snow);
    const isRaining = rain > 0 ? true : false;
    const isSnowing = snow > 0 ? true : false;
    return { isThunder, isSleet, isRaining, isSnowing, rain, snow };
  },
};

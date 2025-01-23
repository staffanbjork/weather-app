

//---------- GeoTypes ------------

export interface GeoData {
  locality?: Locality | Location;
  longitude?: Longitude;
  latitude?: Latitude;
}

export type Locality = {
  id: number;
  locality: string;
  municipality: string;
  county: string;
  latitude: string;
  longitude: string;
};

export type Position = {
  coords: {
    longitude: number;
    latitude: number;
  };
};
export type Longitude = string;
export type Latitude = string;
export type Coordinates = {
  longitude: Longitude;
  latitude: Latitude;
};
export type FullCoordinates = Coordinates | null;
export type FixedCoordinates = Coordinates | null;
export type GeoError = object;
export type LocationQuery = Coordinates;

export interface Location {
  locality: string;
  municipality: string;
  county: string;
  latitude: string;
  longitude: string;
  id: number;
  distance: number;
}



// ---------- Weather Data types --------------

export type FetchConfig = {
  method: string;
  url: string;
};

export type SerieParameters = Parameter;

export type Parameter = { [key: string]: string };

export type ValidDateTime = {
  day: number;
  month: number;
  hour: number;
}

export interface TimeSerie {
  validDateTime: {
    day: number;
    month: number;
    hour: number;
  }
  validHour: string;
  validDate: string;
  weatherSymbol: number;
  gust: number;
  pressure: number;
  precipitationCategory: number;
  rain: number;
  humidity: number;
  snow: number;
  temp: number;
  thunder: number;
  visibility: number;
  cloudiness: number;
  windDirection: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  solarNoon: string;
  [key: string]: string | number | ValidDateTime;
}

export interface WeatherDataResponse {
  weatherData: {
    referenceTime: string;
    timeSeries: TimeSerie[];
  },
  location: Location;
}


// Outlet context / weather data
export type ContextType = { data: WeatherDataResponse | undefined };





// ------------- Component props --------------------


export interface GaugeProps {
  variant: string;
  value: number;
  unit: string;
}
export type SvgWeatherIcon = {
  path: string;
  pathTwo?: string;
  windDirection?: number;
}
export interface WeatherProps {
  validDate: string;
  validHour: string;
  weatherSymbol: {
    icon: string;
    category: string;
  };
  temp: {
    value: number;
    unit: string;
    icon: SvgWeatherIcon;
  };
  sunrise: {
    title: string;
    value: string;
    icon: SvgWeatherIcon;
  };
  sunset: {
    title: string;
    value: string;
    icon: SvgWeatherIcon;
  };
  solarNoon: {
    value: string;
  };
  thunder: {
    title: string;
    value: number;
    unit: string;
    icon: SvgWeatherIcon;
  };
  precipitationCategory: {
    icon: SvgWeatherIcon;
    value: string;
  };
  rain: {
    title: string;
    value: number;
    unit: string;
    icon: SvgWeatherIcon;
  };
  cloudiness: {
    title: string;
    value: string;
    icon: SvgWeatherIcon;
  };
  visibility: {
    title: string;
    value: number;
    unit: string;
    icon: SvgWeatherIcon;
  };
}


export interface PressureProps {
  variant: string;
  title: string;
  icon: SvgWeatherIcon;
  value: number;
  unit: string;
}

export interface HumidityProps {
  variant: string;
  title: string;
  icon: SvgWeatherIcon;
  value: number;
  unit: string;
}

export interface WidgetProps {
  variant: string;
  title: string;
  icon: SvgWeatherIcon;
  value: number;
  unit: string;
}

export type WeatherState = {
  index: number;
  validHour: string;
  prevHour: string | null;
  nextHour: string | null;
  validDate: string;
  weather: WeatherProps;
  wind: WindProps;
  humidity: HumidityProps;
  pressure: PressureProps;
}

export type DayWeatherData = {
  dayAndDate: string;
  highestTemp: number;
  lowestTemp: number;
  windSpeed: number;
  gust: number;
  weatherSymbol: string;
};


export type WindProps = {
  icon: SvgWeatherIcon;
  windSpeed: {
    value: number;
    unit: string;
  };
  windDirection: {
    title: string;
    value: number;
    icon: SvgWeatherIcon;
  };
  gust: {
    value: number;
    unit: string;
  };
};

export type CategoryIndex = number;
export interface WeatherCategoryProps {
  cat: string;
  icon: {
    day: string;
    night: string;
    midnightSun: string;
    [key: string]: string;
  };
}


export interface WeatherCategoryUIProps {
  clouds: string;
  rain: number;
  snow: number;
  thunder: boolean;
}

export type PrecipitationCategoryProps = {
  cat: string;
  icon: {
    path: string;
    pathTwo?: string;
  };
};
export type TwentyFourHour = {
  validHour: string;
  validDate: string;
  validDateTime: {
    day: number;
    month: number;
    hour: number;
  };
  temp: {
    unit: string;
    value: number;
  };
  rain: {
    unit: string;
    value: number;
  };
  wind: {
    unit: string;
    windSpeedValue: number;
    gustValue: number;
    windDirection: number;
  };
  weatherSymbol: string;
};
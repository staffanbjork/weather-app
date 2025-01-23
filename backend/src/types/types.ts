export type Coordinates = {
  longitude: string;
  latitude: string;
};

export type Locality = {
  id: number;
  locality: string;
  municipality: string;
  county: string;
  latitude: string;
  longitude: string;
};

export type LocalityResults = Locality[];

export enum TimeSerieParamsEnum {
  Wsymb2 = "weatherSymbol",
  gust = "gust",
  msl = "pressure",
  pcat = "precipitationCategory",
  pmean = "rain",
  r = "humidity",
  t = "temp",
  tstm = "thunder",
  vis = "visibility",
  tcc_mean = "cloudiness",
  wd = "windDirection",
  ws = "windSpeed",
}

export type Parameter = {
  name: string;
  values: string[];
  [key: string]: string | string[];
};
export type Parameters = Parameter[];

export type WeatherApiResponse = {
  referenceTime: string;
  timeSeries: TimeSeries;
};

export type TimeSeries = [
  {
    validTime: string;
    parameters: Parameters;
  }
];


export type ValidDateTime = {
  month: number;
  day: number;
  hour: number;
};
export interface NewSerie {
  [key: string]: string | undefined | ValidDateTime;
}
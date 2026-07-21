export type WeatherApiCondition = {
  text: string;
  code: number;
};

export type WeatherApiLocation = {
  name: string;
  country: string;
  tz_id: string;
  localtime_epoch: number;
};

export type WeatherApiCurrent = {
  temp_c: number;
  wind_kph: number;
  wind_degree: number;
};

export type WeatherApiSearchCity = {
  id: number;
  name: string;
  country: string;
};

export type WeatherApiError = {
  error: {
    code: number;
    message: string;
  };
};

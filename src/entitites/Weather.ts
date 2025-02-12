export class Weather {
  constructor(
    public temperature: number,
    public condition: string,
    public icon: number,
    public perceivedTemperature: number,
    public min: number,
    public max: number,
  ) {}
}

export class HourlyWeather {
  constructor(
    public time: string,
    public temperature: number,
    public condition: string,
    public icon: string,
  ) {}
}

export class WeatherReport {
  constructor(
    public currentWeather: Weather,
    public hourlyWeather: HourlyWeather[],
  ) {}
}

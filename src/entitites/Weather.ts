export class Weather {
  constructor(
    public temperature: number, // 기온
    public condition: number, // 날씨 상태
    public perceivedTemperature: number, // 체감기온
    public min: number, // 1일 최저 기온
    public max: number, // 1일 최대 기온
    public windDirection: string, // 풍향
    public windSpeed: number, // 풍속
    public rainWeight: number, // 강수량
    public humidity: number, // 습도
    public rain: number, // 강수형태
    public rainPercent: number, // 강수 확률
    public snowWeitgh: number, // 석절량
  ) {}
}

export class CurWeather {
  constructor(
    public temperature: number, // 기온
    public condition: number, // 날씨 상태
    public perceivedTemperature: number, // 체감기온
    public rainWeight: number, // 강수량
    public humidity: number, // 습도
    public rain: number, // 강수형태
    public windDirection: string, // 풍향
    public windSpeed: number, // 풍속
  ) {}
}

export type Weathers = {[day: string]: {[time: string]: Weather}};

export class WeatherReport {
  constructor(
    public currentWeather: CurWeather,
    public hourlyWeather: Weathers,
  ) {}
}

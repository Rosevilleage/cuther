export class Weather {
  constructor(
    public time: string, // 시간
    public temperature: number, // 기온
    public condition: number, // 날씨 상태
    public perceivedTemperature: number, // 체감기온
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
    public perceivedTemperature: number, // 체감기온
    public rainWeight: number, // 강수량
    public humidity: number, // 습도
    public rain: number, // 강수형태
    public windDirection: string, // 풍향
    public windSpeed: number, // 풍속
  ) {}
}

export class DailyWeathers {
  constructor(
    public date: string,
    public amCon: string,
    public pmCon: string,
    public min: number,
    public max: number,
  ) {}
}

export type HourlyWeathers = {
  [day: string]: {
    min: number | undefined;
    max: number | undefined;
    weathers: Weather[];
  };
};

export class WeatherReport {
  constructor(
    public currentWeather: CurWeather,
    public dailyWeathers: HourlyWeathers,
  ) {}
}

export type WeatherCondition =
  | 'rain'
  | 'rainSnow'
  | 'snow'
  | 'clear'
  | 'littleCloud'
  | 'cloud';

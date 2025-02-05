export class HourlyWeather {
  constructor(
    public time: string,
    public temperature: number,
    public condition: string,
    public icon: string,
  ) {}
}

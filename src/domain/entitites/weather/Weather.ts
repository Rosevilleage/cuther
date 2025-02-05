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

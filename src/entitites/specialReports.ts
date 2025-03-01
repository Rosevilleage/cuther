export class SpecialReport {
  constructor(
    public title: string,
    public content: string,
    public date: string,
  ) {}
}

export class PreReport {
  constructor(
    public title: string,
    public children: {
      date: string;
      content: string;
    }[],
  ) {}
}

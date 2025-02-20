const RE: number = 6371.00877; // 지구 반경(km)
const GRID: number = 5.0; // 격자 간격(km)
const SLAT1: number = 30.0; // 투영 위도1(degree)
const SLAT2: number = 60.0; // 투영 위도2(degree)
const OLON: number = 126.0; // 기준점 경도(degree)
const OLAT: number = 38.0; // 기준점 위도(degree)
const XO: number = 43; // 기준점 X좌표(GRID)
const YO: number = 136; // 기준점 Y좌표(GRID)

type Coordinate =
  | {lat: number; lng: number; nx: number; ny: number}
  | {nx: number; ny: number; lat: number; lng: number};

type ConversionType = 'toXY' | 'toLL';

export function dfsXYConv(
  code: ConversionType,
  v1: number,
  v2: number,
): Coordinate {
  const DEGRAD: number = Math.PI / 180.0;
  const RADDEG: number = 180.0 / Math.PI;

  const re: number = RE / GRID;
  const slat1: number = SLAT1 * DEGRAD;
  const slat2: number = SLAT2 * DEGRAD;
  const olon: number = OLON * DEGRAD;
  const olat: number = OLAT * DEGRAD;

  const sn: number =
    Math.log(Math.cos(slat1) / Math.cos(slat2)) /
    Math.log(
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
        Math.tan(Math.PI * 0.25 + slat1 * 0.5),
    );
  const sf: number =
    (Math.pow(Math.tan(Math.PI * 0.25 + slat1 * 0.5), sn) * Math.cos(slat1)) /
    sn;
  const ro: number =
    (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn);

  if (code === 'toXY') {
    const ra: number =
      (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5), sn);
    let theta: number = v2 * DEGRAD - olon;
    theta = ((theta + Math.PI) % (2 * Math.PI)) - Math.PI;
    theta *= sn;

    return {
      lat: v1,
      lng: v2,
      nx: Math.floor(ra * Math.sin(theta) + XO + 0.5),
      ny: Math.floor(ro - ra * Math.cos(theta) + YO + 0.5),
    };
  } else {
    const xn: number = v1 - XO;
    const yn: number = ro - v2 + YO;
    const ra: number = Math.sqrt(xn * xn + yn * yn);
    const alat: number =
      2.0 * Math.atan(Math.pow((re * sf) / ra, 1.0 / sn)) - Math.PI * 0.5;
    const theta: number = Math.abs(xn) <= 0.0 ? 0.0 : Math.atan2(xn, yn);
    const alon: number = theta / sn + olon;

    return {
      nx: v1,
      ny: v2,
      lat: alat * RADDEG,
      lng: alon * RADDEG,
    };
  }
}

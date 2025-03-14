import {MidTaRegId, Region} from '../model/geoLocationStore';

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

const GANG_EAST = [
  '고성군',
  '속초시',
  '양양군',
  '강릉시',
  '동해시',
  '삼척시',
  '태백시',
];

export function getMidWeatherRegId(region: Region) {
  switch (region.topRegion) {
    case '서울특별시':
    case '인천광역시':
    case '경기도':
      return '11B00000';
    case '부산광역시':
    case '울산광역시':
    case '경상남도':
      return '11H20000';
    case '대구광역시':
    case '경상북도':
      return '11H10000';
    case '광주광역시':
    case '전라남도':
      return '11F20000';
    case '전라북도':
    case '전북특별자치도':
      return '11F10000';
    case '대전광역시':
    case '세종특별자치시':
    case '세종시':
    case '충청남도':
      return '11C20000';
    case '충청북도':
      return '11C10000';
    case '강원특별자치도':
    case '강원도':
      if (GANG_EAST.includes(region.middleRegion)) {
        return '11D20000';
      }
      return '11D10000';
    case '제주특별자치도':
      return '11G00000';
    default:
      return;
  }
}

export function getStnId(region: string) {
  switch (region) {
    case '서울특별시':
    case '인천광역시':
    case '경기도':
      return 109;
    case '부산광역시':
    case '울산광역시':
    case '경상남도':
      return 159;
    case '대구광역시':
    case '경상북도':
      return 143;
    case '광주광역시':
    case '전라남도':
      return 156;
    case '전라북도':
    case '전북특별자치도':
      return 146;
    case '대전광역시':
    case '세종특별자치시':
    case '세종시':
    case '충청남도':
      return 133;
    case '충청북도':
      return 131;
    case '강원특별자치도':
    case '강원도':
      return 105;
    case '제주특별자치도':
      return 184;
    default:
      return;
  }
}

const midTaRegionCodes = {
  백령도: '11A00101',
  서울: '11B10101',
  과천: '11B10102',
  광명: '11B10103',
  강화: '11B20101',
  김포: '11B20102',
  인천: '11B20201',
  시흥: '11B20202',
  안산: '11B20203',
  부천: '11B20204',
  의정부: '11B20301',
  고양: '11B20302',
  양주: '11B20304',
  파주: '11B20305',
  동두천: '11B20401',
  연천: '11B20402',
  포천: '11B20403',
  가평: '11B20404',
  구리: '11B20501',
  남양주: '11B20502',
  양평: '11B20503',
  하남: '11B20504',
  수원: '11B20601',
  안양: '11B20602',
  오산: '11B20603',
  화성: '11B20604',
  성남: '11B20605',
  평택: '11B20606',
  의왕: '11B20609',
  군포: '11B20610',
  안성: '11B20611',
  용인: '11B20612',
  이천: '11B20701',
  광주: '11B20702',
  여주: '11B20703',
  충주: '11C10101',
  진천: '11C10102',
  음성: '11C10103',
  제천: '11C10201',
  단양: '11C10202',
  청주: '11C10301',
  보은: '11C10302',
  괴산: '11C10303',
  증평: '11C10304',
  추풍령: '11C10401',
  영동: '11C10402',
  옥천: '11C10403',
  서산: '11C20101',
  태안: '11C20102',
  당진: '11C20103',
  홍성: '11C20104',
  보령: '11C20201',
  서천: '11C20202',
  천안: '11C20301',
  아산: '11C20302',
  예산: '11C20303',
  대전: '11C20401',
  공주: '11C20402',
  계룡: '11C20403',
  세종: '11C20404',
  부여: '11C20501',
  청양: '11C20502',
  금산: '11C20601',
  논산: '11C20602',
} as const;

export function getMidTaRegId(region: Region) {
  let result: MidTaRegId | undefined;
  for (let regionName in midTaRegionCodes) {
    if (result) {
      break;
    }

    if (region.topRegion.includes(regionName)) {
      return midTaRegionCodes[regionName as keyof typeof midTaRegionCodes];
    }
  }
}

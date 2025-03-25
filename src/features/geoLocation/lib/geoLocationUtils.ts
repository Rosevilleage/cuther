import {Region} from '../model/geoLocationStore';

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
  switch (region.area1) {
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
      if (GANG_EAST.includes(region.area2)) {
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
  철원: '11D10101',
  화천: '11D10102',
  인제: '11D10201',
  양구: '11D10202',
  춘천: '11D10301',
  홍천: '11D10302',
  원주: '11D10401',
  횡성: '11D10402',
  영월: '11D10501',
  정선: '11D10502',
  평창: '11D10503',
  대관령: '11D20201',
  태백: '11D20301',
  속초: '11D20401',
  고성: '11D20402',
  양양: '11D20403',
  강릉: '11D20501',
  동해: '11D20601',
  삼척: '11D20602',
  울릉도: '11E00101',
  독도: '11E00102',
  전주: '11F10201',
  익산: '11F10202',
  정읍: '11F10203',
  완주: '11F10204',
  장수: '11F10301',
  무주: '11F10302',
  진안: '11F10303',
  남원: '11F10401',
  임실: '11F10402',
  순창: '11F10403',
  군산: '21F10501',
  김제: '21F10502',
  고창: '21F10601',
  부안: '21F10602',
  함평: '21F20101',
  영광: '21F20102',
  진도: '21F20201',
  완도: '11F20301',
  해남: '11F20302',
  강진: '11F20303',
  장흥: '11F20304',
  여수: '11F20401',
  광양: '11F20402',
  고흥: '11F20403',
  보성: '11F20404',
  순천시: '11F20405',
  장성: '11F20502',
  나주: '11F20503',
  담양: '11F20504',
  화순: '11F20505',
  구례: '11F20601',
  곡성: '11F20602',
  순천: '11F20603',
  흑산도: '11F20701',
  목포: '21F20801',
  영암: '21F20802',
  신안: '21F20803',
  무안: '21F20804',
  성산: '11G00101',
  제주: '11G00201',
  성판악: '11G00302',
  서귀포: '11G00401',
  고산: '11G00501',
  이어도: '11G00601',
  추자도: '11G00800',
  울진: '11H10101',
  영덕: '11H10102',
  포항: '11H10201',
  경주: '11H10202',
  문경: '11H10301',
  상주: '11H10302',
  예천: '11H10303',
  영주: '11H10401',
  봉화: '11H10402',
  영양: '11H10403',
  안동: '11H10501',
  의성: '11H10502',
  청송: '11H10503',
  김천: '11H10601',
  구미: '11H10602',
  군위: '11H10707',
  고령: '11H10604',
  성주: '11H10605',
  대구: '11H10701',
  영천: '11H10702',
  경산: '11H10703',
  청도: '11H10704',
  칠곡: '11H10705',
  울산: '11H20101',
  양산: '11H20102',
  부산: '11H20201',
  창원: '11H20301',
  김해: '11H20304',
  통영: '11H20401',
  사천: '11H20402',
  거제: '11H20403',
  남해: '11H20405',
  함양: '11H20501',
  거창: '11H20502',
  합천: '11H20503',
  밀양: '11H20601',
  의령: '11H20602',
  함안: '11H20603',
  창녕: '11H20604',
  진주: '11H20701',
  산청: '11H20703',
  하동: '11H20704',
  사리원: '11I10001',
  신계: '11I10002',
  해주: '11I20001',
  개성: '11I20002',
  장연: '11I20003',
  용연: '11I20003',
  신의주: '11J10001',
  삭주: '11J10002',
  수풍: '11J10002',
  구성: '11J10003',
  자성: '11J10004',
  중강: '11J10004',
  강계: '11J10005',
  희천: '11J10006',
  평양: '11J20001',
  진남포: '11J20002',
  남포: '11J20002',
  안주: '11J20004',
  양덕: '11J20005',
  청진: '11K10001',
  웅기: '11K10002',
  선봉: '11K10002',
  성진: '11K10003',
  김책: '11K10003',
  무산: '11K10004',
  삼지연: '11K10004',
  함흥: '11K20001',
  장진: '11K20002',
  북청: '11K20003',
  신포: '11K20003',
  혜산: '11K20004',
  풍산: '11K20005',
  원산: '11L10001',
  장전: '11L10002',
  평강: '11L10003',
  경기_광주: '11B20702', // 경기도 광주
  전남_광주: '11F20501', // 광주광역시
  강원_고성: '11D20402', // 강원도 고성
  경남_고성: '11H20404', // 경상남도 고성
  북강원_고성: '11L10002', // 북한 고성
} as const;

export type MidTaRegId =
  (typeof midTaRegionCodes)[keyof typeof midTaRegionCodes];

export function getMidTaRegId(region: Region) {
  // 도서 지역 처리
  if (
    region.area1 === '인천광역시' &&
    region.area2 === '옹진군' &&
    region.area3 === '백령면'
  ) {
    return midTaRegionCodes.백령도;
  }

  if (region.area1 === '경상북도' && region.area2 === '울릉군') {
    if (region.area3 === '울릉읍' && region.area4 === '독도리') {
      return midTaRegionCodes.독도;
    }
    if (region.area3 === '울릉읍' && region.area4 === '저동리') {
      return midTaRegionCodes.울릉도;
    }
  }

  if (region.area1 === '제주특별자치도') {
    if (region.area2 === '제주시' && region.area3 === '추자면') {
      return midTaRegionCodes.추자도;
    }
    if (
      region.area2 === '서귀포시' &&
      region.area3 === '대정읍' &&
      region.area4 === '가파리'
    ) {
      return midTaRegionCodes.진도;
    }
  }

  // 특별시/광역시 처리
  if (region.area1.includes('광역시')) {
    const cityName = region.area1.replace('광역시', '').trim();
    if (cityName === '광주') {
      return midTaRegionCodes.전남_광주;
    }
    return midTaRegionCodes[cityName as keyof typeof midTaRegionCodes];
  }

  // 도/시 구분이 필요한 지역 처리
  const middleRegion = region.area2.replace(/(시|군|구)$/, '').trim();

  // 광주 처리
  if (middleRegion === '광주') {
    if (region.area1.includes('경기')) {
      return midTaRegionCodes.경기_광주;
    }
    if (region.area1.includes('전남') || region.area1.includes('광주')) {
      return midTaRegionCodes.전남_광주;
    }
  }

  // 고성 처리
  if (middleRegion === '고성') {
    if (region.area1.includes('강원')) {
      return midTaRegionCodes.강원_고성;
    }
    if (region.area1.includes('경남')) {
      return midTaRegionCodes.경남_고성;
    }
    if (region.area1.includes('북강원')) {
      return midTaRegionCodes.북강원_고성;
    }
  }

  // 일반적인 경우: 중간 지역명으로 검색
  const regionKey = Object.keys(midTaRegionCodes).find(
    key => !key.includes('_') && key === middleRegion,
  );
  if (regionKey) {
    return midTaRegionCodes[regionKey as keyof typeof midTaRegionCodes];
  }

  // 매칭되는 코드가 없을 경우 상위 지역 기준으로 기본값 반환
  switch (region.area1) {
    case '서울특별시':
      return midTaRegionCodes.서울;
    case '부산광역시':
      return midTaRegionCodes.부산;
    case '대구광역시':
      return midTaRegionCodes.대구;
    case '인천광역시':
      return midTaRegionCodes.인천;
    case '광주광역시':
      return midTaRegionCodes.전남_광주;
    case '대전광역시':
      return midTaRegionCodes.대전;
    default:
      return midTaRegionCodes.서울;
  }
}

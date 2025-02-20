interface WeatherDTO<T extends WeatherFcstItemDTO | WeatherNcstItemDTO> {
  response: {
    body: {
      dataType: 'XML' | 'JSON';
      numOfRows: number;
      pageNo: number;
      totalCount: number;
      items: {
        item: T[];
      };
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
}

interface WeatherFcstItemDTO<
  T extends UltraSrtFcstCategory | VilageFcstCategory,
> {
  baseDate: string;
  baseTime: string;
  category: T;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

interface WeatherNcstItemDTO {
  baseDate: string;
  baseTime: string;
  category: UltraSrtNcstCategory;
  nx: number;
  ny: number;
  obsrValue: string;
}

type VilageFcstCategory =
  | 'POP' // 강수확률 %
  | 'PTY' // 강수형태 ℃ 0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 소나기
  | 'PCP' // 1시강 강수량 mm
  | 'REH' // 습도 %
  | 'SNO' // 1시간 신적설 cm
  | 'SKY' // 하늘상태 1: 맑음, 3: 구름많음, 4: 흐림
  | 'TMP' //1시간 기온 ℃
  | 'TMN' // 일 최저기온 ℃
  | 'TMX' // 일 최고기온 ℃
  | 'UUU' // 풍속 동서 m/s
  | 'VVV' // 풍속 남북 m/s
  | 'WAV' // 파고 m
  | 'VEC' // 풍향
  | 'WSD'; // 풍속 m/s

type UltraSrtNcstCategory =
  | 'T1H' // 기온
  | 'RN1' // 1시간 강수량
  | 'UUU' // 풍속 동서
  | 'VVV' // 풍속 남북
  | 'REH' // 습도
  | 'PTY' // 강수형태
  | 'VEC' // 풍향
  | 'WSD'; // 풍속

export type VilageFcst = WeatherDTO<WeatherFcstItemDTO<VilageFcstCategory>>;
export type UltraNcst = WeatherDTO<WeatherNcstItemDTO>;

export type VilageFcstItem = WeatherFcstItemDTO<VilageFcstCategory>;
export type UltraNcstItem = WeatherNcstItemDTO;

// 실황 => 현재 온도, 풍속, 습도
// 초단기 => 하늘 상태, 온도, 시간
// 단기 => 하늘 상태, 최고|최저 온도, 습도, 강수 확률, 상수량, 적셜량, 시간별: { 하늘 상태, 온도, 시간 }

export type BaseDate =
  `${number}${number}${number}${number}${number}${number}${number}${number}`;
export type BaseTime = `${number}${number}${number}${number}`;

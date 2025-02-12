export interface FcstDTO<T extends UltraSrtFcstCategory | VilageFcstCategory> {
  response: {
    body: {
      dataType: 'XML' | 'JSON';
      numOfRows: number;
      pageNo: number;
      totalCount: number;
      items: {
        item: {
          baseDate: string;
          baseTiem: string;
          category: T;
          fcstDate: string;
          fcstTime: string;
          fcstValue: string;
          nx: number;
          ny: number;
        }[];
      };
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
}

type UltraSrtFcstCategory =
  | 'T1H' // 기온
  | 'RN1' // 1시간 강수량
  | 'SKY' // 하늘 상태
  | 'UUU' // 동서 바람 성분
  | 'VVV' // 남북 바람 성분
  | 'REH' // 습도
  | 'PTY' // 강수형태
  | 'LGT' // 낙뢰
  | 'VEC' // 풍향
  | 'WSD'; // 풍속

type VilageFcstCategory =
  | 'POP' // 강수확률
  | 'PTY' // 강수형태
  | 'PCP' // 1시강 강수량
  | 'REH' // 습도
  | 'SNO' // 1시간 신적설
  | 'SKY' // 하늘상태
  | 'TMP' //1시간 기온
  | 'TMN' // 일 최저기온
  | 'TMX' // 일 최고기온
  | 'UUU' // 풍속 동서
  | 'VVV' // 풍속 남북
  | 'WAV' // 파고
  | 'VEC' // 풍향
  | 'WSD'; // 풍속

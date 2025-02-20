interface RiseInfo {
  aste: string;
  astm: string;
  civile: string;
  civilm: string;
  latitude: number;
  latitudeNum: string;
  location: string;
  locdate: number;
  longitude: number;
  longitudeNum: string;
  moonrise: string;
  moonset: string;
  moontransit: string;
  naute: string;
  nautm: string;
  sunrise: string;
  sunset: string;
  suntransit: number;
}

export interface RiseResponse {
  response: {
    body: {
      numOfRows: number;
      pageNo: number;
      totalCount: number;
      items: {
        item: RiseInfo;
      };
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
}

type Title = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface SpecialReportResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: 'XML' | 'JSON';
      numOfRows: number;
      pageNo: number;
      totalCount: number;
      items: {
        item: {
          other: string;
          stnId: string;
          [key in `t${Title}`]: Title extends 5 ? number : string;
          tmFc: number;
          tmSeq: number;
          warFc: string;
        }[];
      };
    };
  };
}

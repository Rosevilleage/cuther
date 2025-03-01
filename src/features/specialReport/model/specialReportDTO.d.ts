type Title = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ReportResponse<T extends SpecialReportDTO | PreReportDTO> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: T;
  };
}

export interface SpecialReportDTO {
  dataType: 'XML' | 'JSON';
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: {
    item: ({
      other: string;
      stnId: string;
      tmFc: number;
      tmSeq: number;
      warFc: string;
    } & {
      [key in `t${Title}`]: key extends 't5' ? number : string;
    })[];
  };
}

export interface PreReportDTO {
  dataType: 'XML' | 'JSON';
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: {
    item: {
      pwn: string;
      rem: string;
      stnId: string;
      tmFc: number;
      tmSeq: number;
    }[];
  };
}

export type SpecialReportResponse = ReportResponse<SpecialReportDTO>;
export type PreReportResponse = ReportResponse<PreReportDTO>;

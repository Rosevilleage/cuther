import {queryOptions} from '@tanstack/react-query';
import {getPreReports, getSpecialReports} from '../api/specialReportApi';
import {
  preReportDTOToEntity,
  specialReportDTOToEntity,
} from '../model/specialReportMapper';

export const specialReportQueryOption = (stnId: number) => {
  return queryOptions({
    queryKey: ['report', 'special', stnId],
    queryFn: () =>
      getSpecialReports(stnId).then(res => {
        if (res.data.response.header.resultCode === '03') {
          return 'noReports';
        } else if (res.data.response.header.resultCode !== '00') {
          if (process.env.NODE_ENV === 'development') {
            console.log(
              'specialReport 에러 발생 :',
              `${res.data.response.header.resultCode} ${res.data.response.header.resultMsg}`,
            );
          }
        }
        return res.data.response.body;
      }),
    select(data) {
      if (data === 'noReports') {
        return 'noReports';
      }
      return specialReportDTOToEntity(data);
    },
    enabled: !!stnId,
  });
};

export const preReportQueryOption = (stnId: number) => {
  return queryOptions({
    queryKey: ['report', 'pre', stnId],
    queryFn: () =>
      getPreReports(stnId).then(res => {
        if (res.data.response.header.resultCode === '03') {
          return 'noReports';
        } else if (res.data.response.header.resultCode !== '00') {
          if (process.env.NODE_ENV === 'development') {
            console.log(
              'preReport 에러 발생 :',
              `${res.data.response.header.resultCode} ${res.data.response.header.resultMsg}`,
            );
          }
        }
        return res.data.response.body;
      }),
    select(data) {
      if (data === 'noReports') {
        return 'noReports';
      }
      return preReportDTOToEntity(data);
    },
    enabled: !!stnId,
  });
};

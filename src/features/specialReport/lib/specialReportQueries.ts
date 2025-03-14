import {queryOptions} from '@tanstack/react-query';
import {getPreReports, getSpecialReports} from '../api/specialReportApi';
import {
  preReportDTOToEntity,
  specialReportDTOToEntity,
} from '../model/specialReportMapper';

export const specialReportQueryOption = (stnId: number) => {
  return queryOptions({
    queryKey: ['report', 'special', stnId],
    queryFn: () => getSpecialReports(stnId).then(res => res.data.response),
    select(data) {
      console.log(data);

      if (data.header.resultCode === '03') {
        return 'noReports';
      } else if (data.header.resultCode !== '00') {
        throw new Error(`api Error : ${data.header.resultMsg}`);
      }
      return specialReportDTOToEntity(data.body);
    },
    enabled: !!stnId,
  });
};

export const preReportQueryOption = (stnId: number) => {
  return queryOptions({
    queryKey: ['report', 'pre', stnId],
    queryFn: () => getPreReports(stnId).then(res => res.data.response),
    select(data) {
      if (data.header.resultCode === '03') {
        return 'noReports';
      } else if (data.header.resultCode !== '00') {
        throw new Error(`api Error : ${data.header.resultMsg}`);
      }
      return preReportDTOToEntity(data.body);
    },
    enabled: !!stnId,
  });
};

import axios from 'axios';
import dayjs from 'dayjs';
import {
  PreReportResponse,
  SpecialReportResponse,
} from '../model/specialReportDTO';

const specialReportApi = axios.create({
  baseURL: process.env.WRNINFO_URL as string,
  timeout: 10000,
});

export function getSpecialReports(stnId: number) {
  const nowDay = dayjs().format('YYYYMMDD');
  const params = {
    serviceKey: process.env.API_KEY as string,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    fromTmFc: nowDay,
    toTmFc: nowDay,
    stnId,
  };

  return specialReportApi.get<SpecialReportResponse>('getWthrWrnMsg', {
    params,
  });
}

export function getPreReports(stnId: number) {
  const nowDay = dayjs().format('YYYYMMDD');
  const params = {
    serviceKey: process.env.API_KEY as string,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    fromTmFc: nowDay,
    toTmFc: nowDay,
    stnId,
  };
  return specialReportApi.get<PreReportResponse>('getWthrPwn', {
    params,
  });
}

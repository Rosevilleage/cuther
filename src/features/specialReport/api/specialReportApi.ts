import axios from 'axios';
import Config from 'react-native-config';
import {
  PreReportResponse,
  SpecialReportResponse,
} from '../model/specialReportDTO';
import dayjs from 'dayjs';

const specialReportApi = axios.create({
  baseURL: Config.WRNINFO_URL,
  timeout: 5000,
});

export function getSpecialReports(stnId: number) {
  const params = {
    serviceKey: Config.API_KEY,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    fromTmFc: dayjs().format('YYYYMMDD'),
    toTmFc: dayjs().add(6, 'day').format('YYYYMMDD'),
    stnId,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('specialReportReq :', params);
  }
  return specialReportApi.get<SpecialReportResponse>('/getWthrWrnMsg', {
    params,
  });
}

export function getPreReports(stnId: number) {
  const params = {
    serviceKey: Config.API_KEY,
    numOfRows: 5000,
    pageNo: 1,
    dataType: 'JSON',
    fromTmFc: dayjs().format('YYYYMMDD'),
    toTmFc: dayjs().add(6, 'day').format('YYYYMMDD'),
    stnId,
  };
  if (process.env.NODE_ENV === 'development') {
    console.log('preReportReq :', params);
  }
  return specialReportApi.get<PreReportResponse>('/getWthrPwn', {
    params,
  });
}

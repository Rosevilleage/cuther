import dayjs from 'dayjs';
import {BaseDate, BaseTime} from '../model/weatherDTO';

const baseTimes = [
  '0200',
  '0500',
  '0800',
  '1100',
  '1400',
  '1700',
  '2000',
  '2300',
] as const;

export function roundToNearestBaseTime(
  baseDate: BaseDate,
  baseTime: BaseTime,
): {baseDate: BaseDate; baseTime: BaseTime} {
  if (!/^\d{8}$/.test(baseDate) || !/^\d{4}$/.test(baseTime)) {
    throw new Error(
      'Invalid date or time format. Expected formats: YYYYMMDD and HHMM',
    );
  }

  const hour = +baseTime.slice(0, 2) * 100;

  for (let i = baseTimes.length - 1; i >= 0; i--) {
    if (hour >= +baseTimes[i]) {
      return {baseDate, baseTime: baseTimes[i]};
    }
  }

  // 하루 전날 계산
  const prevDate = dayjs(baseDate, 'YYYYMMDD')
    .subtract(1, 'day')
    .format('YYYYMMDD') as BaseDate;

  return {baseDate: prevDate, baseTime: baseTimes[baseTimes.length - 1]};
}

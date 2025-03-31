import {PreReport, SpecialReport} from '../../../entitites/specialReports';
import {SpecialReportDTO} from './specialReportDTO';
import {PreReportDTO} from './specialReportDTO';

export function specialReportDTOToEntity(
  specialReportDTO: SpecialReportDTO,
): SpecialReport[] {
  const entity: SpecialReport[] = [];

  specialReportDTO.items.item.forEach(report => {
    // title은 t1에서 가져옴
    const title = report.t1;

    // content는 t2에서 발효 지역만 추출
    const content = report.t2
      .split('\r\n')
      .map(line => {
        // (1), (2) 등의 번호 제거
        const cleanLine = line.replace(/^\(\d+\)\s*/, '');
        // 콜론 이후의 지역 정보만 추출
        const regionInfo = cleanLine.split(':')[1]?.trim();
        return regionInfo;
      })
      .filter(Boolean)
      .join('\n');

    // date는 t3에서 추출
    const dateMatch = report.t3.match(
      /\d{4}년\s+\d{2}월\s+\d{2}일\s+\d{2}시\s+\d{2}분/,
    );
    const date = dateMatch ? dateMatch[0] : '';

    entity.push(new SpecialReport(title, content, date));
  });

  return entity;
}

export function preReportDTOToEntity(preReportDTO: PreReportDTO): PreReport[] {
  const entity: PreReport[] = [];
  // item : Array(1)
  // 0 : { pwn : "(1) 강풍 예비특보\r\no 03월 25일 오후(12시~18시) : 경기도(안산, 시흥, 김포, 평택, 화성), 서해5도, 인천", rem : "o 없음", stnId : "109", tmFc : 20250325040, tmSeq :  16 }

  preReportDTO.items.item.forEach(report => {
    const sections = report.pwn.split(/\(\d+\)/).filter(Boolean);
    sections.forEach(section => {
      let lines = section.trim().split(/\r\n/);
      const title = lines[0].trim();

      const children: {date: string; content: string}[] = [];

      lines.slice(1).forEach(line => {
        const detail = line.replace(/^o /, '').trim();
        const [date, content] = detail.split(' : ').map(s => s.trim());

        if (date && content) {
          children.push({date, content});
        }
      });

      entity.push(new PreReport(title, children));
    });
  });
  return entity;
}

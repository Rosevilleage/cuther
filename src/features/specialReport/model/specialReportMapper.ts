import {PreReport, SpecialReport} from '../../../entitites/specialReports';
import {SpecialReportDTO} from './specialReportDTO';
import {PreReportDTO} from './specialReportDTO';

export function specialReportDTOToEntity(
  specialReportDTO: SpecialReportDTO,
): SpecialReport[] {
  return specialReportDTO.items.item.map(report => {
    const title = report.t1,
      content = report.t2.substring(6 + report.t1.length).trim(),
      date = report.t3.substring(6 + report.t1.length).trim();
    return new SpecialReport(title, content, date);
  });
}

export function preReportDTOToEntity(preReportDTO: PreReportDTO): PreReport[] {
  const entity: PreReport[] = [];

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

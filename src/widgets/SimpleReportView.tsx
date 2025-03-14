import React from 'react';

import {View} from 'react-native';
import SimpleReportCard from '../features/specialReport/ui/SimpleReportCard';
import {PreReport, SpecialReport} from '../entitites/specialReports';

function SimpleReportView({
  specialReports,
  preReports,
}: {
  specialReports: SpecialReport[] | 'noReports';
  preReports: PreReport[] | 'noReports';
}) {
  return (
    <View style={{flex: 1, flexDirection: 'row', gap: 15}}>
      <SimpleReportCard
        reportTitles={
          specialReports !== 'noReports'
            ? specialReports.map(({title}) => title)
            : 'noReports'
        }
        emptyTitle="기상 특보가 없습니다."
      />

      <SimpleReportCard
        reportTitles={
          preReports !== 'noReports'
            ? preReports.map(({title}) => title)
            : 'noReports'
        }
        emptyTitle="예비 특보가 없습니다."
      />
    </View>
  );
}

export default SimpleReportView;

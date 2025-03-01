import React from 'react';
import {useSpecialReport} from '../features/\bspecialReport/model/specialReportStore';
import {View} from 'react-native';
import SimpleReportCard from '../features/\bspecialReport/ui/SimpleReportCard';

function SimpleReportView() {
  const {specialReports, preReports} = useSpecialReport();

  return (
    <View style={{flex: 1, flexDirection: 'row', gap: 15}}>
      <SimpleReportCard
        reportTitles={specialReports.map(({title}) => title)}
        emptyTitle="기상 특보가 없습니다."
      />

      <SimpleReportCard
        reportTitles={preReports.map(({title}) => title)}
        emptyTitle="예비 특보가 없습니다."
      />
    </View>
  );
}

export default SimpleReportView;

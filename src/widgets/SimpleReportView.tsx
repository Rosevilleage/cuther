import React from 'react';

import {StyleSheet, View} from 'react-native';
import SimpleReportCard from '../features/specialReport/ui/SimpleReportCard';
import {PreReport, SpecialReport} from '../entities/specialReports';
import {responsiveHeight, responsivePixel} from '../app/style/responsivePixel';
import Skeleton from '../app/components/Skeleton';

export default function SimpleReportView({
  specialReports,
  preReports,
  isLoading,
}: {
  specialReports: SpecialReport[] | 'noReports';
  preReports: PreReport[] | 'noReports';
  isLoading: boolean;
}) {
  if (isLoading) {
    return <RenderReportSkeleton />;
  }
  return (
    <View style={{flex: 1, flexDirection: 'row', gap: 15}}>
      <SimpleReportCard
        reportTitles={
          specialReports !== 'noReports'
            ? [...new Set(specialReports.map(({title}) => title))]
            : 'noReports'
        }
        emptyTitle="기상 특보가 없습니다."
      />

      <SimpleReportCard
        reportTitles={
          preReports !== 'noReports'
            ? [...new Set(preReports.map(({title}) => title))]
            : 'noReports'
        }
        emptyTitle="예비 특보가 없습니다."
      />
    </View>
  );
}

function RenderReportSkeleton() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonBox}>
          <Skeleton
            width={responsivePixel(200)}
            height={responsiveHeight(30)}
            borderRadius={5}
          />
        </View>
        <View style={styles.skeletonBox}>
          <Skeleton
            width={responsivePixel(200)}
            height={responsiveHeight(30)}
            borderRadius={5}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  skeletonBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: responsiveHeight(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonText: {
    borderRadius: 5,
    width: responsivePixel(200),
    height: responsiveHeight(30),
  },
});

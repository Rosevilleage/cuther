import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

function SimpleReportCard({
  reportTitles,
  emptyTitle,
}: {
  reportTitles: string[] | 'noReports';
  emptyTitle: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 150,
      }}>
      {reportTitles !== 'noReports' ? (
        <Swiper
          autoplay
          showsPagination
          horizontal={false}
          autoplayTimeout={5}
          activeDotColor="gray">
          {reportTitles.map(title => (
            <View key={title} style={styles.textBox}>
              <Text style={styles.reportText}>{title}</Text>
            </View>
          ))}
        </Swiper>
      ) : (
        <View style={styles.textBox}>
          <Text style={styles.reportText}>{emptyTitle}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  textBox: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  reportText: {fontSize: 20, textAlign: 'center'},
});

export default SimpleReportCard;

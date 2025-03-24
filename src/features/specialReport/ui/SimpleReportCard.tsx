import {useNavigation, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

type RootStackParamList = {
  Report: undefined;
};

function SimpleReportCard({
  reportTitles,
  emptyTitle,
}: {
  reportTitles: string[] | 'noReports';
  emptyTitle: string;
}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 150,
      }}
      onPress={() => navigation.navigate('Report')}>
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
    </Pressable>
  );
}
const styles = StyleSheet.create({
  textBox: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  reportText: {fontSize: 20, textAlign: 'center'},
});

export default SimpleReportCard;

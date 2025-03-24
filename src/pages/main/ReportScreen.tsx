import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useGeoLocation} from '../../features/geoLocation/model/geoLocationStore';
import {useQuery} from '@tanstack/react-query';
import {
  preReportQueryOption,
  specialReportQueryOption,
} from '../../features/specialReport/lib/specialReportQueries';

function ReportScreen() {
  const {stnId} = useGeoLocation();
  const {data: specialReports} = useQuery(
    specialReportQueryOption(stnId as number),
  );
  const {data: preReports} = useQuery(preReportQueryOption(stnId as number));
  const {width, height} = useWindowDimensions();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        width: width,
        height: height,
      }}
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 16,
      }}>
      {/* 특보 리스트 */}
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#aaaaaa',
          minHeight: 500, // 최소 높이 설정
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 12,
          }}>
          기상특보
        </Text>
        {specialReports &&
          (specialReports === 'noReports' ? (
            <View
              style={{
                padding: 8,
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>발효된 기상 특보가 없습니다.</Text>
            </View>
          ) : (
            <FlatList
              data={specialReports}
              style={{
                flex: 1,
              }}
              contentContainerStyle={{
                gap: 8,
              }}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View
                  style={{
                    padding: 10,
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 12,
                    gap: 4,
                  }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: 14}}>{item.content}</Text>
                  <Text style={{fontSize: 12, color: '#aaa'}}>{item.date}</Text>
                </View>
              )}
            />
          ))}
      </View>

      {/* 예비 특보 리스트 */}
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#aaaaaa',
          minHeight: 500,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 12}}>
          예비특보
        </Text>
        {preReports &&
          (preReports === 'noReports' ? (
            <View
              style={{
                padding: 8,
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>예비 특보가 없습니다.</Text>
            </View>
          ) : (
            <FlatList
              data={preReports}
              style={{
                flex: 1,
              }}
              contentContainerStyle={{
                gap: 8,
              }}
              scrollEnabled={false}
              renderItem={({item}) => (
                <View
                  style={{
                    padding: 10,
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 12,
                    gap: 4,
                  }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                  {item.children.map(child => (
                    <Text style={{fontSize: 14}}>{child.content}</Text>
                  ))}
                </View>
              )}
            />
          ))}
      </View>
    </ScrollView>
  );
}

export default ReportScreen;

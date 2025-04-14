import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  responsivePixel,
  responsiveFontSize,
} from '../app/style/responsivePixel';
import CharacterRenderer from '../features/weather/ui/CharacterRenderer';

export default function CharacterInfo() {
  // 캐릭터 타입별 설명
  const characterTypes = [
    {
      type: 1 as const,
      title: '28도 이상',
      description: '민소매, 반팔, 반바지, 짧은 치마 등',
    },
    {
      type: 2 as const,
      title: '23~27도',
      description: '반팔, 반바지, 얇은 셔츠, 면바지 등',
    },
    {
      type: 3 as const,
      title: '20~22도',
      description: '블라우스, 긴팔 티, 면바지, 슬랙스 등',
    },
    {
      type: 4 as const,
      title: '17~19도',
      description: '얇은 가디건, 니트, 맨투맨, 후드, 긴바지 등',
    },
    {
      type: 5 as const,
      title: '12~16도',
      description: '자켓, 가디건, 청자켓, 니트, 스타킹, 청바지 등',
    },
    {
      type: 6 as const,
      title: '9~11도',
      description: '트렌치 코드, 야상, 점퍼, 스타킹, 기모바지 등',
    },
    {
      type: 7 as const,
      title: '5~8도',
      description: '울 코드, 히트텍, 가죽자켓, 레깅스 등',
    },
    {
      type: 8 as const,
      title: '5도 미만',
      description: '패딩, 두꺼운 코트, 기모제품, 목도리 등',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>캐릭터 설명</Text>
      <Text style={styles.subtitle}>
        날씨에 따라 다양한 캐릭터가 표시됩니다. 각 캐릭터는 현재 날씨에 따른
        적절한 옷차림을 시각적으로 표현합니다.
      </Text>

      {characterTypes.map(character => (
        <View key={character.type} style={styles.characterCard}>
          <View style={styles.characterContainer}>
            <CharacterRenderer type={character.type} style={{width: 100}} />
          </View>
          <View style={styles.characterInfo}>
            <Text style={styles.characterTitle}>{character.title}</Text>
            <Text style={styles.characterDescription}>
              {character.description}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: responsivePixel(15),
  },
  title: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    marginBottom: responsivePixel(10),
    color: '#333',
  },
  subtitle: {
    fontSize: responsiveFontSize(16),
    color: '#666',
    marginBottom: responsivePixel(20),
    lineHeight: responsivePixel(22),
  },
  characterCard: {
    backgroundColor: 'white',
    borderRadius: responsivePixel(10),
    marginBottom: responsivePixel(15),
    padding: responsivePixel(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  characterContainer: {
    width: responsivePixel(100),
    height: responsivePixel(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterInfo: {
    flex: 1,
    marginLeft: responsivePixel(15),
  },
  characterTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: responsivePixel(5),
    color: '#333',
  },
  characterDescription: {
    fontSize: responsiveFontSize(14),
    color: '#666',
    lineHeight: responsivePixel(20),
  },
});

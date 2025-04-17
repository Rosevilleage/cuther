import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  responsivePixel,
  responsiveFontSize,
} from '../app/style/responsivePixel';
import CharacterRenderer from '../features/weather/ui/CharacterRenderer';
import {CHARACTER_TYPES} from '../widgets/constants/characterContant';

const TITLE = '캐릭터 설명';
const SUBTITLE =
  '날씨에 따라 다양한 캐릭터가 표시됩니다. 각 캐릭터는 현재 날씨에 따른 적절한 옷차림을 시각적으로 표현합니다.';

export default function CharacterInfo() {
  // 캐릭터 타입별 설명

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{TITLE}</Text>
      <Text style={styles.subtitle}>{SUBTITLE}</Text>

      {CHARACTER_TYPES.map(character => (
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

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Swiper from 'react-native-swiper';
import CharacterRenderer from '../features/weather/ui/CharacterRenderer';
import {responsivePixel} from '../app/style/responsivePixel';
import {CHARACTER_TYPES} from '../widgets/constants/characterContant';
import privacyConsentStore from '../app/store/privacyConsentStore';

const TITLE = '귀여운 캐릭터와 함께\n날씨를 손쉽게 파악해보세요';
const BUTTON_TITLE = '시작하기';

const NOTIFICATION_DESCRIPTION_1 = '시작하기 버튼을 누름으로써 ';
const NOTIFICATION_DESCRIPTION_2 = '에 \n동의하는 것으로 간주합니다.';
const POLICY_TEXT = '개인정보 처리방침';
const POLICY_URL = process.env.PRIVACY_POLICY_URL as string;

export default function InitScreen() {
  const {setPrivacyPolicyAgreed} = privacyConsentStore();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{TITLE}</Text>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper autoplay={true} autoplayTimeout={10} loop={true}>
          {CHARACTER_TYPES.map(character => (
            <View style={styles.logoContainer} key={character.type}>
              <CharacterRenderer
                type={character.type}
                autoPlay
                style={{
                  width: responsivePixel(300),
                  height: responsivePixel(100),
                }}
              />
              <View style={styles.characterTextContainer}>
                <Text style={styles.characterTempText}>
                  <Text style={styles.characterTempTextBold}>체감온도 </Text>
                  {character.title}
                </Text>
                <Text style={styles.characterText}>
                  {character.description}
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          {NOTIFICATION_DESCRIPTION_1}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(POLICY_URL);
            }}>
            <Text style={styles.policyText}>{POLICY_TEXT}</Text>
          </TouchableOpacity>
          {NOTIFICATION_DESCRIPTION_2}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPrivacyPolicyAgreed(true);
          }}>
          <Text
            style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>
            {BUTTON_TITLE}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    paddingTop: 50,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '70%',
  },
  title: {
    fontSize: 22,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  characterTempText: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  characterTempTextBold: {
    color: '#787777',
  },
  characterText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#787777',
  },
  swiperContainer: {
    width: '100%',
    height: '70%',
  },
  characterTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonContainer: {
    width: '100%',
    height: '10%',
    gap: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'normal',
    color: '#787777',
  },
  button: {
    backgroundColor: '#0474fd',
    borderRadius: 10,
    padding: 10,
  },
  policyText: {
    color: '#0474fd',
    fontWeight: 'bold',
  },
});

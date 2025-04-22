import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Swiper from 'react-native-swiper';
import CharacterRenderer from '../features/weather/ui/CharacterRenderer';
import {responsivePixel} from '../app/style/responsivePixel';
import {CHARACTER_TYPES} from '../widgets/constants/characterContant';
import privacyConsentStore from '../app/store/privacyConsentStore';
import Checkbox from '../app/components/Checkbox';

const TITLE = '귀여운 캐릭터와 함께\n날씨를 손쉽게 파악해보세요';
const BUTTON_TITLE = '시작하기';
const POLICY_TEXT = '개인정보 처리방침';
const POLICY_URL = process.env.PRIVACY_POLICY_URL as string;

const POLICY_BUTTON_TEXT = '개인정보 처리방침에 동의합니다';
const THIRD_PARTY_BUTTON_TEXT = '개인정보 제3자 제공에 동의합니다';

export default function InitScreen() {
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState(false);
  const [isThirdPartyConsentAgreed, setIsThirdPartyConsentAgreed] =
    useState(false);
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
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(POLICY_URL);
          }}>
          <Text style={styles.policyText}>{POLICY_TEXT}</Text>
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={isPrivacyPolicyAgreed}
            onPress={() => setIsPrivacyPolicyAgreed(!isPrivacyPolicyAgreed)}
            label={POLICY_BUTTON_TEXT}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={isThirdPartyConsentAgreed}
            onPress={() =>
              setIsThirdPartyConsentAgreed(!isThirdPartyConsentAgreed)
            }
            label={THIRD_PARTY_BUTTON_TEXT}
          />
        </View>

        <TouchableOpacity
          disabled={!isPrivacyPolicyAgreed || !isThirdPartyConsentAgreed}
          style={[
            styles.button,
            (!isPrivacyPolicyAgreed || !isThirdPartyConsentAgreed) &&
              styles.buttonDisabled,
          ]}
          onPress={() => {
            if (isPrivacyPolicyAgreed && isThirdPartyConsentAgreed) {
              setPrivacyPolicyAgreed({
                isPrivacyPolicyAgreed: true,
                isThirdPartyConsentAgreed: true,
              });
            }
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
    height: '100%',
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
    marginTop: 30,
    marginInline: 30,
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
    textAlign: 'center',
    color: '#787777',
  },
  swiperContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingTop: 50,
  },
  characterTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonContainer: {
    width: '100%',

    gap: 10,
    borderWidth: 1,
    borderColor: '#cbcbcb',
    backgroundColor: '#f7f7f7',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 30,
  },
  checkboxContainer: {
    marginBottom: responsivePixel(10),
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
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  policyText: {
    color: '#0474fd',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

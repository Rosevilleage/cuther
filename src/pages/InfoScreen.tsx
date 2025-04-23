import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Switch,
} from 'react-native';
import {
  responsivePixel,
  responsiveFontSize,
} from '../app/style/responsivePixel';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {version as appVersion} from '../../package.json';
import privacyConsentStore from '../app/store/privacyConsentStore';
import Modal from '../app/components/Modal';
import Config from 'react-native-config';
// 앱 버전 정보
const APP_VERSION = appVersion;

const POLICY_URL = Config.PRIVACY_POLICY_URL as string;
const NOTICE_URL = Config.NOTICE_URL as string;

type RootStackParamList = {
  Main: undefined;
  Report: undefined;
  CharacterInfo: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function InfoScreen() {
  const {
    setPrivacyPolicyAgreed,
    isPrivacyPolicyAgreed,
    isThirdPartyConsentAgreed,
  } = privacyConsentStore();
  const navigation = useNavigation<NavigationProp>();
  const [isOpen, setIsOpen] = useState(false);
  const handlePrivacyPolicyPress = () => {
    // 개인정보 처리방침 페이지 생성 후 적용
    Linking.openURL(POLICY_URL);
  };

  const handleCharacterInfoPress = () => {
    navigation.navigate('CharacterInfo');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>개인정보</Text>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            개인정보처리방침 및 제3자 제공 동의
          </Text>
          <Switch
            value={isThirdPartyConsentAgreed}
            onValueChange={() =>
              setPrivacyPolicyAgreed({
                isPrivacyPolicyAgreed: isPrivacyPolicyAgreed,
                isThirdPartyConsentAgreed: !isThirdPartyConsentAgreed,
              })
            }
          />
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handlePrivacyPolicyPress}>
          <Text style={styles.menuText}>개인정보 처리방침</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>앱 정보</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>버전</Text>
          <Text style={styles.infoValue}>{APP_VERSION}</Text>
        </View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleCharacterInfoPress}>
          <Text style={styles.menuText}>캐릭터 설명</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Linking.openURL(NOTICE_URL)}>
          <Text style={styles.menuText}>공지사항</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>데이터</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setIsOpen(true)}>
          <Text style={styles.menuText}>날씨 데이터 출처</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <Modal visible={isOpen} onClose={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>공공데이터 Open API</Text>
            <Text style={styles.modalText}>기상청_중기예보 조회서비스</Text>
            <Text style={styles.modalText}>기상청_기상특보 조회서비스</Text>
            <Text style={styles.modalText}>기상청_단기예보 조회서비스</Text>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: responsivePixel(20),
    backgroundColor: 'white',
    borderRadius: responsivePixel(10),
    padding: responsivePixel(15),
    marginHorizontal: responsivePixel(15),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: responsivePixel(15),
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsivePixel(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: responsiveFontSize(16),
    color: '#666',
  },
  infoValue: {
    fontSize: responsiveFontSize(16),
    color: '#333',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsivePixel(15),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: responsiveFontSize(16),
    color: '#333',
  },
  menuArrow: {
    fontSize: responsiveFontSize(20),
    color: '#999',
  },
  modalContent: {
    padding: responsivePixel(10),
    backgroundColor: '#e0f7fa',
    borderRadius: responsivePixel(8),
  },
  modalTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: responsivePixel(5),
  },
  modalText: {
    fontSize: responsiveFontSize(14),
    color: '#004d40',
    marginBottom: responsivePixel(3),
  },
});

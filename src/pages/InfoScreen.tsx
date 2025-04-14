import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import {
  responsivePixel,
  responsiveFontSize,
} from '../app/style/responsivePixel';
import Modal from '../app/components/Modal';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {version as appVersion} from '../../package.json';

// 앱 버전 정보
const APP_VERSION = appVersion;

type RootStackParamList = {
  Main: undefined;
  Report: undefined;
  CharacterInfo: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function InfoScreen() {
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handlePrivacyPolicyPress = () => {
    // 개인정보 처리방침 페이지 생성 후 적용
    Linking.openURL('');
  };

  const handleCharacterInfoPress = () => {
    navigation.navigate('CharacterInfo');
  };

  const handleThirdPartyConsentPress = () => {
    setIsPrivacyModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>개인정보</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleThirdPartyConsentPress}>
          <Text style={styles.menuText}>개인정보 제3자 제공 동의</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

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
      </View>

      <Modal
        visible={isPrivacyModalVisible}
        onClose={() => setIsPrivacyModalVisible(false)}
        title="개인정보 제3자 제공 동의">
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            본 앱은 다음과 같은 제3자에게 개인정보를 제공합니다:
          </Text>
          <Text style={styles.modalText}>
            • 기상청: 날씨 정보 제공을 위해 위치 정보를 제공합니다.
          </Text>
          <Text style={styles.modalText}>
            • Google Analytics: 앱 사용 통계를 위해 사용 데이터를 제공합니다.
          </Text>
          <Text style={styles.modalText}>
            제공되는 정보는 해당 서비스 제공 목적에만 사용되며, 사용자의 동의
            없이 다른 용도로 사용되지 않습니다.
          </Text>
        </View>
      </Modal>
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
    padding: responsivePixel(15),
  },
  modalText: {
    fontSize: responsiveFontSize(14),
    color: '#333',
    marginBottom: responsivePixel(10),
    lineHeight: responsivePixel(20),
  },
});

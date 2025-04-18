import React, {useEffect} from 'react';
import privacyConsentStore from '../store/privacyConsentStore';
import WelcomeScreen from '../../pages/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PrivacyConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    isPrivacyPolicyAgreed,
    isThirdPartyConsentAgreed,
    setPrivacyPolicyAgreed,
  } = privacyConsentStore();
  useEffect(() => {
    async function checkAgreed() {
      const privacyPolicyAgreed = await AsyncStorage.getItem(
        'privacyPolicyAgreed',
      );
      const thirdPartyConsentAgreed = await AsyncStorage.getItem(
        'thirdPartyConsentAgreed',
      );
      setPrivacyPolicyAgreed({
        isPrivacyPolicyAgreed: privacyPolicyAgreed === 'true',
        isThirdPartyConsentAgreed: thirdPartyConsentAgreed === 'true',
      });
    }
    checkAgreed();
  }, [setPrivacyPolicyAgreed]);

  if (!isPrivacyPolicyAgreed || !isThirdPartyConsentAgreed) {
    return <WelcomeScreen />;
  }
  return <>{children}</>;
};

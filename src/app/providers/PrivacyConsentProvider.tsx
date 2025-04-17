import React, {useEffect} from 'react';
import privacyConsentStore from '../store/privacyConsentStore';
import WelcomeScreen from '../../pages/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PrivacyConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {isPrivacyPolicyAgreed, setPrivacyPolicyAgreed} = privacyConsentStore();
  useEffect(() => {
    async function checkAgreed() {
      const isAgreed = await AsyncStorage.getItem('privacyPolicyAgreed');
      setPrivacyPolicyAgreed(isAgreed === 'true');
    }
    checkAgreed();
  }, [setPrivacyPolicyAgreed]);

  if (!isPrivacyPolicyAgreed) {
    return <WelcomeScreen />;
  }
  return <>{children}</>;
};

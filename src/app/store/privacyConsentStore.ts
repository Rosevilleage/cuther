import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface PrivacyConsentStore {
  isPrivacyPolicyAgreed: boolean;
  isThirdPartyConsentAgreed: boolean;
  setPrivacyPolicyAgreed: ({
    isPrivacyPolicyAgreed,
    isThirdPartyConsentAgreed,
  }: {
    isPrivacyPolicyAgreed: boolean;
    isThirdPartyConsentAgreed: boolean;
  }) => Promise<void>;
}

const privacyConsentStore = create<PrivacyConsentStore>(set => ({
  isPrivacyPolicyAgreed: true,
  isThirdPartyConsentAgreed: true,
  setPrivacyPolicyAgreed: async ({
    isPrivacyPolicyAgreed,
    isThirdPartyConsentAgreed,
  }: {
    isPrivacyPolicyAgreed: boolean;
    isThirdPartyConsentAgreed: boolean;
  }) => {
    await AsyncStorage.setItem(
      'privacyPolicyAgreed',
      isPrivacyPolicyAgreed.toString(),
    );
    await AsyncStorage.setItem(
      'thirdPartyConsentAgreed',
      isThirdPartyConsentAgreed.toString(),
    );
    set({isPrivacyPolicyAgreed, isThirdPartyConsentAgreed});
  },
}));

export default privacyConsentStore;

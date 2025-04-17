import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface PrivacyConsentStore {
  isPrivacyPolicyAgreed: boolean;
  setPrivacyPolicyAgreed: (isAgreed: boolean) => Promise<void>;
}

const privacyConsentStore = create<PrivacyConsentStore>(set => ({
  isPrivacyPolicyAgreed: true,
  setPrivacyPolicyAgreed: async (isAgreed: boolean) => {
    await AsyncStorage.setItem('privacyPolicyAgreed', isAgreed.toString());
    set({isPrivacyPolicyAgreed: isAgreed});
  },
}));

export default privacyConsentStore;

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {responsivePixel} from '../style/responsivePixel';
import NoData from './../../assets/animation/noData.svg';
import {useQueryClient} from '@tanstack/react-query';
interface NetworkContextType {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  setIsConnected: () => {},
});

export const useNetwork = () => useContext(NetworkContext);

const NetworkProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return <NoNetwork retry={() => queryClient.removeQueries()} />;
  }

  return (
    <NetworkContext.Provider value={{isConnected, setIsConnected}}>
      {children}
    </NetworkContext.Provider>
  );
};

const NoNetwork = ({retry}: {retry: () => void}) => {
  const [isChecking, setIsChecking] = useState(false);
  const {setIsConnected} = useNetwork();
  const checkConnection = useCallback(async () => {
    if (isChecking) {
      return;
    }
    setIsChecking(true);

    try {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        setIsConnected(true);
        retry();
      }
    } finally {
      setIsChecking(false);
    }
  }, [isChecking, retry, setIsConnected]);

  return (
    <View style={styles.container}>
      <NoData
        style={{width: responsivePixel(300), height: responsivePixel(300)}}
      />
      <Text style={styles.title}>인터넷 연결 없음</Text>
      <Text style={styles.message}>
        인터넷 연결을 확인하고 다시 시도해주세요.
      </Text>
      <TouchableOpacity
        style={[styles.button, isChecking && styles.buttonDisabled]}
        onPress={checkConnection}
        disabled={isChecking}>
        <Text style={styles.buttonText}>
          {isChecking ? '연결 확인 중...' : '다시 시도'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsivePixel(20),
  },
  title: {
    fontSize: responsivePixel(24),
    fontWeight: 'bold',
    marginBottom: responsivePixel(10),
  },
  message: {
    fontSize: responsivePixel(16),
    textAlign: 'center',
    marginBottom: responsivePixel(20),
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: responsivePixel(20),
    paddingVertical: responsivePixel(10),
    borderRadius: responsivePixel(8),
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: responsivePixel(16),
    fontWeight: 'bold',
  },
});

export default NetworkProvider;

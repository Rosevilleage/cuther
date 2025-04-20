import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useErrorStore} from '../store/errorStore';

const NetworkProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {setCustomError} = useErrorStore();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setCustomError({
          title: '인터넷 연결 없음',
          message: '인터넷 연결을 확인하고 다시 시도해주세요.',
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setCustomError]);

  return <>{children}</>;
};

export default NetworkProvider;

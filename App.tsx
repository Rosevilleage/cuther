/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NetworkProvider from './src/app/providers/NetworkProvider';
import Navigation from './src/app/routes/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LocationProvider from './src/app/providers/LocationProvider';
import {PrivacyConsentProvider} from './src/app/providers/PrivacyConsentProvider';
import ErrorProvider from './src/app/providers/ErrorProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <NetworkProvider>
            <PrivacyConsentProvider>
              <LocationProvider>
                <ErrorProvider>
                  <Navigation />
                </ErrorProvider>
              </LocationProvider>
            </PrivacyConsentProvider>
          </NetworkProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;

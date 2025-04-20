/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NetworkProvider from './src/app/providers/NetworkProvider';
import Navigation from './src/app/routes/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LocationProvider from './src/app/providers/LocationProvider';
import {PrivacyConsentProvider} from './src/app/providers/PrivacyConsentProvider';
import ErrorProvider from './src/app/providers/ErrorProvider';
import {useErrorStore} from './src/app/store/errorStore';
import {getErrorMessage} from './src/app/lib/errorUtils';

// const queryClient = new QueryClient();

const App = () => {
  const {setCustomError} = useErrorStore();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: (failureCount, error) => {
              if (error.message.slice(0, 2) === '03') {
                return failureCount < 2;
              }
              return true;
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error: unknown) => {
            if (error instanceof Error) {
              const errorMessage = getErrorMessage(error.message.slice(0, 2));
              if (errorMessage) {
                setCustomError({
                  title: errorMessage.title,
                  message: errorMessage.message,
                });
              }
            }
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <ErrorProvider>
            <NetworkProvider>
              <PrivacyConsentProvider>
                <LocationProvider>
                  <Navigation />
                </LocationProvider>
              </PrivacyConsentProvider>
            </NetworkProvider>
          </ErrorProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;

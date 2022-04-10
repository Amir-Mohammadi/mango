import { AuthProvider } from '@/app/auth-archive/AuthContext';
import '@/config';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistor, store } from './config/redux/root-store';
import { AVAILABLE_LANGUAGES } from './constants/i18n';




const queryClient = new QueryClient();
let _unsubscribe: (() => void) | undefined = undefined;

// const useMocksServer = () => {
//   const [isLoadingMocks, setIsLoadingMocks] = useState(
//     !process.env.NEXT_PUBLIC_API_BASE_URL
//   );

//   useEffect(() => {
//     (async () => {
//       if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
//         const { mockServer } = await import('@/mocks/server');
//         mockServer();
//         setIsLoadingMocks(false);
//       }
//     })();
//   }, []);

//   return { isLoadingMocks };
// };

const useStore = () => {
  // we need to wait until root store restored from persist store
  const [isLoadingStore, setIsLoadingStore] = useState(true);

  useEffect(() => {
    _unsubscribe = persistor.subscribe(() => {
      handlePersistorState();
    });

    handlePersistorState();
  }, []);

  const handlePersistorState = () => {
    const state = persistor.getState();
    if (state.bootstrapped) {
      setIsLoadingStore(false);
      _unsubscribe?.();
    }
  };

  return { isLoadingStore };
};

export const Providers = ({ children }) => {
  const { i18n } = useTranslation();
  // const { isLoadingMocks } = useMocksServer();
  const { isLoadingStore } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <ChakraProvider
            theme={{
              ...theme,
              direction:
                AVAILABLE_LANGUAGES.find(({ key }) => key === i18n.language)
                  ?.dir ?? 'ltr',
            }}
          >
            {!isLoadingStore && children}
          </ChakraProvider>
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

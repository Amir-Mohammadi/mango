import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
    initialWindowMetrics,
    SafeAreaProvider
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { DrawerModal } from './components/drawer/drawer';
import {
    AppNavigator,
    canExit,
    useBackButtonHandler,
    useNavigationPersistence
} from './navigators';
import reduxRootStore, { persistor } from './redux-store/core/root-store';
import { DialogScreen } from './screens';
import { RootStore, RootStoreProvider, setupRootStore } from './stores';
import { Storage } from './utils/storage';

// ignore warnings that start in a string that matchs any of
// the ones in the array
LogBox.ignoreLogs([
  "Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
let _unsubscribe: (() => void) | undefined = undefined;

const App: React.FC = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const [isStoreStateRestored, setIsStoreStateRestored] = useState(false);

  // globally handle the back button
  useBackButtonHandler(canExit);

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(Storage, NAVIGATION_PERSISTENCE_KEY);

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore);
    })();
  }, []);

  const handlePersistorState = () => {
    const state = persistor.getState();
    if (state.bootstrapped) {
      setIsStoreStateRestored(state.bootstrapped);
      _unsubscribe?.();
    }
  };

  // we need to wait until root store restored from persist store
  useEffect(() => {
    _unsubscribe = persistor.subscribe(() => {
      handlePersistorState();
    });

    handlePersistorState();
  }, []);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored || !isStoreStateRestored)
    return null;
  RNBootSplash.hide({ fade: true });

  return (
    <RootStoreProvider value={rootStore}>
      <Provider store={reduxRootStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <DialogScreen />
          <DrawerModal />
          <AppNavigator
            // initialState={initialNavigationState}
            // onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </Provider>
    </RootStoreProvider>
  );
};

export default App;

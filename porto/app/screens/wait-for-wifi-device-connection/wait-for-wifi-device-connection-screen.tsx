import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import IntentLauncher from 'react-native-intent-launcher';
import { Button, Header, Screen } from '../../components';
import { goBack, NavigatorParamList } from '../../navigators';
import { DeviceConfigNavigatorParamList } from '../../navigators/device-config-navigator';
import { useStores } from '../../stores';
import { styles } from './wait-for-wifi-device-connection-screen.props';

export const WaitForWifiDeviceScreen: React.FC<
  CompositeScreenProps<
    StackScreenProps<DeviceConfigNavigatorParamList, 'waitForWifiDeviceScreen'>,
    StackScreenProps<NavigatorParamList>
  >
> = observer(props => {
  const { deviceProfileId, deviceSSID } = props.route.params;
  const { navigation } = props;
  const { deviceConfigStore } = useStores();
  const [currentSSID, setCurrentSSID] = useState('none');

  if (deviceProfileId === undefined && __DEV__) {
    console.error('device profile id is undefined!');
    goBack();
  }

  useFocusEffect(
    useCallback(() => {
      const un = NetInfo.addEventListener(state => {
        console.log(state);

        if (state.type === NetInfoStateType.wifi) {
          setCurrentSSID(state.details.ssid ?? 'unknown');
          if (state.details.ssid === deviceSSID) {
            deviceConfigStore.setDeviceWifiConnected(true);
            navigation.replace('deviceConfig');
          }
        }
      });
      return () => un();
    }, []),
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const state = await NetInfo.fetch('wifi');
    if (state.type === NetInfoStateType.wifi) {
      setCurrentSSID(state.details.ssid ?? 'unknown');
      if (state.details.ssid === deviceSSID) {
        deviceConfigStore.setDeviceWifiConnected(true);
        navigation.replace('deviceConfig');
      }
    }
    setRefreshing(false);
  }, []);

  return (
    <Fragment>
      <Header
        headerText="Please Connect To Device Wifi"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant={'fixed'}>
        <ScrollView
          contentContainerStyle={styles.PROGRESS_CONTAINER}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.PROGRESS_TEXT}>
            {`Please go to wifi setting and Connect to 
            "${deviceSSID}"
            Password is: 12345678
            
            connected to ${currentSSID}`}
          </Text>
          <Button
            text={'open wifi setting'}
            onPress={() => {
              IntentLauncher.startActivity({
                // TODO only android
                action: 'android.settings.WIFI_SETTINGS',
              });
              // Linking.sendIntent("android.settings.WIFI_SETTINGS")
            }}
          />
          <Button
            text={'refresh'}
            onPress={async () => {
              const state = await NetInfo.fetch('wifi');
              if (state.type === NetInfoStateType.wifi) {
                setCurrentSSID(state.details.ssid ?? 'unknown');
                if (state.details.ssid === deviceSSID) {
                  deviceConfigStore.setDeviceWifiConnected(true);
                  navigation.replace('deviceConfig');
                }
              }
            }}
          />
        </ScrollView>
      </Screen>
    </Fragment>
  );
});

import {
    fetch,
    NetInfoStateType,
    useNetInfo
} from '@react-native-community/netinfo';
import {
    CompositeScreenProps,
    useFocusEffect,
    useIsFocused
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useCallback, useState } from 'react';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import IntentLauncher from 'react-native-intent-launcher';
import { Button, Header, Screen } from '../../../components';
import { goBack, NavigatorParamList } from '../../../navigators';
import { SoftAPV1ParamList } from '../../../navigators/ap-soft-v1-navigator';
import { useStores } from '../../../stores';
import { styles } from './wait-for-wifi-device-connection-screen.props';

type WaitForWifiDeviceScreenProps = CompositeScreenProps<
  StackScreenProps<SoftAPV1ParamList, 'waitForWifiDeviceScreen'>,
  StackScreenProps<NavigatorParamList>
>;

export const WaitForWifiDeviceScreen: React.FC<WaitForWifiDeviceScreenProps> =
  observer(props => {
    const { deviceSSIDRegex } = props.route.params;
    const { navigation } = props;
    const { deviceConfigStore } = useStores();
    const netState = useNetInfo();
    const isFocused = useIsFocused();
    const [isChecking, setIsChecking] = useState(false);

    if (deviceSSIDRegex === undefined && __DEV__) {
      console.error('device profile id is undefined!');
      goBack();
    }

    const isConnectedWifiValid = async () => {
      const res = await fetch('wifi');

      return (
        res.type === NetInfoStateType.wifi &&
        res.details.ssid &&
        new RegExp(deviceSSIDRegex).test(res.details.ssid)
      );
    };

    const checkWifi = async () => {
      setIsChecking(true);
      if ((await isConnectedWifiValid()) && isFocused) {
        deviceConfigStore.setDeviceWifiConnected(true);
        navigation.replace('deviceConfigScreen');
      }
      setIsChecking(false);
    };

    const checkWifiCallback = useCallback(() => {
      if (!isChecking) {
        checkWifi();
      }
    }, [netState, isChecking]);

    useFocusEffect(checkWifiCallback);

    return (
      <Fragment>
        <Header
          headerText="Please Connect To Device Wifi"
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
        />
        <Screen style={styles.ROOT} variant={'fixed'}>
          <ScrollView contentContainerStyle={styles.PROGRESS_CONTAINER}>
            <Text style={styles.PROGRESS_TEXT}>
              {`Please go to wifi setting and Connect to 
"${deviceSSIDRegex}"
Password is: 12345678
            
your phone currently ${
                netState.type === NetInfoStateType.wifi && netState.details.ssid
                  ? ''
                  : 'not'
              } connected to ${
                netState.type === NetInfoStateType.wifi && netState.details.ssid
                  ? netState.details?.ssid
                  : 'any wifi'
              }
`}
            </Text>
            <Button
              text={'open wifi setting'}
              textStyle={{ fontSize: 16 }}
              onPress={() => {
                IntentLauncher.startActivity({
                  // TODO only android
                  action: 'android.settings.WIFI_SETTINGS',
                });
              }}
            />
            <Button
              text={'refresh'}
              textStyle={{ fontSize: 16 }}
              onPress={checkWifiCallback}
            />
          </ScrollView>
        </Screen>
      </Fragment>
    );
  });

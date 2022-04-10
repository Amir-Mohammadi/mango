import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';
import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import CancelablePromise from 'cancelable-promise';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Icon, LinearProgress, Text } from 'react-native-elements';
import WifiManager from 'react-native-wifi-reborn';
import { Header, Screen } from '../../components';
import { goBack, NavigatorParamList } from '../../navigators';
import { DeviceConfigNavigatorParamList } from '../../navigators/device-config-navigator';
import { useStores } from '../../stores';
import { namedSpacing } from '../../theme';
import { showAndroidToast } from '../../utils/toast';
import { enableLocationIfNeeded } from '../../utils/wifi/enable-location-if-needed';
import { getWifiPermissionIfNeeded } from '../../utils/wifi/get-wifi-permission.android';
import { styles } from './device-scan-screen.style';

const SCAN_TIME_IN_SEC = 60;
let scanTimerInterval: NodeJS.Timer;
let cancelableConnectToDeviceWifi: CancelablePromise<boolean>;

export const DeviceScanScreen: React.FC<
  CompositeScreenProps<
    StackScreenProps<DeviceConfigNavigatorParamList, 'deviceScan'>,
    StackScreenProps<NavigatorParamList>
  >
> = observer(props => {
  const { deviceProfileId: profileId } = props.route.params;
  const { navigation } = props;
  const { deviceProfileStore, dialogStore, deviceConfigStore } = useStores();
  const [scanTime, setScanTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isGoingToRepeatWiFiSearch, setGoingToRepeatWiFiSearch] =
    useState(true);
  const [progressMessage, setProgressMessage] = useState('');

  if (profileId === undefined && __DEV__) {
    throw new Error('profileId is undefined!');
  }

  const detectDevice = async (
    wifiSearchType: WifiSearchType = WifiSearchType.NormalSearch,
  ) => {
    const res = await getWifiPermissionIfNeeded();
    if (!res) {
      goBack();
      return;
    }
    enableLocationIfNeeded();

    const deviceProfileRegex = deviceProfileStore.deviceProfiles.find(
      x => x.id === profileId,
    )?.profileRegex;

    if (!deviceProfileRegex) throw new Error('cannot find profile regex');

    let isFindDeviceWifi = false;

    switch (wifiSearchType) {
      case WifiSearchType.NormalSearch: {
        setProgressMessage('searching for device wifi...');
        const wifiList = await WifiManager.loadWifiList();

        isFindDeviceWifi = deviceConfigStore.findDevice(
          wifiList,
          deviceProfileRegex,
        );
        break;
      }
      case WifiSearchType.ForceSearch: {
        try {
          setProgressMessage('forcefully! searching for device wifi...');
          const wifiList = await WifiManager.reScanAndLoadWifiList();
          isFindDeviceWifi = deviceConfigStore.findDevice(
            wifiList,
            deviceProfileRegex,
          );
        } catch (error) {
          setProgressMessage('OH, we hit the android limit for force search!!');
          showAndroidToast("'OH, we hit the android limit for force search!!'");
          isFindDeviceWifi = false;
        }

        break;
      }
      default: {
        isFindDeviceWifi = false;
      }
    }

    if (isFindDeviceWifi === true) {
      setGoingToRepeatWiFiSearch(false);
      setProgressMessage('found the device, trying to connect to device...');
      // cancelableConnectToDeviceWifi = cancelable(connectToDeviceWifi());

      // cancelableConnectToDeviceWifi.then(result => {
      //   if (result === true) {
      //     navigation.navigate('selectRouter', {
      //       profileRegex: deviceProfileRegex,
      //     });
      //   } else {
      //     goBack();
      //   }
      // });

      props.navigation.replace('waitForWifiDeviceScreen', {
        deviceProfileId: props.route.params.deviceProfileId,
        deviceSSID: deviceConfigStore.deviceSSID,
      });
    }
  };

  const connectToDeviceWifi = async (): Promise<boolean> => {
    // enableLocationIfNeeded();
    try {
      await WifiManager.connectToProtectedSSID(
        deviceConfigStore.deviceSSID,
        '12345678',
        false,
      );
      await WifiManager.forceWifiUsageWithOptions(true, { noInternet: true });

      deviceConfigStore.setDeviceWifiConnected(true);
      return true;
    } catch (error) {
      showAndroidToast('Error When connecting to device: ' + String(error));
      console.log(error);
      return false;
    }
  };

  const startScanTimer = () => {
    scanTimerInterval = setInterval(() => {
      setScanTime(t => t + 1);
    }, 1000);
  };

  const resetScanOption = () => {
    clearInterval(scanTimerInterval);
    setScanTime(0);
    setProgress(0);
  };

  const rescan = () => {
    startScanTimer();
    detectDevice();
  };

  const showRescanDialog = () => {
    dialogStore.showQuestionDialog({
      title: 'Device Scan',
      message: 'want to try again?',
      dismissLock: true,
      onSubmit: rescan,
      onCancel: () => {
        navigation.navigate('home');
      },
    });
  };

  useEffect(() => {
    if (progress < 1) {
      setProgress(scanTime / SCAN_TIME_IN_SEC);
      if (isGoingToRepeatWiFiSearch && scanTime % 3 === 0) {
        if (scanTime % 15 === 0) {
          detectDevice(WifiSearchType.ForceSearch);
        } else {
          detectDevice(WifiSearchType.NormalSearch);
        }
      }
    } else {
      // end of scan time
      resetScanOption();
      showRescanDialog();
    }
  }, [scanTime]);

  useFocusEffect(
    React.useCallback(() => {
      startScanTimer();
      return () => {
        resetScanOption();
        if (cancelableConnectToDeviceWifi !== undefined) {
          cancelableConnectToDeviceWifi.cancel();
        }
      };
    }, []),
  );

  return (
    <Fragment>
      <Header
        headerText="Scanning For Device"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant={'fixed'}>
        <View style={styles.PROGRESS_CONTAINER}>
          <Text style={styles.PROGRESS_TEXT}>{progressMessage}</Text>
          <LinearProgress
            style={styles.PROGRESS}
            color="primary"
            value={progress}
            variant={'determinate'}
          />
        </View>
      </Screen>
    </Fragment>
  );
});

export const DeviceScanScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Device Scan',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        onPress={() => {
          goBack();
        }}
        name="arrowleft"
        type="ant-design"
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};

enum WifiSearchType {
  NormalSearch = 0,
  ForceSearch = 1,
}

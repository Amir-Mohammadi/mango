import NetInfo from '@react-native-community/netinfo';
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';
import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import CancelablePromise, { cancelable } from 'cancelable-promise';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Avatar, Button, Icon, Text } from 'react-native-elements';
import WiFiManager from 'react-native-wifi-reborn';
import { useInterval } from 'usehooks-ts';
import { Header, Screen } from '../../components';
import { goBack, navigate, NavigatorParamList } from '../../navigators';
import { DeviceConfigNavigatorParamList } from '../../navigators/device-config-navigator';
import { rootStore, useStores } from '../../stores';
import { ConfigSteps } from '../../stores/device-config/device-config-model';
import { RouterInfo } from '../../stores/router';
import { color, namedSpacing } from '../../theme';
import { checkDeviceSSID } from '../../utils/check-device-ssid';
import { styles } from './device-config-screen.style';

const DEVICE_CONFIG_TIMEOUT = 60000;
export const DeviceConfigScreen: React.FC<
  CompositeScreenProps<
    StackScreenProps<DeviceConfigNavigatorParamList, 'deviceConfig'>,
    StackScreenProps<NavigatorParamList>
  >
> = observer(props => {
  const { routerStore, assetStore, deviceStore, deviceConfigStore } =
    useStores();

  const [timeoutInterval, setTimeoutInterval] = useState(
    DEVICE_CONFIG_TIMEOUT / 1000,
  );
  const [isConfigFinished, setIsConfigFinished] = useState<boolean>(false);
  const [step, setStep] = useState(ConfigSteps.Start);
  const [timeIntervalDelay, setTimeIntervalDelay] = useState<number | null>(
    1000,
  );
  let connectToUserDeviceCancelable: CancelablePromise<void>;
  let sendCredentialCancelable: CancelablePromise<RouterInfo>;
  let checkDeviceConnectivityCancelable: CancelablePromise<void>;
  let timeoutRef;

  const stopTimer = () => {
    setTimeIntervalDelay(null);
  };
  // const backAction = () => {
  //   dialogStore.showQuestionDialog({
  //     title: 'Cancel',
  //     message: 'Are you sure you want to cancel config process?',
  //     onSubmit: async () => {
  //       // await cancelConfigProcess();
  //       // props.navigation.navigate('home');
  //       goBack();
  //     },
  //   });
  //   return true;
  // };
  // const backHandler = BackHandler.addEventListener(
  //   'hardwareBackPress',
  //   backAction,
  // );

  const configDevice = () => {
    connectToUserDeviceCancelable = cancelable(connectToDeviceWifi());

    setStep(ConfigSteps.FirstStep);
    connectToUserDeviceCancelable
      .catch(() => {
        setStep(ConfigSteps.Failed);
      })
      .then(() => {
        sendCredentialCancelable = cancelable(sendCredential ());
        setStep(ConfigSteps.SecondStep);
        sendCredentialCancelable
          .then(() => {
            checkDeviceConnectivityCancelable = cancelable(
              checkDeviceConnectivity(),
            );
            setStep(ConfigSteps.ThirdStep);
            checkDeviceConnectivityCancelable
              .then(() => {
                setStep(ConfigSteps.FourthStep);
                const assetId = deviceStore.currentAssetId;
                console.log(
                  'transferring owner',
                  deviceConfigStore.deviceBSSID.toUpperCase(),
                  assetId,
                );

                assetStore
                  .transferOwner(
                    assetId,
                    deviceConfigStore.deviceBSSID.toUpperCase(),
                  )
                  .then(res => {
                    if (res.kind === 'ok') {
                      deviceStore.getDevices();
                      setStep(ConfigSteps.Finish);
                    } else {
                      setStep(ConfigSteps.Failed);
                    }

                    setIsConfigFinished(true);
                  })
                  .catch(() => {
                    setStep(ConfigSteps.Failed);
                  });
              })
              .catch(() => {
                setStep(ConfigSteps.Failed);
              });
          })
          .catch(() => {
            setStep(ConfigSteps.Failed);
          });
      });
  };

  const connectToDeviceWifi = async () => {
    const currentWiFiSSID = await WiFiManager.getCurrentWifiSSID();
    if (
      deviceConfigStore.deviceSSID.toUpperCase() !==
      currentWiFiSSID.toUpperCase()
    )
      await WiFiManager.connectToProtectedSSID(
        deviceConfigStore.deviceSSID,
        '12345678',
        false,
      );
  };
  const checkDeviceConnectivity = (): Promise<void> => {
    let timeout;
    let interval;

    return new Promise<void>((resolve, reject) => {
      timeout = setTimeout(() => {
        clearInterval(interval);
        setIsConfigFinished(true);
        reject(new Error('timeout'));
      }, 50000);

      interval = setInterval(() => {
        deviceStore
          .getDeviceConnectionPairKey(
            deviceConfigStore.deviceBSSID.toUpperCase(),
          )
          .then(result => {
            console.log('device pair key', result);
            if (result === deviceConfigStore.pairKey) {
              clearInterval(interval);
              clearTimeout(timeout);
              resolve();
            }
          });
      }, 2000);
    });
  };

  const sendCredential = async (): Promise<RouterInfo> => {
    const selected = routerStore.selectedRouter;

    const res: boolean = await deviceConfigStore.setDeviceWifi(
      selected.SSID,
      selected.password,
      deviceConfigStore.generatePairKey(),
    );

    if (res === false) {
      throw new Error('no device configured');
    }

    await WiFiManager.disconnect();

    await waitForNetwork();

    await WiFiManager.forceWifiUsageWithOptions(true, { noInternet: false });

    return selected;
  };

  useFocusEffect(
    useCallback(() => {
      configDevice();
      timeoutRef = setTimeout(() => {
        cancelConfig();
        setIsConfigFinished(true);
        setStep(ConfigSteps.Failed);
      }, DEVICE_CONFIG_TIMEOUT);

      return () => {
        // backHandler.remove();
        cancelConfig();
        clearTimeout(timeoutRef);
        stopTimer();
        WiFiManager.forceWifiUsageWithOptions(false, { noInternet: false });
      };
    }, []),
  );

  const cancelConfig = () => {
    sendCredentialCancelable?.cancel();
    connectToUserDeviceCancelable?.cancel();
  };

  useInterval(() => {
    if (timeoutInterval > 0) setTimeoutInterval(timeoutInterval - 1);
  }, timeIntervalDelay);

  let iconName = '';

  switch (step) {
    case ConfigSteps.Finish:
      iconName = 'check';
      break;
    case ConfigSteps.Failed:
      iconName = 'close';
      break;
    default:
      iconName = 'setting';
  }

  const handleButtonOnPress = () => {
    if (step === ConfigSteps.Failed) {
      goBack();
    } else if (step === ConfigSteps.Finish) {
      props.navigation.navigate('home');
    }
  };

  return (
    <Fragment>
      <Header
        headerText="Device Configuration"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <View style={styles.ROOT}>
        <Screen style={styles.ROOT} variant="fixed">
          <View style={styles.CONFIG_IMAGE_CONTAINER}>
            <Avatar
              containerStyle={styles.CONFIG_IMAGE}
              size={300}
              rounded
              icon={{ name: iconName, type: 'ant-design', color: '#707070' }}
            />
          </View>
          {isConfigFinished && (
            <View style={styles.CONFIG_RESULT_CONTAINER}>
              <Text style={styles.CONFIG_RESULT_TEXT}>{step.toString()}</Text>
            </View>
          )}

          {!isConfigFinished && (
            <View>
              <Text style={styles.TEXT}>{timeoutInterval}</Text>
              <View style={styles.CONFIG_STEP_CONTAINER}>
                <View style={styles.CONFIG_STEP_Loading}>
                  <ActivityIndicator size={30} color={color.palette.black} />
                </View>
                <View style={styles.CONFIG_STEP_DESCRIPTION}>
                  <Text style={styles.CONFIG_STEP_TEXT}>{step.toString()}</Text>
                </View>
              </View>
            </View>
          )}
        </Screen>
        <Button
          containerStyle={styles.BUTTON_CONTAINER}
          buttonStyle={styles.BUTTON}
          disabled={!isConfigFinished}
          title={step === ConfigSteps.Failed ? 'Retry' : 'Ok'}
          onPress={handleButtonOnPress}
        />
      </View>
    </Fragment>
  );
});

const cancelConfigProcess = async () => {
  const { deviceProfileStore } = rootStore;
  const currentSSID = await WiFiManager.getCurrentWifiSSID();
  const deviceProfiles = deviceProfileStore.deviceProfilesView;
  for (let i = 0; i < deviceProfiles.length; i++) {
    if (
      checkDeviceSSID(currentSSID, new RegExp(deviceProfiles[i].profileRegex))
    ) {
      await WiFiManager.disconnect();
      break;
    }
  }
  await waitForNetwork();
  await WiFiManager.forceWifiUsageWithOptions(true, { noInternet: false });
};
export const DeviceConfigScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Device Config',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        onPress={async () => {
          cancelConfigProcess();
          navigate('home');
        }}
        name="arrowleft"
        type="ant-design"
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};

const waitForNetwork = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable) {
        unsubscribe();
        resolve();
        console.log('internet connected;');
      }
    });
    setTimeout(() => {
      unsubscribe();
      reject(new Error('timeout'));
    }, 30000);
  });
};

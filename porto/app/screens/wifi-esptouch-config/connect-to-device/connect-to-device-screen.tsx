import {
    CompositeScreenProps,
    useFocusEffect,
    useIsFocused
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    ImageSourcePropType,
    StatusBar,
    View
} from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import WifiManager from 'react-native-wifi-reborn';
import { Screen } from '../../../components';
import { Space } from '../../../components/space/space';
import { NavigatorParamList } from '../../../navigators';
import { ESPTouchConfigParamList } from '../../../navigators/asptouch-navigator';
import { useStores } from '../../../stores';
import { spacing } from '../../../theme';
import EsptouchSmartConfig from '../../../utils/EsptouchSmartConfig';
import { convertApSSIDtoStationBSSID } from '../../../utils/mac-converter/mac-converter';

type ConfigDeviceScreenProps = CompositeScreenProps<
  StackScreenProps<ESPTouchConfigParamList, 'configDevice'>,
  StackScreenProps<NavigatorParamList>
>;

enum Step {
  ConfiguringDevice = 1,
  CheckDeviceConnection = 2,
  SendCredentialToBackend = 3,
  Finished = 4,
}

export const ConfigDeviceScreen: React.FC<ConfigDeviceScreenProps> = observer(
  props => {
    const {
      routerStore,
      dialogStore,
      deviceStore,
      deviceConfigStore,
      assetStore,
    } = useStores();

    useFocusEffect(
      useCallback(() => {
        WifiManager.forceWifiUsageWithOptions(true, { noInternet: true });
        return () => {
          WifiManager.forceWifiUsageWithOptions(false, { noInternet: false });
        };
      }, []),
    );

    const isFocused = useIsFocused();
    const EXPIRATION_TIME = 90;
    const [seconds, setSeconds] = useState(EXPIRATION_TIME);
    const [step, changeStep] = useState<Step>(Step.ConfiguringDevice);
    var isUserCancelled = false;

    useFocusEffect(
      useCallback(() => {
        console.log('starting smart config!');
        console.log('selectedRouter: ', routerStore.selectedRouter);

        EsptouchSmartConfig.start({
          SSID: routerStore.selectedRouter.SSID,
          BSSID: routerStore.selectedRouter.BSSID,
          password: routerStore.selectedRouter.password,
        })
          .then(result => {
            if (isFocused) {
              console.log('result from esptouch =>', result);

              console.log(convertApSSIDtoStationBSSID(result[0].BSSID));
              changeStep(Step.CheckDeviceConnection);
              setSeconds(60);

              checkDeviceConnection(
                convertApSSIDtoStationBSSID(result[0].BSSID),
              )
                .then(({ deviceBssid }) => {
                  if (isFocused) {
                    changeStep(Step.SendCredentialToBackend);
                    transferOwner(deviceBssid)
                      .then(() => {
                        changeStep(Step.Finished);
                        showSuccessMessage();
                      })
                      .catch(e => {
                        showFailedMessage();
                      });
                  }
                })
                .catch(e => {
                  showFailedMessage();
                });
            }
          })
          .catch(e => {
            showFailedMessage();
          });

        return () => {
          console.log('stopping smart config!');
          isUserCancelled = true;
          EsptouchSmartConfig.stop();
        };
      }, []),
    );

    const showFailedMessage = () => {
      if (isFocused && !isUserCancelled) {
        dialogStore.showAlertDialog({
          message: 'عملیات با شکست مواجه شد',
          title: 'خطا',
          onDismiss: () => {
            props.navigation.popToTop();
          },
          onSubmit: () => {
            props.navigation.popToTop();
          },
        });
      }
    };

    const showSuccessMessage = () => {
      if (isFocused) {
        dialogStore.showAlertDialog({
          message: 'با موفقیت انجام شد',
          title: 'موفق',
          onSubmit: () => {
            props.navigation.navigate('home');
          },
          onDismiss: () => {
            props.navigation.navigate('home');
          },
        });
      }
    };

    const transferOwner = (deviceMac: string) => {
      return new Promise<void>((resolve, reject) => {
        const assetId = deviceStore.currentAssetId;
        console.log(
          'transferring owner',
          deviceMac,
          assetId,
        );

        assetStore.transferOwner(assetId, deviceMac).then(res => {
          if (res.kind === 'ok') {
            deviceStore.getDevices();
            resolve();
          } else {
            console.error(res);
            reject();
          }
        });
      });
    };

    const checkDeviceConnection = (deviceMac: string) => {
      let timeout;
      let interval;

      return new Promise<{ deviceBssid: string }>((resolve, reject) => {
        timeout = setTimeout(() => {
          clearInterval(interval);
          reject(new Error('timeout'));
        }, 60000);

        interval = setInterval(() => {
          deviceStore.getDeviceConnectionPairKey(deviceMac).then(result => {
            console.log('device pair key', result);
            resolve({ deviceBssid: deviceMac });
            clearInterval(interval);
            clearTimeout(timeout);
          });
        }, 2000);
      });
    };

    const handleTimeOut = () => {
      if (step == Step.ConfiguringDevice) {
        EsptouchSmartConfig.stop();
        console.log('smart config timeout!');
        showFailedMessage();
      }
    };

    useEffect(() => {
      let myInterval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(myInterval);
          handleTimeOut();
        }

        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    });

    const stepsImage = (): ImageSourcePropType => {
      if (step === Step.ConfiguringDevice) {
        return require('../../../assets/images/step1.png');
      }

      if (
        step === Step.CheckDeviceConnection ||
        step === Step.SendCredentialToBackend
      ) {
        return require('../../../assets/images/step2.png');
      }

      return require('../../../assets/images/step3.png');
    };

    return (
      <View>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require('../../../assets/images/Background-full.png')}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}>
          <SafeAreaView style={{ flex: 1 }}>
            <Screen backgroundColor="transparent">
              <View
                style={{
                  marginHorizontal: spacing[4],
                  marginTop: spacing[5],
                  marginBottom: spacing[6],
                  backgroundColor: 'white',
                  borderRadius: 8,
                  paddingHorizontal: spacing[4],
                  paddingTop: spacing[4],
                  height: 657,
                  flex: 1,
                }}>
                <Space size={20} />

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {'درج اطلاعات وای فای'}
                </Text>
                <Space />
                <Divider
                  style={{ width: '40%', alignSelf: 'center' }}
                  width={2}
                  color={'#5A97FB'}
                />
                <Space />
                <Space />
                <Space />
                <Image
                  source={require('../../../assets/images/scanning.png')}
                  resizeMode="contain"
                  style={{ height: 254, width: 254, alignSelf: 'center' }}
                />
                <Space size={20} />

                <Text style={{ textAlign: 'center' }}>
                  {seconds + '\n زمان باقی مانده'}
                </Text>
                <Space size={40} />
                <Space size={40} />

                <Image
                  source={stepsImage()}
                  resizeMode="contain"
                  style={{ height: 25, width: 216, alignSelf: 'center' }}
                />
              </View>
            </Screen>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  },
);

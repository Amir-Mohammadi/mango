import {
    fetch,
    NetInfoStateType,
    useNetInfo
} from '@react-native-community/netinfo';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import { Divider, Image, Input, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IntentLauncher from 'react-native-intent-launcher';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientButton } from '../../../components/gradient-button/gradient-button';
import { Screen } from '../../../components/screen/screen';
import { Space } from '../../../components/space/space';
import { NavigatorParamList } from '../../../navigators';
import { ESPTouchConfigParamList } from '../../../navigators/asptouch-navigator';
import { useStores } from '../../../stores';
import { Router } from '../../../stores/router/router-model';
import { spacing } from '../../../theme';

type SelectHomeWifiScreenProps = CompositeScreenProps<
  StackScreenProps<ESPTouchConfigParamList, 'selectHomeWifi'>,
  StackScreenProps<NavigatorParamList>
>;

export const SelectHomeWifiScreen: React.FC<SelectHomeWifiScreenProps> =
  observer(props => {
    const netState = useNetInfo();
    const [passwordInvisible, setPasswordInvisible] = useState(true);
    const [currentWifi, setCurrentWifiSSID] = useState<Router | null>(null);
    const [password, setPassword] = useState('');
    const { routerStore } = useStores();

    console.log('Heell');
    

    const handleSubmitPress = () => {
      if (!currentWifi) {
        console.error('not current wifi selected, ignoring');
        return;
      }
      console.log('hr');
      saveAndSelectRouter(currentWifi?.SSID, currentWifi?.BSSID, password);
    };

    const saveAndSelectRouter = (
      SSID: string,
      BSSID: string,
      password: string,
    ) => {
      routerStore.saveRouter(SSID, BSSID, password);
      selectRouter(SSID);
    };

    const selectRouter = (SSID: string) => {
      routerStore.selectRouter(SSID);
      console.log('hr');
      
      props.navigation.navigate('configDevice');
    };

    useEffect(() => {
      const t = async () => {
        return fetch('wifi');
      };
      t().then(result => {
        if (result.type === NetInfoStateType.wifi && result.details.ssid) {
          setCurrentWifiSSID({
            BSSID: result.details.bssid ?? '',
            SSID: result.details.ssid,
          });
        } else {
          setCurrentWifiSSID(null);
        }
      });
    }, [netState]);

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
                }}>
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
                <Text style={{ fontSize: 12, textAlign: 'center' }}>
                  {'  اگر وای فای شما 5Ghz  است آن را به2.4GHz تغییر دهید '}
                </Text>
                <Space />
                <Space />
                <Space />
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../../../assets/images/wifi.png')}
                    style={{
                      width: 263,
                      height: 186,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <Space />
                <View
                  style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#567FF8',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      paddingHorizontal: spacing[3],
                      flex: 1,
                    }}
                    onPress={() => {
                      IntentLauncher.startActivity({
                        // TODO only android
                        action: 'android.settings.WIFI_SETTINGS',
                      });
                    }}>
                    <Image
                      source={require('../../../assets/images/wifi-selector.png')}
                      style={{
                        height: 16,
                        width: 16,
                        alignSelf: 'center',
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      flex: 10,
                      textAlign: 'center',
                      justifyContent: 'center',
                      paddingVertical: spacing[3],
                    }}>
                    {currentWifi?.SSID ?? ''}
                  </Text>
                </View>
                <Space />
                <Space />
                <View
                  style={{
                    maxHeight: 45,
                    // padding: 20,
                    paddingHorizontal: spacing[3],
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#567FF8',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setPasswordInvisible(!passwordInvisible)}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/images/eye.png')}
                      style={{
                        marginHorizontal: spacing[2],
                        resizeMode: 'contain',
                        height: 10,
                        width: 17,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      minHeight: 42,
                      flex: 1,
                      justifyContent: 'center',
                      paddingTop: spacing[1],
                    }}>
                    <Input
                      secureTextEntry={passwordInvisible}
                      style={{
                        fontSize: 20,
                        flex: 1,
                        textAlign: 'left',
                        justifyContent: 'center',
                        minHeight: 38,
                      }}
                      value={password}
                      onChangeText={setPassword}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                        flex: 1,
                        minHeight: 38,
                      }}
                      inputStyle={{ marginTop: 0, paddingTop: 1 }}
                      placeholder="رمز عبور"
                      containerStyle={{
                        flex: 10,
                      }}
                    />
                  </View>
                </View>
                <Space />
                <Space />
                <Space />

                <GradientButton
                  disabled={currentWifi === null}
                  text="ادامه"
                  onPress={handleSubmitPress}
                />
              </View>
            </Screen>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  });

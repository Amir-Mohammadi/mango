import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextTicker from 'react-native-text-ticker';
import { Text, WS } from '../../../components';
import { TwoPole } from '../../../components/device-control/two-pole-switch';
import { HeaderBackStatusLogoSettings } from '../../../components/header-back-statuslogo-settings/header_back_statuslogo_menu';
import { Space } from '../../../components/space/space';
import { goBack, NavigatorParamList } from '../../../navigators';
import { useReduxDispatch } from '../../../redux-store/core/root-store';
import { useStores } from '../../../stores';
import { spacing } from '../../../theme';
import { styles } from './two-pole-switch.style';

enum TelemetryKey {
  key_Left_value = 'key_one_status',
  key_Right_value = 'key_two_status',
  temperature = 'temperature',
}

enum rpcMethod {
  key_1_set_value = 'key_one_set_value',
  key_2_set_value = 'key_two_set_value',
}

export const TwoPoleSwitchScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'twoPoleSwitch'>
> = observer(props => {
  const { deviceStore } = useStores();
  const { navigation } = props;

  const onOpen = (ws: WebSocket) => {
    const subscribeMessage = {
      tsSubCmds: [
        {
          entityType: 'DEVICE',
          entityId: deviceStore.currentDeviceId,
          scope: 'LATEST_TELEMETRY',
          cmdId: 1,
        },
      ],
      historyCmds: [],
      attrSubCmds: [
        {
          entityType: 'DEVICE',
          entityId: deviceStore.currentDeviceId,
          cmdId: 1,
        },
      ],
    };
    ws.send(JSON.stringify(subscribeMessage));
  };

  const getKeyValue = (telemetryKey: TelemetryKey): boolean => {
    const value = deviceStore.deviceTelemetries?.get(telemetryKey);
    console.log(telemetryKey, value);

    if (value !== undefined) {
      return !!Number(value);
    }
    return false;
  };

  const getTemperature = (telemetryKey: TelemetryKey): string => {
    const value = deviceStore.deviceTelemetries?.get(telemetryKey);
    if (value !== undefined) {
      const temp = Number(value);
      return temp.toFixed(1);
    }
    return '00';
  };

  const onMessage = (event: any) => {
    deviceStore.parseTelemetries(null, event.data);
  };

  const onPressLeft = () => {
    const value = getKeyValue(TelemetryKey.key_Left_value);
    deviceStore.rpc(rpcMethod.key_1_set_value, !value);
  };

  const onPressRight = () => {
    const value = getKeyValue(TelemetryKey.key_Right_value);
    deviceStore.rpc(rpcMethod.key_2_set_value, !value);
  };

  const onClickDeviceSetting = () => {
    navigation.navigate('deviceSetting');
  };
  useEffect(() => {
    deviceStore.prepareWsUrl();
  }, []);

  const dispatch = useReduxDispatch();
  const { assetStore, userStore } = useStores();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../../assets/images/device-screen-bg.png')}
        resizeMode="cover"
        imageStyle={styles.IMAGE_BACKGROUND_IMAGE}
        style={styles.IMAGE_BACKGROUND_CONTAINER}>
        <SafeAreaView style={{ paddingHorizontal: spacing[4], flex: 1 }}>
          {!!deviceStore.wsUrl && (
            <WS url={deviceStore.wsUrl} onOpen={onOpen} onMessage={onMessage} />
          )}
          <Space size={20} />
          <HeaderBackStatusLogoSettings
            onBackPress={() => {
              goBack();
            }}
            onLogoPress={() => navigation.navigate('home')}
            onSettingsPress={() => navigation.navigate('deviceSetting')}
          />
          <Space />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
            }}>
            {deviceStore.device?.label}
          </Text>
          <Divider
            style={{
              width: 129,
              alignSelf: 'center',
              borderColor: '#5782F8',
              borderWidth: 2,
              marginTop: 2,
            }}
          />
          <Space />
          <View
            style={{
              borderRadius: 18,
              backgroundColor: '#5782F8',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 25,
              width: 84,
              alignSelf: 'center',
              paddingHorizontal: 1,
            }}>
            <TextTicker
              duration={3000}
              marqueeOnMount
              loop
              // marqueeDelay={10}
              repeatSpacer={35}
              isRTL={true}
              style={{ color: 'white', marginHorizontal: 5 }}>
              {deviceStore.currentAsset?.label}
            </TextTicker>
          </View>
          <View>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
            <TwoPole
              LeftKeyValue={getKeyValue(TelemetryKey.key_Left_value)}
              RightKeyValue={getKeyValue(TelemetryKey.key_Right_value)}
              onClickLeft={onPressLeft}
              onClickRight={onPressRight}
            />
            <Space size={50} />
            <Space size={50} />
            <View
              style={{
                flexDirection: 'row-reverse',
                alignContent: 'space-between',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('comingSoon')}
                style={{ alignItems: 'center', marginHorizontal: 10 }}>
                <Image
                  source={require('../../../assets/images/turnOffAll.png')}
                  style={{ width: 54, height: 54 }}
                />
                <Text style={{ fontSize: 9, color: 'white' }}>
                  {'خاموش کردن همه'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('comingSoon')}
                style={{ alignItems: 'center', marginHorizontal: 10 }}>
                <Image
                  source={require('../../../assets/images/Timer2.png')}
                  style={{ width: 54, height: 54 }}
                />
                <Text style={{ fontSize: 9, color: 'white' }}>{'زمانسنج'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('comingSoon')}
                style={{ alignItems: 'center', marginHorizontal: 10 }}>
                <Image
                  source={require('../../../assets/images/Timer3.png')}
                  style={{ width: 54, height: 54 }}
                />
                <Text style={{ fontSize: 9, color: 'white' }}>{'تایمر'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('comingSoon')}
                style={{ alignItems: 'center', marginHorizontal: 10 }}>
                <Image
                  source={require('../../../assets/images/turnOnAll.png')}
                  style={{ width: 54, height: 54 }}
                />
                <Text style={{ fontSize: 9, color: 'white' }}>
                  {'روشن کردن همه'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});

// export const FanSwitchScreenOptions = (): StackNavigationOptions => {
//   return {
//     headerTitle: 'Fan Switch',
//     headerTitleAlign: 'center',
//     headerShown: false,
//     headerTitleStyle: { fontSize: 20 },
//     headerLeft: () => (
//       <Icon
//         onPress={() => {
//           goBack();
//         }}
//         name="arrowleft"
//         type="ant-design"
//       />
//     ),
//     headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
//   };
// };

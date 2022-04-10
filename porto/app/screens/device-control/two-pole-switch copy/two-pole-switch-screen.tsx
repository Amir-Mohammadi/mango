import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import moment from 'jalali-moment';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    View
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { FanSwitch, Text, WS } from '../../../components';
import { Header } from '../../../components/header2/header';
import { Space } from '../../../components/space/space';
import { goBack, NavigatorParamList } from '../../../navigators';
import { useReduxDispatch } from '../../../redux-store/core/root-store';
import { ConnectionStatus, useStores } from '../../../stores';
import { namedSpacing, spacing } from '../../../theme';
import { styles } from './two-pole-switch.style';
enum TelemetryKey {
  key_1_value = 'key_one_status',
  key_2_value = 'key_two_status',
  key_3_value = 'key_three_status',
  temperature = 'temperature',
}

enum rpcMethod {
  key_1_set_value = 'key_one_set_value',
  key_2_set_value = 'key_two_set_value',
  key_3_set_value = 'key_three_set_value',
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

  const onClickSpeedOne = () => {
    const value = getKeyValue(TelemetryKey.key_1_value);
    deviceStore.rpc(rpcMethod.key_1_set_value, !value);
  };

  const onClickSpeedTwo = () => {
    const value = getKeyValue(TelemetryKey.key_2_value);
    deviceStore.rpc(rpcMethod.key_2_set_value, !value);
  };

  const onClickSpeedThree = () => {
    const value = getKeyValue(TelemetryKey.key_3_value);
    deviceStore.rpc(rpcMethod.key_3_set_value, !value);
  };

  const onClickDeviceSetting = () => {
    navigation.navigate('deviceSetting');
  };
  useEffect(() => {
    deviceStore.prepareWsUrl();
  }, []);

  const dispatch = useReduxDispatch();
  const { assetStore, userStore } = useStores();
  const month = moment().locale('fa').format('MMMM');
  const day = moment().locale('fa').format('D');
  const year = moment().locale('fa').format('YYYY');

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../../assets/images/Background.png')}
        resizeMode="cover"
        imageStyle={styles.IMAGE_BACKGROUND_IMAGE}
        style={styles.IMAGE_BACKGROUND_CONTAINER}>
        <SafeAreaView style={{ paddingHorizontal: spacing[4], flex: 1 }}>
          {!!deviceStore.wsUrl && (
            <WS url={deviceStore.wsUrl} onOpen={onOpen} onMessage={onMessage} />
          )}
          <Header
            style={{
              width: '100%',
              height: 77,
              marginTop: spacing[2],
            }}
            headerRightComponent={
              <TouchableOpacity
                onPress={() => {
                  onClickDeviceSetting && onClickDeviceSetting();
                }}>
                <Image
                  source={require('../../../assets/images/setting-white.png')}
                  style={{ width: 26, height: 26, marginTop: 64 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            }
            headerMiddleComponent={
              <View>
                <Image
                  source={require('../../../assets/images/Elehome.png')}
                  resizeMode="contain"
                  style={styles.HEADER_MIDDLE}
                />
              </View>
            }
            headerLeftComponent={
              <TouchableOpacity onPress={navigation.goBack}>
                <Image
                  source={require('../../../assets/images/back.png')}
                  resizeMode="contain"
                  style={styles.HEADER_LEFT}
                />
              </TouchableOpacity>
            }
          />
          <View>
            <View
              style={{
                marginTop: spacing[5],
                height: '85%',
                backgroundColor: 'white',
                borderRadius: 8,
                elevation: 5,
              }}>
              <Space />
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {'عنوان دستگاه'}
              </Text>
              <Space />
              <Divider
                style={{
                  width: 129,
                  alignSelf: 'center',
                  borderColor: '#5782F8',
                  borderWidth: 2,
                }}
              />
              <FanSwitch
                connectionStatus={
                  deviceStore.connectionStatus ?? ConnectionStatus.Disconnected
                }
                oneSpeedKeyValue={getKeyValue(TelemetryKey.key_1_value)}
                twoSpeedKeyValue={getKeyValue(TelemetryKey.key_2_value)}
                threeSpeedKeyValue={getKeyValue(TelemetryKey.key_3_value)}
                temperature={getTemperature(TelemetryKey.temperature)}
                onClickSpeedOne={onClickSpeedOne}
                onClickSpeedTwo={onClickSpeedTwo}
                onClickSpeedThree={onClickSpeedThree}
                onClickDeviceSetting={onClickDeviceSetting}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});

export const FanSwitchScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Fan Switch',
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

/* eslint-disable camelcase */

import { StackScreenProps } from '@react-navigation/stack';
import moment from 'jalali-moment';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { FanSwitch, Text, WS } from '../../../components';
import { HeaderBackStatusLogoSettings } from '../../../components/header-back-statuslogo-settings/header_back_statuslogo_menu';
import { Space } from '../../../components/space/space';
import { goBack, NavigatorParamList } from '../../../navigators';
import { useReduxDispatch } from '../../../redux-store/core/root-store';
import { ConnectionStatus, useStores } from '../../../stores';
import { spacing } from '../../../theme';
import { styles } from './fan-switch.style';
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
export const FanSwitchScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'fanSwitch'>
> = observer(props => {
  const [_, toggleRender] = useState(false);
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
          <Space size={20} />

          <HeaderBackStatusLogoSettings
            onBackPress={() => {
              goBack();
            }}
            onLogoPress={() => navigation.navigate('home')}
            onSettingsPress={() => navigation.navigate('deviceSetting')}
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
                {deviceStore.device?.label}
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

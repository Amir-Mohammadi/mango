/* eslint-disable camelcase */

import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { Header, Screen, ThreePoleSwitch, WS } from '../../../components';
import { goBack, NavigatorParamList } from '../../../navigators';
import { ConnectionStatus, useStores } from '../../../stores';
import { namedSpacing } from '../../../theme';
import { styles } from './three-pole-switch-screen.style';

enum TelemetryKey {
  key_1_value = 'key_one_status',
  key_2_value = 'key_two_status',
  key_3_value = 'key_three_status',
}

enum rpcMethod {
  key_1_set_value = 'key_one_set_value',
  key_2_set_value = 'key_two_set_value',
  key_3_set_value = 'key_three_set_value',
}
export const ThreePoleSwitchScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'threePoleSwitch'>
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

  const onMessage = (event: any) => {
    deviceStore.parseTelemetries(null, event.data);
  };

  const onClickFirstPole = () => {
    const value = getKeyValue(TelemetryKey.key_1_value);
    deviceStore.rpc(rpcMethod.key_1_set_value, !value);
  };

  const onClickSecondPole = () => {
    const value = getKeyValue(TelemetryKey.key_2_value);
    deviceStore.rpc(rpcMethod.key_2_set_value, !value);
  };

  const onClickThirdPole = () => {
    const value = getKeyValue(TelemetryKey.key_3_value);
    deviceStore.rpc(rpcMethod.key_3_set_value, !value);
  };

  const onClickDeviceSetting = () => {
    navigation.navigate('deviceSetting');
  };
  useEffect(() => {
    deviceStore.prepareWsUrl();
  }, []);

  return (
    <Fragment>
      <Header
        headerText="3 Keys Switch"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="fixed">
        {!!deviceStore.wsUrl && (
          <WS url={deviceStore.wsUrl} onOpen={onOpen} onMessage={onMessage} />
        )}
        <ThreePoleSwitch
          connectionStatus={
            deviceStore.connectionStatus ?? ConnectionStatus.Disconnected
          }
          firstPoleKeyValue={getKeyValue(TelemetryKey.key_1_value)}
          secondPoleKeyValue={getKeyValue(TelemetryKey.key_2_value)}
          thirdPoleKeyValue={getKeyValue(TelemetryKey.key_3_value)}
          onClickFirstPole={onClickFirstPole}
          onClickSecondPole={onClickSecondPole}
          onClickThirdPole={onClickThirdPole}
          onClickDeviceSetting={onClickDeviceSetting}
        />
      </Screen>
    </Fragment>
  );
});

export const ThreePoleSwitchScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Three Pole Switch',
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

import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DeviceConfigScreen } from '../screens/ap-soft-v1-stack/device-config/device-config-screen';
import { ConnectToDeviceScreen } from '../screens/device-config/connect-to-device/connect-to-device-screen';
import { DevicesListScreen } from '../screens/device-config/devices-list/devices-list-screen';
import {
    DeviceNoticeScreen,
    DeviceNoticeScreenOptions
} from '../screens/device-notice/device-notice';
import { SelectDeviceModelScreen } from '../screens/device-profile/device-profile-screen';
import {
    DeviceScanScreen,
    DeviceScanScreenOptions
} from '../screens/device-scan/device-scan-screen';
import {
    EditRouterScreen,
    EditRouterScreenOptions,
    SelectRouterScreen,
    SelectRouterScreenOptions
} from '../screens/router';

export type DeviceConfigNavigatorParamList = {
  connectToDevice: undefined;
  waitForWifiDeviceScreen: { deviceSSID: string; deviceProfileId: number };
  selectDeviceModelScreen: undefined;
  devicesListScreen: undefined;
  deviceScan: { deviceProfileId: number };
  selectRouter: { profileRegex: string };
  editRouter: { BSSID: string };
  deviceConfig: undefined;
  deviceNotice: undefined;
};

const DeviceConfigStack =
  createStackNavigator<DeviceConfigNavigatorParamList>();

export const AppDeviceConfigStack = observer(() => {
  return (
    <DeviceConfigStack.Navigator
      defaultScreenOptions={{ headerShown: false }}
      initialRouteName="devicesListScreen">
      <DeviceConfigStack.Screen
        name="devicesListScreen"
        component={DevicesListScreen}
        options={{
          headerShown: false,
        }}
      />
      <DeviceConfigStack.Screen
        name="selectDeviceModelScreen"
        component={SelectDeviceModelScreen}
        options={{
          headerShown: false,
        }}
      />

      <DeviceConfigStack.Screen
        name="deviceNotice"
        component={DeviceNoticeScreen}
        options={DeviceNoticeScreenOptions}
      />
      <DeviceConfigStack.Screen
        name="deviceScan"
        component={DeviceScanScreen}
        options={DeviceScanScreenOptions}
      />
      <DeviceConfigStack.Screen
        name="selectRouter"
        component={SelectRouterScreen}
        options={SelectRouterScreenOptions}
      />
      <DeviceConfigStack.Screen
        name="editRouter"
        component={EditRouterScreen}
        options={EditRouterScreenOptions}
      />
      <DeviceConfigStack.Screen
        name="deviceConfig"
        component={DeviceConfigScreen}
        options={{
          headerShown: false,
        }}
      />
      <DeviceConfigStack.Screen
        name="connectToDevice"
        component={ConnectToDeviceScreen}
        options={{ headerShown: false }}
      />
    </DeviceConfigStack.Navigator>
  );
});

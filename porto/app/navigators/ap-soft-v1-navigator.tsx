import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DeviceConfigScreen } from '../screens/ap-soft-v1-stack/device-config/device-config-screen';
import { EditSavedWifiScreen } from '../screens/ap-soft-v1-stack/edit-saved-wifi/edit-saved-wifi-screen';
import { PreConfigDescription } from '../screens/ap-soft-v1-stack/pre-confige-description-screen/pre-confige-description-screen';
import { selectHouseWifiScreen } from '../screens/ap-soft-v1-stack/select-house-wifi/select-house-wifi-screen';
import { WaitForWifiDeviceScreen } from '../screens/ap-soft-v1-stack/wait-for-wifi-device-connection/wait-for-wifi-device-connection-screen';

export type SoftAPV1ParamList = {
  preConfigDescription: { deviceModelId: number };
  selectHouseWifiScreen: { deviceSSIDRegex: string };
  editSavedWifiScreen: { BSSID: string };
  deviceConfigScreen: undefined;
  waitForWifiDeviceScreen: { deviceSSIDRegex: string };
};

const APSoftV1Stack = createStackNavigator<SoftAPV1ParamList>();

export const APSoftV1Navigator = observer(() => {
  return (
    <APSoftV1Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="preConfigDescription">
      <APSoftV1Stack.Screen
        name="preConfigDescription"
        component={PreConfigDescription}
      />

      <APSoftV1Stack.Screen
        name="selectHouseWifiScreen"
        component={selectHouseWifiScreen}
      />

      <APSoftV1Stack.Screen
        name="waitForWifiDeviceScreen"
        component={WaitForWifiDeviceScreen}
      />

      <APSoftV1Stack.Screen
        name="editSavedWifiScreen"
        component={EditSavedWifiScreen}
      />

      <APSoftV1Stack.Screen
        name="deviceConfigScreen"
        component={DeviceConfigScreen}
      />
    </APSoftV1Stack.Navigator>
  );
});

import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ConfigDeviceScreen } from '../screens/wifi-esptouch-config/connect-to-device/connect-to-device-screen';
import { SelectHomeWifiScreen } from '../screens/wifi-esptouch-config/current-wifi/current-wifi-screen';
import { PreConfig } from '../screens/wifi-esptouch-config/pre-config/pre-config-screen';

export type ESPTouchConfigParamList = {
  selectHomeWifi: undefined;
  configDevice: undefined;
  preConfig: undefined;
};

const ESPTouchConfigStack = createStackNavigator<ESPTouchConfigParamList>();

export const ESPTouchNavigator = observer(() => {
  return (
    <ESPTouchConfigStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="selectHomeWifi">
      <ESPTouchConfigStack.Screen
        name="selectHomeWifi"
        component={SelectHomeWifiScreen}
      />
      <ESPTouchConfigStack.Screen
        name="preConfig"
        component={PreConfig}
      />

      <ESPTouchConfigStack.Screen
        name="configDevice"
        component={ConfigDeviceScreen}
      />
    </ESPTouchConfigStack.Navigator>
  );
});

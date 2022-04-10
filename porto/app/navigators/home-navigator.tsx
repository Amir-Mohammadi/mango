import {
    BottomTabNavigationOptions,
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
import { SettingScreen } from '../screens/setting/setting-screen';

const homeScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: 'Home',
  tabBarActiveBackgroundColor: '#f8f9fa',
  tabBarIcon: () => <Icon name="home" type="ant-design" color="#5f0f40" />,
};

const settingScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: 'Setting',
  tabBarActiveBackgroundColor: '#f8f9fa',
  tabBarIcon: () => <Icon name="setting" type="ant-design" color="#014f86" />,
};

export type HomeNavigatorParamList = {
  setting: undefined;
};

const TabNavigator = createBottomTabNavigator<HomeNavigatorParamList>();

export const HomeTabNavigator = () => {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        name="setting"
        component={SettingScreen}
        options={settingScreenOptions}
      />
    </TabNavigator.Navigator>
  );
};

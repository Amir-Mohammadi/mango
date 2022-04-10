/* eslint-disable react/display-name */
/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
    DefaultTheme,
    NavigationContainer,
    NavigatorScreenParams
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { VerifyPasswordScreen } from '../../app/screens/verify-password/verify-password-screen';
import { AppConfig } from '../config';
import {
    DeviceSettingScreen,
    DeviceSettingScreenOptions,
    FanSwitchScreen,
    FanSwitchScreenOptions,
    LanguageScreen,
    LanguageScreenOptions,
    LoginScreen,
    ManageHomeScreen,
    ManageHomeScreenOptions,
    ManageHomesScreen,
    ManageHomesScreenOptions,
    MembersScreen,
    MembersScreenOptions,
    ShareScreen,
    ShareScreenOptions,
    ThreePoleSwitchScreen,
    ThreePoleSwitchScreenOptions,
    UpdateScreen,
    UpdateScreenOptions
} from '../screens';
import { AboutScreen } from '../screens/about/about-screen';
import { ComingSoonScreen } from '../screens/coming-soon/coming-soon-screen';
import { DeleteAccountScreen } from '../screens/delete-account/delete-account-screen';
import { chooseDeviceZoneScreen } from '../screens/device-config/choose-device-zone/choose-device-zone-screen';
import { CurrentWifiScreen } from '../screens/device-config/current-wifi/current-wifi-screen';
import { TwoPoleSwitchScreen } from '../screens/device-control/two-pole-switch';
import { EditUserProfileScreen } from '../screens/edit-user-profile/edit-user-profile-screen';
import { HomeScreen } from '../screens/home/home-screen';
import { IntroSliderScreen } from '../screens/intro-slider/intro-slider-screen';
import { RegisterScreen } from '../screens/register/register-screen';
import { RoomScreen } from '../screens/room/room-screen';
import { SettingScreen } from '../screens/setting/setting-screen';
import { SplashScreen } from '../screens/splash/splash-screen';
import { TermsOfServiceScreen } from '../screens/Terms-of-service/terms-of-service-screen';
import { UserProfileScreen } from '../screens/user-profile/user-profile-screen';
import { ValidationTemplateScreen } from '../screens/validation-template/validation-template-screen';
import { useStores } from '../stores';
import { APSoftV1Navigator, SoftAPV1ParamList } from './ap-soft-v1-navigator';
import {
    ESPTouchConfigParamList,
    ESPTouchNavigator
} from './asptouch-navigator';
import {
    AppDeviceConfigStack,
    DeviceConfigNavigatorParamList
} from './device-config-navigator';
import { HomeNavigatorParamList, HomeTabNavigator } from './home-navigator';
import { navigationRef } from './navigation-utilities';
import {
    AppSettingStack,
    SettingNavigatorParamList
} from './setting-navigator';

export type NavigatorParamList = {
  deleteAccount: undefined;
  comingSoon: undefined;
  splash: undefined;
  shareScreen: { assetId: string };
  userProfile: undefined;
  editUserProfile: undefined;
  homeTabNavigator: NavigatorScreenParams<HomeNavigatorParamList>;
  settingStack: NavigatorScreenParams<SettingNavigatorParamList>;
  fanSwitch: undefined;
  twoPoleSwitch: undefined;
  setting: undefined;
  threePoleSwitch: undefined;
  deviceSetting: undefined;
  manageHomes: undefined;
  manageHome: { assetId?: string } | undefined;
  language: undefined;
  update: undefined;
  members: undefined;
  test: undefined;
  deviceConfigStack: NavigatorScreenParams<DeviceConfigNavigatorParamList>;
  softAPV1Stack: NavigatorScreenParams<SoftAPV1ParamList>;
  room: { zone?: string | null };
  introSlider: undefined;
  login: undefined;
  verifyPassword: undefined;
  register: undefined;
  validationTemplate: undefined;
  termsOfService: undefined;
  about: undefined;
  home: undefined;
  currentWifi: undefined;
  chooseDeviceZone: undefined;
  espTouchStack: NavigatorScreenParams<ESPTouchConfigParamList>;
};

const RootStack = createStackNavigator<NavigatorParamList>();

const AppStack = observer(() => {
  const { authStore } = useStores();

  const getInitialRouteName = useCallback((): keyof NavigatorParamList => {
    var userAlreadySawTheSlider =
      authStore.sliderVersion !== AppConfig.slider.version;
    if (!authStore.isLoggedIn && userAlreadySawTheSlider) return 'login';
    if (!authStore.isLoggedIn && !userAlreadySawTheSlider) return 'introSlider';
    return 'home';
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={getInitialRouteName()}>
      <RootStack.Screen name="homeTabNavigator" component={HomeTabNavigator} />
      <RootStack.Screen name="userProfile" component={UserProfileScreen} />
      <RootStack.Screen name="room" component={RoomScreen} />
      <RootStack.Screen name="home" component={HomeScreen} />
      <RootStack.Screen name="settingStack" component={AppSettingStack} />
      <RootStack.Screen
        name="fanSwitch"
        component={FanSwitchScreen}
        options={FanSwitchScreenOptions}
      />
      <RootStack.Screen name="twoPoleSwitch" component={TwoPoleSwitchScreen} />
      <RootStack.Screen
        name="editUserProfile"
        component={EditUserProfileScreen}
      />
      <RootStack.Screen name="splash" component={SplashScreen} />

      <RootStack.Screen
        name="shareScreen"
        component={ShareScreen}
        options={ShareScreenOptions}
      />
      <RootStack.Screen name="deleteAccount" component={DeleteAccountScreen} />
      <RootStack.Screen
        name="threePoleSwitch"
        component={ThreePoleSwitchScreen}
        options={ThreePoleSwitchScreenOptions}
      />
      <RootStack.Screen
        name="deviceSetting"
        component={DeviceSettingScreen}
        options={DeviceSettingScreenOptions}
      />
      <RootStack.Screen
        name="manageHomes"
        component={ManageHomesScreen}
        options={ManageHomesScreenOptions}
      />
      <RootStack.Screen
        name="manageHome"
        component={ManageHomeScreen}
        options={ManageHomeScreenOptions}
      />
      <RootStack.Screen name="currentWifi" component={CurrentWifiScreen} />
      <RootStack.Screen
        name="chooseDeviceZone"
        component={chooseDeviceZoneScreen}
      />
      <RootStack.Screen
        name="language"
        component={LanguageScreen}
        options={LanguageScreenOptions}
      />
      <RootStack.Screen
        name="update"
        component={UpdateScreen}
        options={UpdateScreenOptions}
      />
      <RootStack.Screen
        name="members"
        component={MembersScreen}
        options={MembersScreenOptions}
      />
      <RootStack.Screen
        name="deviceConfigStack"
        component={AppDeviceConfigStack}
      />
      <RootStack.Screen name="setting" component={SettingScreen} />
      <RootStack.Screen name="softAPV1Stack" component={APSoftV1Navigator} />
      <RootStack.Screen name="introSlider" component={IntroSliderScreen} />
      <RootStack.Screen name="login" component={LoginScreen} />
      <RootStack.Screen name="comingSoon" component={ComingSoonScreen} />
      <RootStack.Screen
        name="verifyPassword"
        component={VerifyPasswordScreen}
      />
      <RootStack.Screen name="register" component={RegisterScreen} />
      <RootStack.Screen
        name="validationTemplate"
        component={ValidationTemplateScreen}
      />
      <RootStack.Screen
        name="termsOfService"
        component={TermsOfServiceScreen}
      />
      <RootStack.Screen name="about" component={AboutScreen} />
      <RootStack.Screen name="espTouchStack" component={ESPTouchNavigator} />
    </RootStack.Navigator>
  );
});

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes: (keyof NavigatorParamList)[] = [
  'homeTabNavigator',
  'login',
  'introSlider',
];
export const canExit = (routeName: keyof NavigatorParamList) =>
  exitRoutes.includes(routeName);

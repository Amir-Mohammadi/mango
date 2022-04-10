import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { AboutScreen } from '../screens/about/about-screen';
import { EditUserProfileScreen } from '../screens/edit-user-profile/edit-user-profile-screen';
import {
    LanguageScreen,
    LanguageScreenOptions
} from '../screens/language/language-screen';
import {
    ManageHomeScreen,
    ManageHomeScreenOptions
} from '../screens/manage-home/manage-home-screen';
import {
    ManageHomesScreen,
    ManageHomesScreenOptions
} from '../screens/manage-homes/manage-homes-screen';
import {
    MembersScreen,
    MembersScreenOptions
} from '../screens/members/members-screen';
import { SettingScreen } from '../screens/setting/setting-screen';
import { TermsOfServiceScreen } from '../screens/Terms-of-service/terms-of-service-screen';
import {
    UpdateScreen,
    UpdateScreenOptions
} from '../screens/update/update-screen';
import {
    UserProfileScreen,
    UserProfileScreenOptions
} from '../screens/user-profile/user-profile-screen';

export type SettingNavigatorParamList = {
  termsOfService: undefined;
  about: undefined;
  comingSoon: undefined;
  setting: undefined;
  userProfile: undefined;
  editUserProfile: undefined;
  manageHomes: undefined;
  manageHome: undefined;
  language: undefined;
  update: undefined;
  members: undefined;
};

const SettingStack = createStackNavigator<SettingNavigatorParamList>();

export const AppSettingStack = observer(() => {
  return (
    <SettingStack.Navigator
      defaultScreenOptions={{ headerTitleAlign: 'center' }}
      initialRouteName="setting">
      <SettingStack.Screen name="setting" component={SettingScreen} />
      <SettingStack.Screen
        name="userProfile"
        component={UserProfileScreen}
        options={UserProfileScreenOptions}
      />
      <SettingStack.Screen
        name="editUserProfile"
        component={EditUserProfileScreen}
      />
      <SettingStack.Screen
        name="manageHomes"
        component={ManageHomesScreen}
        options={ManageHomesScreenOptions}
      />
      <SettingStack.Screen
        name="manageHome"
        component={ManageHomeScreen}
        options={ManageHomeScreenOptions}
      />
      <SettingStack.Screen
        name="language"
        component={LanguageScreen}
        options={LanguageScreenOptions}
      />
      <SettingStack.Screen
        name="update"
        component={UpdateScreen}
        options={UpdateScreenOptions}
      />
      <SettingStack.Screen
        name="members"
        component={MembersScreen}
        options={MembersScreenOptions}
      />
      <SettingStack.Screen name="setting" component={SettingScreen} />
      <SettingStack.Screen name="about" component={AboutScreen} />
      <SettingStack.Screen
        name="termsOfService"
        component={TermsOfServiceScreen}
      />
    </SettingStack.Navigator>
  );
});

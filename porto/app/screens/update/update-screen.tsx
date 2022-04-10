import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Header, Screen } from '../../components';
import { goBack, SettingNavigatorParamList } from '../../navigators';
import { namedSpacing } from '../../theme';
import { styles } from './update-screen-style';
export const UpdateScreen: React.FC<
  StackScreenProps<SettingNavigatorParamList, 'update'>
> = observer(props => {
  return (
    <Fragment>
      <Header
        headerText="Update"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="scroll">
        <View style={styles.ICON_CONTAINER}>
          <Icon size={100} name="checkcircleo" type="ant-design" />
          <Text style={styles.UPDATE_TEXT}>No updates available</Text>
        </View>
      </Screen>
    </Fragment>
  );
});

export const UpdateScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Check for updates',
    headerTitleAlign: 'center',
    headerShown: false,
    headerTitleStyle: { fontSize: 20 },
    headerLeft: () => (
      <Icon
        name="arrowleft"
        type="ant-design"
        onPress={() => {
          goBack();
        }}
      />
    ),
    headerLeftContainerStyle: { marginLeft: namedSpacing.smaller },
  };
};

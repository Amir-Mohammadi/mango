import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { Header, Screen } from '../../components';
import { goBack, SettingNavigatorParamList } from '../../navigators';
import { namedSpacing } from '../../theme';
import { styles } from './language-screen.style';
export const LanguageScreen: React.FC<
  StackScreenProps<SettingNavigatorParamList, 'language'>
> = observer(props => {
  return (
    <Fragment>
      <Header
        headerText="Language"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="scroll">
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>English</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Persian</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Screen>
    </Fragment>
  );
});

export const LanguageScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Language',
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

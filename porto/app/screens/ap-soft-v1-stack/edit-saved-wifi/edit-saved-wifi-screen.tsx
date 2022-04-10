import { CompositeScreenProps } from '@react-navigation/core';
import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { Header, Screen } from '../../../components';
import { ValidationType } from '../../../components/validation-input/validation-input';
import { goBack, NavigatorParamList } from '../../../navigators';
import { SoftAPV1ParamList } from '../../../navigators/ap-soft-v1-navigator';
import { useStores } from '../../../stores';
import { namedSpacing } from '../../../theme';
import { styles } from './edit-saved-wifi-screen.style';

type EditSavedWifiScreenParams = CompositeScreenProps<
  StackScreenProps<SoftAPV1ParamList, 'editSavedWifiScreen'>,
  StackScreenProps<NavigatorParamList>
>;

export const EditSavedWifiScreen: React.FC<EditSavedWifiScreenParams> =
  observer(props => {
    const { BSSID } = props.route.params;
    const { navigation } = props;
    const { routerStore, dialogStore } = useStores();

    const deleteRouterDialog = () => {
      dialogStore.showQuestionDialog({
        title: 'Delete router',
        message: 'Are you sour to delete router?',
        onSubmit: deleteRouter,
      });
    };

    const deleteRouter = () => {
      routerStore.deleteRouter(BSSID);
      navigation.goBack();
    };

    const changePasswordDialog = () => {
      dialogStore.showInputDialog({
        title: 'Enter password',
        keyboardType: 'visible-password',
        validationType: [ValidationType.required],
        inputPlaceHolder: 'Password',
        inputSecureTextEntry: true,
        onSubmit: password => {
          changePassword(password);
        },
      });
    };

    const changePassword = (password: string) => {
      routerStore.changeRouterPassword(BSSID, password);
    };

    return (
      <Fragment>
        <Header
          headerText="Edit Router"
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
        />
        <Screen style={styles.ROOT} variant="fixed">
          <ListItem bottomDivider onPress={() => changePasswordDialog()}>
            <ListItem.Content>
              <ListItem.Title>Change password</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron size={30} />
          </ListItem>
          <ListItem onPress={() => deleteRouterDialog()}>
            <ListItem.Content>
              <ListItem.Title style={styles.LIST_ITEM_TEXT}>
                Delete network
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron size={30} />
          </ListItem>
        </Screen>
      </Fragment>
    );
  });

export const EditRouterScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Edit Router',
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

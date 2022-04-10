import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import { Header, Loading, Screen } from '../../../components';
import { ValidationType } from '../../../components/validation-input/validation-input';
import { goBack } from '../../../navigators';
import { DeviceConfigNavigatorParamList } from '../../../navigators/device-config-navigator';
import { useStores } from '../../../stores';
import { namedSpacing } from '../../../theme';
import { styles } from './select-router-screen.style';

export const SelectRouterScreen: React.FC<
  StackScreenProps<DeviceConfigNavigatorParamList, 'selectRouter'>
> = observer(props => {
  const { routerStore, dialogStore, deviceConfigStore } = useStores();
  const { navigation } = props;

  useEffect(() => {
    if (deviceConfigStore.isDeviceWifiConnected === true) {
      routerStore.getDeviceWifiList();
    }
  }, [deviceConfigStore.isDeviceWifiConnected]);
  const routerPasswordGetHandler = (SSID: string, BSSID: string) => {
    dialogStore.showInputDialog({
      title: 'Enter router password',
      validationType: [ValidationType.required],
      inputPlaceHolder: 'Password',
      inputSecureTextEntry: true,
      onSubmit: password => {
        saveAndSelectRouter(SSID, BSSID, password);
      },
    });
  };

  const selectRouter = (BSSID: string) => {
    routerStore.selectRouter(BSSID);
    navigation.navigate('deviceConfig');
  };

  const saveAndSelectRouter = (
    SSID: string,
    BSSID: string,
    password: string,
  ) => {
    routerStore.saveRouter(SSID, BSSID, password);
    selectRouter(BSSID);
  };

  const editRouter = (BSSID: string) => {
    navigation.navigate('editRouter', { BSSID: BSSID });
  };

  return (
    <Fragment>
      <Header
        headerText="Select Route"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="fixed">
        <ScrollView>
          {routerStore.savedRouters.size > 0 && (
            <Card containerStyle={styles.CONTAINER}>
              <Card.Title style={styles.CARD_TITLE_TEXT}>
                Nearby router
              </Card.Title>
              <Card.Divider />
              {[...routerStore.savedRouters.values()].map((item, index) => (
                <ListItem
                  key={index}
                  onPress={() => {
                    selectRouter(item.BSSID);
                  }}>
                  <ListItem.Content>
                    <ListItem.Title>{item.SSID}</ListItem.Title>
                  </ListItem.Content>
                  <Icon name={'wifi'} type={'ant-design'} />
                  <Icon
                    name={'dots-horizontal-circle-outline'}
                    type={'material-community'}
                    onPress={() => {
                      editRouter(item.BSSID);
                    }}
                  />
                </ListItem>
              ))}
            </Card>
          )}

          <Card containerStyle={styles.CONTAINER}>
            <Card.Title style={styles.CARD_TITLE_TEXT}>
              Nearby router
            </Card.Title>
            <Card.Divider />
            {routerStore.isLoading === true ? (
              <Loading size={40} />
            ) : (
              [...routerStore.routers.values()].map((item, index) => (
                <ListItem
                  key={index}
                  onPress={() =>
                    routerPasswordGetHandler(item.SSID, item.BSSID)
                  }>
                  <ListItem.Content>
                    <ListItem.Title>{item.SSID}</ListItem.Title>
                  </ListItem.Content>
                  <Icon name={'wifi'} type={'ant-design'} />
                </ListItem>
              ))
            )}
          </Card>
        </ScrollView>
      </Screen>
    </Fragment>
  );
});

export const SelectRouterScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Select Router',
    headerTitleAlign: 'center',
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

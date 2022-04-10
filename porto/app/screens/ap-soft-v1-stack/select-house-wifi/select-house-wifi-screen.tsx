import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import { Header, Loading, Screen } from '../../../components';
import { NavigatorParamList } from '../../../navigators';
import { SoftAPV1ParamList } from '../../../navigators/ap-soft-v1-navigator';
import { useStores } from '../../../stores';
import { styles } from './select-house-wifi-screen.style';

type SelectWifiScreenParams = CompositeScreenProps<
  StackScreenProps<SoftAPV1ParamList, 'selectHouseWifiScreen'>,
  StackScreenProps<NavigatorParamList>
>;

export const selectHouseWifiScreen: React.FC<SelectWifiScreenParams> = observer(
  props => {
    const { routerStore, dialogStore } = useStores();
    const { navigation } = props;

    useFocusEffect(
      useCallback(() => {
        routerStore.getNearbyRouters(props.route.params.deviceSSIDRegex);
      }, []),
    );

    const routerPasswordGetHandler = (SSID: string, BSSID: string) => {
      dialogStore.showInputDialog({
        title: 'Enter router password',
        validationType: [],
        inputPlaceHolder: 'Password',
        inputSecureTextEntry: true,

        onSubmit: password => {
          saveAndSelectRouter(SSID, BSSID, password);
        },
      });
    };

    const selectRouter = (BSSID: string) => {
      routerStore.selectRouter(BSSID);
      navigation.navigate('waitForWifiDeviceScreen', {
        deviceSSIDRegex: props.route.params.deviceSSIDRegex,
      });
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
      navigation.navigate('editSavedWifiScreen', { BSSID: BSSID });
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
                  Saved Wifi's
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
                Nearby Wifi's
              </Card.Title>
              <Card.Divider />
              {routerStore.isLoading === true ? (
                <Loading size={40} />
              ) : (
                routerStore.routersList.map((item, index) => (
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
  },
);

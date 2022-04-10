import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Card, Icon, ListItem } from 'react-native-elements';
import { Header, Screen } from '../../components';
import { ValidationType } from '../../components/validation-input/validation-input';
import { goBack, NavigatorParamList } from '../../navigators';
import { CommonDeviceInfoKey, useStores } from '../../stores';
import { namedSpacing } from '../../theme';
import { styles } from './device-setting-screen.style';

export const DeviceSettingScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'deviceSetting'>
> = observer(props => {
  const { dialogStore, deviceStore } = useStores();

  const onEditDeviceNameModalShow = () => {
    dialogStore.showInputDialog({
      title: 'Device Name',
      validationType: [ValidationType.required],
      inputInitialValue: deviceStore.device?.label,
      inputPlaceHolder: 'Device Name',
      onSubmit: deviceName => editDeviceName(deviceName),
    });
  };

  const editDeviceName = (deviceName: string) => {
    deviceStore.editDeviceName(deviceName).then(result => {
      if (result === true) {
        deviceStore.getDevice();
      }
    });
  };
  return (
    <Fragment>
      <Header
        headerText="Device Setting"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant={'fixed'}>
        <Card containerStyle={styles.CONTAINER}>
          <Card.Title style={styles.CARD_TITLE_TEXT}>
            General Setting
          </Card.Title>
          <Card.Divider />
          <ListItem onPress={onEditDeviceNameModalShow}>
            <ListItem.Content>
              <ListItem.Title>Device Name</ListItem.Title>
              <ListItem.Subtitle style={styles.CARD_LIST_ITEM_SUBTITLE}>
                {deviceStore.device?.label}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={30} />
          </ListItem>
        </Card>
        <Card containerStyle={styles.CONTAINER}>
          <Card.Title style={styles.CARD_TITLE_TEXT}>Router Info</Card.Title>
          <Card.Divider />
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Router</ListItem.Title>
              <ListItem.Subtitle style={styles.CARD_LIST_ITEM_SUBTITLE}>
                {deviceStore.device?.deviceData.get(CommonDeviceInfoKey.router)}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Card>
      </Screen>
    </Fragment>
  );
});

export const DeviceSettingScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Device Setting',
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

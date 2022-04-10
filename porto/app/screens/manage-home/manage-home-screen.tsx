import { CompositeScreenProps } from '@react-navigation/native';
import {
    StackNavigationOptions,
    StackScreenProps
} from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import { Header, Screen, SettingItemGroup } from '../../components';
import { DeviceListItem } from '../../components/device-list-item/device-list-item';
import { ValidationType } from '../../components/validation-input/validation-input';
import { goBack, NavigatorParamList } from '../../navigators';
import { DeviceType, useStores } from '../../stores';
import { namedSpacing } from '../../theme';
import { styles } from './manage-home-screen.style';
export const ManageHomeScreen: React.FC<
  CompositeScreenProps<
    StackScreenProps<NavigatorParamList, 'manageHome'>,
    StackScreenProps<NavigatorParamList>
  >
> = observer(props => {
  const { navigation } = props;
  const { assetStore, userStore, deviceStore, dialogStore } = useStores();
  const [currentAsset, setCurrentAsset] = useState(
    assetStore.getAssetById(props.route.params?.assetId ?? ''),
  );

  useEffect(() => {
    if (!props.route.params?.assetId) navigation.goBack();
  }, []);

  useEffect(() => {
    setCurrentAsset(assetStore.getAssetById(props.route.params?.assetId ?? ''));
  }, []);

  const editAssetNameHandler = () => {
    dialogStore.showInputDialog({
      title: 'Set your home name',
      validationType: [ValidationType.required],
      inputInitialValue: currentAsset?.label,
      inputPlaceHolder: 'Home Name',

      onSubmit: inputValue => {
        assetStore.editAsset(
          props.route.params?.assetId ?? '',
          currentAsset?.type ?? '',
          inputValue,
        );

        assetStore.getAssets().then(result => {
          if (result === true) {
            const currentAsset = assetStore.getAssetById(
              props.route.params?.assetId ?? '',
            );

            if (currentAsset !== undefined) {
              setCurrentAsset({ ...currentAsset });
            }
          }
        });
      },
    });
  };

  const onSelectDeviceHandler = (
    deviceId: string,
    deviceType: DeviceType | null,
  ) => {
    deviceStore.setCurrentDeviceId(deviceId);
    switch (deviceType) {
      case DeviceType.fanSwitchV1:
        navigation.navigate('fanSwitch');
        break;
      case DeviceType.threePoleSwitchV1:
        navigation.navigate('comingSoon');
        break;
      default:
        navigation.navigate('comingSoon');
    }
  };

  useEffect(() => {
    userStore.getUserProfile();
  }, []);

  return (
    <Fragment>
      <Header
        headerText="Customization Home"
        leftIcon="back"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Screen style={styles.ROOT} variant="scroll">
        <SettingItemGroup showBottomLine={true}>
          <ListItem onPress={editAssetNameHandler}>
            <ListItem.Content>
              <ListItem.Title>{currentAsset?.type ?? ''}</ListItem.Title>
              <ListItem.Subtitle>{currentAsset?.label ?? ''}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={30} />
          </ListItem>
        </SettingItemGroup>
        <View style={styles.LIST_CONTAINER}>
          <FlatList
            numColumns={2}
            keyExtractor={item => item.id}
            data={deviceStore.deviceList}
            renderItem={itemData => {
              return (
                <DeviceListItem
                  device={itemData.item}
                  onSelect={() =>
                    onSelectDeviceHandler(
                      itemData.item.id,
                      itemData.item.deviceType,
                    )
                  }
                />
              );
            }}
          />
        </View>
        <SettingItemGroup title={'Home member'} showBottomLine={true}>
          <ListItem onPress={() => props.navigation.navigate('userProfile')}>
            <Avatar
              rounded
              size={45}
              source={{ uri: userStore.profileImage ?? '' }}
            />
            <ListItem.Content>
              <ListItem.Title>
                {userStore.firstName + ' ' + userStore.lastName}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron size={30} />
          </ListItem>
        </SettingItemGroup>
        <View style={styles.BUTTON_CONTAINER}>
          <Button
            type="solid"
            onPress={() =>
              assetStore.deleteAsset(props.route.params?.assetId ?? '')
            }
            title={'Delete'}
            buttonStyle={styles.BUTTON}></Button>
        </View>
      </Screen>
    </Fragment>
  );
});

export const ManageHomeScreenOptions = (): StackNavigationOptions => {
  return {
    headerTitle: 'Manage home',
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

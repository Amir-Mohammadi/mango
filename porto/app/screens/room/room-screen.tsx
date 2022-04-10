import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen, Text } from '../../components';
import { DeviceListItem } from '../../components/device-list-item/device-list-item';
import { HeaderBackLogoMenu } from '../../components/header-back-logo-menu/header_back_logo_menu';
import { Space } from '../../components/space/space';
import { goBack, NavigatorParamList } from '../../navigators';
import { useReduxDispatch } from '../../redux-store/core/root-store';
import { toggleDrawer } from '../../redux-store/drawer-store';
import { DeviceType, useStores } from '../../stores';
import { styles } from './room-screen.style';

export const RoomScreen: React.FC<
  StackScreenProps<NavigatorParamList, 'room'>
> = observer(props => {
  const { navigation } = props;
  const { params } = props.route;

  const { assetStore, deviceStore, userStore } = useStores();

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

  const [
    isReadyToSendSubscriptionMessage,
    setIsReadyToSendSubscriptionMessage,
  ] = useState<boolean>(false);

  useEffect(() => {
    userStore.getUserProfile();
    assetStore.getAssets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      assetStore.getAssets().then(result => {
        if (result === true) {
          const currentAssetId = assetStore.checkAndGetValidCurrentAssetId(
            deviceStore.currentAssetId,
          );
          deviceStore.setCurrentAssetId(currentAssetId);
        }
      });
      return () => {
        setIsReadyToSendSubscriptionMessage(false);
      };
    }, []),
  );

  const getZone = () => {
    const zone = params?.zone;
    if (zone === undefined || zone === null || zone === '') return 'تعیین نشده';
    else return zone;
  };

  const getHome = () => {
    const home = deviceStore.currentAsset?.label;
    if (home === undefined) return 'تعیین نشده';
    else return home;
  };
  const dispatch = useReduxDispatch();

  return (
    <View style={styles.CONTAINER}>
      <StatusBar translucent backgroundColor="transparent" />
      <Screen style={styles.CONTAINER} variant="fixed">
        <ImageBackground
          source={require('../../assets/images/roomBackground.png')}
          resizeMode="cover"
          style={styles.IMAGE_BACKGROUND}>
          <SafeAreaView style={styles.CONTAINER}>
            <HeaderBackLogoMenu
              onLogoPress={() => navigation.navigate('home')}
              onBackPress={() => goBack()}
              onMenuPress={() => dispatch(toggleDrawer())}
            />
            <View style={styles.CONTAINER}>
              <Space />
              <Space />
              <Space />
              <Space />
              <Space />
              <Text style={styles.ZONE}>{getZone()}</Text>
              <Text style={styles.HOME}>{getHome()}</Text>
              <View style={styles.DEVICES_CONTAINER}>
                <FlatList
                  numColumns={2}
                  keyExtractor={item => item.id}
                  data={deviceStore.deviceList.filter(
                    item => item.zone === params?.zone,
                  )}
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
            </View>
          </SafeAreaView>
        </ImageBackground>
      </Screen>
    </View>
  );
});

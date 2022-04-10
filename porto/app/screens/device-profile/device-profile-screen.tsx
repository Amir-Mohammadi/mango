import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, View } from 'react-native';
import {
    DeviceProfileListItem,
    Header,
    Loading,
    Screen
} from '../../components';
import { NavigatorParamList } from '../../navigators';
import { DeviceConfigNavigatorParamList } from '../../navigators/device-config-navigator';
import { useStores } from '../../stores';
import { useOnMount } from '../../utils/hooks/use-on-mount';
import { getWifiPermissionIfNeeded } from '../../utils/wifi/get-wifi-permission.android';
import { styles } from './device-profile-screen.style';

type SelectDeviceModelScreenProps = CompositeScreenProps<
  StackScreenProps<DeviceConfigNavigatorParamList, 'selectDeviceModelScreen'>,
  StackScreenProps<NavigatorParamList>
>;

export const SelectDeviceModelScreen: React.FC<SelectDeviceModelScreenProps> =
  observer(props => {
    const { navigation } = props;
    const { deviceProfileStore, deviceConfigStore } = useStores();

    useOnMount(() => {
      deviceConfigStore.resetStoreState();
      deviceProfileStore.getDevicesProfile();
    });

    const onPressDeviceProfileHandler = async (modelId: number) => {
      const res = await getWifiPermissionIfNeeded();
      if (!res) return;
      navigation.navigate('softAPV1Stack', {
        screen: 'preConfigDescription',
        params: { deviceModelId: modelId },
      });
    };

    if (
      deviceProfileStore.isLoading &&
      // only when there is nothing to show to user
      deviceProfileStore.deviceProfiles.length === 0
    ) {
      return (
        <Screen style={styles.ROOT} variant="fixed">
          <Loading size={80} />
        </Screen>
      );
    } else {
      return (
        <Screen style={styles.ROOT} variant={'fixed'}>
          <Header
            headerText="Device Info"
            leftIcon="back"
            onLeftPress={() => props.navigation.goBack()}
          />
          <View style={styles.LIST_CONTAINER}>
            <FlatList
              numColumns={1}
              keyExtractor={item => item.id.toString()}
              data={deviceProfileStore.deviceProfiles}
              renderItem={itemData => {
                return (
                  <DeviceProfileListItem
                    profileId={itemData.item.id}
                    profileName={itemData.item.profileName}
                    profileImage={itemData.item.profileImage ?? ''}
                    onSelect={onPressDeviceProfileHandler}
                  />
                );
              }}
            />
          </View>
        </Screen>
      );
    }
  });
